
import React from 'react';
import { ExternalLink, Facebook, Youtube } from 'lucide-react';
import { CONTACT } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-[8px] border-gray-50">
              <img 
                src="/images/about.jpg" 
                alt="Engineering Precision" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Visual Flair */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-cyan-100 rounded-full -z-0 blur-3xl opacity-50"></div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-4">{t.about.badge}</h2>
            <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
              {t.about.title.split('&')[0]} <span className="text-cyan-500">&</span> {t.about.title.split('&')[1]}
            </h3>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
              {t.about.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <p className="font-black text-xl text-gray-900 mb-1">{t.about.card1}</p>
                <p className="text-sm text-gray-500 font-bold uppercase">{t.about.card1Sub}</p>
              </div>
              <div className="p-6 bg-cyan-50 rounded-3xl border border-cyan-100">
                <p className="font-black text-xl text-cyan-900 mb-1">{t.about.card2}</p>
                <p className="text-sm text-cyan-600 font-bold uppercase">{t.about.card2Sub}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a 
                href={CONTACT.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-cyan-600 transition-all shadow-lg"
              >
                <Facebook size={20} />
                Facebook
              </a>
              <a 
                href={CONTACT.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white text-red-600 border-2 border-red-50 px-8 py-4 rounded-2xl font-black hover:bg-red-50 transition-all"
              >
                <Youtube size={20} />
                YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
