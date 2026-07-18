import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Compass, Hammer, Sparkles } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: <Compass className="w-5 h-5 text-[#D1A153]" />,
      title: 'Site Vision',
      subtitle: 'The Architectural Survey',
      body: 'We conduct an on-site evaluation of your estate. Our team analyzes microclimates, solar exposure, native soil compositions, and existing structures to align with your personal vision.'
    },
    {
      number: '02',
      icon: <Leaf className="w-5 h-5 text-[#D1A153]" />,
      title: 'Curated Design',
      subtitle: 'The Botanical Blueprint',
      body: 'Our studio develops an interactive master plan containing detailed planting palettes, high-contrast hardscape material swatches, and photorealistic 3D visualization walks.'
    },
    {
      number: '03',
      icon: <Hammer className="w-5 h-5 text-[#D1A153]" />,
      title: 'Bespoke Build',
      subtitle: 'The Artistic Execution',
      body: 'Our master stone masons, carpenters, and expert botanists construct your outdoor sanctuary, maintaining rigorous site guidelines and immaculate project management.'
    },
    {
      number: '04',
      icon: <Sparkles className="w-5 h-5 text-[#D1A153]" />,
      title: 'Estate Care',
      subtitle: 'The Perpetual Curation',
      body: 'We preserve your living investment through continuous soil health tracking, specialized pruning, winterizations, and responsive seasonal adjustments.'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FCFCFA] border-b border-[#E3DEC9]" id="about">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header Centered */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0B6B3A] mb-4"
          >
            Our Methodology
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-serif font-extrabold text-4xl md:text-5xl text-[#0F1A12] leading-tight tracking-tight"
          >
            From Initial Blueprint to <br />
            <span className="text-[#0B6B3A] italic">Perpetual Sanctuary.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-xs md:text-sm text-[#6D7870] mt-4 font-light leading-relaxed max-w-md mx-auto"
          >
            Every project undergoes our four-stage structural and ecological orchestration, ensuring absolute alignment with luxury outdoor living standards.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-[#0B6B3A]/20 via-[#D1A153]/30 to-[#0B6B3A]/20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: 'easeOut', delay: index * 0.15 }}
                viewport={{ once: true, margin: '-60px' }}
                className="flex flex-col items-start bg-white rounded-[2rem] p-8 border border-[#E3DEC9]/60 hover:border-[#0B6B3A]/30 hover:shadow-lg hover:shadow-[#0B6B3A]/5 transition-all duration-300"
              >
                {/* Number & Icon Header */}
                <div className="w-full flex justify-between items-center mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-[#FAF6F0] border border-[#E3DEC9] flex items-center justify-center shadow-sm">
                    {step.icon}
                  </div>
                  <span className="font-serif italic text-4xl font-extrabold text-[#0B6B3A]/20">
                    {step.number}
                  </span>
                </div>

                {/* Subtitle */}
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D1A153] mb-1.5 block">
                  {step.subtitle}
                </span>

                {/* Title */}
                <h3 className="font-serif font-extrabold text-xl text-[#0F1A12] mb-3">
                  {step.title}
                </h3>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-[#E3DEC9] to-transparent my-3" />

                {/* Body */}
                <p className="text-xs md:text-sm text-[#6D7870] font-light leading-relaxed">
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
