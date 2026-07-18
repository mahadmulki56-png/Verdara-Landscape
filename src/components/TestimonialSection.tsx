import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BotanicalDecoration } from './BotanicalDecoration';
import { TESTIMONIALS } from '../data';

export const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 md:py-32 bg-[#FAF6F0] border-b border-[#E3DEC9]" id="testimonials">
      <div className="max-w-[720px] mx-auto px-6 text-center relative group-container">
        
        {/* Botanical SVG Decoration */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="mb-8 mx-auto flex justify-center text-[#0B6B3A]"
        >
          <BotanicalDecoration className="w-40 text-[#0B6B3A]" />
        </motion.div>

        {/* Big Quote Mark */}
        <span className="font-serif italic text-7xl text-[#0B6B3A] opacity-20 leading-none select-none block h-6">
          “
        </span>

        {/* Interactive Quote Switcher with AnimatePresence */}
        <div className="min-h-[160px] flex items-center justify-center relative px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full"
            >
              <p className="font-serif italic text-2xl md:text-3xl leading-relaxed text-[#0F1A12] mt-2">
                {current.quote}
              </p>
              
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B6B3A] mt-8">
                {current.author} — {current.location}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 p-1.5 rounded-full bg-white hover:bg-white border border-[#E3DEC9] text-[#6D7870] hover:text-[#0F1A12] transition-all cursor-pointer opacity-80 hover:opacity-100 shadow-xs"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 p-1.5 rounded-full bg-white hover:bg-white border border-[#E3DEC9] text-[#6D7870] hover:text-[#0F1A12] transition-all cursor-pointer opacity-80 hover:opacity-100 shadow-xs"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Stars Row */}
        <div className="flex justify-center gap-1 mt-6 text-[#D1A153]">
          {Array.from({ length: current.stars }).map((_, i) => (
            <span key={i} className="text-base">★</span>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-1.5 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-4 bg-[#0B6B3A]' : 'bg-[#E3DEC9] hover:bg-[#6D7870]'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
