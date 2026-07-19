import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { Database } from './server/db';
import { sendEmail } from './server/mailer';
import { GoogleCalendarService } from './server/calendar';
import {
  generateCustomerContactConfirmation,
  generateBusinessContactNotification,
  generateCustomerQuoteConfirmation,
  generateBusinessQuoteNotification,
  generateCustomerAppointmentConfirmation,
  generateBusinessAppointmentNotification
} from './server/emailTemplates';

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// API: Check status of Google OAuth
app.get('/api/admin/google-status', (req, res) => {
  const auth = Database.getGoogleAuth();
  res.json({
    connected: !!auth.accessToken,
    email: auth.email,
    expiry: auth.expiryDate
  });
});

// API: Get Google OAuth URL
app.get('/api/auth/google/url', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID || '679739917705-b3vq6231t16nu0oapuve0ke39nhkf6hk.apps.googleusercontent.com';
  
  // Dynamic Callback Construction
  const redirectUri = process.env.APP_URL 
    ? `${process.env.APP_URL.replace(/\/$/, '')}/auth/callback` 
    : `https://${req.headers.host}/auth/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.email',
    access_type: 'offline', // crucial to get a refresh token
    prompt: 'consent'       // forces Google to return the refresh token on re-auth
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  res.json({ url: authUrl });
});

// OAuth Callback Handler
app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('OAuth authorization code is missing.');
  }

  const clientId = process.env.GOOGLE_CLIENT_ID || '679739917705-b3vq6231t16nu0oapuve0ke39nhkf6hk.apps.googleusercontent.com';
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  const redirectUri = process.env.APP_URL 
    ? `${process.env.APP_URL.replace(/\/$/, '')}/auth/callback` 
    : `https://${req.headers.host}/auth/callback`;

  try {
    if (!clientSecret) {
      console.warn('[Server OAuth] No GOOGLE_CLIENT_SECRET configured. Simulated authentication complete.');
      
      // Simulate success for preview environment
      Database.saveGoogleAuth({
        accessToken: 'MOCK-ACCESS-TOKEN',
        refreshToken: 'MOCK-REFRESH-TOKEN',
        expiryDate: Date.now() + 3600 * 1000,
        email: 'design@verdaralandscapes.com'
      });

      return res.send(`
        <html>
          <body style="font-family: sans-serif; text-align: center; padding-top: 50px; background-color: #f4faf6; color: #062A16;">
            <h2>Google Calendar Linked (Simulated)</h2>
            <p>You did not configure a client secret, but we have completed a mock connection for the AI Studio preview environment.</p>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS' }, '*');
                setTimeout(() => window.close(), 1500);
              } else {
                window.location.href = '/#admin';
              }
            </script>
            <p>Closing window...</p>
          </body>
        </html>
      `);
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri
      })
    });

    if (!tokenResponse.ok) {
      const errText = await tokenResponse.text();
      throw new Error(`Google token exchange failed: ${tokenResponse.status} - ${errText}`);
    }

    const tokens = await tokenResponse.json() as any;

    // Fetch user profile email
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });

    let email = 'connected-user@google.com';
    if (userInfoResponse.ok) {
      const userInfo = await userInfoResponse.json() as any;
      email = userInfo.email || email;
    }

    // Save connection to DB
    Database.saveGoogleAuth({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || Database.getGoogleAuth().refreshToken, // fallback to existing refresh token if not returned
      expiryDate: Date.now() + tokens.expires_in * 1000,
      email
    });

    console.log(`[OAuth] Successfully connected Google Calendar for: ${email}`);

    // Return HTML that posts a message and closes the popup
    res.send(`
      <html>
        <body style="font-family: sans-serif; text-align: center; padding-top: 50px; background-color: #f4faf6; color: #062A16;">
          <h2>Google Calendar Linked Successfully</h2>
          <p>Your calendar is now connected. Automatically redirecting...</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/#admin';
            }
          </script>
        </body>
      </html>
    `);
  } catch (err: any) {
    console.error('[OAuth Callback Error]', err);
    res.status(500).send(`Authentication error: ${err.message || err}`);
  }
});

// API: Clear Google Auth Connection
app.post('/api/admin/google-disconnect', (req, res) => {
  Database.clearGoogleAuth();
  console.log('[Calendar] Disconnected Google account and cleared tokens.');
  res.json({ success: true });
});

// ----------------------------------------------------------------------
// FORM HANDLING ENDPOINTS
// ----------------------------------------------------------------------

// Anti-Spam: reCAPTCHA verification helper
async function verifySpamProtection(reqBody: any): Promise<boolean> {
  // 1. Honeypot check (field `website` or `_honeypot` should be empty)
  if (reqBody.website || reqBody._honeypot) {
    console.warn('[Anti-Spam] Bot detected via filled honeypot field.');
    return false; // silent failure trigger or drop
  }

  // 2. reCAPTCHA check if secret key exists
  const token = reqBody.recaptchaToken;
  const recaptchaSecret = process.env.RECAPTCHA_SECRET;

  if (recaptchaSecret && token) {
    try {
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: token
        })
      });

      const data = await response.json() as any;
      if (!data.success) {
        console.warn('[Anti-Spam] Bot detected via Google reCAPTCHA verification score/fail.');
        return false;
      }
    } catch (e) {
      console.error('[Anti-Spam] Error during Google reCAPTCHA validation:', e);
    }
  }

  return true;
}

// 1. Contact Form Submission
app.post('/api/submissions/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Please provide all required fields (Name, Email, Subject, Message).' });
  }

  // Spam protection
  const isHuman = await verifySpamProtection(req.body);
  if (!isHuman) {
    return res.json({ success: true, message: 'Spam filter active', simulated: true }); // silent fail/drop
  }

  try {
    const contact = Database.addContact({ name, email, phone, subject, message });

    // Send styled emails asynchronously
    const customerHtml = generateCustomerContactConfirmation(contact);
    const businessHtml = generateBusinessContactNotification(contact);

    // Business email alerts are directed to process.env.BUSINESS_OWNER_EMAIL or falling back to the admin's connected email
    const ownerEmail = process.env.BUSINESS_OWNER_EMAIL || 'design@verdaralandscapes.com';

    await Promise.all([
      sendEmail({
        to: email,
        subject: `[Verdara Landscapes] Inquiry Received - ${contact.id}`,
        html: customerHtml,
        type: 'customer_confirmation'
      }),
      sendEmail({
        to: ownerEmail,
        subject: `[NEW INQUIRY] ${subject} - ${contact.id}`,
        html: businessHtml,
        type: 'business_notification'
      })
    ]);

    res.json({ success: true, submission: contact });
  } catch (err: any) {
    console.error('[Contact Submit Error]', err);
    res.status(500).json({ error: err.message || 'Server failed to process your inquiry.' });
  }
});

// 2. Quote Request Submission
app.post('/api/submissions/quote', async (req, res) => {
  const { name, email, phone, projectType, budget, timeline, message } = req.body;

  if (!name || !email || !phone || !projectType || !budget || !timeline) {
    return res.status(400).json({ error: 'Please fill out all project design requirements.' });
  }

  const isHuman = await verifySpamProtection(req.body);
  if (!isHuman) {
    return res.json({ success: true, message: 'Spam filter active', simulated: true });
  }

  try {
    const quote = Database.addQuote({ name, email, phone, projectType, budget, timeline, message: message || '' });

    const customerHtml = generateCustomerQuoteConfirmation(quote);
    const businessHtml = generateBusinessQuoteNotification(quote);
    const ownerEmail = process.env.BUSINESS_OWNER_EMAIL || 'design@verdaralandscapes.com';

    await Promise.all([
      sendEmail({
        to: email,
        subject: `[Verdara Proposal] Landscape Project Estimate Opened - ${quote.id}`,
        html: customerHtml,
        type: 'customer_confirmation'
      }),
      sendEmail({
        to: ownerEmail,
        subject: `[NEW QUOTE REQUEST] ${projectType} ($${budget}) - ${quote.id}`,
        html: businessHtml,
        type: 'business_notification'
      })
    ]);

    res.json({ success: true, submission: quote });
  } catch (err: any) {
    console.error('[Quote Submit Error]', err);
    res.status(500).json({ error: err.message || 'Server failed to record your design request.' });
  }
});

// 3. Appointment Booking Submission
app.post('/api/submissions/appointment', async (req, res) => {
  const { name, email, phone, serviceType, date, timeSlot, message } = req.body;

  if (!name || !email || !phone || !serviceType || !date || !timeSlot) {
    return res.status(400).json({ error: 'Please select a service, date, and preferred time window.' });
  }

  const isHuman = await verifySpamProtection(req.body);
  if (!isHuman) {
    return res.json({ success: true, message: 'Spam filter active', simulated: true });
  }

  try {
    // 1. Save appointment to database
    const apt = Database.addAppointment({
      name,
      email,
      phone,
      serviceType,
      date,
      timeSlot,
      message: message || ''
    });

    // 2. Google Calendar Integration - Sync Consultation
    const googleEventId = await GoogleCalendarService.createEvent(apt);
    if (googleEventId) {
      Database.updateAppointment(apt.id, { googleEventId });
      apt.googleEventId = googleEventId;
    }

    // 3. Send automated branded confirmation & alerts
    const customerHtml = generateCustomerAppointmentConfirmation(apt);
    const businessHtml = generateBusinessAppointmentNotification(apt);
    const ownerEmail = process.env.BUSINESS_OWNER_EMAIL || 'design@verdaralandscapes.com';

    await Promise.all([
      sendEmail({
        to: email,
        subject: `[Verdara Consultation] Booking Scheduled - ${apt.id}`,
        html: customerHtml,
        type: 'customer_confirmation'
      }),
      sendEmail({
        to: ownerEmail,
        subject: `[CONSULTATION BOOKED] ${serviceType} - ${apt.id}`,
        html: businessHtml,
        type: 'business_notification'
      })
    ]);

    res.json({ success: true, submission: apt });
  } catch (err: any) {
    console.error('[Appointment Submit Error]', err);
    res.status(500).json({ error: err.message || 'Server failed to finalize appointment booking.' });
  }
});

// ----------------------------------------------------------------------
// ADMIN CONTROL DATA & CONTROLS
// ----------------------------------------------------------------------

// API: Get all backend data (Contacts, Quotes, Appointments, Outbox logs)
app.get('/api/admin/data', (req, res) => {
  res.json({
    contacts: Database.getContacts(),
    quotes: Database.getQuotes(),
    appointments: Database.getAppointments(),
    emails: Database.getEmails(),
    googleAuth: Database.getGoogleAuth(),
    smtpConfigured: !!(process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS),
    businessOwnerEmail: process.env.BUSINESS_OWNER_EMAIL || 'design@verdaralandscapes.com'
  });
});

// API: Update Contact Status
app.post('/api/admin/contacts/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = Database.updateContactStatus(id, status);
  if (updated) {
    res.json({ success: true, item: updated });
  } else {
    res.status(404).json({ error: 'Inquiry not found' });
  }
});

// API: Update Quote Status
app.post('/api/admin/quotes/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = Database.updateQuoteStatus(id, status);
  if (updated) {
    res.json({ success: true, item: updated });
  } else {
    res.status(404).json({ error: 'Proposal request not found' });
  }
});

// API: Update Appointment Details (Status, Sync to Google Calendar, etc.)
app.post('/api/admin/appointments/:id/update', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const apt = Database.getAppointments().find(a => a.id === id);
  if (!apt) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  try {
    // If appointment is being cancelled or archived, and was previously synced to Google Calendar
    if ((updates.status === 'cancelled' || updates.status === 'archived') && apt.googleEventId) {
      await GoogleCalendarService.deleteEvent(apt.googleEventId);
      updates.googleEventId = undefined; // clear reference
    }

    const updated = Database.updateAppointment(id, updates);
    res.json({ success: true, item: updated });
  } catch (e: any) {
    console.error('[Admin Appointment Update Fail]', e);
    res.status(500).json({ error: e.message || 'Failed to update consultation.' });
  }
});

// ----------------------------------------------------------------------
// VITE OR STATIC ASSETS ROUTING
// ----------------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Verdara Server] Running successfully on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
