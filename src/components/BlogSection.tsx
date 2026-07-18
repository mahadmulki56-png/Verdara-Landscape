import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS } from '../data';
import { ArrowRight, Calendar, User, X, Clock, Bookmark, Share2 } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [activePost, setActivePost] = useState<any | null>(null);

  return (
    <section className="py-24 md:py-32 bg-[#FCFCFA] border-b border-[#E3DEC9]" id="blog">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0B6B3A] mb-4 block">Our Journal</span>
          <h2 className="font-serif font-extrabold text-4xl md:text-5xl text-[#0F1A12] tracking-tight leading-[1.12]">
            The Landscape <span className="text-[#0B6B3A] italic">Design Journal.</span>
          </h2>
          <p className="text-sm text-[#6D7870] mt-4 leading-relaxed font-sans font-light">
            Horticultural blueprints, botanical science, and master estate design guidelines curated by our principal architects.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-3xl overflow-hidden border border-[#E3DEC9]/60 hover:border-[#0B6B3A]/25 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col h-full group"
            >
              
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] font-bold text-[#0B6B3A] uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[11px] text-[#6D7870] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#D1A153]" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-[#D1A153]" />
                      {post.author}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#0F1A12] group-hover:text-[#0B6B3A] transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#6D7870] leading-relaxed mb-6 line-clamp-3 font-light">
                    {post.excerpt}
                  </p>
                </div>

                <button
                  onClick={() => setActivePost(post)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B6B3A] hover:text-[#0B512C] group-hover:gap-2.5 transition-all mt-auto cursor-pointer"
                >
                  LEARN MORE
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </motion.article>
          ))}
        </div>

      </div>

      {/* Blog Details Modal */}
      <AnimatePresence>
        {activePost && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePost(null)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-6 bottom-6 top-24 md:inset-x-12 md:bottom-12 md:top-28 max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl z-50 flex flex-col"
            >
              
              {/* Header Controls */}
              <div className="h-14 border-b border-[#E3DEC9]/60 px-6 flex justify-between items-center bg-[#FAF6F0] shrink-0">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B6B3A]">
                  <Bookmark className="w-4 h-4 text-[#D1A153]" />
                  <span>Journal Entry: {activePost.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 text-[#6D7870] hover:text-[#0F1A12] transition-colors" title="Share article">
                    <Share2 className="w-4.5 h-4.5 text-[#D1A153]" />
                  </button>
                  <button
                    onClick={() => setActivePost(null)}
                    className="p-1 rounded-full bg-[#FAF6F0] border border-[#E3DEC9]/60 text-[#0F1A12] hover:bg-[#0B6B3A] hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
                
                {/* Meta */}
                <div className="space-y-4">
                  <span className="bg-[#FAF6F0] border border-[#E3DEC9]/80 px-3.5 py-1 rounded-full text-[10px] font-bold text-[#0B6B3A] uppercase tracking-wider">
                    {activePost.category}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F1A12] leading-tight">
                    {activePost.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-6 text-xs text-[#6D7870] pt-2 border-t border-[#E3DEC9]/50">
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#D1A153]" /> {activePost.date}</span>
                    <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-[#D1A153]" /> By {activePost.author}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#D1A153]" /> 4 Min Read</span>
                  </div>
                </div>

                {/* Cover Image */}
                <div className="rounded-2xl overflow-hidden aspect-[16/9] w-full bg-gray-100 shadow-inner">
                  <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
                </div>

                {/* Article Prose Body */}
                <div className="prose prose-stone max-w-none text-[#0F1A12] space-y-6 text-sm leading-relaxed font-sans font-light">
                  <p className="text-base font-medium text-[#0B6B3A] italic font-serif">
                    "{activePost.excerpt}"
                  </p>
                  
                  <h4 className="font-serif text-lg font-bold mt-8 text-[#0F1A12]">1. Understanding Organic Soil Metrics</h4>
                  <p>
                    A spectacular garden is always anchored in high-quality soil conditioning. We recommend diagnostic soil diagnostics once per quarter to assess nutrient density, moisture ratios, and micro-organism balance. Standard chemical-based sprays destroy essential soil mycorrhizae, whereas organic compost matrices slowly release minerals, leading to deep, healthy botanical cell growth that defends your plants from Colorado weather extremes naturally.
                  </p>

                  <h4 className="font-serif text-lg font-bold mt-8 text-[#0F1A12]">2. Precision Hydration Blueprints</h4>
                  <p>
                    Watering is an exact science. Over-watering suffocates root networks, encouraging mold and rendering root pathways shallow and fragile. Water deeply twice per week rather than misting every day. Set your drip zones early in the morning (5 AM - 8 AM) to avoid evaporation and block fungal incubation overnight.
                  </p>

                  <blockquote className="border-l-4 border-[#0B6B3A] bg-[#FAF6F0] p-5 rounded-r-2xl text-xs font-semibold uppercase tracking-wider text-[#0B6B3A] my-6">
                    "Intelligent, root-directed sub-surface hydration creates resilient roots that thrive during seasonal dry phases."
                  </blockquote>

                  <h4 className="font-serif text-lg font-bold mt-8 text-[#0F1A12]">3. Sculptural Pruning and Topiary Curation</h4>
                  <p>
                    Never prune more than one-fourth of a mature boxwood or hedge density in a single season. Shaving specimen branches down too low shocks the plant, arresting photosynthetic absorption. Keep your pruning tools surgically clean and sharp—ragged cuts invite botanical infestations and damage your specimen lines.
                  </p>
                </div>

                {/* Footer Modal CTA */}
                <div className="pt-8 border-t border-[#E3DEC9]/50 text-center space-y-4">
                  <p className="text-xs text-[#6D7870]">Want a tailored design plan configured for your estate?</p>
                  <button
                    onClick={() => {
                      setActivePost(null);
                      const element = document.querySelector('#contact');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-8 h-12 rounded-full bg-[#0B6B3A] text-white text-xs font-bold hover:bg-[#0B512C] transition-all cursor-pointer"
                  >
                    Request Private Garden Site Visit
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
