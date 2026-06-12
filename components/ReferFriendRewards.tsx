import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Users, 
  Gift, 
  Share2, 
  Copy, 
  Check, 
  AlertCircle, 
  Phone, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  UserCheck, 
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ReferFriendRewards: React.FC = () => {
  const { t, language } = useLanguage();

  const [refName, setRefName] = useState('');
  const [refPhone, setRefPhone] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friendPhone, setFriendPhone] = useState('');
  const [friendLoc, setFriendLoc] = useState('');
  const [service, setService] = useState('');
  
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Safe translation key retrieval
  const badge = t.referral?.badge || 'REFER & EARN RM50';
  const title = t.referral?.title || 'Share Security, Claim Rewards';
  const description = t.referral?.description || 'Help friends in Penang secure their properties. Get RM50 voucher for future maintenance services.';
  const labelRefDetails = t.referral?.referrerLabel || 'Your Contact Details';
  const labelFriendDetails = t.referral?.friendLabel || 'Friend’s Contact Details';
  const placeholderRefName = t.referral?.referrerName || 'Your Name';
  const placeholderRefPhone = t.referral?.referrerPhone || 'Your WhatsApp Number';
  const placeholderFriendName = t.referral?.friendName || 'Friend’s Name';
  const placeholderFriendPhone = t.referral?.friendPhone || 'Friend’s WhatsApp Number';
  const placeholderFriendLoc = t.referral?.friendLocation || 'Friend’s Location (e.g. Bayan Lepas, Prai)';
  const labelServiceType = t.referral?.serviceType || 'Interested Installation / Repair';
  const placeholderService = t.referral?.servicePlaceholder || '-- Select Service --';
  const buttonSubmit = t.referral?.submitBtn || 'Generate Referral Discount Code';
  const successTitle = t.referral?.successTitle || 'Referral Saved! 🎁';
  const successMsg = t.referral?.successMessage || 'Your reward voucher is ready. Sync via WhatsApp to lock in your RM50 rebate.';
  const shareBtnText = t.referral?.shareBtn || 'Submit & Send WhatsApp Referral';

  const servicesList = language === 'en' 
    ? ['High-Definition CCTV Camera System', 'Smart Biometric Access Control System', 'Mechanical Auto Gate Installation', '3-Phase Electrical Wiring / Db Board Repair']
    : language === 'zh'
    ? ['高档 4K 网路闭路电视监控系统', '人脸/指纹智能生物识别门禁考勤系统', '折叠无轨/平移自动大门系统安装', '3-Phase 三相强电大电箱布线与故障排查']
    : ['Sistem Kamera CCTV Definisi Tinggi', 'Sistem Kawalan Akses Biometrik Pintar', 'Pemasangan Autogate Mekanikal Gerbang', 'Pendawaian Elektrik 3-Fasa / Baik Pulih DB Board'];

  const validatePhone = (phone: string) => {
    return phone.trim().length >= 8;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!refName.trim() || !refPhone.trim() || !friendName.trim() || !friendPhone.trim() || !friendLoc.trim() || !service) {
      setError(language === 'en' ? 'All fields are strictly required.' : language === 'zh' ? '请完整填写所有推荐表格字段。' : 'Sila isi semua ruangan maklumat yang bertauliah.');
      return;
    }

    if (!validatePhone(refPhone) || !validatePhone(friendPhone)) {
      setError(language === 'en' ? 'Please provide a valid WhatsApp number (minimum 8 digits).' : language === 'zh' ? '请输入正确的 WhatsApp 联络号码（至少8位数字）。' : 'Sila kemas kini nombor WhatsApp yang sah (minimum 8 digit).');
      return;
    }

    setLoading(true);
    // Simulate process
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('REF-RM50-SAVE');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    let msgTemplate = t.referral?.whatsappMsg || '';
    
    // Replace dynamic wildcards safely
    const filledMsg = msgTemplate
      .replace('{friendName}', friendName)
      .replace('{friendPhone}', friendPhone)
      .replace('{friendLocation}', friendLoc)
      .replace('{service}', service)
      .replace('{referrerName}', refName)
      .replace('{referrerPhone}', refPhone);

    const url = `https://wa.me/60175162938?text=${encodeURIComponent(filledMsg)}`;
    window.open(url, '_blank', 'noreferrer,noopener');
  };

  const resetForm = () => {
    setRefName('');
    setRefPhone('');
    setFriendName('');
    setFriendPhone('');
    setFriendLoc('');
    setService('');
    setIsSuccess(false);
    setError('');
  };

  return (
    <section id="referral-program" className="py-24 bg-white relative overflow-hidden scroll-mt-10 border-b border-gray-100">
      
      {/* Visual background decorations for credibility and modern layout feel */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-slate-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-50/20 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Text Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-100 text-cyan-800 mb-4 border border-cyan-200">
            <Gift size={13} className="text-cyan-600 animate-bounce" />
            {badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-901 tracking-tight mb-5">
            {title}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed font-semibold">
            {description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Visual Guidelines & Trust Factors - Left Column */}
            <div className="md:col-span-5 bg-slate-950 text-white rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-8">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 block mb-2 font-mono">⚡ How it works</span>
                  <h3 className="text-2xl font-black tracking-tight leading-none text-white">
                    3 Simple Steps to RM100 Total Rewards
                  </h3>
                </div>

                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-mono text-xs font-black text-cyan-400 shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-100 leading-tight mb-1">
                        Register Friend details
                      </h4>
                      <p className="text-slate-400 text-xs font-medium leading-relaxed">
                        Input your friend's general service requirements and contact details here.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-mono text-xs font-black text-cyan-400 shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-100 leading-tight mb-1">
                        Lock in with Mike
                      </h4>
                      <p className="text-slate-400 text-xs font-medium leading-relaxed">
                        Send the generated card via WhatsApp to store the rebate code in our master registry.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-mono text-xs font-black text-cyan-400 shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-100 leading-tight mb-1">
                        Both Get RM50!
                      </h4>
                      <p className="text-slate-400 text-xs font-medium leading-relaxed">
                        Once their installation completes, we issue standard cash-back discount credit to both accounts automatically.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Trust Decal Footer */}
              <div className="mt-12 pt-6 border-t border-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-500">
                  <Shield size={20} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-black tracking-widest">Credibility Assured</span>
                  <span className="text-xs text-slate-300 font-bold leading-none">Pakmike Guarantee Program</span>
                </div>
              </div>

            </div>

            {/* Referral Form / Success Panel - Right Column */}
            <div className="md:col-span-7 bg-gray-50 border border-gray-150 rounded-[32px] p-6.5 sm:p-8 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="referral-form"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    
                    {/* Referrer Inputs Group */}
                    <div className="space-y-3.5">
                      <div className="flex items-center gap-1.5 pb-1 border-b border-gray-200">
                        <UserCheck size={14} className="text-cyan-600 shrink-0" />
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{labelRefDetails}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder={placeholderRefName}
                          value={refName}
                          onChange={(e) => setRefName(e.target.value)}
                          className="w-full bg-white border border-gray-200 text-gray-800 focus:border-cyan-500 focus:ring-0 focus:outline-hidden rounded-2xl px-4 py-3.5 text-xs font-bold"
                        />
                        <input
                          type="tel"
                          required
                          placeholder={placeholderRefPhone}
                          value={refPhone}
                          onChange={(e) => setRefPhone(e.target.value)}
                          className="w-full bg-white border border-gray-200 text-gray-800 focus:border-cyan-500 focus:ring-0 focus:outline-hidden rounded-2xl px-4 py-3.5 text-xs font-bold"
                        />
                      </div>
                    </div>

                    {/* Friend Inputs Group */}
                    <div className="space-y-3.5 pt-2">
                      <div className="flex items-center gap-1.5 pb-1 border-b border-gray-200">
                        <Users size={14} className="text-cyan-600 shrink-0" />
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{labelFriendDetails}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          placeholder={placeholderFriendName}
                          value={friendName}
                          onChange={(e) => setFriendName(e.target.value)}
                          className="w-full bg-white border border-gray-200 text-gray-800 focus:border-cyan-500 focus:ring-0 focus:outline-hidden rounded-2xl px-4 py-3.5 text-xs font-bold"
                        />
                        <input
                          type="tel"
                          required
                          placeholder={placeholderFriendPhone}
                          value={friendPhone}
                          onChange={(e) => setFriendPhone(e.target.value)}
                          className="w-full bg-white border border-gray-200 text-gray-800 focus:border-cyan-500 focus:ring-0 focus:outline-hidden rounded-2xl px-4 py-3.5 text-xs font-bold"
                        />
                      </div>

                      <div className="relative">
                        <span className="absolute inset-y-0 left-4 flex items-center pr-3 pointer-events-none text-gray-400">
                          <MapPin size={13} />
                        </span>
                        <input
                          type="text"
                          required
                          placeholder={placeholderFriendLoc}
                          value={friendLoc}
                          onChange={(e) => setFriendLoc(e.target.value)}
                          className="w-full bg-white border border-gray-200 text-gray-800 focus:border-cyan-500 focus:ring-0 focus:outline-hidden rounded-2xl pl-10 pr-4 py-3.5 text-xs font-bold"
                        />
                      </div>
                    </div>

                    {/* Service Selection details */}
                    <div className="space-y-2 pt-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block font-mono">
                        {labelServiceType}
                      </label>
                      <select
                        required
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-white border border-gray-200 text-gray-700 focus:border-cyan-500 focus:ring-0 focus:outline-hidden rounded-2xl px-4 py-3.5 text-xs font-bold"
                      >
                        <option value="">{placeholderService}</option>
                        {servicesList.map((srv) => (
                          <option key={srv} value={srv}>{srv}</option>
                        ))}
                      </select>
                    </div>

                    {/* Error message logs safely */}
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        className="flex items-center gap-1.5 text-xs text-rose-500 font-bold bg-rose-50/50 border border-rose-100 p-3 rounded-xl"
                      >
                        <AlertCircle size={14} className="text-rose-500 shrink-0" />
                        <span>{error}</span>
                      </motion.div>
                    )}

                    {/* Submit Registration button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4.5 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-xs transition-all pointer-events-auto cursor-pointer"
                    >
                      {loading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>{buttonSubmit}</span>
                          <ArrowRight size={13} />
                        </>
                      )}
                    </button>

                  </motion.form>
                ) : (
                  <motion.div
                    key="success-referral"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6 text-center"
                  >
                    <div className="w-16 h-16 bg-cyan-500/10 text-cyan-600 border border-cyan-500/20 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <Sparkles size={26} className="animate-pulse" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-2">
                        {successTitle}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-semibold">
                        {successMsg}
                      </p>
                    </div>

                    {/* Rebate code layout display */}
                    <div className="bg-white border border-gray-150 rounded-2.5xl p-5 relative overflow-hidden flex flex-col items-center justify-center shadow-inner">
                      <span className="text-[9px] font-black text-cyan-600 uppercase tracking-widest mb-1 shadow-xs bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-100">
                        Active Referral Code
                      </span>
                      
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="font-mono text-xl font-black text-slate-800 tracking-widest">
                          REF-RM50-SAVE
                        </span>
                        
                        <button
                          onClick={handleCopyCode}
                          className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 border border-gray-200 rounded-lg transition-colors cursor-pointer"
                          title="Copy Code"
                        >
                          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-1.5 text-[9px] text-gray-400 font-bold mt-3 border-t border-gray-100/60 pt-2 w-full">
                        <Clock size={11} />
                        <span>Valid for all location-based site surveys</span>
                      </div>
                    </div>

                    {/* WhatsApp sync trigger CTA */}
                    <div className="space-y-3">
                      <button
                        onClick={handleShareWhatsApp}
                        className="w-full py-4.5 bg-[#25D366] hover:bg-[#1fbc5a] text-white font-black text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 transition-all pointer-events-auto cursor-pointer"
                      >
                        <Share2 size={13} fill="currentColor" />
                        <span>{shareBtnText}</span>
                      </button>

                      <button
                        onClick={resetForm}
                        className="text-xs font-black uppercase text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto cursor-pointer"
                      >
                        {language === 'en' ? 'Refer Another Friend' : language === 'zh' ? '继续推荐其他好友' : 'Syor Rakan Seterusnya'}
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ReferFriendRewards;
