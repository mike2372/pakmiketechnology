import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  Tag, 
  AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const NewsletterSignup: React.FC = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Read translations with safe fallbacks
  const badge = t.newsletter?.badge || 'STAY UPDATED';
  const title = t.newsletter?.title || 'Subscribe to Our Tech Newsletter';
  const description = t.newsletter?.description || 'Get monthly technical checklists, safety alerts, and exclusive seasonal electrical or CCTV maintenance offers.';
  const placeholder = t.newsletter?.placeholder || 'Enter your email address';
  const buttonText = t.newsletter?.button || 'Subscribe Now';
  const successTitle = t.newsletter?.successTitle || 'Awesome, you are subscribed! 🎉';
  const successMessage = t.newsletter?.successMessage || 'We will send monthly security tips and seasonal electrical maintenance discount codes directly to your inbox.';
  const invalidEmail = t.newsletter?.invalidEmail || 'Please enter a valid email address.';

  // Check if they are already subscribed (retrieve from local storage)
  useEffect(() => {
    const savedEmail = localStorage.getItem('pakmike_subscribed_email');
    if (savedEmail) {
      setIsSubscribed(true);
      setEmail(savedEmail);
    }
  }, []);

  const validateEmail = (val: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(val).toLowerCase());
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !validateEmail(email)) {
      setError(invalidEmail);
      return;
    }

    setLoading(true);
    
    // Simulate short loader for satisfying premium feel
    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
      localStorage.setItem('pakmike_subscribed_email', email);
    }, 850);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('STORM-SAFE-10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUnsubscribe = () => {
    localStorage.removeItem('pakmike_subscribed_email');
    setIsSubscribed(false);
    setEmail('');
  };

  return (
    <section id="newsletter-signup" className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-b border-slate-800">
      {/* Soft glowing ambient grid lights */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="bg-slate-950/40 backdrop-blur-md border border-slate-800 rounded-[32px] p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl">
            
            {/* Decal lock element */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500/5 rounded-full border border-cyan-500/10 pointer-events-none flex items-center justify-center">
              <ShieldCheck size={48} className="text-cyan-500/20" />
            </div>

            <div className="text-center md:text-left md:flex md:items-center md:justify-between gap-12">
              
              <div className="max-w-xl space-y-4 md:flex-1">
                <span id="news-badge" className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Sparkles size={11} className="animate-pulse" />
                  {badge}
                </span>
                
                <h2 id="news-title" className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                  {title}
                </h2>
                
                <p id="news-desc" className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">
                  {description}
                </p>
              </div>

              {/* Form & Success interactive area */}
              <div className="mt-8 md:mt-0 w-full md:w-[380px] shrink-0">
                <AnimatePresence mode="wait">
                  {!isSubscribed ? (
                    <motion.form
                      id="newsletter-form"
                      key="signup-form"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      onSubmit={handleSubscribe}
                      className="space-y-4.5"
                    >
                      <div className="relative rounded-2xl overflow-hidden border border-slate-750 focus-within:border-cyan-500 transition-all shadow-md bg-slate-900/55 p-1">
                        <div className="flex items-center">
                          <div className="pl-4 text-slate-400">
                            <Mail size={16} />
                          </div>
                          <input
                            id="newsletter-email-input"
                            type="email"
                            placeholder={placeholder}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            className="w-full bg-transparent border-0 ring-0 focus:ring-0 focus:outline-hidden text-sm py-3.5 px-3.5 text-white font-medium placeholder-slate-400"
                          />
                        </div>
                      </div>

                      {error && (
                        <motion.div 
                          id="newsletter-error"
                          initial={{ opacity: 0, x: -10 }} 
                          animate={{ opacity: 1, x: 0 }} 
                          className="flex items-center gap-1.5 text-xs text-rose-400 font-bold"
                        >
                          <AlertCircle size={13} />
                          <span>{error}</span>
                        </motion.div>
                      )}

                      <button
                        id="newsletter-submit-btn"
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-700/60 text-slate-950 font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/10 transition-all cursor-pointer pointer-events-auto"
                      >
                        {loading ? (
                          <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>{buttonText}</span>
                            <Send size={12} />
                          </>
                        )}
                      </button>

                      <p id="news-disclaimer" className="text-[10px] text-slate-500 text-center md:text-left font-semibold">
                        🔒 No spam. Unsubscribe easily at any time.
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      id="newsletter-success-card"
                      key="success-card"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-slate-900/80 border border-emerald-500/30 rounded-2.5xl p-6.5 text-center relative overflow-hidden"
                    >
                      <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4.5">
                        <CheckCircle size={22} className="animate-bounce" />
                      </div>

                      <h4 id="success-header" className="text-lg font-black text-white mb-2 leading-tight">
                        {successTitle}
                      </h4>
                      
                      <p id="success-txt" className="text-slate-400 text-xs leading-relaxed mb-5 font-semibold">
                        {successMessage}
                      </p>

                      {/* Promo Offer Coupon Code Box */}
                      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 relative mb-4 flex flex-col items-center justify-center">
                        <span className="text-[9px] text-emerald-400 uppercase font-black tracking-widest mb-1.5 flex items-center gap-1">
                          <Tag size={10} />
                          <span>Seasonal Monsoon Promo Ready</span>
                        </span>
                        
                        <div id="coupon-display-row" className="flex items-center gap-3">
                          <span className="font-mono text-base font-black text-white tracking-widest">
                            STORM-SAFE-10
                          </span>
                          
                          <button
                            id="copy-coupon-btn"
                            onClick={handleCopyCode}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg hover:text-white transition-colors cursor-pointer pointer-events-auto"
                            title="Copy Offer Code"
                          >
                            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                          </button>
                        </div>
                        
                        <span className="text-[9px] text-slate-500 mt-1 font-bold">10% Off Off-Peak Safety Inspections</span>
                      </div>

                      {/* Unsubscribe link for full usability */}
                      <button
                        id="unsubscribe-link-btn"
                        onClick={handleUnsubscribe}
                        className="text-[10px] text-slate-500 hover:text-slate-300 underline font-bold transition-colors cursor-pointer pointer-events-auto"
                      >
                        Change subscription settings
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

export default NewsletterSignup;
