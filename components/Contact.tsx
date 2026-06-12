
import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock } from 'lucide-react';
import { CONTACT } from '../constants';
import { useLanguage } from '../context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-3">{t.contact.badge}</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-8">{t.contact.title}</h3>
            <p className="text-gray-600 text-lg mb-10">
              {t.contact.description}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="bg-cyan-50 p-4 rounded-2xl text-cyan-600">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{t.contact.phone}</p>
                  <p className="text-gray-600">{CONTACT.phone[0]}</p>
                  <p className="text-cyan-600 font-semibold">{CONTACT.phone[1]} ({t.contact.whatsapp})</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-cyan-50 p-4 rounded-2xl text-cyan-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{t.contact.location}</p>
                  <p className="text-gray-600">{t.contact.locationDesc}</p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="bg-cyan-50 p-4 rounded-2xl text-cyan-600">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{t.contact.hours}</p>
                  <p className="text-gray-600">{t.contact.hoursDesc}</p>
                  <p className="text-gray-600 text-sm italic">{t.contact.emergency}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="text-2xl font-bold text-slate-900 mb-6">{t.contact.formTitle}</h4>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.name}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" placeholder={t.contact.name} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.phoneLabel}</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" placeholder={t.contact.phoneLabel} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.service}</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all bg-white">
                  <option>CCTV Installation</option>
                  <option>Electrical Wiring</option>
                  <option>Biometric Access</option>
                  <option>HR Attendance System</option>
                  <option>Autogate Solution</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact.message}</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all" placeholder={t.contact.message}></textarea>
              </div>
              <button className="w-full py-4 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-500/20">
                {t.contact.btnSend}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
