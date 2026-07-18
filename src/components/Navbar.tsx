import React, { useState } from 'react';
import { motion, AnimatePresence, useSpring } from 'motion/react';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';
import { VerdaraLogo } from './VerdaraLogo';

interface NavbarProps {
  onOpenQuote: () => void;
}

// ----------------------------------------------------------------------
// 1. Organic Tiny Floating Leaves Particle System
// ----------------------------------------------------------------------
const LeafParticle: React.FC<{ delay: number; xOffset: number; rotation: number }> = ({ delay, xOffset, rotation }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, x: xOffset, scale: 0, rotate: rotation }}
      animate={{ 
        opacity: [0, 0.95, 0.7, 0],
        y: [12, -35],
        x: [xOffset, xOffset + (xOffset > 0 ? 12 : -12)],
        scale: [0, 1.1, 0.85, 0],
        rotate: [rotation, rotation + 35]
      }}
      transition={{
        duration: 1.4,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
        repeat: Infinity,
        repeatDelay: 0.15
      }}
      className="absolute text-[#BDD4A1]/85 pointer-events-none"
      style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 drop-shadow-[0_1px_2px_rgba(4,22,12,0.15)]">
        <path d="M12 2C12 2 6 7 6 12C6 15.3 8.7 18 12 18C15.3 18 18 15.3 18 12C18 7 12 2 12 2Z" />
      </svg>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// 2. Individual Nature-Inspired Spring-Tilt NavItem Component
// ----------------------------------------------------------------------
interface NavItemProps {
  label: string;
  href: string;
  isActive: boolean;
  onClick: () => void;
  variants: any;
}

const NavItem: React.FC<NavItemProps> = ({ label, href, isActive, onClick, variants }) => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // High-performance spring systems for award-winning responsiveness
  const x = useSpring(0, { stiffness: 140, damping: 14 });
  const y = useSpring(0, { stiffness: 140, damping: 14 });
  const rotateX = useSpring(0, { stiffness: 120, damping: 13 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 13 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Normalized coordinates from -1 to 1 based on center of button bounds
    const rx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const ry = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    
    // Magnetic draw limits (max 6px X, 4px Y) and vertical lift offset
    x.set(rx * 6);
    y.set(ry * 4 - 3); // Lifts upward by 3px under hover
    
    // Subtle luxury 3D tilt
    rotateX.set(ry * -9);
    rotateY.set(rx * 9);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      variants={variants}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`relative px-5 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center select-none transition-colors duration-300 z-10 ${
        isActive 
          ? 'text-white' 
          : 'text-white/80 hover:text-white'
      }`}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
    >
      {/* 1. Organic Glowing Backdrop Aura */}
      <motion.div
        className="absolute inset-0 -z-20 rounded-[20px_5px_20px_5px] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isActive ? 0.45 : (isHovered ? 0.35 : 0),
          boxShadow: '0 0 16px rgba(189, 212, 161, 0.4)'
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      />

      {/* 2. Glassmorphic Asymmetric Leaf Background */}
      <motion.div
        className={`absolute inset-0 -z-10 transition-all duration-300 ${
          isActive 
            ? 'bg-[#0B6B3A] border border-[#BDD4A1]/40 shadow-lg shadow-[#052414]/20' 
            : 'bg-[#BDD4A1]/15 backdrop-blur-md border border-white/10 shadow-sm'
        }`}
        style={{
          borderRadius: '20px 4px 20px 4px', // Handcrafted organic leaf geometry
          originX: 0.5,
          originY: 0.5,
        }}
        initial={false}
        animate={{
          scale: isActive ? 1 : (isHovered ? 1.03 : 0),
          opacity: isActive ? 1 : (isHovered ? 1 : 0),
        }}
        transition={{
          type: "spring",
          stiffness: 160,
          damping: 14
        }}
      />

      {/* 3. Text label */}
      <span className="relative z-10">{label}</span>

      {/* 4. Underline: Growing Hand-drawn Organic Vine */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[85%] h-3 pointer-events-none overflow-visible">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 12" fill="none" preserveAspectRatio="none">
          {/* Main curving vine path */}
          <motion.path
            d="M 5,6 Q 25,1 50,8 T 95,5"
            stroke="#BDD4A1"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive || isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Subtle floral leaf bud offshoot */}
          <motion.path
            d="M 45,6 Q 48,1.5 54,2.5"
            stroke="#BDD4A1"
            strokeWidth="1"
            strokeLinecap="round"
            initial={{ pathLength: 0, scale: 0 }}
            animate={{ 
              pathLength: isActive || isHovered ? 1 : 0, 
              scale: isActive || isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          />
        </svg>
      </div>

      {/* 5. Wind-Like Shimmer Passing across the button */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '100%', opacity: [0, 0.45, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-[20px_4px_20px_4px] pointer-events-none overflow-hidden"
          />
        )}
      </AnimatePresence>

      {/* 6. Tiny Drifting Leaves */}
      {isHovered && (
        <>
          <LeafParticle delay={0} xOffset={-36} rotation={15} />
          <LeafParticle delay={0.4} xOffset={32} rotation={-22} />
          <LeafParticle delay={0.8} xOffset={-14} rotation={40} />
        </>
      )}
    </motion.button>
  );
};

// ----------------------------------------------------------------------
// 3. Main Header & Navbar Module
// ----------------------------------------------------------------------
export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Philosophy', href: '#about' },
    { label: 'Design Services', href: '#services' },
    { label: 'Portfolios', href: '#projects' },
    { label: 'Investment Calculator', href: '#estimator' },
    { label: 'Insights', href: '#blog' },
    { label: 'Consultation', href: '#contact' }
  ];

  // Robust Scroll Spy using IntersectionObserver
  React.useEffect(() => {
    const sections = navLinks.map(link => link.href.replace('#', ''));
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 90; // perfectly accounting for dynamic navbar heights
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(href.replace('#', ''));
    }
  };

  // Stagger entry animation configurations
  const headerVariants = {
    hidden: { opacity: 0, y: -25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.75, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05,
        delayChildren: 0.15
      } 
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={headerVariants}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-300" 
      id="site-header"
    >
      {/* Top Banner Bar - Collapses dynamically and transitions layout parameters */}
      <div className={`text-white text-xs py-2 px-6 hidden md:block transition-all duration-500 overflow-hidden ${
        isScrolled 
          ? 'bg-[#0B512C]/95 backdrop-blur-md border-b border-white/5 max-h-0 py-0 opacity-0' 
          : 'bg-[#0B512C] max-h-[40px] py-2 opacity-100'
      }`}>
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6 opacity-90">
            <span className="flex items-center gap-1.5 font-sans">
              <MapPin className="w-3.5 h-3.5 text-[#BDD4A1]" />
              742 Evergreen Terrace, Cherry Creek, CO 80206
            </span>
            <span className="w-px h-3 bg-white/20" />
            <span className="flex items-center gap-1.5 font-sans">
              <Mail className="w-3.5 h-3.5 text-[#BDD4A1]" />
              design@verdaralandscapes.com
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#admin" className="text-[10px] uppercase tracking-wider font-bold text-[#BDD4A1] hover:text-white transition-colors bg-white/10 px-3 py-1 rounded-full border border-[#BDD4A1]/20 mr-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#BDD4A1] rounded-full animate-pulse" />
              Admin Studio
            </a>
            <span className="text-white/70">Social:</span>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-[#BDD4A1] transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-[#BDD4A1] transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-[#BDD4A1] transition-colors"><Twitter className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-[#BDD4A1] transition-colors"><Youtube className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Header Row */}
      <nav className={`transition-all duration-500 px-6 relative overflow-hidden ${
        isScrolled
          ? 'h-[68px] bg-[#062A16]/92 backdrop-blur-lg border-b border-[#0B512C]/35 shadow-[0_10px_40px_rgba(4,22,12,0.4)]'
          : 'h-[80px] bg-[#062A16]/15 backdrop-blur-xs border-b border-white/10'
      }`}>
        {/* Premium Top Highlight / Light Edge bevel */}
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#BDD4A1]/30 to-transparent pointer-events-none" />

        <div className="max-w-[1200px] mx-auto h-full flex justify-between items-center relative z-10">
          
          {/* Logo Component (scales dynamically while scrolling) */}
          <motion.a
            variants={navItemVariants}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group"
            id="logo"
          >
            <motion.div 
              animate={{ scale: isScrolled ? 0.92 : 1 }} 
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <VerdaraLogo iconSize={42} lightMode={true} />
            </motion.div>
          </motion.a>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5">
            {navLinks.map((link) => (
              <NavItem
                key={link.label}
                label={link.label}
                href={link.href}
                isActive={activeSection === link.href.replace('#', '')}
                onClick={() => handleLinkClick(link.href)}
                variants={navItemVariants}
              />
            ))}
          </div>

          {/* Studio Contact Badge + Request Button */}
          <div className="hidden md:flex items-center gap-6">
            <motion.a
              variants={navItemVariants}
              href="tel:7195281531"
              className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 bg-white/10 text-white group-hover:bg-[#BDD4A1] group-hover:text-[#062A16]">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] leading-none text-white/60">
                  Studio Line
                </span>
                <span className="text-xs font-bold font-sans mt-0.5 text-white">
                  719-528-1531
                </span>
              </div>
            </motion.a>

            <motion.button
              variants={navItemVariants}
              onClick={onOpenQuote}
              className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-1.5 bg-white hover:bg-[#BDD4A1] text-[#062A16] shadow-md hover:shadow-xl hover:scale-[1.02]"
            >
              Book Consultation
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Hamburger (Mobile Toggle) */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -mr-2 transition-colors focus:outline-none text-white hover:text-[#BDD4A1]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-x-0 top-[76px] bg-[#062A16] border-b border-[#0B512C]/40 z-40 shadow-xl lg:hidden max-h-[calc(100vh-76px)] overflow-y-auto"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <button
                    key={link.label}
                    onClick={() => handleLinkClick(link.href)}
                    className={`text-left text-sm font-bold uppercase tracking-wider py-2.5 border-b border-white/5 last:border-none flex items-center justify-between transition-colors ${
                      isActive ? 'text-[#BDD4A1]' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#BDD4A1]" />
                    )}
                  </button>
                );
              })}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-[#BDD4A1]/20 text-[#BDD4A1] font-bold text-xs uppercase tracking-wider"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#BDD4A1] animate-pulse" />
                  Admin Studio
                </a>
                <a
                  href="tel:7195281531"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold"
                >
                  <Phone className="w-5 h-5 text-[#BDD4A1]" />
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 font-semibold leading-none">Studio Call</span>
                    <span className="text-sm font-bold mt-0.5">719-528-1531</span>
                  </div>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuote();
                  }}
                  className="w-full h-12 rounded-full bg-[#0B6B3A] hover:bg-[#0B512C] text-white text-sm font-bold flex items-center justify-center gap-2 border border-white/10 shadow-lg"
                >
                  Book Consultation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
