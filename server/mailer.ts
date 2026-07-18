import nodemailer from 'nodemailer';
import { Database } from './db';
import { EmailLog } from '../src/types';

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && port && user && pass) {
    console.log(`[Mailer] SMTP Configuration detected. Connecting to ${host}:${port}...`);
    transporter = nodemailer.createTransport({
      host,
      port: parseInt(port, 10),
      secure: parseInt(port, 10) === 465, // true for 465, false for other ports
      auth: {
        user,
        pass,
      },
    });
    return transporter;
  }

  return null;
}

export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  type: EmailLog['type'];
}): Promise<{ success: boolean; error?: string }> {
  const mailOptions = {
    from: process.env.SMTP_FROM || '"Verdara Landscape Studio" <no-reply@verdaralandscapes.com>',
    to: params.to,
    subject: params.subject,
    html: params.html,
  };

  try {
    const activeTransporter = getTransporter();

    if (activeTransporter) {
      // Send real email via configured SMTP server
      const info = await activeTransporter.sendMail(mailOptions);
      console.log(`[Mailer] Real email successfully sent to ${params.to}. MessageID: ${info.messageId}`);
      
      // Log to database
      Database.logEmail({
        to: params.to,
        subject: params.subject,
        body: params.html,
        type: params.type,
        success: true
      });

      return { success: true };
    } else {
      // SMTP not configured - simulate sending and log to DB for Admin Preview
      console.log(`[Mailer] [SIMULATION] No SMTP variables found. Email would have been sent to: ${params.to}`);
      console.log(`[Mailer] [SIMULATION] Subject: ${params.subject}`);
      console.log(`[Mailer] [SIMULATION] Saving fully branded HTML to the database outbox for Admin Panel view...`);

      Database.logEmail({
        to: params.to,
        subject: params.subject,
        body: params.html,
        type: params.type,
        success: true,
        error: 'SIMULATED: Setup SMTP_HOST in settings to send actual emails.'
      });

      return { success: true };
    }
  } catch (err: any) {
    console.error(`[Mailer] Failed to transmit email to ${params.to}:`, err);
    
    // Log failed email attempt
    Database.logEmail({
      to: params.to,
      subject: params.subject,
      body: params.html,
      type: params.type,
      success: false,
      error: err.message || 'Unknown SMTP error'
    });

    return { success: false, error: err.message };
  }
}
