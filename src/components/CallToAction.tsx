import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface CallToActionProps {
  onOpenQuote: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenQuote }) => {
  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden" id="contact">
      {/* Decorative background plants elements */}
      <div className="absolute -left-12 -bottom-12 w-64 h-64 text-white opacity-5 select-none pointer-events-none">
        <svg viewBox="0 0 150 150" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M5 145 C15 100 50 50 145 5" />
          <path d="M30 100 C20 85 22 70 35 75" />
          <path d="M70 60 C58 45 62 30 75 35" />
        </svg>
      </div>
      <div className="absolute -right-12 -top-12 w-64 h-64 text-white opacity-5 select-none pointer-events-none">
        <svg viewBox="0 0 150 150" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M5 145 C15 100 50 50 145 5" />
          <path d="M30 100 C20 85 22 70 35 75" />
          <path d="M70 60 C58 45 62 30 75 35" />
        </svg>
      </div>

      <div className="max-w-[720px] mx-auto px-6 text-center relative z-10">
        {/* Botanical SVG Decoration */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.3, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-8 mx-auto flex justify-center text-white"
        >
          <svg viewBox="0 0 200 80" className="w-48 text-white" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M10 60 C50 40 80 20 150 10" />
            <path d="M60 35 C65 20 78 15 90 22" />
            <path d="M100 22 C108 8 120 6 128 14" />
            <path d="M40 45 C42 30 52 26 62 32" />
          </svg>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="font-serif italic font-semibold text-[clamp(2.4rem,6vw,4.5rem)] leading-tight text-white"
        >
          Ready to transform your garden?
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="text-sm text-white/80 mt-6 max-w-md mx-auto leading-relaxed"
        >
          We take on a limited number of projects each year. Get in touch early to discuss your space.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
          className="mt-10"
        >
          <button
            onClick={onOpenQuote}
            className="h-12 px-10 rounded-full bg-white text-primary text-sm font-semibold hover:opacity-90 transition-opacity inline-flex items-center gap-2 cursor-pointer shadow-md"
          >
            Get a Free Consultation
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
