import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Maximize, Clock, X, Check } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { PremiumImage } from './PremiumImage';

interface FeaturedProjectProps {
  onOpenQuote: () => void;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ onOpenQuote }) => {
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const project = PROJECTS[0]; // The Whitmore Estate, Cherry Creek

  // Extra rich detail for the Case Study Modal
  const caseStudyDetails = {
    challenge: 'The client acquired a 1.2-acre estate with a beautiful modern home but neglected grounds in Cherry Creek. The main challenge was integrating a collection of centuries-old mature ponderosa pines and native oaks into a structured, functional modern garden layout while establishing privacy from adjacent properties.',
    solution: 'We designed a series of progressive outdoor rooms. Near the residence, a formal limestone terrace transitions into a wide manicured lawn framed by soft, cloud-like boxwood hedges. Tucked behind the pines, we crafted a sunken fire pit lounge with stone masonry and a productive kitchen garden complete with custom cold-frames and espaliered heritage apple trees.',
    plants: [
      { name: 'Carpinus betulus', common: 'Upright Hornbeam Hedges' },
      { name: 'Salvia nemorosa "Caradonna"', common: 'Balkan Clary Sage' },
      { name: 'Alchemilla mollis', common: "Lady's Mantle" },
      { name: 'Betula utilis jacquemontii', common: 'Himalayan Birch Trees' },
      { name: 'Pennisetum alopecuroides', common: 'Chinese Fountain Grass' }
    ]
  };

  return (
    <section className="py-24 md:py-32 bg-[#FCFCFA] border-b border-[#E3DEC9]" id="projects">
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Left - Text side */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="flex flex-col items-start"
          >
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#0B6B3A] mb-5 block">
              Featured Project
            </span>
            <h2 className="font-serif font-extrabold text-4xl md:text-5xl leading-tight text-[#0F1A12] tracking-tight">
              {project.title}, <span className="text-[#0B6B3A] italic">{project.location.split(',')[0]}</span>
            </h2>
            <p className="text-sm text-[#6D7870] leading-relaxed mt-6 font-sans font-light">
              {project.description}
            </p>

            {/* Tags row */}
            <div className="flex flex-wrap gap-2 mt-8">
              <span className="text-xs border border-[#E3DEC9]/60 px-3 py-1.5 rounded-full text-[#6D7870] bg-white/50 backdrop-blur-xs font-sans">
                {project.area}
              </span>
              <span className="text-xs border border-[#E3DEC9]/60 px-3 py-1.5 rounded-full text-[#6D7870] bg-white/50 backdrop-blur-xs font-sans">
                {project.duration}
              </span>
              <span className="text-xs border border-[#E3DEC9]/60 px-3 py-1.5 rounded-full text-[#6D7870] bg-white/50 backdrop-blur-xs font-sans">
                {project.scope}
              </span>
              <span className="text-xs border border-[#E3DEC9]/60 px-3 py-1.5 rounded-full text-[#6D7870] bg-white/50 backdrop-blur-xs font-sans">
                {project.location}
              </span>
            </div>

            <button
              onClick={() => setShowCaseStudy(true)}
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0B6B3A] hover:text-[#0B512C] hover:gap-3 transition-all cursor-pointer group"
            >
              View Full Case Study 
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>

          {/* Right - Image side (clip-path reveal) */}
          <div className="relative rounded-[2rem] overflow-hidden h-[320px] md:h-[480px]">
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              whileHover="hover"
              className="w-full h-full relative overflow-hidden"
            >
              <PremiumImage
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center cursor-zoom-in"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/5 opacity-10 hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
            </motion.div>

            {/* floating badge */}
            {project.badge && (
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 border border-[#E3DEC9] shadow-md z-10">
                <p className="font-serif font-extrabold text-lg text-[#0F1A12]">
                  {project.year}
                </p>
                <p className="text-[10px] text-[#6D7870] uppercase tracking-widest font-sans font-semibold">
                  {project.badge}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Case Study Full Screen Overlay Modal */}
      <AnimatePresence>
        {showCaseStudy && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCaseStudy(false)}
              className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full md:max-w-3xl bg-[#FCFCFA] border-l border-[#E3DEC9] z-50 flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Image banner header */}
              <div className="h-64 md:h-80 relative shrink-0 overflow-hidden group">
              <PremiumImage
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center cursor-zoom-in"
                referrerPolicy="no-referrer"
              />
                <div className="absolute inset-0 bg-gradient-to-t from-[#FCFCFA] via-transparent to-black/40" />
                <button
                  onClick={() => setShowCaseStudy(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-6 left-8 text-white">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">
                    Full Case Study
                  </span>
                  <h3 className="font-serif font-extrabold italic text-3xl md:text-4xl mt-1">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Scrollable details */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
                {/* Stats board */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[#FAF6F0] border border-[#E3DEC9]/60">
                  <div className="flex items-center gap-2.5">
                    <Maximize className="w-4 h-4 text-[#0B6B3A] shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#6D7870] uppercase tracking-widest font-semibold">Total Area</p>
                      <p className="text-sm font-semibold text-[#0F1A12]">{project.area}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#0B6B3A] shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#6D7870] uppercase tracking-widest font-semibold">Duration</p>
                      <p className="text-sm font-semibold text-[#0F1A12]">{project.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#0B6B3A] shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#6D7870] uppercase tracking-widest font-semibold">Year Completed</p>
                      <p className="text-sm font-semibold text-[#0F1A12]">{project.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#0B6B3A] shrink-0" />
                    <div>
                      <p className="text-[10px] text-[#6D7870] uppercase tracking-widest font-semibold">Commission</p>
                      <p className="text-sm font-semibold text-[#0F1A12]">{project.scope}</p>
                    </div>
                  </div>
                </div>

                {/* Scope & Challenge */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0B6B3A]">The Challenge</h4>
                  <p className="text-sm text-[#6D7870] leading-relaxed font-sans font-light">
                    {caseStudyDetails.challenge}
                  </p>
                </div>

                {/* Our Approach */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0B6B3A]">The Solution</h4>
                  <p className="text-sm text-[#6D7870] leading-relaxed font-sans font-light">
                    {caseStudyDetails.solution}
                  </p>
                </div>

                {/* Key Specimen Plants Used */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-[#0B6B3A]">Key Specimens Configured</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {caseStudyDetails.plants.map((plant, index) => (
                      <div key={index} className="flex gap-2.5 p-3 rounded-xl border border-[#E3DEC9]/60 bg-white">
                        <div className="w-5 h-5 rounded-full bg-[#0B6B3A]/10 flex items-center justify-center text-[#0B6B3A] shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold font-serif italic text-[#0F1A12]">{plant.name}</p>
                          <p className="text-[11px] text-[#6D7870] mt-0.5 font-sans font-light">{plant.common}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Quote Button */}
              <div className="p-6 bg-[#FAF6F0] border-t border-[#E3DEC9]/60 flex items-center justify-between shrink-0">
                <p className="text-xs text-[#6D7870] leading-relaxed hidden sm:block font-sans font-light">
                  Inspired by Cherry Creek's Whitmore Estate? Let's design your sanctuary.
                </p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => {
                      setShowCaseStudy(false);
                      onOpenQuote();
                    }}
                    className="flex-1 sm:flex-initial h-10 px-6 rounded-full bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#0B512C] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Request Similar Build
                  </button>
                  <button
                    onClick={() => setShowCaseStudy(false)}
                    className="flex-1 sm:flex-initial h-10 px-6 rounded-full border border-[#E3DEC9] text-[#0F1A12] text-xs font-bold hover:bg-white transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
