
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { CONTACT } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className={`text-2xl font-black tracking-tighter ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              PAKMIKE<span className="text-cyan-500">TECH</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className={`${scrolled ? 'text-gray-600' : 'text-white/90'} hover:text-cyan-500 font-bold transition-colors`}>{t.nav.home}</a>
            <a href="#services" className={`${scrolled ? 'text-gray-600' : 'text-white/90'} hover:text-cyan-500 font-bold transition-colors`}>{t.nav.services}</a>
            <a href="#projects" className={`${scrolled ? 'text-gray-600' : 'text-white/90'} hover:text-cyan-500 font-bold transition-colors`}>{t.nav.projects}</a>
            <a href="#project-timeline" className={`${scrolled ? 'text-gray-600' : 'text-white/90'} hover:text-cyan-500 font-bold transition-colors`}>{t.nav.process}</a>
            <a href="#service-request" className={`${scrolled ? 'text-gray-600' : 'text-white/90'} hover:text-cyan-500 font-bold transition-colors`}>{t.nav.support}</a>
            <a href="#about" className={`${scrolled ? 'text-gray-600' : 'text-white/90'} hover:text-cyan-500 font-bold transition-colors`}>{t.nav.about}</a>
            <a href="https://blogspot.com" target="_blank" rel="noopener noreferrer" className={`${scrolled ? 'text-gray-600' : 'text-white/90'} hover:text-cyan-500 font-bold transition-colors`}{t.nav.blog}
</a>

            
            {/* Elegant 3-way language select pill */}
            <div className={`flex items-center gap-1 rounded-full p-0.5 border transition-all duration-300 ${
              scrolled 
                ? 'bg-gray-100 border-gray-200' 
                : 'bg-white/10 border-white/15'
            }`}>
              <button 
                onClick={() => setLanguage('en')} 
                className={`px-2.5 py-1 text-[11px] font-black rounded-full transition-all pointer-events-auto cursor-pointer ${
                  language === 'en' 
                    ? 'bg-cyan-500 text-white shadow-xs' 
                    : scrolled ? 'text-gray-500 hover:text-cyan-500' : 'text-white/80 hover:text-white'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('zh')} 
                className={`px-2.5 py-1 text-[11px] font-black rounded-full transition-all pointer-events-auto cursor-pointer ${
                  language === 'zh' 
                    ? 'bg-cyan-500 text-white shadow-xs' 
                    : scrolled ? 'text-gray-500 hover:text-cyan-500' : 'text-white/80 hover:text-white'
                }`}
              >
                中
              </button>
              <button 
                onClick={() => setLanguage('ms')} 
                className={`px-2.5 py-1 text-[11px] font-black rounded-full transition-all pointer-events-auto cursor-pointer ${
                  language === 'ms' 
                    ? 'bg-cyan-500 text-white shadow-xs' 
                    : scrolled ? 'text-gray-500 hover:text-cyan-500' : 'text-white/80 hover:text-white'
                }`}
              >
                BM
              </button>
            </div>

            <a href="#contact" className="bg-cyan-500 text-white px-6 py-2.5 rounded-full font-bold hover:bg-cyan-600 hover:scale-105 transition-all flex items-center gap-2 shadow-lg shadow-cyan-400/30">
              <Phone size={18} />
              {t.nav.contact}
            </a>
          </div>

          <div className="md:hidden flex items-center gap-3">
            {/* Mobile 3-way language selector compact pill */}
            <div className={`flex items-center gap-0.5 rounded-full p-0.5 border ${
              scrolled 
                ? 'bg-gray-100 border-gray-200' 
                : 'bg-white/10 border-white/15'
            }`}>
              <button 
                onClick={() => setLanguage('en')} 
                className={`px-2 py-0.5 text-[10px] font-black rounded-full transition-all pointer-events-auto cursor-pointer ${
                  language === 'en' 
                    ? 'bg-cyan-500 text-white shadow-xs' 
                    : scrolled ? 'text-gray-500' : 'text-white/85'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('zh')} 
                className={`px-2 py-0.5 text-[10px] font-black rounded-full transition-all pointer-events-auto cursor-pointer ${
                  language === 'zh' 
                    ? 'bg-cyan-500 text-white shadow-xs' 
                    : scrolled ? 'text-gray-500' : 'text-white/85'
                }`}
              >
                中
              </button>
              <button 
                onClick={() => setLanguage('ms')} 
                className={`px-2 py-0.5 text-[10px] font-black rounded-full transition-all pointer-events-auto cursor-pointer ${
                  language === 'ms' 
                    ? 'bg-cyan-500 text-white shadow-xs' 
                    : scrolled ? 'text-gray-500' : 'text-white/85'
                }`}
              >
                BM
              </button>
            </div>
            
            <button onClick={() => setIsOpen(!isOpen)} className={`${scrolled ? 'text-gray-900' : 'text-white'}`}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-2xl absolute top-full left-0 w-full animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center text-center">
            <a href="#home" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-gray-800 text-lg font-bold border-b w-full">{t.nav.home}</a>
            <a href="#services" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-gray-800 text-lg font-bold border-b w-full">{t.nav.services}</a>
            <a href="#projects" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-gray-800 text-lg font-bold border-b w-full">{t.nav.projects}</a>
            <a href="#project-timeline" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-gray-800 text-lg font-bold border-b w-full">{t.nav.process}</a>
            <a href="#service-request" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-gray-800 text-lg font-bold border-b w-full">{t.nav.support}</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-gray-800 text-lg font-bold border-b w-full">{t.nav.about}</a>
            <a href="https://blogspot.com" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-gray-800 text-lg font-bold border-b w-full">{t.nav.blog}</a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="block px-3 py-4 text-cyan-500 text-xl font-black w-full">{t.nav.contact}</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
