/**
 * Robust Client and Server Side Validation Helpers 
 * Aligned with firebase-blueprint.json volumetric and structural constraints.
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,10}$/;

export function validateContact(payload: any): ValidationResult {
  console.log('[Payload Trace] [ContactSubmission] Starting validation on payload:', JSON.stringify(payload, null, 2));

  if (!payload) {
    return { isValid: false, error: 'Payload is null or undefined.' };
  }

  const { name, email, phone, subject, message } = payload;

  // 1. Name Checks
  if (typeof name !== 'string' || name.trim().length === 0) {
    return { isValid: false, error: 'Name is required and must be a valid string.' };
  }
  if (name.length > 128) {
    return { isValid: false, error: 'Name exceeds maximum length of 128 characters.' };
  }

  // 2. Email Checks
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'A valid email address is required.' };
  }
  if (email.length > 128) {
    return { isValid: false, error: 'Email exceeds maximum length of 128 characters.' };
  }

  // 3. Phone Checks
  if (phone) {
    if (typeof phone !== 'string') {
      return { isValid: false, error: 'Phone must be a valid string.' };
    }
    if (phone.length > 128) {
      return { isValid: false, error: 'Phone exceeds maximum length of 128 characters.' };
    }
  }

  // 4. Subject Checks
  if (typeof subject !== 'string' || subject.trim().length === 0) {
    return { isValid: false, error: 'Subject is required.' };
  }
  if (subject.length > 128) {
    return { isValid: false, error: 'Subject exceeds maximum length of 128 characters.' };
  }

  // 5. Message Checks
  if (typeof message !== 'string' || message.trim().length === 0) {
    return { isValid: false, error: 'Message body cannot be empty.' };
  }
  if (message.length > 5000) {
    return { isValid: false, error: 'Message exceeds maximum length of 5000 characters.' };
  }

  console.log('[Payload Trace] [ContactSubmission] Passed validation checks.');
  return { isValid: true };
}

export function validateQuote(payload: any): ValidationResult {
  console.log('[Payload Trace] [QuoteRequest] Starting validation on payload:', JSON.stringify(payload, null, 2));

  if (!payload) {
    return { isValid: false, error: 'Payload is null or undefined.' };
  }

  const { name, email, phone, projectType, budget, timeline, message } = payload;

  // 1. Name Checks
  if (typeof name !== 'string' || name.trim().length === 0) {
    return { isValid: false, error: 'Name is required.' };
  }
  if (name.length > 128) {
    return { isValid: false, error: 'Name exceeds maximum length of 128 characters.' };
  }

  // 2. Email Checks
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'A valid email address is required.' };
  }
  if (email.length > 128) {
    return { isValid: false, error: 'Email exceeds maximum length of 128 characters.' };
  }

  // 3. Phone Checks
  if (typeof phone !== 'string' || phone.trim().length === 0) {
    return { isValid: false, error: 'Phone number is required.' };
  }
  if (phone.length > 128) {
    return { isValid: false, error: 'Phone exceeds maximum length of 128 characters.' };
  }

  // 4. Project Type
  if (typeof projectType !== 'string' || projectType.trim().length === 0) {
    return { isValid: false, error: 'Project service type is required.' };
  }
  if (projectType.length > 128) {
    return { isValid: false, error: 'Project Type exceeds maximum length of 128 characters.' };
  }

  // 5. Budget
  if (typeof budget !== 'string' || budget.trim().length === 0) {
    return { isValid: false, error: 'Estimated budget selection is required.' };
  }
  if (budget.length > 128) {
    return { isValid: false, error: 'Budget selection exceeds maximum length of 128 characters.' };
  }

  // 6. Timeline
  if (typeof timeline !== 'string' || timeline.trim().length === 0) {
    return { isValid: false, error: 'Desired timeline is required.' };
  }
  if (timeline.length > 128) {
    return { isValid: false, error: 'Timeline selection exceeds maximum length of 128 characters.' };
  }

  // 7. Message
  if (message) {
    if (typeof message !== 'string') {
      return { isValid: false, error: 'Message must be a string.' };
    }
    if (message.length > 5000) {
      return { isValid: false, error: 'Message exceeds maximum length of 5000 characters.' };
    }
  }

  console.log('[Payload Trace] [QuoteRequest] Passed validation checks.');
  return { isValid: true };
}

export function validateAppointment(payload: any): ValidationResult {
  console.log('[Payload Trace] [AppointmentBooking] Starting validation on payload:', JSON.stringify(payload, null, 2));

  if (!payload) {
    return { isValid: false, error: 'Payload is null or undefined.' };
  }

  const { name, email, phone, serviceType, date, timeSlot, message } = payload;

  // 1. Name Checks
  if (typeof name !== 'string' || name.trim().length === 0) {
    return { isValid: false, error: 'Name is required.' };
  }
  if (name.length > 128) {
    return { isValid: false, error: 'Name exceeds maximum length of 128 characters.' };
  }

  // 2. Email Checks
  if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return { isValid: false, error: 'A valid email address is required.' };
  }
  if (email.length > 128) {
    return { isValid: false, error: 'Email exceeds maximum length of 128 characters.' };
  }

  // 3. Phone Checks
  if (typeof phone !== 'string' || phone.trim().length === 0) {
    return { isValid: false, error: 'Phone number is required.' };
  }
  if (phone.length > 128) {
    return { isValid: false, error: 'Phone exceeds maximum length of 128 characters.' };
  }

  // 4. Service Type
  if (typeof serviceType !== 'string' || serviceType.trim().length === 0) {
    return { isValid: false, error: 'Consultation service type selection is required.' };
  }
  if (serviceType.length > 128) {
    return { isValid: false, error: 'Service Type exceeds maximum length of 128 characters.' };
  }

  // 5. Date
  if (typeof date !== 'string' || date.trim().length === 0) {
    return { isValid: false, error: 'Preferred booking date selection is required.' };
  }
  if (date.length > 128) {
    return { isValid: false, error: 'Date field exceeds maximum length of 128 characters.' };
  }

  // 6. Time Slot
  if (typeof timeSlot !== 'string' || timeSlot.trim().length === 0) {
    return { isValid: false, error: 'Preferred time slot selection is required.' };
  }
  if (timeSlot.length > 128) {
    return { isValid: false, error: 'Time slot selection exceeds maximum length of 128 characters.' };
  }

  // 7. Message
  if (message) {
    if (typeof message !== 'string') {
      return { isValid: false, error: 'Message must be a string.' };
    }
    if (message.length > 5000) {
      return { isValid: false, error: 'Message exceeds maximum length of 5000 characters.' };
    }
  }

  console.log('[Payload Trace] [AppointmentBooking] Passed validation checks.');
  return { isValid: true };
}
