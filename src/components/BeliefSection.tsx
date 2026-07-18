import React from 'react';
import { motion } from 'motion/react';
import { service1Img, service2Img, service3Img } from '../data';
import { ShieldCheck, Heart, Award } from 'lucide-react';

export const BeliefSection: React.FC = () => {
  const highlightPoints = [
    {
      icon: <Award className="w-5 h-5 text-[#0B6B3A]" />,
      title: 'Award-Winning Craft',
      body: 'Voted premier estate landscape design studio in the Mountain West region.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#0B6B3A]" />,
      title: 'Structural Precision',
      body: 'Our engineers and craftsmen refine our structures until your estate is flawless.'
    },
    {
      icon: <Heart className="w-5 h-5 text-[#0B6B3A]" />,
      title: 'Horticultural Stewardship',
      body: 'Strictly sustainable, organic botanical nourishment and bio-dynamic soils.'
    }
  ];

  const gridPhotos = [
    { src: service1Img, alt: 'Architectural garden pathway design', span: 'col-span-12 sm:col-span-4 h-48 sm:h-64' },
    { src: service3Img, alt: 'Topiary hedges and estate maintenance', span: 'col-span-12 sm:col-span-4 h-48 sm:h-64 mt-0 sm:mt-6' },
    { src: service2Img, alt: 'Symmetric limestone and boxwood details', span: 'col-span-12 sm:col-span-4 h-48 sm:h-64' },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FCFCFA] border-b border-[#E3DEC9]" id="about">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Core Belief Callout */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0B6B3A] mb-6"
          >
            Our Core Philosophy
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif italic font-extrabold text-2xl md:text-4xl text-[#0F1A12] leading-relaxed px-4"
          >
            "At Verdara, We Believe Every Garden Deserves To Be <span className="text-[#0B6B3A] underline decoration-wavy decoration-[#BDD4A1] underline-offset-8">Vibrant, Restorative, & Enduring</span>. With A Passion For Architecture and Botanic Artistry, We Co-author Living Masterpieces."
          </motion.h2>
        </div>

        {/* Floating Photo Grid */}
        <div className="grid grid-cols-12 gap-6 mt-12 mb-20">
          {gridPhotos.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`${photo.span} rounded-[2rem] overflow-hidden border-4 border-white shadow-md hover:shadow-xl transition-all hover:-translate-y-1`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>

        {/* Feature Cards Column / Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#0B6B3A] font-bold">Why Choose Verdara</span>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#0F1A12] leading-tight tracking-tight">
              An Elegant, Living Masterwork Made Effortless.
            </h3>
            <p className="text-sm text-[#6D7870] leading-relaxed font-sans font-light">
              We operate at the absolute pinnacle of design-build execution. No generic templates, no uncurated plants. We conduct meticulous site diagnostics, evaluate your property's precise wind and soil parameters, and craft a custom botanical landscape designed to grow in absolute harmony with your architectural vision.
            </p>
            <div className="h-px bg-[#E3DEC9] w-full" />
            <div className="flex gap-4 items-center p-3 rounded-2xl bg-[#FAF6F0] border border-[#E3DEC9]/60">
              <span className="text-2xl text-[#D1A153]">🏛️</span>
              <p className="text-xs font-bold text-[#0B6B3A] uppercase tracking-wider">
                Distinguished Architectural Standards • Cherry Creek Studio
              </p>
            </div>
          </div>

          {/* Right Highlights Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlightPoints.map((pt, i) => (
              <div key={i} className="bg-white border border-[#E3DEC9]/60 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
                <div className="w-10 h-10 rounded-full bg-[#FAF6F0] border border-[#E3DEC9]/40 flex items-center justify-center mb-4 text-[#0B6B3A]">
                  {pt.icon}
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#0F1A12] mb-2">{pt.title}</h4>
                  <p className="text-xs text-[#6D7870] leading-relaxed font-sans font-light">{pt.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
