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

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

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
      <main className="relative">
        <Hero onOpenQuote={handleOpenQuote} onViewWork={handleViewWork} />
        
        <MarqueeTicker />

        <TrustedBy />

        <BeliefSection />
        
        <Services onOpenQuote={handleOpenQuote} />

        <EstimatorTool onOpenQuote={handleOpenQuote} />

        <BeforeAfter />
        
        <FeaturedProject onOpenQuote={handleOpenQuote} />
        
        <Process />

        <FAQ />

        <BlogSection />

        <Consultation />
        
        <TestimonialSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Quote Inquiry Drawer */}
      <QuoteDrawer isOpen={isQuoteOpen} onClose={handleCloseQuote} />
    </div>
  );
}
