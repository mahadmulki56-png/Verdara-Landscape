import { Database } from './db';
import { AppointmentBooking } from '../src/types';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

// Convert date (YYYY-MM-DD) and timeSlot (e.g., "09:00 AM") to ISO strings
export function parseDateTimeRange(dateStr: string, timeSlot: string): { start: string; end: string } {
  // Extract hour and AM/PM
  const match = timeSlot.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let hour = 9;
  let minute = 0;

  if (match) {
    hour = parseInt(match[1], 10);
    minute = parseInt(match[2], 10);
    const ampm = match[3].toUpperCase();
    if (ampm === 'PM' && hour < 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
  }

  // Format YYYY-MM-DDTHH:mm:ss in local/admin timezone
  // We'll treat the appointment as being in the local timezone of the consultation
  // Let's assume Cherry Creek, CO (Mountain Time, e.g., America/Denver)
  // Let's create date objects
  const [year, month, day] = dateStr.split('-').map(Number);
  
  // Construct date in local timezone
  const startDate = new Date(year, month - 1, day, hour, minute, 0);
  const endDate = new Date(year, month - 1, day, hour + 1, minute, 0); // Default 1 hour slot

  return {
    start: startDate.toISOString(),
    end: endDate.toISOString(),
  };
}

export class GoogleCalendarService {
  private static getClientIdAndSecret(): { clientId: string; clientSecret: string } | null {
    // Read from env
    const clientId = process.env.GOOGLE_CLIENT_ID || '679739917705-b3vq6231t16nu0oapuve0ke39nhkf6hk.apps.googleusercontent.com';
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientSecret) {
      console.warn('[Calendar] GOOGLE_CLIENT_SECRET is missing. Calendar integration will operate in mock/simulated mode.');
      return null;
    }

    return { clientId, clientSecret };
  }

  // Refreshes the Google OAuth token if it is expired or close to expiry
  static async getValidAccessToken(): Promise<string | null> {
    const auth = Database.getGoogleAuth();
    if (!auth.accessToken) return null;

    // If token is expired or expires in next 5 minutes
    const now = Date.now();
    const expiry = auth.expiryDate || 0;
    
    if (now + 5 * 60 * 1000 < expiry) {
      return auth.accessToken;
    }

    // Attempt to refresh
    if (!auth.refreshToken) {
      console.warn('[Calendar] Google Access Token expired and no Refresh Token is available.');
      return null;
    }

    const creds = this.getClientIdAndSecret();
    if (!creds) {
      console.warn('[Calendar] Missing client credentials to refresh access token.');
      return null;
    }

    try {
      console.log('[Calendar] Google access token expired. Refreshing token...');
      const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: creds.clientId,
          client_secret: creds.clientSecret,
          refresh_token: auth.refreshToken,
          grant_type: 'refresh_token',
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Token refresh failed with status ${response.status}: ${errText}`);
      }

      const tokenData = (await response.json()) as TokenResponse;
      
      const updatedAuth = {
        accessToken: tokenData.access_token,
        refreshToken: auth.refreshToken, // keep the same
        expiryDate: Date.now() + tokenData.expires_in * 1000,
        email: auth.email,
      };

      Database.saveGoogleAuth(updatedAuth);
      console.log('[Calendar] Google OAuth token refreshed successfully.');
      return tokenData.access_token;
    } catch (e) {
      console.error('[Calendar] Error refreshing Google OAuth token:', e);
      return null;
    }
  }

  // Create an event on the administrator's Google Calendar
  static async createEvent(apt: AppointmentBooking): Promise<string | null> {
    const accessToken = await this.getValidAccessToken();
    
    if (!accessToken) {
      console.log('[Calendar] [SIMULATION] Google Calendar is not linked or active. Consultation event simulated on system.');
      return `MOCK-EVENT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    }

    const { start, end } = parseDateTimeRange(apt.date, apt.timeSlot);

    try {
      console.log(`[Calendar] Syncing Appointment ${apt.id} to Google Calendar...`);
      const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: `Verdara Design: ${apt.serviceType} - ${apt.name}`,
          description: `Landscape Design Consultation\n\nReference ID: ${apt.id}\nService Type: ${apt.serviceType}\nClient Phone: ${apt.phone}\nClient Email: ${apt.email}\n\nClient Vision Notes:\n"${apt.message || 'No notes provided'}"\n\n- Powered by Verdara Secure Systems`,
          start: {
            dateTime: start,
            timeZone: 'America/Denver',
          },
          end: {
            dateTime: end,
            timeZone: 'America/Denver',
          },
          attendees: [
            { email: apt.email, displayName: apt.name }
          ],
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'email', minutes: 24 * 60 },
              { method: 'popup', minutes: 30 }
            ]
          }
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error(`[Calendar] Failed to add event to Google Calendar: ${response.status} - ${errText}`);
        return null;
      }

      const eventData = await response.json();
      console.log(`[Calendar] Event successfully added to Google Calendar! EventID: ${eventData.id}`);
      return eventData.id;
    } catch (e) {
      console.error('[Calendar] Exception during calendar sync:', e);
      return null;
    }
  }

  // Remove an event from the administrator's Google Calendar
  static async deleteEvent(eventId: string): Promise<boolean> {
    if (eventId.startsWith('MOCK-EVENT-')) {
      console.log(`[Calendar] [SIMULATION] Deleted simulated Google Calendar event ${eventId}`);
      return true;
    }

    const accessToken = await this.getValidAccessToken();
    if (!accessToken) return false;

    try {
      console.log(`[Calendar] Removing event ${eventId} from Google Calendar...`);
      const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok && response.status !== 404) {
        const errText = await response.text();
        console.error(`[Calendar] Failed to delete event ${eventId}: ${response.status} - ${errText}`);
        return false;
      }

      console.log(`[Calendar] Event ${eventId} successfully deleted from Google Calendar.`);
      return true;
    } catch (e) {
      console.error('[Calendar] Exception during calendar deletion:', e);
      return false;
    }
  }
}
