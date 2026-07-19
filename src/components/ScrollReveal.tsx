import React, { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function ScrollReveal({ children, delay = 0, duration = 0.8 }: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ 
        duration, 
        ease: [0.16, 1, 0.3, 1], // Luxury cubic-bezier curve for smooth easing
        delay 
      }}
    >
      {children}
    </motion.div>
  );
}
