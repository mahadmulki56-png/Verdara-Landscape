import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { TrustedBy } from './components/TrustedBy';
import { BeliefSection } from './components/BeliefSection';
import { Services } from './components/Services';
import { EstimatorTool } from './components/EstimatorTool';
import { BeforeAfter } from './components/BeforeAfter';
import { FeaturedProject } from './components/FeaturedProject';
import { Process } from './components/Process';
import { FAQ } from './components/FAQ';
import { BlogSection } from './components/BlogSection';
import { Consultation } from './components/Consultation';
import { TestimonialSection } from './components/TestimonialSection';
import { Footer } from './components/Footer';
import { QuoteDrawer } from './components/QuoteDrawer';
import { AdminDashboard } from './components/AdminDashboard';
import { ImageFocusProvider, useImageFocus } from './context/ImageFocusContext';
import { PremiumHoverOverlay } from './components/PremiumHoverOverlay';
import { ScrollReveal } from './components/ScrollReveal';

export default function App() {
  return (
    <ImageFocusProvider>
      <MainAppContent />
    </ImageFocusProvider>
  );
}

function MainAppContent() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const { focusedImage } = useImageFocus();

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
      // Automatically scroll to top if entering Admin Panel
      if (window.location.hash === '#admin') {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAdminView = currentHash === '#admin';

  const handleOpenQuote = () => setIsQuoteOpen(true);
  const handleCloseQuote = () => setIsQuoteOpen(false);

  const handleViewWork = () => {
    const el = document.querySelector('#projects');
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (isAdminView) {
    return (
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        <Navbar onOpenQuote={handleOpenQuote} />
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Navigation */}
      <Navbar onOpenQuote={handleOpenQuote} />

      {/* Main Content Sections */}
      <main className={`relative transition-all duration-500 ease-out ${focusedImage ? 'blur-[3px] opacity-75 scale-[0.992] pointer-events-none' : ''}`}>
        <Hero onOpenQuote={handleOpenQuote} onViewWork={handleViewWork} />
        
        <MarqueeTicker />

        <ScrollReveal>
          <TrustedBy />
        </ScrollReveal>

        <ScrollReveal>
          <BeliefSection />
        </ScrollReveal>
        
        <ScrollReveal>
          <Services onOpenQuote={handleOpenQuote} />
        </ScrollReveal>

        <ScrollReveal>
          <EstimatorTool onOpenQuote={handleOpenQuote} />
        </ScrollReveal>

        <ScrollReveal>
          <BeforeAfter />
        </ScrollReveal>
        
        <ScrollReveal>
          <FeaturedProject onOpenQuote={handleOpenQuote} />
        </ScrollReveal>
        
        <ScrollReveal>
          <Process />
        </ScrollReveal>

        <ScrollReveal>
          <FAQ />
        </ScrollReveal>

        <ScrollReveal>
          <BlogSection />
        </ScrollReveal>

        <ScrollReveal>
          <Consultation />
        </ScrollReveal>
        
        <ScrollReveal>
          <TestimonialSection />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <Footer />

      {/* Dynamic Cinematic Image Focus Portal Layer */}
      <PremiumHoverOverlay />

      {/* Slide-over Quote Inquiry Drawer */}
      <QuoteDrawer isOpen={isQuoteOpen} onClose={handleCloseQuote} />
    </div>
  );
}

