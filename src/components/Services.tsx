import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

interface ServicesProps {
  onOpenQuote: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuote }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Additional detail for each service to show in the modal
  const serviceDetails: Record<string, { features: string[]; subtitle: string; process: string }> = {
    'garden-design': {
      subtitle: 'Conceptual planning & botanical schemes tailored to your architecture.',
      features: [
        'Site survey and architectural review',
        'Hand-rendered mood boards & material palette curation',
        'Full master plans & dimensional drawings',
        'Bespoke planting schedules & soil health strategies'
      ],
      process: 'We start with an on-site consultation to define your aesthetic. Then we develop conceptual mood boards, moving into detailed landscaping and technical botanical layout plans.'
    },
    'landscape-architecture': {
      subtitle: 'Premium engineering and hardscape features designed for luxury living.',
      features: [
        'Outdoor kitchens & luxury dining zones',
        'Natural stone terraces & geometric paving',
        'Custom minimalist water features & swimming ponds',
        'Integrated architectural lighting design'
      ],
      process: 'Our architecture team collaborates with structural designers to draft precise stonework, levels, electrical routing, and engineering specifications for seamless execution.'
    },
    'seasonal-maintenance': {
      subtitle: 'Discerning year-round care to nurture and protect your investment.',
      features: [
        'Horticultural pruning & fine hand-topiary',
        'Nutrient soil feeding & organic mulching plans',
        'Perennial split-planting & bulb programs',
        'Irrigation auditing & winterization'
      ],
      process: 'Our estate care visits are scheduled to match seasonal demands, ensuring that correct pruning techniques, fertilizing, and specimen care occur at the precise botanical moment.'
    }
  };

  return (
    <section className="py-24 md:py-32 bg-background border-b border-border" id="services">
      <div className="max-w-[1120px] mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-xs font-medium uppercase tracking-[0.2em] text-primary mb-5"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-serif font-semibold text-4xl md:text-5xl text-foreground leading-tight"
          >
            Every outdoor space tells a story.
          </motion.h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: index * 0.1 }}
              viewport={{ once: true, margin: '-60px' }}
              className="rounded-2xl overflow-hidden bg-card border border-border group flex flex-col justify-between"
            >
              {/* Image Top */}
              <div className="h-[240px] overflow-hidden relative">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center cursor-pointer"
                  referrerPolicy="no-referrer"
                  onClick={() => setSelectedService(service)}
                />
              </div>

              {/* Text Bottom */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary mb-3">
                    {service.number}
                  </p>
                  <h3 className="font-serif font-semibold text-2xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedService(service)}
                  className="mt-6 text-sm font-medium text-primary flex items-center gap-1.5 group cursor-pointer self-start"
                >
                  Learn more
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 240 }}
              className="fixed inset-x-4 bottom-4 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 max-w-2xl bg-background border border-border rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[85vh] md:max-h-[90vh]"
            >
              {/* Image banner */}
              <div className="h-48 md:h-64 relative shrink-0">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-black/30" />
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 text-white">
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] opacity-80 block">
                    Service Overview — {selectedService.number}
                  </span>
                  <h4 className="font-serif font-semibold text-2xl md:text-3xl">
                    {selectedService.title}
                  </h4>
                </div>
              </div>

              {/* Scrollable details */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar space-y-6">
                <div>
                  <h5 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                    The Design Philosophy
                  </h5>
                  <p className="text-foreground text-sm leading-relaxed font-serif italic text-lg opacity-90">
                    "{serviceDetails[selectedService.id]?.subtitle}"
                  </p>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <h5 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                    What is Included
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {serviceDetails[selectedService.id]?.features.map((feature, i) => (
                      <li key={i} className="flex gap-2.5 items-start text-xs text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-px bg-border" />

                <div>
                  <h5 className="text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                    Our Engagement Process
                  </h5>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {serviceDetails[selectedService.id]?.process}
                  </p>
                </div>
              </div>

              {/* Bottom CTAs */}
              <div className="p-4 md:p-6 bg-muted/50 border-t border-border flex flex-col sm:flex-row gap-3 items-center justify-between shrink-0">
                <p className="text-xs text-muted-foreground text-center sm:text-left flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary opacity-70" /> Ready to consult on your garden space?
                </p>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setSelectedService(null);
                      onOpenQuote();
                    }}
                    className="w-full sm:w-auto h-9 px-5 rounded-full bg-primary text-white text-xs font-medium hover:opacity-90 transition-opacity whitespace-nowrap cursor-pointer"
                  >
                    Get a Quote
                  </button>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-full sm:w-auto h-9 px-5 rounded-full border border-border text-foreground text-xs font-medium hover:bg-muted transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
