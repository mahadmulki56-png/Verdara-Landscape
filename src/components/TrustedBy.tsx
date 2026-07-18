import React from 'react';
import { motion } from 'motion/react';

export const TrustedBy: React.FC = () => {
  // Simple clean mock corporate logos (SVG)
  const logos = [
    {
      name: 'Logoipsum 1',
      svg: (
        <svg className="h-6 opacity-40 hover:opacity-85 transition-opacity text-current" viewBox="0 0 120 32" fill="currentColor">
          <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="16" cy="16" r="4" />
          <text x="36" y="21" fontFamily="sans-serif" fontWeight="bold" fontSize="13" letterSpacing="1">LOGOIPSUM</text>
        </svg>
      )
    },
    {
      name: 'Logoipsum 2',
      svg: (
        <svg className="h-6 opacity-40 hover:opacity-85 transition-opacity text-current" viewBox="0 0 120 32" fill="currentColor">
          <polygon points="6,16 16,6 26,16 16,26" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="13" y="13" width="6" height="6" />
          <text x="36" y="21" fontFamily="sans-serif" fontWeight="bold" fontSize="13" letterSpacing="1">GREENLY</text>
        </svg>
      )
    },
    {
      name: 'Logoipsum 3',
      svg: (
        <svg className="h-6 opacity-40 hover:opacity-85 transition-opacity text-current" viewBox="0 0 120 32" fill="currentColor">
          <path d="M10,8 L22,8 L22,24 L10,24 Z" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M14,12 L18,12 L18,20 L14,20" fill="currentColor" />
          <text x="36" y="21" fontFamily="sans-serif" fontWeight="bold" fontSize="13" letterSpacing="1">ESTATES</text>
        </svg>
      )
    },
    {
      name: 'Logoipsum 4',
      svg: (
        <svg className="h-6 opacity-40 hover:opacity-85 transition-opacity text-current" viewBox="0 0 120 32" fill="currentColor">
          <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" fill="none" />
          <text x="36" y="21" fontFamily="sans-serif" fontWeight="bold" fontSize="13" letterSpacing="1">BOTANIC</text>
        </svg>
      )
    },
    {
      name: 'Logoipsum 5',
      svg: (
        <svg className="h-6 opacity-40 hover:opacity-85 transition-opacity text-current" viewBox="0 0 120 32" fill="currentColor">
          <path d="M6,22 C12,12 20,12 26,22" stroke="currentColor" strokeWidth="3" fill="none" />
          <circle cx="16" cy="10" r="4" />
          <text x="36" y="21" fontFamily="sans-serif" fontWeight="bold" fontSize="13" letterSpacing="1">TERRA</text>
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white py-12 border-b border-[#E3DEC9]" id="trusted-by">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Title */}
        <p className="text-[10px] uppercase tracking-[0.22em] font-bold text-[#6D7870] mb-8 font-sans">
          COMMISSIONED BY DISCERNING PROPERTY OWNERS & ELITE MOUNTAIN ESTATES
        </p>

        {/* Logos Grid */}
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 text-[#1B2A1D]">
          {logos.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center">
              {logo.svg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
