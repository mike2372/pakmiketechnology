
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ProjectGallery from './components/ProjectGallery';
import ProjectTimeline from './components/ProjectTimeline';
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

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <About />
        <ProjectGallery />
        <MeetOurTeam />
        <Services />
        <ProjectTimeline />
        <YouTubeGallery />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
        <ChatBot />
        <WhatsAppButton />
      </div>
    </LanguageProvider>
  );
};

export default App;