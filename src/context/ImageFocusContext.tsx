import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ImageRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface FocusedImage {
  id: string;
  src: string;
  alt: string;
  rect: ImageRect;
  className?: string;
  borderRadius?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

interface ImageFocusContextType {
  focusedImage: FocusedImage | null;
  setFocusedImage: (image: FocusedImage | null) => void;
  isLocked: boolean;
}

const ImageFocusContext = createContext<ImageFocusContextType | undefined>(undefined);

export function ImageFocusProvider({ children }: { children: ReactNode }) {
  const [focusedImage, setFocusedImageState] = useState<FocusedImage | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const setFocusedImage = (image: FocusedImage | null) => {
    // If transition lock is active, do not allow opening a new image
    if (isLocked) {
      if (image !== null) {
        // Prevent opening while locked
        return;
      }
    }

    if (image === null) {
      // Closing flow
      setFocusedImageState(null);
      setIsLocked(true);
      // Lock for 500ms during the spring collapse/fade out transition
      setTimeout(() => {
        setIsLocked(false);
      }, 500);
    } else {
      // Opening flow
      // If we already have a focused image, don't allow opening a new one immediately
      if (focusedImage !== null) return;

      setFocusedImageState(image);
      setIsLocked(true);
      // Lock for 500ms during the spring expand transition
      setTimeout(() => {
        setIsLocked(false);
      }, 500);
    }
  };

  return (
    <ImageFocusContext.Provider value={{ focusedImage, setFocusedImage, isLocked }}>
      {children}
    </ImageFocusContext.Provider>
  );
}

export function useImageFocus() {
  const context = useContext(ImageFocusContext);
  if (!context) {
    throw new Error('useImageFocus must be used within an ImageFocusProvider');
  }
  return context;
}
