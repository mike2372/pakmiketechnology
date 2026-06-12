
import React from 'react';
import { CONTACT } from '../constants';
import { Facebook, Youtube, Rss, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <span className="text-3xl font-black tracking-tighter mb-8 block text-gray-900">
              PAKMIKE<span className="text-cyan-500">TECH</span>
            </span>
            <p className="text-gray-500 mb-10 leading-relaxed font-medium">
              {t.footer.description}
            </p>
            <div className="flex gap-4">
              <a href={CONTACT.facebook} className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all shadow-sm">
                <Facebook size={20} />
              </a>
              <a href={CONTACT.youtube} className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm">
                <Youtube size={20} />
              </a>
              <a href={CONTACT.blog} className="w-12 h-12 rounded-2xl bg-gray-50 text-gray-400 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all shadow-sm">
                <Rss size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-black text-gray-900 mb-8 uppercase tracking-widest text-sm">{t.footer.company}</h4>
            <ul className="space-y-5 text-gray-500 font-bold">
              <li><a href="#home" className="hover:text-cyan-500 transition-colors">{t.nav.home}</a></li>
              <li><a href="#services" className="hover:text-cyan-500 transition-colors">{t.nav.services}</a></li>
              <li><a href="#about" className="hover:text-cyan-500 transition-colors">{t.nav.about}</a></li>
              <li><a href="#ai-editor" className="hover:text-cyan-500 transition-colors">{t.nav.aiLab}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black text-gray-900 mb-8 uppercase tracking-widest text-sm">{t.nav.services}</h4>
            <ul className="space-y-5 text-gray-500 font-bold">
              <li><a href="#services" className="hover:text-cyan-500 transition-colors">CCTV Specialists</a></li>
              <li><a href="#services" className="hover:text-cyan-500 transition-colors">DB Box Upgrade</a></li>
              <li><a href="#services" className="hover:text-cyan-500 transition-colors">Door Interlock</a></li>
              <li><a href="#services" className="hover:text-cyan-500 transition-colors">Sliding Gates</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-black text-gray-900 mb-8 uppercase tracking-widest text-sm">{t.footer.hotline}</h4>
            <ul className="space-y-5 text-gray-500 font-bold">
              <li className="flex flex-col gap-1">
                <span className="text-cyan-500">{t.footer.hotline}:</span>
                <span className="text-gray-900 font-black">{CONTACT.phone[0]}</span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-cyan-500">WhatsApp:</span>
                <span className="text-gray-900 font-black">{CONTACT.phone[1]}</span>
              </li>
              <li className="text-sm">{t.footer.specialist}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-50 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-gray-400 text-sm font-bold">
            © {new Date().getFullYear()} PAKMIKE TECHNOLOGY. DESIGNED FOR PRECISION.
          </p>
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-gray-900 font-black text-sm uppercase tracking-widest"
          >
            {t.footer.top}
            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-cyan-50 transition-all">
               <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
