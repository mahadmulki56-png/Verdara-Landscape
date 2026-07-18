import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ArrowRight, MessageSquare } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      question: "How long does the landscape design process typically take?",
      answer: "Our standard master planning and concept design phase takes between 4 to 8 weeks. This meticulous timeline ensures we capture accurate site topology, curate bespoke botanical palettes, select premium hardscape materials, and construct photorealistic 3D renderings of your future estate sanctuary before any ground is broken."
    },
    {
      question: "Do you orchestrate the entire build and construction phase?",
      answer: "Absolutely. We provide end-to-end architectural delivery. From securing environmental permits and managing heavy excavations, to stone masonry construction, custom water features, professional bronze lighting, and planting mature trees—our in-house build specialists handle every physical detail under a single point of accountability."
    },
    {
      question: "How do you integrate ecological sustainability into your gardens?",
      answer: "Sustainability is woven into our core philosophy. We specialize in low-impact site grading, install smart sub-surface drip irrigation systems that save up to 45% water, specify local organic soil matrices, and prioritize native pollinator-friendly flora to foster local biodiversity while minimizing maintenance overhead."
    },
    {
      question: "What is the typical investment range for a Verdara Landscapes project?",
      answer: "As an editorial boutique landscaping firm, our projects are fully customized. High-end courtyard and terrace design scopes typically start around $15,000, while complete suburban estate transformations, masonry masterworks, and multi-acre luxury re-designs generally range from $50,000 to $250,000+."
    },
    {
      question: "Do you offer private estate maintenance after installation?",
      answer: "Yes, we protect your living investment through our Private Curation Program. Available exclusively for estates we design and construct, this service offers tailored seasonal fertilizations, professional topiary pruning, specialized soil health monitoring, and irrigation winterization."
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-32 bg-[#FCFCFA] border-b border-[#E3DEC9]" id="faq">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Sticky Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-[120px] self-start space-y-6">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 bg-[#F4EFEA] border border-[#0B6B3A]/10 px-3 py-1 rounded-full text-[10px] font-bold text-[#0B6B3A] uppercase tracking-[0.15em]">
                <HelpCircle className="w-3.5 h-3.5 text-[#D1A153]" />
                Common Inquiries
              </span>
              <h2 className="font-serif font-extrabold text-4xl md:text-5xl text-[#0F1A12] tracking-tight leading-[1.12]">
                Answering Your <br />
                <span className="text-[#0B6B3A] italic">Garden Aspirations.</span>
              </h2>
              <p className="text-sm md:text-base text-[#6D7870] leading-relaxed max-w-[400px]">
                Transparent answers regarding our high-end landscaping workflows, design phases, ecological principles, and investment standards.
              </p>
            </div>

            {/* Micro Card CTA */}
            <div className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E3DEC9] space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#0B6B3A]/10 flex items-center justify-center text-[#0B6B3A]">
                <MessageSquare className="w-5 h-5 text-[#D1A153]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0F1A12]">Have a custom request?</h4>
                <p className="text-xs text-[#6D7870] mt-1 leading-relaxed">
                  Our landscape architects are available for private site assessments and tailored designs.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B6B3A] hover:text-[#0B512C] transition-colors group"
              >
                Inquire With Our Studio
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Accordion Column */}
          <div className="lg:col-span-7 space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`border border-[#E3DEC9] rounded-3xl overflow-hidden transition-all duration-300 ${
                    isOpen ? 'bg-[#FAF6F0] shadow-sm' : 'bg-white hover:bg-[#FCFCFA]'
                  }`}
                >
                  {/* Trigger Header */}
                  <button
                    onClick={() => handleToggle(index)}
                    className="w-full py-6 px-6 md:px-8 flex justify-between items-center text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm md:text-base font-bold text-[#0F1A12] pr-4 leading-snug">
                      {item.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 ${
                        isOpen ? 'bg-[#0B6B3A] text-white border-transparent' : 'border-[#E3DEC9] text-[#0B6B3A]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  {/* Expandable Body */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 md:px-8 pb-6 text-xs md:text-sm text-[#6D7870] leading-relaxed border-t border-[#E3DEC9]/50 pt-4">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
