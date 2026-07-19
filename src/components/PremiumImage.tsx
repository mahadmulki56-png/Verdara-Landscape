import React, { useRef, useState, useEffect } from 'react';
import { useImageFocus } from '../context/ImageFocusContext';

interface PremiumImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

export function PremiumImage({ src, alt, className, style, referrerPolicy, onClick, ...props }: PremiumImageProps) {
  const ref = useRef<HTMLImageElement>(null);
  const { focusedImage, setFocusedImage } = useImageFocus();
  const [isCurrentlyFocused, setIsCurrentlyFocused] = useState(false);

  // Generate a unique ID for this instance
  const idRef = useRef<string>(Math.random().toString(36).substr(2, 9));
  const id = idRef.current;

  // Track if this image is focused globally
  const isThisFocusedGlobal = focusedImage?.id === id;

  useEffect(() => {
    if (isThisFocusedGlobal) {
      setIsCurrentlyFocused(true);
    } else {
      if (isCurrentlyFocused) {
        // Wait for the spring exit animation (450ms) to complete before restoring visibility
        const timer = setTimeout(() => {
          setIsCurrentlyFocused(false);
        }, 450);
        return () => clearTimeout(timer);
      }
    }
  }, [isThisFocusedGlobal, isCurrentlyFocused]);

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (onClick) {
      onClick(e);
    }

    if (!ref.current || !src) return;

    // Measure exact screen layout coordinates
    const rect = ref.current.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(ref.current);

    setFocusedImage({
      id,
      src,
      alt: alt || '',
      rect,
      borderRadius: computedStyle.borderRadius,
      objectFit: (computedStyle.objectFit as any) || 'cover',
      className
    });
  };

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      // Keep layout footprint 100% active, but fade out while hovered to let the high-z cloned image take over
      className={`${className || ''} transition-opacity duration-300 ease-in-out ${isCurrentlyFocused ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      onClick={handleClick}
      style={{
        ...style,
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        transform: 'translateZ(0)' // Trigger hardware acceleration
      }}
      referrerPolicy={referrerPolicy || 'no-referrer'}
      {...props}
    />
  );
}
