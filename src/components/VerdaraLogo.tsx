import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  lightMode?: boolean;
  iconSize?: number;
}

export const VerdaraLogo: React.FC<LogoProps> = ({
  className = '',
  iconOnly = false,
  lightMode = false,
  iconSize = 44,
}) => {
  const brandGreen = '#0B6B3A';
  const brandDarkGreen = '#0B512C';
  const brandLightGreen = '#8ABF69';
  const brandBeige = '#BDD4A1';
  const brandGold = '#D1A153';
  const brandSand = '#D4B27C';
  
  // Custom theme colors for dark background vs light background
  const textPrimary = lightMode ? '#FFFFFF' : '#1D3D27';
  const textSecondary = lightMode ? 'rgba(255, 255, 255, 0.7)' : '#5A6E5F';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Crisp Custom Recreated SVG Icon matching the image */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 filter drop-shadow-sm transition-transform hover:scale-105 duration-300"
      >
        {/* Background tree silhouette (Left side) */}
        <path
          d="M48 24C32 24 20 34 20 48C20 54 22.5 59.5 27 63.5C24.5 67 23 71.5 23 76C23 88 33 97.5 45 97.5C47.5 97.5 49.5 97 51.5 96C55.5 101.5 62 105 69.5 105C81.5 105 91 95.5 91 84C91 83 91 82 90.5 81C92.5 80 94 78 95 75.5C98.5 70.5 100.5 64.5 100.5 58C100.5 41 87.5 27 71.5 27C67 27 62.5 28 58.5 30C55 26.5 51.5 24 48 24Z"
          fill="#0B512C"
          className="opacity-90"
        />

        {/* Leaf Background fill for sun rays/land */}
        <path
          d="M26 84.5C25.5 48.5 47.5 28 85.5 28C85.5 41.5 85.5 63.5 85.5 84.5C65.5 84.5 45.5 84.5 26 84.5Z"
          fill="#EBF0EB"
        />

        {/* Sun rays fields background */}
        <path
          d="M85.5 28C85.5 41.5 85.5 63.5 85.5 84.5C65.5 84.5 45.5 84.5 26 84.5C25.5 48.5 47.5 28 85.5 28Z"
          fill="#FAF6F0"
        />

        {/* Field sections (light green and dark green sectors) */}
        {/* Upper segment (under sun) */}
        <path
          d="M26.5 75C31.5 51.5 50.5 37.5 85.5 28C73.5 48 64.5 55.5 26.5 75Z"
          fill="#BDD4A1"
        />
        <path
          d="M27.5 78C40 60 62 48.5 85.5 28C82 48 71.5 62.5 27.5 78Z"
          fill="#468F5B"
        />

        {/* Winding golden pathway/river through fields */}
        <path
          d="M85.5 28C85.5 35 78.5 40 76.5 44C73.5 50 78 54 74 61C71 66.5 60.5 68.5 54 75C46 83 34.5 84 26 84.5C26.5 82.5 28.5 81.5 30.5 80C34.5 77 39 76 43 73.5C49.5 69.5 50.5 64 54 60C57.5 56 61.5 52 64.5 46.5C68.5 39 70 33 85.5 28Z"
          fill="#D4B27C"
        />

        {/* Rising Sun and Rays (Gold) */}
        <path
          d="M85.5 28C78.5 28 73 33.5 73 40.5C73 43.5 74 46.5 76 48.5C80 44.5 83 37.5 85.5 28Z"
          fill="#D1A153"
        />
        {/* Small sun ray beams */}
        <path d="M70 47.5L64.5 50.5M74.5 56L71.5 60.5M80.5 61.5L79.5 67" stroke="#D1A153" strokeWidth="2.5" strokeLinecap="round" />

        {/* Beautiful leaf outline (Outer frame) */}
        <path
          d="M85.5 28C85.5 28 47.5 28 26.5 84.5C26.5 84.5 62.5 84.5 85.5 84.5V28Z"
          stroke="#0B6B3A"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Vein curve/stem divide */}
        <path
          d="M26.5 84.5C42.5 74.5 66.5 58.5 85.5 28"
          stroke="#0B6B3A"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand typography matching the image exactly */}
      {!iconOnly && (
        <div className="flex flex-col">
          <div className="flex items-baseline font-serif">
            {/* Styled V with a custom leaf look */}
            <span
              className="text-2xl font-extrabold tracking-tight"
              style={{ color: textPrimary, fontFamily: '"Manrope", sans-serif' }}
            >
              VERDARA
            </span>
          </div>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.25em] -mt-1"
            style={{ color: textSecondary, fontFamily: '"Inter", sans-serif' }}
          >
            LANDSCAPES
          </span>
        </div>
      )}
    </div>
  );
};
