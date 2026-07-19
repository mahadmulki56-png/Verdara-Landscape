import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Star, ShieldCheck, Gift, Compass, Award } from 'lucide-react';
import { heroImg, featuredImg } from '../data';
import { PremiumImage } from './PremiumImage';

interface HeroProps {
  onOpenQuote: () => void;
  onViewWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onViewWork }) => {
  const [showPromoPopup, setShowPromoPopup] = useState(false);
  const [promoEmail, setPromoEmail] = useState('');
  const [promoClaimed, setPromoClaimed] = useState(false);

  // Track scroll for background scale, positioning and opacity shifts
  const { scrollY } = useScroll();
  const videoScale = useTransform(scrollY, [0, 800], [1.02, 0.93]);
  const videoY = useTransform(scrollY, [0, 800], [0, 60]);
  const videoOpacity = useTransform(scrollY, [0, 800], [1, 0.45]);

  const handleClaimPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoEmail) return;
    setPromoClaimed(true);
    localStorage.setItem('verdara_promo_claimed', promoEmail);
  };

  // Stagger entry animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] // luxurious custom ease out curve
      }
    }
  };

  // Smooth floating loop animations for cards to add life
  const float1 = {
    y: [0, -12, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const float2 = {
    y: [0, 8, 0],
    transition: {
      duration: 5.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.5
    }
  };

  const float3 = {
    y: [0, -7, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1
    }
  };

  return (
    <section className="relative h-screen min-h-[750px] lg:min-h-screen bg-[#0F1A12] overflow-hidden flex items-center" id="hero">
      
      {/* 1. Full-Screen Drone Video Background with parallax scale container */}
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none select-none">
        <motion.div 
          style={{ scale: videoScale, y: videoY, opacity: videoOpacity }}
          className="w-full h-full origin-center will-change-transform"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={heroImg}
            className="w-full h-full object-cover filter brightness-[0.9] contrast-[1.05]"
          >
            {/* High-quality cinematic drone video sources */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxury-estate-with-swimming-pool-and-gardens-40455-large.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-shot-of-a-beautiful-villa-with-swimming-pool-and-gardens-40454-large.mp4" type="video/mp4" />
            <source src="/drone-video.mp4" type="video/mp4" />
            <source src="/drone.mp4" type="video/mp4" />
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>

      {/* 2. Premium Cinematic Gradient Vignettes for supreme readability */}
      {/* Top and Bottom dark-to-light overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-black/40 to-black/75 z-0 pointer-events-none" />
      {/* Left side vignette to protect dark text values */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/20 to-transparent z-0 pointer-events-none" />

      {/* Main Grid Content */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-[1240px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 pt-[100px] pb-24 h-full"
      >
        
        {/* Left Column: Copywriting & High-Conversion CTAs */}
        <div className="lg:col-span-6 flex flex-col justify-center relative">
          
          {/* Luxury Studio Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] font-bold text-[#BDD4A1] uppercase tracking-[0.2em] self-start mb-6 shadow-sm select-none"
          >
            <Compass className="w-3.5 h-3.5 text-[#D1A153]" />
            Verdara Landscapes • Curating Living Masterworks
          </motion.div>

          {/* Heading with Serif / Sans combo */}
          <div className="mb-6">
            <motion.h1
              variants={itemVariants}
              className="font-serif font-extrabold text-[clamp(2.3rem,5vw,4rem)] leading-[1.1] text-white tracking-tight"
            >
              Masterfully Crafted.<br />
              <span className="text-[#BDD4A1] block mt-1.5 relative">
                Nature Perfected.
                <span className="absolute left-0 bottom-1 w-full h-[3px] bg-[#D1A153]/40 rounded-full" />
              </span>
            </motion.h1>
          </div>

          {/* Luxury Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base text-white/85 max-w-[510px] leading-relaxed font-sans font-light"
          >
            We design, orchestrate, and cultivate world-class residential gardens and private estates. From architectural stone terraces to pristine botanical alignments, we bring your vision of outdoor luxury to life.
          </motion.p>

          {/* Primary & Secondary Call to Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto"
          >
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto h-14 px-8 rounded-full bg-[#0B6B3A] hover:bg-[#0B512C] text-white text-sm font-bold shadow-lg shadow-[#0B6B3A]/25 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
            >
              Book Design Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onViewWork}
              className="w-full sm:w-auto h-14 px-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-sm font-bold backdrop-blur-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              Explore Portfolios
            </button>
          </motion.div>

          {/* Floating promo benefit card on the bottom left */}
          <motion.div
            variants={itemVariants}
            className="mt-10 p-4 rounded-3xl bg-black/30 backdrop-blur-md border border-white/10 shadow-xl flex items-center gap-4 max-w-sm select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <Gift className="w-5 h-5 text-[#D1A153] animate-pulse" />
            </div>
            <div className="flex-1">
              <span className="text-[9px] uppercase tracking-wider text-[#BDD4A1] font-extrabold">Exclusive Season Offer</span>
              <p className="text-xs font-bold text-white/95 mt-0.5">Receive complimentary lighting design with design scopes</p>
              <button
                onClick={() => setShowPromoPopup(true)}
                className="text-[11px] font-bold text-[#BDD4A1] hover:text-white hover:underline mt-1 flex items-center gap-1 cursor-pointer"
              >
                Register For Benefits →
              </button>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Original Landscaper/Garden Image with Floating Elements */}
        <div className="lg:col-span-6 relative min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
          
          {/* Main Luxury Garden Design Image */}
          <motion.div 
            variants={itemVariants}
            whileHover="hover"
            className="relative rounded-[2.5rem] overflow-hidden w-full max-w-[450px] aspect-[4/5] bg-[#F4EFEA] border-[6px] border-white/20 shadow-2xl cursor-pointer group"
          >
            <PremiumImage
              src={heroImg}
              alt="Luxury garden landscape architecture by Verdara Landscapes"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Floating Card 1: Review Card with infinite micro-floating effect */}
          <motion.div
            variants={itemVariants}
            className="absolute top-8 -left-4 md:-left-8 z-10"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              animate={float1}
              className="bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-[#E3DEC9] shadow-xl flex items-center gap-3.5 max-w-[210px] select-none cursor-pointer transition-shadow hover:shadow-2xl"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#0B6B3A] flex items-center justify-center text-white shrink-0 shadow-md">
                <Award className="w-5 h-5 text-[#D1A153]" />
              </div>
              <div>
                <div className="flex items-center gap-0.5 text-[#D1A153]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <p className="text-[11px] font-bold text-[#0F1A12] mt-0.5">Rated 5.0/5.0</p>
                <p className="text-[9px] text-[#6D7870]">By 150+ Estate Clients</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Card 2: Project Gallery Card with infinite micro-floating effect */}
          <motion.div
            variants={itemVariants}
            className="absolute -bottom-4 -right-2 z-10"
          >
            <motion.div
              whileHover={{ scale: 1.04, y: -4 }}
              animate={float2}
              className="bg-white/95 backdrop-blur-md p-3.5 rounded-3xl border border-[#E3DEC9] shadow-2xl flex items-center gap-3 max-w-[240px] select-none cursor-pointer transition-shadow hover:shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-[#E3DEC9] group/thumb">
                <PremiumImage
                  src={featuredImg}
                  alt="Mini project thumbnail"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <p className="text-[11px] font-bold text-[#0F1A12]">The Whitmore Estate</p>
                <p className="text-[9px] text-[#0B6B3A] font-semibold uppercase tracking-wider mt-0.5">ACTIVE COMMISSION</p>
                <div className="w-full bg-[#E3DEC9] h-1 rounded-full mt-1.5 overflow-hidden">
                  <div className="bg-[#0B6B3A] h-full w-[85%] rounded-full" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Badge 3: Licensed/Insured badge with infinite micro-floating effect */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-10 -left-2 z-10"
          >
            <motion.div
              animate={float3}
              className="bg-[#0F1A12] text-white py-2 px-3.5 rounded-2xl flex items-center gap-2 shadow-lg"
            >
              <ShieldCheck className="w-4 h-4 text-[#BDD4A1]" />
              <span className="text-[10px] font-bold tracking-wider uppercase">Elite Standards Certified</span>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>

      {/* 3. Custom Organic Curved Divider inspired by rolling landscapes instead of straight/grassy */}
      <div className="absolute bottom-0 inset-x-0 w-full z-20 pointer-events-none overflow-hidden select-none">
        {/* Layer 1: background hill (softer, semi-transparent forest green) */}
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[90px] md:h-[180px] text-[#0B6B3A]/20 absolute bottom-0 left-0"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 C360,110 720,230 1080,130 C1260,80 1380,140 1440,160 L1440,200 L0,200 Z"
            fill="currentColor"
          />
        </svg>

        {/* Layer 2: middle hill (warm light olive green tone) */}
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[70px] md:h-[135px] text-[#BDD4A1]/30 absolute bottom-0 left-0"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 C240,155 480,95 720,145 C960,195 1200,115 1440,165 L1440,200 L0,200 Z"
            fill="currentColor"
          />
        </svg>

        {/* Layer 3: foreground hill (matches next section background color #FAF6F0 perfectly) */}
        <svg
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[55px] md:h-[100px] text-[#FAF6F0] relative z-10"
          preserveAspectRatio="none"
        >
          <path
            d="M0,200 C360,125 720,185 1080,135 C1260,110 1380,160 1440,175 L1440,200 L0,200 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Promo Registration Modal */}
      <AnimatePresence>
        {showPromoPopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPromoPopup(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-xs"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-sm w-full bg-white border border-[#E3DEC9] rounded-3xl p-6 shadow-2xl z-50 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#F4EFEA] text-[#0B6B3A] flex items-center justify-center mx-auto mb-4">
                <Gift className="w-7 h-7 text-[#D1A153]" />
              </div>

              {promoClaimed ? (
                <div>
                  <h3 className="font-serif font-bold text-2xl text-[#0F1A12] mb-2">Benefit Registered!</h3>
                  <p className="text-xs text-[#6D7870] leading-relaxed mb-6">
                    A design specialist will email you at <span className="font-bold text-[#0B6B3A]">{promoEmail}</span> to claim your lighting program and schedule a site assessment.
                  </p>
                  <button
                    onClick={() => {
                      setShowPromoPopup(false);
                      setPromoClaimed(false);
                      setPromoEmail('');
                    }}
                    className="w-full h-11 rounded-full bg-[#0B6B3A] text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleClaimPromo} className="space-y-4">
                  <h3 className="font-serif font-bold text-2xl text-[#0F1A12]">Register Special Benefits</h3>
                  <p className="text-xs text-[#6D7870] leading-relaxed">
                    Register below to unlock a complimentary outdoor lighting design plan for your project. Available this week.
                  </p>
                  <input
                    type="email"
                    required
                    value={promoEmail}
                    onChange={(e) => setPromoEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full h-11 px-4 rounded-xl border border-[#E3DEC9] bg-[#FCFCFA] text-xs text-[#0F1A12] focus:outline-none focus:ring-1 focus:ring-[#0B6B3A] focus:border-[#0B6B3A] transition-all"
                  />
                  <button
                    type="submit"
                    className="w-full h-11 rounded-full bg-[#0B6B3A] text-white text-xs font-bold hover:opacity-95 transition-opacity cursor-pointer"
                  >
                    Claim Special Benefit
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
