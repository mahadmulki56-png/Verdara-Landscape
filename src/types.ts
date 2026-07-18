export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  area: string;
  duration: string;
  scope: string;
  description: string;
  image: string;
  year: string;
  badge?: string;
  category: 'formal' | 'contemporary' | 'wildlife' | 'kitchen';
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  stars: number;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  status: 'pending' | 'reviewed' | 'approved' | 'archived';
  createdAt: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'pending' | 'reviewed' | 'replied' | 'archived';
  createdAt: string;
}

export interface AppointmentBooking {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'archived';
  googleEventId?: string;
  createdAt: string;
}

export interface EmailLog {
  id: string;
  to: string;
  subject: string;
  body: string;
  html?: string;
  type: 'customer_confirmation' | 'business_notification';
  sentAt: string;
  success: boolean;
  simulated?: boolean;
  error?: string;
}
