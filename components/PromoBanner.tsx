import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Clock, 
  Sparkles, 
  Tag, 
  Copy, 
  Check, 
  ExternalLink, 
  Timer, 
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PromoBanner: React.FC = () => {
  const { t, language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });
  const [isClaimed, setIsClaimed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Safely grab translations with localized defaults
  const badge = t.promo?.badge || 'LIMITED TIME OFFER';
  const tagline = t.promo?.tagline || '⚡ Monsoon Season Protection Special';
  const title = t.promo?.title || 'Get 15% OFF CCTV Systems & 3-Phase Safety Wiring Inspections';
  const sub = t.promo?.sub || 'Ensure your Penang residency or factory is safe from tropical lightning surges and monsoon power failures.';
  const daysLabel = t.promo?.days || 'Days';
  const hoursLabel = t.promo?.hours || 'Hrs';
  const minutesLabel = t.promo?.minutes || 'Min';
  const secondsLabel = t.promo?.seconds || 'Sec';
  const claimBtn = t.promo?.claimBtn || 'Lock In My 15% Discount';
  const endsIn = t.promo?.endsIn || 'Offer ends in:';
  const expiredLabel = t.promo?.expired || 'OFFER HAS EXPIRED';
  const successMsg = t.promo?.successMessage || 'Congratulations! Your premium discount code is locked in: MONSOON-15. Please mention this code to our specialists.';

  // Check if they already claimed the code previously
  useEffect(() => {
    const claimed = localStorage.getItem('pakmike_promo_claimed');
    if (claimed === 'true') {
      setIsClaimed(true);
    }
  }, []);

  // Set evergreen countdown target relative to 11th June 2026.
  // If the target (June 25, 2026 23:59:59) is in the past, we use an evergreen 4-day fallback to assure the demo remains active and delightful forever.
  useEffect(() => {
    const getTargetDate = () => {
      const fixedTarget = new Date("2026-06-25T23:59:59+08:00").getTime();
      const now = Date.now();
      
      if (fixedTarget > now) {
        return fixedTarget;
      }
      
      // Fallback evergreen mechanism
      const savedEvergreen = localStorage.getItem('pakmike_evergreen_promo_target_new');
      if (savedEvergreen) {
        const parsed = parseInt(savedEvergreen, 10);
        if (parsed > now) return parsed;
      }
      
      // Set to 4 days, 6 hours, 20 minutes from the first encounter
      const newTarget = now + (4 * 24 * 60 * 60 * 1000) + (6 * 60 * 60 * 1000) + (20 * 60 * 1000);
      localStorage.setItem('pakmike_evergreen_promo_target_new', newTarget.toString());
      return newTarget;
    };

    const targetTime = getTargetDate();

    const calculateTime = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClaim = () => {
    setIsClaimed(true);
    localStorage.setItem('pakmike_promo_claimed', 'true');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('MONSOON-15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppInquiry = () => {
    const textMsg = language === 'en' 
      ? 'Hello Pakmike Technology! I claimed my 15% discount for Seasonal Monsoon Protection (Code: MONSOON-15). I would like to book a site safety inspection / CCTV survey.'
      : language === 'zh'
      ? '阿张师傅您好！我锁定了你们的雨季大特惠 15% 现金代金券（特惠码: MONSOON-15）。我想预约师傅上门为我们的店面/住家做强电安全布线检测或闭路电视排查。'
      : 'Hello Pakmike Technology! Saya telah mengklaim kupon diskaun 15% Perlindungan Musim Tengkujuh (Kod: MONSOON-15). Saya ingin membuat temu janji pemeriksaan keselamatan atau tinjauan CCTV.';
    
    const waUrl = `https://wa.me/60175162938?text=${encodeURIComponent(textMsg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="seasonal-promo" className="py-16 bg-slate-950 text-white relative overflow-hidden border-t-2 border-b border-cyan-500/25">
      {/* Decorative lightning surge grid effects */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Visual neon strip on top to anchor attention */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-linear-to-r from-cyan-500 via-amber-400 to-cyan-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-900/45 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Offer details column */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span id="promo-badge" className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Clock size={11} className="animate-spin" style={{ animationDuration: '6s' }} />
                  {badge}
                </span>

                <span id="promo-tagline" className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Sparkles size={11} />
                  {tagline}
                </span>
              </div>

              <h2 id="promo-title" className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                {title}
              </h2>

              <p id="promo-sub" className="text-slate-400 text-sm md:text-base leading-relaxed font-semibold max-w-2xl">
                {sub}
              </p>

              {/* Trust disclaimer badge listing */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2.5 pt-2 text-xs text-slate-500 font-bold">
                <span className="flex items-center gap-1.5">
                  🛡️ Certified Penang Techs
                </span>
                <span className="flex items-center gap-1.5">
                  ⚡ Surge Protection Focused
                </span>
                <span className="flex items-center gap-1.5">
                  ✅ Zero Booking Surcharge
                </span>
              </div>
            </div>

            {/* Countdown widget and action button column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="bg-slate-950/80 border border-slate-800 rounded-2.5xl p-6.5 sm:p-8 w-full max-w-sm shadow-xl text-center relative overflow-hidden backdrop-blur-md">
                
                {/* Visual Timer header info */}
                <div className="flex items-center justify-center gap-1.5 text-slate-400 text-xs font-black uppercase tracking-widest mb-4.5">
                  <Timer size={14} className="text-cyan-400 animate-pulse" />
                  <span>{endsIn}</span>
                </div>

                {/* Countdown visual clocks */}
                {!timeLeft.isExpired ? (
                  <div className="grid grid-cols-4 gap-2.5 mb-7">
                    {/* Days */}
                    <div className="flex flex-col items-center">
                      <div className="h-14 w-full bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-xl font-mono font-black text-white relative">
                        <span>{String(timeLeft.days).padStart(2, '0')}</span>
                        <div className="absolute inset-x-0 h-[1px] bg-slate-950 top-1/2" />
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1.5 font-bold uppercase tracking-widest">{daysLabel}</span>
                    </div>

                    {/* Hours */}
                    <div className="flex flex-col items-center">
                      <div className="h-14 w-full bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-xl font-mono font-black text-white relative">
                        <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                        <div className="absolute inset-x-0 h-[1px] bg-slate-950 top-1/2" />
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1.5 font-bold uppercase tracking-widest">{hoursLabel}</span>
                    </div>

                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                      <div className="h-14 w-full bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-xl font-mono font-black text-white relative">
                        <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <div className="absolute inset-x-0 h-[1px] bg-slate-950 top-1/2" />
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1.5 font-bold uppercase tracking-widest">{minutesLabel}</span>
                    </div>

                    {/* Seconds */}
                    <div className="flex flex-col items-center">
                      <div className="h-14 w-full bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-xl font-mono font-black text-cyan-400 relative">
                        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <div className="absolute inset-x-0 h-[1px] bg-slate-950 top-1/2" />
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1.5 font-bold uppercase tracking-widest">{secondsLabel}</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-6 mb-7 text-rose-450 flex flex-col items-center justify-center gap-2">
                    <AlertTriangle size={32} className="text-rose-500 animate-bounce" />
                    <span className="text-sm font-black uppercase tracking-widest">{expiredLabel}</span>
                  </div>
                )}

                {/* Substantially Claim Discount logic with AnimatePresence */}
                <AnimatePresence mode="wait">
                  {!isClaimed ? (
                    <motion.button
                      key="claim-btn"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      onClick={handleClaim}
                      disabled={timeLeft.isExpired}
                      className="w-full py-4.5 bg-linear-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-550 disabled:cursor-not-allowed text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:scale-[1.01] transition-all cursor-pointer pointer-events-auto"
                    >
                      <Tag size={13} fill="currentColor" />
                      <span>{claimBtn}</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="claimed-box"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-4"
                    >
                      {/* Active Promocode panel */}
                      <div className="bg-slate-900 border border-emerald-500/25 rounded-xl p-4 flex flex-col items-center justify-center">
                        <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-black flex items-center gap-1 mb-1">
                          <Check size={11} className="text-emerald-400" />
                          <span>Code Activated</span>
                        </span>

                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-lg font-black text-white tracking-widest selection:bg-slate-800">
                            MONSOON-15
                          </span>
                          
                          <button
                            onClick={handleCopyCode}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-350 rounded-lg hover:text-white transition-colors cursor-pointer pointer-events-auto"
                            title="Copy Code"
                          >
                            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                          </button>
                        </div>
                        
                        <p className="text-[9px] text-slate-500 mt-2 font-bold leading-normal">
                          15% off smart surveillance & fuse boards validation
                        </p>
                      </div>

                      <p className="text-[10px] text-slate-400 text-center font-bold">
                        {successMsg}
                      </p>

                      <button
                        onClick={handleWhatsAppInquiry}
                        className="w-full py-4.5 bg-[#25D366] hover:bg-[#1fbc5a] text-white font-black text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-emerald-500/10 transition-all cursor-pointer pointer-events-auto"
                      >
                        <ExternalLink size={12} />
                        <span>Book Site Inspection Now</span>
                      </button>

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
