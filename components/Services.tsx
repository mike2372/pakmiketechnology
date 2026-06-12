
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { getServices, getIcon } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Services: React.FC = () => {
  const { t, language } = useLanguage();
  const servicesList = getServices(language);

  return (
    <section id="services" className="py-24 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-4">{t.services.badge}</h2>
          <p className="text-4xl md:text-5xl font-black text-gray-900 mb-6">{t.services.title}</p>
          <div className="w-24 h-2 bg-cyan-500 mx-auto rounded-full mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg font-medium">
            {t.services.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesList.map((service) => (
            <div 
              key={service.id} 
              className="bg-white p-10 rounded-[32px] border border-gray-100 hover:border-cyan-300 hover:shadow-[0_20px_50px_rgba(8,145,178,0.1)] transition-all duration-500 group"
            >
              <div className="mb-8 inline-block p-5 bg-cyan-50 rounded-[24px] group-hover:bg-cyan-500 transition-colors duration-500">
                <div className="text-cyan-600 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  {getIcon(service.icon)}
                </div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed font-medium">
                {service.description}
              </p>
              <ul className="space-y-4 mb-10">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-gray-700 font-bold text-sm">
                    <CheckCircle2 size={18} className="text-cyan-500 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
              <a 
                href="#contact" 
                className="text-cyan-600 font-black text-sm inline-flex items-center gap-2 hover:gap-4 transition-all"
              >
                {t.services.requestQuote}
                <span className="text-2xl leading-none">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
