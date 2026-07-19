import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Send, Sparkles, AlertCircle } from 'lucide-react';
import { QuoteRequest } from '../types';
import { FirebaseClientService } from '../lib/firebaseClient';
import { validateQuote } from '../lib/validation';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteDrawer: React.FC<QuoteDrawerProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>>({
    name: '',
    email: '',
    phone: '',
    projectType: 'Garden Design',
    budget: '$15k – $30k',
    message: '',
    timeline: 'Within 3-6 months'
  });

  // Load estimate details from localStorage if present
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('verdara_active_estimate');
        if (stored) {
          const est = JSON.parse(stored);
          const ageMs = Date.now() - new Date(est.timestamp).getTime();
          if (ageMs < 3600 * 1000) {
            let matchingBudget = '$15k – $30k';
            if (est.calculatedPrice < 15000) {
              matchingBudget = 'Under $15k';
            } else if (est.calculatedPrice < 30000) {
              matchingBudget = '$15k – $30k';
            } else if (est.calculatedPrice < 75000) {
              matchingBudget = '$30k – $75k';
            } else {
              matchingBudget = '$75k+';
            }

            const activeExtras: string[] = [];
            if (est.extras?.weedControl) activeExtras.push('Eco-Weed Curation');
            if (est.extras?.soilFeed) activeExtras.push('Organic Nutrient Infusion');
            if (est.extras?.aeration) activeExtras.push('Surgical Core Aeration');
            if (est.extras?.overseeding) activeExtras.push('Premium Specimen Seeding');
            if (est.extras?.trimming) activeExtras.push('Fine Topiary Sculpting');

            const extraList = activeExtras.length > 0 ? ` with programs: ${activeExtras.join(', ')}` : '';

            const extraMessage = `Automated Estimate Applied: $${est.calculatedPrice.toLocaleString()} for a ${est.lawnSize.toLocaleString()} sq ft property area on a ${est.frequency} frequency basis${extraList}.`;
            setFormData(prev => ({
              ...prev,
              projectType: 'Seasonal Maintenance',
              budget: matchingBudget,
              message: prev.message || extraMessage
            }));
            
            localStorage.removeItem('verdara_active_estimate');
          }
        }
      } catch (e) {
        console.error('Failed to parse active estimate', e);
      }
    }
  }, [isOpen]);

  // Anti-spam honeypot
  const [website, setWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Validate payload client-side first
    const validation = validateQuote(formData);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Please fill in all details correctly.');
      setIsSubmitting(false);
      return;
    }

    let apiFailed = false;
    let apiErrorMsg = '';

    try {
      const response = await fetch('/api/submissions/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          website // Honeypot field
        })
      });

      const contentType = response.headers.get('content-type');
      if (response.ok && contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setReferenceId(data.submission?.id || 'VRD-QTE-SUCCESS');
        setIsSuccess(true);
      } else {
        apiFailed = true;
        apiErrorMsg = `Server response status ${response.status}.`;
      }
    } catch (err: any) {
      console.warn('[Quote API Failed, checking fallback]', err);
      apiFailed = true;
      apiErrorMsg = err.message || '';
    }

    if (apiFailed) {
      try {
        console.log('[QuoteDrawer] API unavailable, falling back to direct Firestore transaction...');
        const backupQuote = await FirebaseClientService.addQuoteDirectly({
          ...formData
        });
        setReferenceId(backupQuote.id);
        setIsSuccess(true);
      } catch (fallbackErr: any) {
        console.error('[Quote Direct Firestore Fallback Failed]', fallbackErr);
        setErrorMessage(
          `Unable to submit quote request. (API Error: ${apiErrorMsg || 'connection issue'}, Backup DB Error: ${fallbackErr.message || 'permission issue'})`
        );
      }
    }

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: 'Garden Design',
      budget: '$15k – $30k',
      message: '',
      timeline: 'Within 3-6 months'
    });
    setWebsite('');
    setIsSuccess(false);
    setErrorMessage(null);
    setReferenceId('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-xs"
            id="quote-overlay"
          />

          {/* Drawer container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 w-full md:max-w-md bg-background border-l border-border z-50 flex flex-col shadow-2xl"
            id="quote-drawer"
          >
            {/* Header */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">Inquiry Form</span>
                <h2 className="font-serif font-semibold text-2xl text-foreground">Begin Your Journey</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                id="close-quote-drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif font-semibold text-2xl text-foreground mb-3">Thank you, {formData.name.split(' ')[0]}</h3>
                  <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
                    We have successfully registered your landscape request and generated your secure file. Our studio Lead Architect will review your design vision.
                  </p>

                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-8 w-full max-w-xs">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground block mb-1">Project Reference ID</span>
                    <strong className="font-mono text-sm text-primary tracking-wide">{referenceId}</strong>
                  </div>

                  <button
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                    className="h-10 px-6 rounded-full bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    Close Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex gap-3 text-xs text-destructive">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <div>
                        <p className="font-bold">Submission Failed</p>
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

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="eleanor@example.com"
                        className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (719) 528-1531"
                        className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block">
                      Scope of Interest
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    >
                      <option value="Garden Design">Garden Design</option>
                      <option value="Landscape Architecture">Landscape Architecture</option>
                      <option value="Seasonal Maintenance">Seasonal Maintenance</option>
                      <option value="Water Feature & Stonework">Water Feature & Stonework</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      >
                        <option value="Under $15k">Under $15k</option>
                        <option value="$15k – $30k">$15k – $30k</option>
                        <option value="$30k – $75k">$30k – $75k</option>
                        <option value="$75k+">$75k+</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block">
                        Desired Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full h-11 px-4 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                      >
                        <option value="Immediate">Immediate</option>
                        <option value="Within 3-6 months">Within 3-6 months</option>
                        <option value="Next season">Next season</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block">
                      Tell us about your space
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      placeholder="Please describe your garden's current condition, size, and your vision..."
                      className="w-full p-4 rounded-xl border border-border bg-card text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 rounded-full bg-primary text-white text-sm font-medium hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Securing Details...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Design Request
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-muted border-t border-border text-center">
              <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-primary opacity-60" /> Custom garden consultations are strictly confidential
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
