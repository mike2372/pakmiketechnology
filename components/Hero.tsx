
import React from 'react';
import { ArrowRight, Sparkles, Activity } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
         <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-cyan-400 rounded-full blur-[120px]"></div>
         <div className="absolute top-1/2 -left-24 w-[400px] h-[400px] bg-blue-300 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-600 px-4 py-2 rounded-full text-sm font-bold mb-8 border border-cyan-100 shadow-sm">
              <Sparkles size={16} />
              {t.hero.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-8">
              {t.hero.title1} <span className="text-cyan-500">{t.hero.titleHighlight}</span> {t.hero.title2}
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl font-medium">
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <a href="#services" className="px-10 py-5 bg-gray-900 text-white rounded-2xl font-black text-center hover:bg-cyan-500 transition-all flex items-center justify-center gap-3 group shadow-xl shadow-gray-200">
                {t.hero.btnServices}
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
              </a>
              <a href="#ai-editor" className="px-10 py-5 bg-white text-cyan-600 border-2 border-cyan-100 rounded-2xl font-black text-center hover:border-cyan-500 hover:bg-cyan-50 transition-all flex items-center justify-center gap-2">
                {t.hero.btnAi}
                <Activity size={20} />
              </a>
            </div>

            <div className="mt-16 flex flex-wrap gap-10">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-gray-900 tracking-tight">100%</span>
                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">{t.hero.stat1}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-gray-900 tracking-tight">24/7</span>
                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">{t.hero.stat2}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-black text-gray-900 tracking-tight">{t.hero.stat3.split(' ')[0]}</span>
                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest mt-1">{t.hero.stat3.substring(t.hero.stat3.indexOf(' ') + 1)}</span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block animate-in fade-in zoom-in-95 duration-1000">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white">
              <img 
                src="/images/hero.jpg.jpg" 
                alt="Modern Tech Office" 
                className="w-full h-[600px] object-cover"
              />
            </div>
            {/* Floating Element */}
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-cyan-50 z-20 animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-cyan-500 rounded-2xl flex items-center justify-center text-white">
                  <Activity size={32} />
                </div>
                <div>
                  <p className="font-black text-gray-900 text-lg">{t.hero.floating}</p>
                  <p className="text-gray-400 text-sm font-bold uppercase">{t.hero.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
