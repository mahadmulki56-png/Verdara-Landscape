import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { useImageFocus } from '../context/ImageFocusContext';

export function PremiumHoverOverlay() {
  const { focusedImage, setFocusedImage } = useImageFocus();
  const shouldReduceMotion = useReducedMotion();

  // Create spring values for the 3D tilt
  const tiltXInput = useMotionValue(0);
  const tiltYInput = useMotionValue(0);

  const tiltX = useSpring(tiltXInput, { damping: 30, stiffness: 200 });
  const tiltY = useSpring(tiltYInput, { damping: 30, stiffness: 200 });

  // Reset tilt on exit or mount change
  useEffect(() => {
    tiltXInput.set(0);
    tiltYInput.set(0);
  }, [focusedImage, tiltXInput, tiltYInput]);

  // Capture current state if focusedImage exists
  const rect = focusedImage?.rect;
  const src = focusedImage?.src;
  const alt = focusedImage?.alt;
  const borderRadius = focusedImage?.borderRadius;
  const objectFit = focusedImage?.objectFit;

  // GPU-accelerated coordinate centering calculations
  let targetX = 0;
  let targetY = 0;
  let targetScale = 1;

  if (rect) {
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;
    
    const imgCenterX = rect.left + rect.width / 2;
    const imgCenterY = rect.top + rect.height / 2;
    
    const viewportCenterX = viewportW / 2;
    const viewportCenterY = viewportH / 2;

    targetX = viewportCenterX - imgCenterX;
    targetY = viewportCenterY - imgCenterY;

    // Scale to take up ~75% of viewport size, keeping aspect ratio
    const scaleX = (viewportW * 0.75) / rect.width;
    const scaleY = (viewportH * 0.75) / rect.height;
    targetScale = Math.max(Math.min(scaleX, scaleY, 4), 1.15);
  }

  const handleMouseLeave = () => {
    tiltXInput.set(0);
    tiltYInput.set(0);
    setFocusedImage(null);
  };

  return (
    <AnimatePresence>
      {focusedImage && rect && src && (
        <div className="fixed inset-0 z-[999] pointer-events-auto overflow-hidden">
          {/* Backdrop Spotlight Overlay with a deeper blurred premium backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 bg-[#070b08]/30 backdrop-blur-[6px]"
            onClick={handleMouseLeave}
          />

          {/* Floating Image Container */}
          <motion.div
            key={focusedImage.id}
            initial={{
              scale: 1,
              x: 0,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              borderRadius: borderRadius || '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            }}
            animate={{
              scale: shouldReduceMotion ? 1.08 : targetScale,
              x: shouldReduceMotion ? 0 : targetX,
              y: shouldReduceMotion ? 0 : targetY,
              rotateX: shouldReduceMotion ? 0 : tiltX,
              rotateY: shouldReduceMotion ? 0 : tiltY,
              borderRadius: '24px', // Premium, subtle rounded-3xl smooth corners specifically when centered
              boxShadow: '0 30px 70px -15px rgba(11, 40, 20, 0.5), 0 0 50px rgba(11, 107, 58, 0.3)',
            }}
            exit={{
              scale: 1,
              x: 0,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              borderRadius: borderRadius || '24px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
            }}
            transition={{
              type: 'spring',
              damping: 25,     // Perfect spring dampening as requested
              stiffness: 150,  // Stiff enough to be fluid and snappy as requested
              mass: 0.9
            }}
            style={{
              position: 'absolute',
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              perspective: '1200px',
              transformStyle: 'preserve-3d',
              cursor: 'zoom-out',
              overflow: 'hidden',
              WebkitMaskImage: '-webkit-radial-gradient(white, black)',
              maskImage: 'radial-gradient(white, black)',
              transformOrigin: 'center center',
            }}
            onMouseMove={(e) => {
              if (shouldReduceMotion) return;
              const container = e.currentTarget;
              const bounding = container.getBoundingClientRect();
              const mouseX = e.clientX - bounding.left;
              const mouseY = e.clientY - bounding.top;
              const normX = (mouseX / bounding.width) * 2 - 1;
              const normY = (mouseY / bounding.height) * 2 - 1;
              const maxTilt = 4.5;
              tiltXInput.set(-normY * maxTilt);
              tiltYInput.set(normX * maxTilt);
            }}
            onClick={handleMouseLeave}
            className="will-change-transform select-none"
          >
            {/* Spotlight reflections effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 mix-blend-overlay pointer-events-none z-10" />

            {/* Render the sharp cloned image inside */}
            <img
              src={src}
              alt={alt}
              style={{
                width: '100%',
                height: '100%',
                objectFit: objectFit || 'cover',
                objectPosition: 'center',
                borderRadius: 'inherit'
              }}
              referrerPolicy="no-referrer"
              className="pointer-events-none select-none"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
