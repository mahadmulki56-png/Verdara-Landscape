import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Calendar, CheckCircle, Send, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';
import { FirebaseClientService } from '../lib/firebaseClient';
import { validateAppointment, validateContact } from '../lib/validation';

type ActiveTabType = 'appointment' | 'contact';

export const Consultation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('appointment');

  // Anti-spam honeypot
  const [website, setWebsite] = useState('');

  // 1. Appointment Form State
  const [appointmentForm, setAppointmentForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'Garden Design',
    date: '',
    timeSlot: '09:00 AM',
    message: ''
  });

  // 2. Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Landscape Inquiry',
    message: ''
  });

  // Shared form UI control states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState('');

  // Tab switcher
  const handleTabChange = (tab: ActiveTabType) => {
    setActiveTab(tab);
    setErrorMessage(null);
    setIsSuccess(false);
  };

  // Submit Appointment Booking
  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Validate payload client-side first
    const validation = validateAppointment(appointmentForm);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please fill in all details correctly.');
      setIsSubmitting(false);
      return;
    }

    let apiFailed = false;
    let apiErrorMsg = '';

    try {
      const response = await fetch('/api/submissions/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...appointmentForm,
          website // Honeypot field
        })
      });

      const contentType = response.headers.get('content-type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setReferenceId(data.submission?.id || 'VRD-APT-SUCCESS');
        setIsSuccess(true);
      } else {
        apiFailed = true;
        apiErrorMsg = `Server response status ${response.status}.`;
      }
    } catch (err: any) {
      console.warn('[Appointment API Failed, checking fallback]', err);
      apiFailed = true;
      apiErrorMsg = err.message || '';
    }

    if (apiFailed) {
      try {
        console.log('[Consultation] API unavailable, falling back to direct Firestore transaction...');
        const backupApt = await FirebaseClientService.addAppointmentDirectly({
          ...appointmentForm
        });
        setReferenceId(backupApt.id);
        setIsSuccess(true);
      } catch (fallbackErr: any) {
        console.error('[Appointment Direct Firestore Fallback Failed]', fallbackErr);
        setErrorMessage(
          `Unable to schedule appointment. (API Error: ${apiErrorMsg || 'connection issue'}, Backup DB Error: ${fallbackErr.message || 'permission issue'})`
        );
      }
    }

    setIsSubmitting(false);
  };

  // Submit Contact Form
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Validate payload client-side first
    const validation = validateContact(contactForm);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please fill in all details correctly.');
      setIsSubmitting(false);
      return;
    }

    let apiFailed = false;
    let apiErrorMsg = '';

    try {
      const response = await fetch('/api/submissions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          website // Honeypot field
        })
      });

      const contentType = response.headers.get('content-type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setReferenceId(data.submission?.id || 'VRD-CON-SUCCESS');
        setIsSuccess(true);
      } else {
        apiFailed = true;
        apiErrorMsg = `Server response status ${response.status}.`;
      }
    } catch (err: any) {
      console.warn('[Contact API Failed, checking fallback]', err);
      apiFailed = true;
      apiErrorMsg = err.message || '';
    }

    if (apiFailed) {
      try {
        console.log('[Consultation] API unavailable, falling back to direct Firestore transaction...');
        const backupContact = await FirebaseClientService.addContactDirectly({
          ...contactForm
        });
        setReferenceId(backupContact.id);
        setIsSuccess(true);
      } catch (fallbackErr: any) {
        console.error('[Contact Direct Firestore Fallback Failed]', fallbackErr);
        setErrorMessage(
          `Unable to deliver your message. (API Error: ${apiErrorMsg || 'connection issue'}, Backup DB Error: ${fallbackErr.message || 'permission issue'})`
        );
      }
    }

    setIsSubmitting(false);
  };

  const handleReset = () => {
    setAppointmentForm({
      name: '',
      email: '',
      phone: '',
      serviceType: 'Garden Design',
      date: '',
      timeSlot: '09:00 AM',
      message: ''
    });
    setContactForm({
      name: '',
      email: '',
      phone: '',
      subject: 'General Landscape Inquiry',
      message: ''
    });
    setWebsite('');
    setIsSuccess(false);
    setErrorMessage(null);
    setReferenceId('');
  };

  return (
    <section className="py-24 md:py-32 bg-[#FCFCFA] border-b border-[#E3DEC9]" id="contact">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Information Column */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0B6B3A] mb-4 block">Studio Concierge</span>
            <h2 className="font-serif font-extrabold text-4xl md:text-5xl text-[#0F1A12] leading-[1.1] tracking-tight">
              Landscape Architects Devoted to Your Sanctuary.
            </h2>
            <p className="text-sm text-[#6D7870] mt-4 leading-relaxed font-sans font-light">
              We look forward to helping you design, build, or curate your private outdoor retreat. Fill out the booking concierge, and a dedicated landscape director will reach out to organize a private site assessment.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#0B6B3A] shrink-0 border border-[#E3DEC9]/50">
                <MapPin className="w-5 h-5 text-[#D1A153]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-[#0F1A12]">Our Main Studio</p>
                <p className="text-sm text-[#6D7870] mt-1">742 Evergreen Terrace, Cherry Creek, CO 80206</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#0B6B3A] shrink-0 border border-[#E3DEC9]/50">
                <Phone className="w-5 h-5 text-[#D1A153]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-[#0F1A12]">Direct Line</p>
                <p className="text-sm text-[#6D7870] mt-1">719-528-1531</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#0B6B3A] shrink-0 border border-[#E3DEC9]/50">
                <Mail className="w-5 h-5 text-[#D1A153]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-[#0F1A12]">Direct Email</p>
                <p className="text-sm text-[#6D7870] mt-1">design@verdaralandscapes.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#0B6B3A] shrink-0 border border-[#E3DEC9]/50">
                <Clock className="w-5 h-5 text-[#D1A153]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider font-bold text-[#0F1A12]">Working Hours</p>
                <p className="text-sm text-[#6D7870] mt-1">Mon - Sat: 8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column - Dark Green Container with dual-tabs */}
        <div className="lg:col-span-7 bg-[#0F1A12] rounded-[2.5rem] p-8 md:p-10 text-white shadow-xl relative overflow-hidden border-4 border-white">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          
          <div className="relative z-10">
            {/* Elegant Nature-inspired Tabs */}
            <div className="flex border-b border-white/10 mb-8 p-1 bg-white/5 rounded-full">
              <button
                onClick={() => handleTabChange('appointment')}
                className={`flex-1 py-3 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'appointment'
                    ? 'bg-white text-[#0F1A12] shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Calendar className="w-4 h-4 shrink-0" />
                Schedule Consultation
              </button>
              <button
                onClick={() => handleTabChange('contact')}
                className={`flex-1 py-3 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'contact'
                    ? 'bg-white text-[#0F1A12] shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                General Inquiry
              </button>
            </div>

            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-200 rounded-2xl p-4 mb-6 flex gap-3 text-xs">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                <div>
                  <p className="font-bold">Inquiry Dispatch Error</p>
                  <p className="mt-0.5">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Honeypot field (hidden from screen readers & styling) */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#0B6B3A] text-white flex items-center justify-center mb-6 shadow-lg border border-white/10">
                  <CheckCircle className="w-8 h-8 text-[#D1A153]" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-white mb-2">Request Securely Logged</h4>
                
                <p className="text-xs text-white/70 max-w-sm leading-relaxed mb-6">
                  Thank you, <span className="font-bold text-[#BDD4A1]">{activeTab === 'appointment' ? appointmentForm.name : contactForm.name}</span>. Your request is registered and our concierge team is on standby to assist you.
                </p>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-8 w-full max-w-xs">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-white/50 block mb-1">Confirmation Reference ID</span>
                  <strong className="font-mono text-sm text-[#BDD4A1] tracking-wide">{referenceId}</strong>
                </div>

                <button
                  onClick={handleReset}
                  className="px-8 h-12 rounded-full bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#0B512C] transition-all cursor-pointer shadow-md"
                >
                  Book Another Session
                </button>
              </motion.div>
            ) : activeTab === 'appointment' ? (
              /* TAB 1: APPOINTMENT SCHEDULER */
              <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={appointmentForm.name}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                    placeholder="Eleanor Vance"
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#BDD4A1] focus:border-[#BDD4A1] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={appointmentForm.email}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, email: e.target.value })}
                      placeholder="eleanor@example.com"
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#BDD4A1] focus:border-[#BDD4A1] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={appointmentForm.phone}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                      placeholder="+1 (719) 528-1531"
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#BDD4A1] focus:border-[#BDD4A1] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                    Select Consultation Service
                  </label>
                  <select
                    value={appointmentForm.serviceType}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, serviceType: e.target.value })}
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-[#0F1A12] text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#BDD4A1] focus:border-[#BDD4A1] transition-all"
                  >
                    <option value="Garden Design">Garden Design Consultation</option>
                    <option value="Landscape Architecture">Landscape Architecture Planning</option>
                    <option value="Bronze Lighting systems">Bronze Lighting Consultation</option>
                    <option value="Topiary & Pruning">Topiary & Pruning Directives</option>
                    <option value="Stone & Masonry">Stone & Hardscape Masonry</option>
                    <option value="Smart Irrigation">Smart Irrigation Diagnostics</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={appointmentForm.date}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#BDD4A1] focus:border-[#BDD4A1] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                      Preferred Hour Slot
                    </label>
                    <select
                      value={appointmentForm.timeSlot}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, timeSlot: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-[#0F1A12] text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#BDD4A1] focus:border-[#BDD4A1] transition-all"
                    >
                      <option value="09:00 AM">09:00 AM - 10:00 AM</option>
                      <option value="11:00 AM">11:00 AM - 12:00 PM</option>
                      <option value="02:00 PM">02:00 PM - 03:00 PM</option>
                      <option value="04:00 PM">04:00 PM - 05:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                    Share your design context
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={appointmentForm.message}
                    onChange={(e) => setAppointmentForm({ ...appointmentForm, message: e.target.value })}
                    placeholder="Provide information on your site dimensions, style requirements, specific botanical desires..."
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#BDD4A1] focus:border-[#BDD4A1] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-full bg-[#0B6B3A] hover:bg-[#0B512C] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Locking in consultation...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Book Private Consultation
                    </>
                  )}
                </button>
                
                <p className="text-[9.5px] text-white/50 text-center flex items-center justify-center gap-1 mt-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#BDD4A1]" /> Syncs to Google Calendar instantly on confirmation
                </p>
              </form>
            ) : (
              /* TAB 2: GENERAL CONTACT FORM */
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Eleanor Vance"
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#BDD4A1] focus:border-[#BDD4A1] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="eleanor@example.com"
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#BDD4A1] focus:border-[#BDD4A1] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="+1 (719) 528-1531"
                      className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#BDD4A1] focus:border-[#BDD4A1] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    placeholder="e.g. Garden maintenance proposal, press, careers"
                    className="w-full h-11 px-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#BDD4A1] focus:border-[#BDD4A1] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-white/80 block">
                    Your message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="How can our garden studio help you today?"
                    className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#BDD4A1] focus:border-[#BDD4A1] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-full bg-[#0B6B3A] hover:bg-[#0B512C] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-6"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending message...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Secure Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
