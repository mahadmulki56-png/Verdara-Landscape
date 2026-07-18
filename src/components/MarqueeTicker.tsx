import React from 'react';
import { motion } from 'motion/react';

export const MarqueeTicker: React.FC = () => {
  return (
    <div className="overflow-hidden bg-[#0B6B3A] py-4 select-none relative z-10 shadow-sm" id="marquee-ticker">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="text-[#FAF6F0] font-sans text-xs font-semibold uppercase tracking-[0.22em] pr-12 inline-block shrink-0"
          >
            GARDEN DESIGN &nbsp;·&nbsp; ESTATE CARE &nbsp;·&nbsp; BOTANICAL SCHEMES &nbsp;·&nbsp; LANDSCAPE ARCHITECTURE &nbsp;·&nbsp; HARMONIC PLANTING &nbsp;·&nbsp; OUTDOOR LIVING SANCTUARIES &nbsp;·&nbsp;
          </span>
        ))}
      </motion.div>
    </div>
  );
};
