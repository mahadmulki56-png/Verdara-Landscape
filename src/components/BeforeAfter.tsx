import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowLeftRight } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50); // 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section className="py-24 bg-[#FAF6F0] border-b border-[#E3DEC9]/50" id="before-after">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Explanation Column */}
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#0B6B3A] font-extrabold block">The Transformation</span>
          <h2 className="font-serif font-extrabold text-4xl md:text-5xl text-[#0F1A12] leading-[1.12] tracking-tight">
            The Art of Living <span className="text-[#0B6B3A] italic">Restoration.</span>
          </h2>
          <p className="text-sm text-[#6D7870] leading-relaxed font-sans font-light">
            Drag the slider to observe how our master architects restore compacted soil biology, plant mature structural tree specimens, integrate organic floral systems, and elevate wild terrains into clean modern sanctuaries.
          </p>
          
          <div className="space-y-4 pt-4 border-t border-[#E3DEC9]/40">
            <div className="flex gap-3.5 items-start text-xs text-[#6D7870] font-sans">
              <div className="w-5 h-5 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#0B6B3A] shrink-0 font-bold border border-[#E3DEC9]/80 shadow-xs">1</div>
              <div className="flex-1">
                <strong className="text-[#0F1A12] block mb-0.5">Pre-Restoration:</strong>
                Nutrient-starved soil matrices, uncurated overgrown thickets, and lack of visual structural focal points.
              </div>
            </div>
            <div className="flex gap-3.5 items-start text-xs text-[#6D7870] font-sans">
              <div className="w-5 h-5 rounded-full bg-[#0B6B3A] flex items-center justify-center text-white shrink-0 font-bold shadow-xs">2</div>
              <div className="flex-1">
                <strong className="text-[#0B6B3A] block mb-0.5">Post-Restoration Masterwork:</strong>
                Handcrafted stone pathways, rich microclimatic evergreen pairings, and robust bio-organic turf structures.
              </div>
            </div>
          </div>
        </div>

        {/* Right Slider Column */}
        <div className="lg:col-span-7">
          <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] md:aspect-[1.5] rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white select-none cursor-ew-resize bg-[#E3DEC9]"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Before State (Raw, wild, overgrown terrain) */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1508847154043-be12a62861c1?q=80&w=1200&auto=format&fit=crop"
                alt="Before restoration - raw and wild unmanicured estate plot"
                className="w-full h-full object-cover pointer-events-none select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-black/55 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[9px] text-white font-extrabold uppercase tracking-[0.15em] z-10 select-none shadow-sm">
                Pre-Restoration State
              </div>
            </div>

            {/* After State (Pristine luxury manicured garden sanctuary, clipped dynamically) */}
            <div
              className="absolute inset-0 overflow-hidden select-none pointer-events-none z-10"
              style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
            >
              {/* Force the layout box to match container's absolute dimensions to avoid resizing slides */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop"
                  alt="After restoration - pristine masterwork landscaping sanctuary"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute top-4 left-4 bg-[#0B6B3A] px-3.5 py-1.5 rounded-full text-[9px] text-white font-extrabold uppercase tracking-[0.15em] whitespace-nowrap z-10 select-none shadow-md">
                Verdara Masterwork Sanctuary 🌱
              </div>
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-11 h-11 rounded-full bg-[#0B6B3A] text-white flex items-center justify-center shadow-2xl border-2 border-white -translate-x-1/2 hover:scale-110 active:scale-95 transition-transform duration-200 pointer-events-auto cursor-ew-resize">
                <ArrowLeftRight className="w-4 h-4 text-[#FAF6F0]" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-2 text-[10px] text-[#6D7870] mt-4 font-bold uppercase tracking-[0.15em] select-none">
            <Sparkles className="w-3.5 h-3.5 text-[#0B6B3A] animate-pulse" />
            Drag the slider to inspect the masterwork
          </div>
        </div>

      </div>
    </section>
  );
};
