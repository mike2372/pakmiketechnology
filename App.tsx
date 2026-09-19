import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ProjectGallery from './components/ProjectGallery';
import GalleryBanner from './components/GalleryBanner';
import About from './components/About';
import MeetOurTeam from './components/MeetOurTeam';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import YouTubeGallery from './components/YouTubeGallery';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { ShopSection } from './components/ShopSection';
import { PaymentSuccess } from './components/PaymentSuccess';

const App: React.FC = () => {
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [orderRef, setOrderRef] = useState<string | null>(null);

  useEffect(() => {
    // Check if returning from ToyyibPay with a success status
    const params = new URLSearchParams(window.location.search);
    if (params.get('status_id') === '1') {
      setIsPaymentSuccess(true);
      setOrderRef(params.get('orderRef'));
    }
  }, []);

  const handleContinueShopping = () => {
    // Clear URL parameters and return to normal view
    window.history.replaceState({}, document.title, window.location.pathname);
    setIsPaymentSuccess(false);
  };

  if (isPaymentSuccess) {
    return <PaymentSuccess orderRef={orderRef} onContinueShopping={handleContinueShopping} />;
  }

  return (
    <LanguageProvider>
      <CartProvider>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Hero />
          <About />
          <GalleryBanner />
          <ProjectGallery />
          <MeetOurTeam />
          <Services />
          <YouTubeGallery />
          <Testimonials />
          <FAQ />
          <Contact />
          <section id="shop" className="py-16 bg-gray-50">
            <ShopSection />
          </section>
          <Footer />
          <ChatBot />
          <WhatsAppButton />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
};

export default App;