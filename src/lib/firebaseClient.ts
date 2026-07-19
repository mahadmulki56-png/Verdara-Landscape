import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  getDocs, 
  getDoc,
  query, 
  orderBy,
  limit 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { AppointmentBooking, ContactSubmission, QuoteRequest, EmailLog } from '../types';
import { validateAppointment, validateContact, validateQuote } from './validation';

// Safely initialize client-side Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const clientDb = getFirestore(app);

// Helper to generate IDs client-side identical to server-side
export function generateClientId(prefix: 'CON' | 'QTE' | 'APT'): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 digit random
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, ''); // YYMMDD
  return `VRD-${prefix}-${dateStr}-${randomNum}`;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const auth = getAuth(app);
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path,
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email || null,
      })) || []
    }
  };
  console.error('[Firestore Client Error Handled]:', JSON.stringify(errInfo, null, 2));
  throw new Error(JSON.stringify(errInfo));
}

// Client-side Direct Fallbacks
export class FirebaseClientService {
  static async addAppointmentDirectly(apt: Omit<AppointmentBooking, 'id' | 'createdAt' | 'status'>): Promise<AppointmentBooking> {
    console.log('[FirebaseClient] Preparing Direct Appointment Booking write transaction.');
    
    // 1. Validation Check
    const validation = validateAppointment(apt);
    if (!validation.isValid) {
      console.error('[FirebaseClient] Validation Failed for Direct Appointment:', validation.error);
      throw new Error(`Validation Error: ${validation.error}`);
    }

    const id = generateClientId('APT');
    const newApt: AppointmentBooking = {
      ...apt,
      id,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    console.log(`[FirebaseClient] Writing appointment payload [ID: ${id}] to Firestore directly:`, JSON.stringify(newApt, null, 2));
    const docRef = doc(clientDb, 'appointments', id);
    try {
      await setDoc(docRef, newApt);
      console.log('[FirebaseClient] Successfully wrote Appointment to Firestore:', id);
      return newApt;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `appointments/${id}`);
      throw err; // keep ts happy
    }
  }

  static async addContactDirectly(contact: Omit<ContactSubmission, 'id' | 'createdAt' | 'status'>): Promise<ContactSubmission> {
    console.log('[FirebaseClient] Preparing Direct Contact Submission write transaction.');

    // 1. Validation Check
    const validation = validateContact(contact);
    if (!validation.isValid) {
      console.error('[FirebaseClient] Validation Failed for Direct Contact Submission:', validation.error);
      throw new Error(`Validation Error: ${validation.error}`);
    }

    const id = generateClientId('CON');
    const newContact: ContactSubmission = {
      ...contact,
      id,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    console.log(`[FirebaseClient] Writing contact payload [ID: ${id}] to Firestore directly:`, JSON.stringify(newContact, null, 2));
    const docRef = doc(clientDb, 'contacts', id);
    try {
      await setDoc(docRef, newContact);
      console.log('[FirebaseClient] Successfully wrote Contact Submission to Firestore:', id);
      return newContact;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `contacts/${id}`);
      throw err;
    }
  }

  static async addQuoteDirectly(quote: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>): Promise<QuoteRequest> {
    console.log('[FirebaseClient] Preparing Direct Quote Request write transaction.');

    // 1. Validation Check
    const validation = validateQuote(quote);
    if (!validation.isValid) {
      console.error('[FirebaseClient] Validation Failed for Direct Quote Request:', validation.error);
      throw new Error(`Validation Error: ${validation.error}`);
    }

    const id = generateClientId('QTE');
    const newQuote: QuoteRequest = {
      ...quote,
      id,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    console.log(`[FirebaseClient] Writing quote request payload [ID: ${id}] to Firestore directly:`, JSON.stringify(newQuote, null, 2));
    const docRef = doc(clientDb, 'quotes', id);
    try {
      await setDoc(docRef, newQuote);
      console.log('[FirebaseClient] Successfully wrote Quote Request to Firestore:', id);
      return newQuote;
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `quotes/${id}`);
      throw err;
    }
  }

  // Admin fallbacks to load data directly from Firestore
  static async getAppointmentsDirectly(): Promise<AppointmentBooking[]> {
    console.log('[FirebaseClient] Reading Appointments directly from Firestore.');
    try {
      const q = query(collection(clientDb, 'appointments'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => doc.data() as AppointmentBooking);
      console.log(`[FirebaseClient] Read ${results.length} Appointments successfully.`);
      return results;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'appointments');
      throw err;
    }
  }

  static async getQuotesDirectly(): Promise<QuoteRequest[]> {
    console.log('[FirebaseClient] Reading Quotes directly from Firestore.');
    try {
      const q = query(collection(clientDb, 'quotes'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => doc.data() as QuoteRequest);
      console.log(`[FirebaseClient] Read ${results.length} Quotes successfully.`);
      return results;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'quotes');
      throw err;
    }
  }

  static async getContactsDirectly(): Promise<ContactSubmission[]> {
    console.log('[FirebaseClient] Reading Contacts directly from Firestore.');
    try {
      const q = query(collection(clientDb, 'contacts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => doc.data() as ContactSubmission);
      console.log(`[FirebaseClient] Read ${results.length} Contacts successfully.`);
      return results;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'contacts');
      throw err;
    }
  }

  static async getEmailsDirectly(): Promise<EmailLog[]> {
    console.log('[FirebaseClient] Reading Emails directly from Firestore.');
    try {
      const q = query(collection(clientDb, 'emails'), orderBy('sentAt', 'desc'), limit(100));
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map(doc => doc.data() as EmailLog);
      console.log(`[FirebaseClient] Read ${results.length} Emails successfully.`);
      return results;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'emails');
      throw err;
    }
  }

  static async updateContactStatusDirectly(id: string, status: ContactSubmission['status']): Promise<void> {
    console.log(`[FirebaseClient] Direct update contact [ID: ${id}] status to: ${status}`);
    const docRef = doc(clientDb, 'contacts', id);
    try {
      await updateDoc(docRef, { status });
      console.log(`[FirebaseClient] Direct contact status update succeeded.`);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `contacts/${id}`);
      throw err;
    }
  }

  static async updateQuoteStatusDirectly(id: string, status: QuoteRequest['status']): Promise<void> {
    console.log(`[FirebaseClient] Direct update quote [ID: ${id}] status to: ${status}`);
    const docRef = doc(clientDb, 'quotes', id);
    try {
      await updateDoc(docRef, { status });
      console.log(`[FirebaseClient] Direct quote status update succeeded.`);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `quotes/${id}`);
      throw err;
    }
  }

  static async updateAppointmentDirectly(id: string, updates: Partial<AppointmentBooking>): Promise<void> {
    console.log(`[FirebaseClient] Direct update appointment [ID: ${id}] with updates:`, JSON.stringify(updates, null, 2));
    const docRef = doc(clientDb, 'appointments', id);
    try {
      await updateDoc(docRef, updates);
      console.log(`[FirebaseClient] Direct appointment update succeeded.`);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `appointments/${id}`);
      throw err;
    }
  }
}
