import { AppointmentBooking, QuoteRequest, ContactSubmission } from '../src/types';

const COMPANY_NAME = 'Verdara Landscape Architecture & Design';
const BRAND_GREEN = '#062A16';
const BRAND_LIGHT_GREEN = '#BDD4A1';
const BRAND_SECONDARY_GREEN = '#0B512C';

function getHeaderHTML(title: string): string {
  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${BRAND_GREEN}; border-radius: 12px 12px 0 0; overflow: hidden;">
      <tr>
        <td style="padding: 40px 30px; text-align: center;">
          <h1 style="margin: 0; color: #ffffff; font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif; font-size: 26px; font-weight: normal; letter-spacing: 0.05em;">
            V E R D A R A
          </h1>
          <p style="margin: 10px 0 0 0; color: ${BRAND_LIGHT_GREEN}; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; font-size: 11px; font-weight: bold; uppercase; letter-spacing: 0.15em;">
            LANDSCAPE DESIGN & ECO-SYSTEMS
          </p>
          <div style="margin-top: 25px; height: 1px; background-color: rgba(189, 212, 161, 0.25); width: 80px; margin-left: auto; margin-right: auto;"></div>
          <h2 style="margin: 20px 0 0 0; color: #ffffff; font-family: 'Playfair Display', 'Georgia', 'Times New Roman', serif; font-size: 20px; font-weight: normal; font-style: italic;">
            ${title}
          </h2>
        </td>
      </tr>
    </table>
  `;
}

function getFooterHTML(): string {
  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f7fbf8; border-radius: 0 0 12px 12px; border-top: 1px solid #e1eae3;">
      <tr>
        <td style="padding: 30px; text-align: center; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; font-size: 12px; color: #6b7e70; line-height: 1.6;">
          <p style="margin: 0 0 10px 0; font-weight: bold; color: ${BRAND_GREEN};">
            ${COMPANY_NAME}
          </p>
          <p style="margin: 0 0 15px 0;">
            742 Evergreen Terrace, Cherry Creek, CO 80206<br>
            Studio Line: 719-528-1531 | <a href="mailto:design@verdaralandscapes.com" style="color: ${BRAND_SECONDARY_GREEN}; text-decoration: none;">design@verdaralandscapes.com</a>
          </p>
          <div style="margin-bottom: 15px;">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${BRAND_LIGHT_GREEN}; margin: 0 4px;"></span>
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${BRAND_GREEN}; margin: 0 4px;"></span>
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background-color: ${BRAND_LIGHT_GREEN}; margin: 0 4px;"></span>
          </div>
          <p style="margin: 0; font-size: 11px; color: #9daea2;">
            &copy; ${new Date().getFullYear()} Verdara. All rights reserved. This email confirms your booking/inquiry on our secure server system.
          </p>
        </td>
      </tr>
    </table>
  `;
}

function wrapLayout(content: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verdara Landscape Architecture</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f0f4f1; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f0f4f1; padding: 30px 15px;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 30px rgba(4, 22, 12, 0.06); overflow: hidden; border: 1px solid #e1eae3;">
                <tr>
                  <td>
                    ${content}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

export function generateCustomerContactConfirmation(contact: ContactSubmission): string {
  const content = `
    ${getHeaderHTML('Inquiry Received')}
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="padding: 40px 30px; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;">
      <tr>
        <td style="color: #2c3e31; font-size: 15px; line-height: 1.6;">
          <p style="margin: 0 0 20px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: normal; color: ${BRAND_GREEN};">
            Dear ${contact.name},
          </p>
          <p style="margin: 0 0 25px 0;">
            Thank you for reaching out to Verdara. We have successfully registered your inquiry, and our landscape design studio has assigned the reference code below to your file.
          </p>
          
          <!-- Reference ID Badge -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4faf6; border-left: 4px solid ${BRAND_LIGHT_GREEN}; border-radius: 4px; margin-bottom: 30px;">
            <tr>
              <td style="padding: 15px 20px;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #506657; font-weight: bold; display: block; margin-bottom: 5px;">Reference ID</span>
                <strong style="font-family: monospace; font-size: 16px; color: ${BRAND_GREEN}; letter-spacing: 1px;">${contact.id}</strong>
              </td>
            </tr>
          </table>

          <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; margin: 0 0 15px 0; color: ${BRAND_GREEN}; border-bottom: 1px solid #e1eae3; padding-bottom: 8px;">
            Submission Details
          </h3>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px; font-size: 14px;">
            <tr>
              <td width="30%" style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Subject:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${contact.subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500; vertical-align: top;">Message:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-style: italic; white-space: pre-line;">"${contact.message}"</td>
            </tr>
          </table>

          <p style="margin: 0 0 10px 0;">
            <strong>What happens next?</strong>
          </p>
          <p style="margin: 0 0 30px 0;">
            Our Lead Landscape Architect reviews all submissions personally. You can expect a response within 1 to 2 business days to schedule an initial exploratory brief.
          </p>

          <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 10px;">
            <tr>
              <td align="center" style="background-color: ${BRAND_GREEN}; border-radius: 30px;">
                <a href="https://verdaralandscapes.com" target="_blank" style="display: inline-block; padding: 12px 30px; font-size: 12px; font-weight: bold; color: #ffffff; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;">
                  Explore Our Portfolios
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    ${getFooterHTML()}
  `;
  return wrapLayout(content);
}

export function generateBusinessContactNotification(contact: ContactSubmission): string {
  const content = `
    ${getHeaderHTML('New General Inquiry')}
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="padding: 40px 30px; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;">
      <tr>
        <td style="color: #2c3e31; font-size: 15px; line-height: 1.6;">
          <p style="margin: 0 0 20px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: normal; color: ${BRAND_GREEN};">
            Hello Verdara Team,
          </p>
          <p style="margin: 0 0 25px 0;">
            A new customer has submitted a contact form on the website. Please find the customer profile and inquiry details below.
          </p>
          
          <!-- Reference ID Badge -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; border-left: 4px solid #6b7e70; border-radius: 4px; margin-bottom: 30px;">
            <tr>
              <td style="padding: 15px 20px;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #506657; font-weight: bold; display: block; margin-bottom: 5px;">Reference ID</span>
                <strong style="font-family: monospace; font-size: 16px; color: ${BRAND_GREEN}; letter-spacing: 1px;">${contact.id}</strong>
              </td>
            </tr>
          </table>

          <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; margin: 0 0 15px 0; color: ${BRAND_GREEN}; border-bottom: 1px solid #e1eae3; padding-bottom: 8px;">
            Customer Profile
          </h3>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px; font-size: 14px;">
            <tr>
              <td width="30%" style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Full Name:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${contact.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Email Address:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;"><a href="mailto:${contact.email}" style="color: ${BRAND_SECONDARY_GREEN};">${contact.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Phone Number:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${contact.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Submitted At:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${new Date(contact.createdAt).toLocaleString('en-US')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Subject:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${contact.subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500; vertical-align: top;">Message:</td>
              <td style="padding: 8px 0; color: #2c3e31; white-space: pre-line;">${contact.message}</td>
            </tr>
          </table>

          <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 10px;">
            <tr>
              <td align="center" style="background-color: ${BRAND_GREEN}; border-radius: 30px;">
                <a href="${process.env.APP_URL || 'https://verdaralandscapes.com'}/#admin" target="_blank" style="display: inline-block; padding: 12px 30px; font-size: 12px; font-weight: bold; color: #ffffff; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;">
                  Open Admin Dashboard
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    ${getFooterHTML()}
  `;
  return wrapLayout(content);
}

export function generateCustomerQuoteConfirmation(quote: QuoteRequest): string {
  const content = `
    ${getHeaderHTML('Design Proposal Estimate')}
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="padding: 40px 30px; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;">
      <tr>
        <td style="color: #2c3e31; font-size: 15px; line-height: 1.6;">
          <p style="margin: 0 0 20px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: normal; color: ${BRAND_GREEN};">
            Dear ${quote.name},
          </p>
          <p style="margin: 0 0 25px 0;">
            Thank you for sharing your project details. We are absolutely thrilled to review your landscape concept. A secure file has been opened for your project with the details outlined below.
          </p>
          
          <!-- Reference ID Badge -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4faf6; border-left: 4px solid ${BRAND_LIGHT_GREEN}; border-radius: 4px; margin-bottom: 30px;">
            <tr>
              <td style="padding: 15px 20px;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #506657; font-weight: bold; display: block; margin-bottom: 5px;">Project Reference ID</span>
                <strong style="font-family: monospace; font-size: 16px; color: ${BRAND_GREEN}; letter-spacing: 1px;">${quote.id}</strong>
              </td>
            </tr>
          </table>

          <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; margin: 0 0 15px 0; color: ${BRAND_GREEN}; border-bottom: 1px solid #e1eae3; padding-bottom: 8px;">
            Project Parameters
          </h3>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px; font-size: 14px;">
            <tr>
              <td width="40%" style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Landscape Typology:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600; text-transform: capitalize;">${quote.projectType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Target Investment Range:</td>
              <td style="padding: 8px 0; color: #0b512c; font-weight: 700;">${quote.budget}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Desired Timeline:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${quote.timeline}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500; vertical-align: top;">Vision & Design Goals:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-style: italic; white-space: pre-line;">"${quote.message || 'No additional message'}"</td>
            </tr>
          </table>

          <p style="margin: 0 0 10px 0;">
            <strong>Next Steps</strong>
          </p>
          <p style="margin: 0 0 30px 0;">
            Our design architects are running initial site zoning and material analysis based on your target investment budget. We will call you within 24 hours to schedule a 30-minute virtual site audit.
          </p>
        </td>
      </tr>
    </table>
    ${getFooterHTML()}
  `;
  return wrapLayout(content);
}

export function generateBusinessQuoteNotification(quote: QuoteRequest): string {
  const content = `
    ${getHeaderHTML('New Project Quote Request')}
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="padding: 40px 30px; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;">
      <tr>
        <td style="color: #2c3e31; font-size: 15px; line-height: 1.6;">
          <p style="margin: 0 0 20px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: normal; color: ${BRAND_GREEN};">
            Hello Verdara Team,
          </p>
          <p style="margin: 0 0 25px 0;">
            A new project estimate request has been received. Run initial architectural assessment on this client profile.
          </p>
          
          <!-- Reference ID Badge -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; border-left: 4px solid #6b7e70; border-radius: 4px; margin-bottom: 30px;">
            <tr>
              <td style="padding: 15px 20px;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #506657; font-weight: bold; display: block; margin-bottom: 5px;">Project Reference ID</span>
                <strong style="font-family: monospace; font-size: 16px; color: ${BRAND_GREEN}; letter-spacing: 1px;">${quote.id}</strong>
              </td>
            </tr>
          </table>

          <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; margin: 0 0 15px 0; color: ${BRAND_GREEN}; border-bottom: 1px solid #e1eae3; padding-bottom: 8px;">
            Client & Project Scope
          </h3>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px; font-size: 14px;">
            <tr>
              <td width="35%" style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Client Name:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${quote.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Email Address:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;"><a href="mailto:${quote.email}" style="color: ${BRAND_SECONDARY_GREEN};">${quote.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Phone Number:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${quote.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Submitted At:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${new Date(quote.createdAt).toLocaleString('en-US')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Landscape Type:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600; text-transform: capitalize;">${quote.projectType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Target Budget:</td>
              <td style="padding: 8px 0; color: #0b512c; font-weight: 700;">${quote.budget}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Project Timeline:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${quote.timeline}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500; vertical-align: top;">Vision Notes:</td>
              <td style="padding: 8px 0; color: #2c3e31; white-space: pre-line;">${quote.message}</td>
            </tr>
          </table>

          <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 10px;">
            <tr>
              <td align="center" style="background-color: ${BRAND_GREEN}; border-radius: 30px;">
                <a href="${process.env.APP_URL || 'https://verdaralandscapes.com'}/#admin" target="_blank" style="display: inline-block; padding: 12px 30px; font-size: 12px; font-weight: bold; color: #ffffff; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;">
                  Review and Approve Estimate
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    ${getFooterHTML()}
  `;
  return wrapLayout(content);
}

export function generateCustomerAppointmentConfirmation(apt: AppointmentBooking): string {
  const content = `
    ${getHeaderHTML('Consultation Booked')}
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="padding: 40px 30px; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;">
      <tr>
        <td style="color: #2c3e31; font-size: 15px; line-height: 1.6;">
          <p style="margin: 0 0 20px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: normal; color: ${BRAND_GREEN};">
            Dear ${apt.name},
          </p>
          <p style="margin: 0 0 25px 0;">
            Your professional landscape design consultation has been successfully scheduled. We look forward to meeting with you to discuss your project vision.
          </p>
          
          <!-- Reference ID Badge -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f4faf6; border-left: 4px solid ${BRAND_LIGHT_GREEN}; border-radius: 4px; margin-bottom: 30px;">
            <tr>
              <td style="padding: 15px 20px;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #506657; font-weight: bold; display: block; margin-bottom: 5px;">Appointment ID</span>
                <strong style="font-family: monospace; font-size: 16px; color: ${BRAND_GREEN}; letter-spacing: 1px;">${apt.id}</strong>
              </td>
            </tr>
          </table>

          <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; margin: 0 0 15px 0; color: ${BRAND_GREEN}; border-bottom: 1px solid #e1eae3; padding-bottom: 8px;">
            Consultation Itinerary
          </h3>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px; font-size: 14px;">
            <tr>
              <td width="35%" style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Service Focus:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${apt.serviceType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Date:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Time Window:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${apt.timeSlot}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500; vertical-align: top;">Design Requests:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-style: italic; white-space: pre-line;">"${apt.message || 'No specific requests logged'}"</td>
            </tr>
          </table>

          <div style="background-color: #fafcfb; border: 1px dashed #bdd4a1; border-radius: 8px; padding: 15px; margin-bottom: 30px; font-size: 13px; color: #506657;">
            <p style="margin: 0 0 5px 0; font-weight: bold; color: ${BRAND_GREEN};">How to Prepare:</p>
            <ul style="margin: 0; padding-left: 20px; line-height: 1.5;">
              <li>Ensure you have photos or design inspirations ready.</li>
              <li>Have your property layout / survey document available if possible.</li>
              <li>We will email you a virtual meeting link 1 hour prior to your slot.</li>
            </ul>
          </div>
        </td>
      </tr>
    </table>
    ${getFooterHTML()}
  `;
  return wrapLayout(content);
}

export function generateBusinessAppointmentNotification(apt: AppointmentBooking): string {
  const content = `
    ${getHeaderHTML('New Consultation Scheduled')}
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="padding: 40px 30px; font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;">
      <tr>
        <td style="color: #2c3e31; font-size: 15px; line-height: 1.6;">
          <p style="margin: 0 0 20px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: normal; color: ${BRAND_GREEN};">
            Hello Verdara Team,
          </p>
          <p style="margin: 0 0 25px 0;">
            A client has booked a new landscape design consultation. Verify availability and sync with primary Google Calendars.
          </p>
          
          <!-- Reference ID Badge -->
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; border-left: 4px solid #6b7e70; border-radius: 4px; margin-bottom: 30px;">
            <tr>
              <td style="padding: 15px 20px;">
                <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #506657; font-weight: bold; display: block; margin-bottom: 5px;">Appointment ID</span>
                <strong style="font-family: monospace; font-size: 16px; color: ${BRAND_GREEN}; letter-spacing: 1px;">${apt.id}</strong>
              </td>
            </tr>
          </table>

          <h3 style="font-family: 'Playfair Display', Georgia, serif; font-size: 16px; margin: 0 0 15px 0; color: ${BRAND_GREEN}; border-bottom: 1px solid #e1eae3; padding-bottom: 8px;">
            Consultation Details
          </h3>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 30px; font-size: 14px;">
            <tr>
              <td width="35%" style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Client Name:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${apt.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Email:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;"><a href="mailto:${apt.email}" style="color: ${BRAND_SECONDARY_GREEN};">${apt.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Phone:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${apt.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Booked At:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${new Date(apt.createdAt).toLocaleString('en-US')}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Service Focus:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${apt.serviceType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Date:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500;">Time Window:</td>
              <td style="padding: 8px 0; color: #2c3e31; font-weight: 600;">${apt.timeSlot}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #6b7e70; font-weight: 500; vertical-align: top;">Notes:</td>
              <td style="padding: 8px 0; color: #2c3e31; white-space: pre-line;">${apt.message}</td>
            </tr>
          </table>

          <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 10px;">
            <tr>
              <td align="center" style="background-color: ${BRAND_GREEN}; border-radius: 30px;">
                <a href="${process.env.APP_URL || 'https://verdaralandscapes.com'}/#admin" target="_blank" style="display: inline-block; padding: 12px 30px; font-size: 12px; font-weight: bold; color: #ffffff; text-decoration: none; text-transform: uppercase; letter-spacing: 0.1em;">
                  Manage Consultation Bookings
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    ${getFooterHTML()}
  `;
  return wrapLayout(content);
}
