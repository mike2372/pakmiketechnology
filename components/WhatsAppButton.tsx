import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const WhatsAppButton: React.FC = () => {
  const { language } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  // Auto-show tooltip briefly after load to draw gentle attention, then hide
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 2500);

    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 8500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const phoneNumber = '60175162938'; // $+60175162938$ (Penang/Prai local specialist)
  
  const textMessage = language === 'en'
    ? 'Hello Pakmike Technology, I would like to inquire about your professional services in Penang / Prai.'
    : language === 'zh'
    ? '您好 Pakmike Technology，我想咨询有关您在槟城/北赖的专业安装和电气接线服务。'
    : 'Hello Pakmike Technology, saya ingin bertanya tentang perkhidmatan pemasangan dan elektrik profesional anda di Pulau Pinang / Prai.';

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textMessage)}`;

  const tooltipText = language === 'en' 
    ? 'Chat on WhatsApp' 
    : language === 'zh' 
    ? '微信 / WhatsApp 咨询' 
    : 'Sembang di WhatsApp';

  const statusText = language === 'en' 
    ? 'Online • Penang & Prai' 
    : language === 'zh' 
    ? '在线 • 槟城与北赖服务' 
    : 'Aktif • Pulau Pinang & Prai';

  return (
    <div className="fixed bottom-6 left-6 z-[100] flex items-center gap-3 select-none pointer-events-none">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="pointer-events-auto group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1ca34d] text-white rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:shadow-[0_8px_35px_rgb(37,211,102,0.6)] cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/20"
        title={tooltipText}
        id="whatsapp-float-btn"
      >
        {/* Soft green radar pulsing wave */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping group-hover:animate-none scale-105 pointer-events-none" />

        {/* Small Active Badge indicator */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-md z-15 flex items-center justify-center">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        </span>

        {/* Custom SVG WhatsApp icon for ultimate pixel-perfect precision */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-7 h-7 fill-white transition-transform duration-300 group-hover:rotate-[12deg] relative z-10"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>

      {/* Floating tooltip with a rich user interface look */}
      <div
        id="whatsapp-float-tooltip"
        className={`pointer-events-auto p-3.5 bg-white border border-gray-100 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex flex-col min-w-[180px] max-w-xs transition-all duration-300 origin-bottom-left ${
          showTooltip
            ? 'opacity-100 translate-y-0 scale-100 visible'
            : 'opacity-0 translate-y-3 scale-95 invisible'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <p className="text-xs font-bold text-[#1ca34d] uppercase tracking-wider">
            {statusText}
          </p>
        </div>
        <p className="text-sm font-extrabold text-slate-800 leading-tight">
          {language === 'en' ? 'Quick Service Inquiry' : language === 'zh' ? '快速预约与咨询服务' : 'Aduan & Pertanyaan Servis'}
        </p>
        <p className="text-[11px] text-gray-500 font-semibold mt-0.5">
          {language === 'en' ? 'Wiring, CCTV, Locks & Autogate' : language === 'zh' ? '电气、闭路电视及智能门锁自动门专线' : 'Elektrikal, CCTV, Kunci Pintar & Autogate'}
        </p>
        
        {/* Little notch arrow for bubble styling */}
        <div className="absolute w-3 h-3 bg-white border-l border-b border-gray-100 rotate-45 -left-1.5 bottom-5 shadow-xs" />
      </div>
    </div>
  );
};

export default WhatsAppButton;
