import React from 'react';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Twitter, Youtube, Heart, Sparkles } from 'lucide-react';
import { service1Img, service2Img, service3Img, heroImg, featuredImg, mowerHeroImg } from '../data';
import { VerdaraLogo } from './VerdaraLogo';

export const Footer: React.FC = () => {
  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const instagramPhotos = [
    service1Img,
    service2Img,
    service3Img,
    heroImg,
    featuredImg,
    mowerHeroImg
  ];

  return (
    <footer className="bg-[#0F1A12] text-white pt-20 pb-8 border-t-8 border-[#0B6B3A]" id="footer">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand & Logo (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <VerdaraLogo lightMode={true} iconSize={38} />

            <p className="text-xs text-white/60 leading-relaxed">
              Award-winning garden design, master landscape architecture, and luxury outdoor environment planning designed for discerning property owners in Cherry Creek and the Denver area.
            </p>

            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#0B6B3A] hover:scale-105 transition-all text-white flex items-center justify-center"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#0B6B3A] hover:scale-105 transition-all text-white flex items-center justify-center"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#0B6B3A] hover:scale-105 transition-all text-white flex items-center justify-center"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#0B6B3A] hover:scale-105 transition-all text-white flex items-center justify-center"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#BDD4A1]">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><button onClick={() => handleScroll('#hero')} className="hover:text-white transition-colors cursor-pointer text-left">Home</button></li>
              <li><button onClick={() => handleScroll('#about')} className="hover:text-white transition-colors cursor-pointer text-left">Philosophy</button></li>
              <li><button onClick={() => handleScroll('#services')} className="hover:text-white transition-colors cursor-pointer text-left">Services</button></li>
              <li><button onClick={() => handleScroll('#projects')} className="hover:text-white transition-colors cursor-pointer text-left">Portfolios</button></li>
              <li><button onClick={() => handleScroll('#estimator')} className="hover:text-white transition-colors cursor-pointer text-left">Calculator</button></li>
              <li><button onClick={() => handleScroll('#blog')} className="hover:text-white transition-colors cursor-pointer text-left">Insights</button></li>
              <li><button onClick={() => handleScroll('#contact')} className="hover:text-white transition-colors cursor-pointer text-left">Consultation</button></li>
            </ul>
          </div>

          {/* Col 3: Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#BDD4A1]">Services</h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li><button onClick={() => handleScroll('#services')} className="hover:text-white transition-colors cursor-pointer text-left">Garden Design</button></li>
              <li><button onClick={() => handleScroll('#services')} className="hover:text-white transition-colors cursor-pointer text-left">Landscape Architecture</button></li>
              <li><button onClick={() => handleScroll('#services')} className="hover:text-white transition-colors cursor-pointer text-left">Bronze Lighting systems</button></li>
              <li><button onClick={() => handleScroll('#services')} className="hover:text-white transition-colors cursor-pointer text-left">Topiary & Pruning</button></li>
              <li><button onClick={() => handleScroll('#services')} className="hover:text-white transition-colors cursor-pointer text-left">Stone & Masonry</button></li>
              <li><button onClick={() => handleScroll('#services')} className="hover:text-white transition-colors cursor-pointer text-left">Smart Irrigation</button></li>
            </ul>
          </div>

          {/* Col 4: Contact Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#BDD4A1]">Studio Info</h4>
            <ul className="space-y-3.5 text-xs text-white/70">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-[#BDD4A1] shrink-0 mt-0.5" />
                <span>742 Evergreen Terrace,<br />Cherry Creek, CO 80206</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-[#BDD4A1] shrink-0" />
                <span>719-528-1531</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-[#BDD4A1] shrink-0" />
                <span>design@verdaralandscapes.com</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Clock className="w-4 h-4 text-[#BDD4A1] shrink-0" />
                <span>Mon - Sat: 8:00 - 18:00</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Instagram Feed (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#BDD4A1]">Portfolios</h4>
            <div className="grid grid-cols-3 gap-2">
              {instagramPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden border border-white/5 bg-white/5 group relative cursor-pointer"
                >
                  <img
                    src={photo}
                    alt={`Garden work instagram ${index}`}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[9px] font-bold text-white uppercase tracking-widest">VIEW</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-white/40 italic flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#BDD4A1]" /> Follow @verdara_landscapes
            </p>
          </div>

        </div>

        {/* Footer Base Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 gap-4">
          <p>© 2026 Verdara Landscapes Inc. All Rights Reserved.</p>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Disclaimer</a>
          </div>

          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#D1A153] fill-current" /> for healthy neighborhoods.
          </p>
        </div>

      </div>
    </footer>
  );
};
