import fs from 'fs';
import path from 'path';
import { ContactSubmission, QuoteRequest, AppointmentBooking, EmailLog } from '../src/types';
import { db, handleFirestoreError, OperationType } from './firebase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

interface DatabaseSchema {
  contacts: ContactSubmission[];
  quotes: QuoteRequest[];
  appointments: AppointmentBooking[];
  emails: EmailLog[];
  googleAuth: {
    accessToken: string | null;
    refreshToken: string | null;
    expiryDate: number | null;
    email: string | null;
  };
}

const DB_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

const INITIAL_DB: DatabaseSchema = {
  contacts: [],
  quotes: [],
  appointments: [],
  emails: [],
  googleAuth: {
    accessToken: null,
    refreshToken: null,
    expiryDate: null,
    email: null
  }
};

// Safe, atomic JSON Database for AI Studio runtime environment
export class Database {
  private static init() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DB, null, 2), 'utf-8');
    }
  }

  static read(): DatabaseSchema {
    this.init();
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      console.error('Error reading database file, returning default:', e);
      return INITIAL_DB;
    }
  }

  static write(data: DatabaseSchema) {
    this.init();
    try {
      // Write to temporary file first, then rename for atomic safety
      const tempFile = `${DB_FILE}.tmp`;
      fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (e) {
      console.error('Error writing to database file:', e);
    }
  }

  // ID generators
  static generateId(prefix: 'CON' | 'QTE' | 'APT'): string {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 digit random
    const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, ''); // YYMMDD
    return `VRD-${prefix}-${dateStr}-${randomNum}`;
  }

  // Contacts
  static getContacts(): ContactSubmission[] {
    return this.read().contacts;
  }

  static addContact(contact: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>): ContactSubmission {
    const dbData = this.read();
    const newContact: ContactSubmission = {
      ...contact,
      id: this.generateId('CON'),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    dbData.contacts.unshift(newContact);
    this.write(dbData);

    // Save to Firestore asynchronously
    setDoc(doc(db, 'contacts', newContact.id), newContact)
      .then(() => console.log(`[Firestore] Contact ${newContact.id} saved successfully.`))
      .catch((err) => handleFirestoreError(err, OperationType.WRITE, `contacts/${newContact.id}`));

    return newContact;
  }

  static updateContactStatus(id: string, status: ContactSubmission['status']): ContactSubmission | null {
    const dbData = this.read();
    const index = dbData.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      dbData.contacts[index].status = status;
      this.write(dbData);

      // Save to Firestore asynchronously
      updateDoc(doc(db, 'contacts', id), { status })
        .then(() => console.log(`[Firestore] Contact ${id} status updated to ${status}.`))
        .catch((err) => handleFirestoreError(err, OperationType.UPDATE, `contacts/${id}`));

      return dbData.contacts[index];
    }
    return null;
  }

  // Quotes
  static getQuotes(): QuoteRequest[] {
    return this.read().quotes;
  }

  static addQuote(quote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): QuoteRequest {
    const dbData = this.read();
    const newQuote: QuoteRequest = {
      ...quote,
      id: this.generateId('QTE'),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    dbData.quotes.unshift(newQuote);
    this.write(dbData);

    // Save to Firestore asynchronously
    setDoc(doc(db, 'quotes', newQuote.id), newQuote)
      .then(() => console.log(`[Firestore] Quote ${newQuote.id} saved successfully.`))
      .catch((err) => handleFirestoreError(err, OperationType.WRITE, `quotes/${newQuote.id}`));

    return newQuote;
  }

  static updateQuoteStatus(id: string, status: QuoteRequest['status']): QuoteRequest | null {
    const dbData = this.read();
    const index = dbData.quotes.findIndex(q => q.id === id);
    if (index !== -1) {
      dbData.quotes[index].status = status;
      this.write(dbData);

      // Save to Firestore asynchronously
      updateDoc(doc(db, 'quotes', id), { status })
        .then(() => console.log(`[Firestore] Quote ${id} status updated to ${status}.`))
        .catch((err) => handleFirestoreError(err, OperationType.UPDATE, `quotes/${id}`));

      return dbData.quotes[index];
    }
    return null;
  }

  // Appointments
  static getAppointments(): AppointmentBooking[] {
    return this.read().appointments;
  }

  static addAppointment(apt: Omit<AppointmentBooking, 'id' | 'createdAt' | 'status'>): AppointmentBooking {
    const dbData = this.read();
    const newApt: AppointmentBooking = {
      ...apt,
      id: this.generateId('APT'),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    dbData.appointments.unshift(newApt);
    this.write(dbData);

    // Save to Firestore asynchronously
    setDoc(doc(db, 'appointments', newApt.id), newApt)
      .then(() => console.log(`[Firestore] Appointment ${newApt.id} saved successfully.`))
      .catch((err) => handleFirestoreError(err, OperationType.WRITE, `appointments/${newApt.id}`));

    return newApt;
  }

  static updateAppointment(id: string, updates: Partial<AppointmentBooking>): AppointmentBooking | null {
    const dbData = this.read();
    const index = dbData.appointments.findIndex(a => a.id === id);
    if (index !== -1) {
      dbData.appointments[index] = { ...dbData.appointments[index], ...updates };
      this.write(dbData);

      // Save to Firestore asynchronously
      const validUpdates: any = {};
      if (updates.status !== undefined) validUpdates.status = updates.status;
      if (updates.googleEventId !== undefined) validUpdates.googleEventId = updates.googleEventId;

      if (Object.keys(validUpdates).length > 0) {
        updateDoc(doc(db, 'appointments', id), validUpdates)
          .then(() => console.log(`[Firestore] Appointment ${id} successfully synchronized with Google/Status updates.`))
          .catch((err) => handleFirestoreError(err, OperationType.UPDATE, `appointments/${id}`));
      }

      return dbData.appointments[index];
    }
    return null;
  }

  // Emails Outbox Logs
  static getEmails(): EmailLog[] {
    return this.read().emails;
  }

  static logEmail(email: Omit<EmailLog, 'id' | 'sentAt'>): EmailLog {
    const dbData = this.read();
    const newLog: EmailLog = {
      ...email,
      id: `EML-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      sentAt: new Date().toISOString()
    };
    dbData.emails.unshift(newLog);
    // Keep log size reasonable (e.g., last 200 emails)
    if (dbData.emails.length > 200) {
      dbData.emails = dbData.emails.slice(0, 200);
    }
    this.write(dbData);

    // Save to Firestore asynchronously
    setDoc(doc(db, 'emails', newLog.id), newLog)
      .then(() => console.log(`[Firestore] Email Log ${newLog.id} saved successfully.`))
      .catch((err) => handleFirestoreError(err, OperationType.WRITE, `emails/${newLog.id}`));

    return newLog;
  }

  // Google OAuth Storage
  static getGoogleAuth() {
    return this.read().googleAuth;
  }

  static saveGoogleAuth(auth: DatabaseSchema['googleAuth']) {
    const db = this.read();
    db.googleAuth = auth;
    this.write(db);
  }

  static clearGoogleAuth() {
    const db = this.read();
    db.googleAuth = {
      accessToken: null,
      refreshToken: null,
      expiryDate: null,
      email: null
    };
    this.write(db);
  }
}
