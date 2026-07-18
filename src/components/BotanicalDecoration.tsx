import React from 'react';

interface BotanicalProps {
  className?: string;
  variant?: 'branch' | 'divider' | 'corner';
}

export const BotanicalDecoration: React.FC<BotanicalProps> = ({ className = '', variant = 'branch' }) => {
  if (variant === 'divider') {
    return (
      <svg
        viewBox="0 0 400 100"
        className={`w-72 h-auto opacity-30 text-primary ${className}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
      >
        {/* elegant branch running horizontally */}
        <path d="M20 50 Q100 40 200 50 T380 50" strokeWidth="0.75" />
        {/* leaves sprouting along the curve */}
        <path d="M80 47 C85 30 100 25 110 35" />
        <path d="M80 47 C75 64 60 68 50 58" />
        
        <path d="M160 48 C165 32 180 28 190 38" />
        <path d="M160 48 C155 65 140 70 130 60" />
        
        <path d="M240 49 C245 33 260 29 270 39" />
        <path d="M240 49 C235 66 220 71 210 61" />
        
        <path d="M320 50 C325 34 340 30 350 40" />
      </svg>
    );
  }

  if (variant === 'corner') {
    return (
      <svg
        viewBox="0 0 150 150"
        className={`w-32 h-auto opacity-35 text-primary ${className}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
      >
        {/* elegant branch curving in a corner */}
        <path d="M5 145 C15 100 50 50 145 5" strokeWidth="0.75" />
        {/* beautiful small leaves */}
        <path d="M30 100 C20 85 22 70 35 75" />
        <path d="M30 100 C45 110 50 125 40 120" />
        
        <path d="M70 60 C58 45 62 30 75 35" />
        <path d="M70 60 C82 72 90 85 80 80" />
        
        <path d="M110 30 C100 15 102 5 115 10" />
      </svg>
    );
  }

  // default 'branch' variant
  return (
    <svg
      viewBox="0 0 200 80"
      className={`w-48 opacity-30 text-primary ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M10 60 C50 40 80 20 150 10" strokeWidth="0.75" /> {/* main branch */}
      <path d="M60 35 C65 20 78 15 90 22" />     {/* leaf 1 */}
      <path d="M100 22 C108 8 120 6 128 14" />   {/* leaf 2 */}
      <path d="M40 45 C42 30 52 26 62 32" />     {/* leaf 3 */}
    </svg>
  );
};
