
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PromoBanner from './components/PromoBanner';
import Services from './components/Services';
import ProjectGallery from './components/ProjectGallery';
import ServiceCalculator from './components/ServiceCalculator';
import ProjectTimeline from './components/ProjectTimeline';
import CoverageMap from './components/CoverageMap';
import ImageEditor from './components/ImageEditor';
import ServiceRequestForm from './components/ServiceRequestForm';
import ServiceBooking from './components/ServiceBooking';
import LiveServiceTracker from './components/LiveServiceTracker';
import CategoryQRGenerator from './components/CategoryQRGenerator';
import About from './components/About';
import MeetOurTeam from './components/MeetOurTeam';
import TechInsights from './components/TechInsights';
import NewsletterSignup from './components/NewsletterSignup';
import ReferFriendRewards from './components/ReferFriendRewards';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import WhatsAppButton from './components/WhatsAppButton';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <PromoBanner />
        <Services />
        <ProjectGallery />
        <ServiceCalculator />
        <ProjectTimeline />
        <CoverageMap />
        <ImageEditor />
        <ServiceRequestForm />
        <ServiceBooking />
        <LiveServiceTracker />
        <CategoryQRGenerator />
        <About />
        <MeetOurTeam />
        <TechInsights />
        <Testimonials />
        <FAQ />
        <ReferFriendRewards />
        <Contact />
        <NewsletterSignup />
        <Footer />
        <ChatBot />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
};

export default App;