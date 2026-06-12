import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Camera, 
  Fingerprint, 
  Lock, 
  Zap, 
  Plus, 
  Minus, 
  Calculator, 
  ArrowRight, 
  ShieldCheck, 
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

const ServiceCalculator: React.FC = () => {
  const { t, language } = useLanguage();

  // Selected item states
  const [cctvCount, setCctvCount] = useState<number>(4);    // Default 4 cameras
  const [accessCount, setAccessCount] = useState<number>(1); // Default 1 door
  const [hasAutogate, setHasAutogate] = useState<boolean>(false);
  const [wiringPoints, setWiringPoints] = useState<number>(8); // Default 8 points

  // Penang/Prai Local industry standards (RM)
  const CCTV_PRICE_PER_UNIT = 220;    // Standard IP Cam with installation
  const ACCESS_PRICE_PER_UNIT = 450;  // Biometric Terminal + Magnetic Lock with installation
  const AUTOGATE_BASE_PRICE = 1450;   // High-performance trackless folding motor with installation
  const WIRING_PRICE_PER_UNIT = 95;   // Standard premium point wiring + termination

  // Math calculation
  const cctvSubtotal = cctvCount * CCTV_PRICE_PER_UNIT;
  const accessSubtotal = accessCount * ACCESS_PRICE_PER_UNIT;
  const autogateSubtotal = hasAutogate ? AUTOGATE_BASE_PRICE : 0;
  const wiringSubtotal = wiringPoints * WIRING_PRICE_PER_UNIT;
  const estimatedTotal = cctvSubtotal + accessSubtotal + autogateSubtotal + wiringSubtotal;

  const handleIncrement = (val: number, setter: React.Dispatch<React.SetStateAction<number>>, max: number = 32) => {
    setter(prev => Math.min(prev + 1, max));
  };

  const handleDecrement = (val: number, setter: React.Dispatch<React.SetStateAction<number>>, min: number = 0) => {
    setter(prev => Math.max(prev - 1, min));
  };

  // Safe translation accessors
  const badgeText = t.calculator?.badge || 'Price Estimator';
  const titleText = t.calculator?.title || 'Service & Installation Calculator';
  const descriptionText = t.calculator?.description || 'Select your preferred components to calculate a reliable, custom-tailored quote estimate including hardware and professional local installation.';
  const cctvTitle = t.calculator?.cctvTitle || 'CCTV Security Cameras';
  const cctvDesc = t.calculator?.cctvDesc || 'High-definition weather-proof IP cameras with night vision and server backup.';
  const accessTitle = t.calculator?.accessTitle || 'Biometric Access Control';
  const accessDesc = t.calculator?.accessDesc || 'Fingerprint, RFID card, or facial recognition keypad handles with magnetic locks.';
  const autogateTitle = t.calculator?.autogateTitle || 'Automatic Folding Gate';
  const autogateDesc = t.calculator?.autogateDesc || 'Trackless heavy-duty smooth folding motor systems with remote controls.';
  const wiringTitle = t.calculator?.wiringTitle || 'New Wiring / Lighting Points';
  const wiringDesc = t.calculator?.wiringDesc || 'Premium professional point installation, power sockets, or lighting connections.';
  const approxTotalText = t.calculator?.approxTotal || 'Estimated Project Total';
  const disclaimerText = t.calculator?.disclaimer || 'Disclaimer: This calculation provides a high-level approximate price based on typical installation requirements in Penang and Prai. Final quotes are confirmed during our free on-site survey inspection.';
  const btnRequestText = t.calculator?.btnRequest || 'Inquire via WhatsApp';

  // Format Whatsapp Inquiry
  const handleInquiry = () => {
    const phoneNumber = '60175162938';
    const message = language === 'en'
      ? `Hello Pakmike Technology, I would like to inquire about the estimate I calculated on your website:
- CCTV Security Cameras: ${cctvCount} unit(s) (RM ${cctvSubtotal})
- Smart Access Points: ${accessCount} point(s) (RM ${accessSubtotal})
- Trackless Autogate: ${hasAutogate ? 'Yes' : 'No'} (RM ${autogateSubtotal})
- New Wiring Points: ${wiringPoints} point(s) (RM ${wiringSubtotal})
-----------------------------------------
Estimated Total: RM ${estimatedTotal}

I would like to schedule a free site survey in Penang/Prai.`
      : language === 'zh'
      ? `您好 Pakmike Technology，我想咨询我在贵网站上估算的项目方案：
- 闭路监控安全摄像机 (CCTV): ${cctvCount} 台 (RM ${cctvSubtotal})
- 智能门禁控制系统: ${accessCount} 个点位 (RM ${accessSubtotal})
- 无轨折叠式电动马达门: ${hasAutogate ? '是' : '否'} (RM ${autogateSubtotal})
- 新接线/照明布线点: ${wiringPoints} 个点位 (RM ${wiringSubtotal})
-----------------------------------------
预计项目总计: RM ${estimatedTotal}

我想安排在槟城/北赖进行免费的现场测量勘察。`
      : `Hello Pakmike Technology, saya ingin bertanya tentang anggaran harga yang saya kira di laman web anda:
- Kamera Keselamatan CCTV: ${cctvCount} unit (RM ${cctvSubtotal})
- Mata Akses Pintu Pintar: ${accessCount} mata (RM ${accessSubtotal})
- Autogate Lipat Tanpa Trek: ${hasAutogate ? 'Ya' : 'Tidak'} (RM ${autogateSubtotal})
- Mata Pendawaian Baharu: ${wiringPoints} mata (RM ${wiringSubtotal})
-----------------------------------------
Jumlah Kasar Anggaran: RM ${estimatedTotal}

Saya berminat untuk menetapkan masa tinjauan tapak percuma di Pulau Pinang/Prai draf anggaran ini.`;

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pricing-calculator" className="py-24 bg-gray-50 relative overflow-hidden border-t border-b border-gray-100">
      {/* Decorative gradient glowing circles */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-100 text-cyan-800 mb-4 border border-cyan-200">
            <Calculator size={14} className="animate-spin-slow text-cyan-600" />
            {badgeText}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tight mb-5">
            {titleText}
          </h2>
          <p className="text-gray-650 text-base md:text-lg leading-relaxed font-semibold">
            {descriptionText}
          </p>
        </div>

        {/* Form and display results grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left panel: Config choices (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. CCTV Cameras component */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                    <Camera size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">{cctvTitle}</h3>
                    <p className="text-xs text-gray-400 font-semibold mt-1 leading-snug">{cctvDesc}</p>
                    <p className="text-xs text-cyan-500 font-bold mt-2">~RM {CCTV_PRICE_PER_UNIT} {language === 'en' ? 'per node completely installed' : language === 'zh' ? '每个节点带全包安装' : 'setiap unit siap dipasang'}</p>
                  </div>
                </div>

                {/* Counter control */}
                <div className="flex items-center gap-4 self-end sm:self-auto bg-gray-50 border border-gray-100 rounded-full p-1.5">
                  <button 
                    onClick={() => handleDecrement(cctvCount, setCctvCount)}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-red-500 border border-gray-100 shadow-sm active:scale-90 transition-all pointer-events-auto cursor-pointer"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-extrabold text-lg text-gray-900 font-mono">
                    {cctvCount}
                  </span>
                  <button 
                    onClick={() => handleIncrement(cctvCount, setCctvCount)}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-cyan-600 border border-gray-100 shadow-sm active:scale-90 transition-all pointer-events-auto cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Access control points component */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                    <Fingerprint size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">{accessTitle}</h3>
                    <p className="text-xs text-gray-400 font-semibold mt-1 leading-snug">{accessDesc}</p>
                    <p className="text-xs text-cyan-500 font-bold mt-2">~RM {ACCESS_PRICE_PER_UNIT} {language === 'en' ? 'per access point setup' : language === 'zh' ? '每个门禁系统配置' : 'setiap poin akses pintu'}</p>
                  </div>
                </div>

                {/* Counter control */}
                <div className="flex items-center gap-4 self-end sm:self-auto bg-gray-50 border border-gray-100 rounded-full p-1.5">
                  <button 
                    onClick={() => handleDecrement(accessCount, setAccessCount)}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-red-500 border border-gray-100 shadow-sm active:scale-90 transition-all pointer-events-auto cursor-pointer"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-extrabold text-lg text-gray-900 font-mono">
                    {accessCount}
                  </span>
                  <button 
                    onClick={() => handleIncrement(accessCount, setAccessCount)}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-cyan-600 border border-gray-100 shadow-sm active:scale-90 transition-all pointer-events-auto cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* 3. Autogate system selection */}
            <div 
              onClick={() => setHasAutogate(!hasAutogate)}
              className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 cursor-pointer pointer-events-auto ${
                hasAutogate 
                  ? 'bg-gradient-to-br from-white to-cyan-50/20 border-cyan-300 shadow-md shadow-cyan-100/50' 
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3.5 rounded-2xl border transition-colors ${
                  hasAutogate 
                    ? 'bg-cyan-500 text-white border-cyan-400' 
                    : 'bg-cyan-50 text-cyan-600 border-cyan-100'
                }`}>
                  <Lock size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">{autogateTitle}</h3>
                    <span className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      hasAutogate ? 'bg-cyan-100 text-cyan-800' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {hasAutogate ? (language === 'en' ? 'Included' : language === 'zh' ? '已选用' : 'Dipilih') : (language === 'en' ? 'Add Item' : language === 'zh' ? '添加项目' : 'Tambah')}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 font-semibold mt-1 leading-snug">{autogateDesc}</p>
                  <p className="text-xs text-cyan-500 font-bold mt-2">~RM {AUTOGATE_BASE_PRICE} {language === 'en' ? 'per arm motor kit system' : language === 'zh' ? '每整套无轨折叠门臂马达系统' : 'per set sistem motor lengan'}</p>
                </div>
              </div>
            </div>

            {/* 4. Wiring points selection */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 hover:border-cyan-200 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3.5 rounded-2xl bg-cyan-50 border border-cyan-100 text-cyan-600">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 tracking-tight">{wiringTitle}</h3>
                    <p className="text-xs text-gray-400 font-semibold mt-1 leading-snug">{wiringDesc}</p>
                    <p className="text-xs text-cyan-500 font-bold mt-2">~RM {WIRING_PRICE_PER_UNIT} {language === 'en' ? 'per Point wiring task' : language === 'zh' ? '每个照明或插座走线点位' : 'setiap mata pendawaian'}</p>
                  </div>
                </div>

                {/* Counter control */}
                <div className="flex items-center gap-4 self-end sm:self-auto bg-gray-50 border border-gray-100 rounded-full p-1.5">
                  <button 
                    onClick={() => handleDecrement(wiringPoints, setWiringPoints)}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-red-500 border border-gray-100 shadow-sm active:scale-90 transition-all pointer-events-auto cursor-pointer"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-10 text-center font-extrabold text-lg text-gray-900 font-mono">
                    {wiringPoints}
                  </span>
                  <button 
                    onClick={() => handleIncrement(wiringPoints, setWiringPoints)}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-cyan-600 border border-gray-100 shadow-sm active:scale-90 transition-all pointer-events-auto cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right panel: Live calculated summary and CTA link (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-b from-gray-900 to-slate-950 text-white p-8 md:p-10 rounded-[36px] shadow-2xl relative overflow-hidden border border-slate-800">
              
              {/* Abstract cyber grid decorative accent */}
              <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:16px_16px] opacity-5 pointer-events-none" />

              <h3 className="text-xl font-extrabold tracking-tight text-white mb-6 flex items-center gap-2">
                <ShieldCheck size={20} className="text-cyan-400" />
                {language === 'en' ? 'Project Configuration Summary' : language === 'zh' ? '项目预算配置单' : 'Ringkasan Konfigurasi Projek'}
              </h3>

              {/* Subtotal bill rows */}
              <div className="space-y-4 font-semibold text-sm border-b border-white/10 pb-6 mb-6">
                
                {/* CCTV Cam row */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">
                    CCTV ({cctvCount} {language === 'en' ? 'unit(s)' : language === 'zh' ? '台' : 'unit'})
                  </span>
                  <span className="font-mono text-gray-200">RM {cctvSubtotal}</span>
                </div>

                {/* Smart door access row */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">
                    Access ({accessCount} {language === 'en' ? 'door(s)' : language === 'zh' ? '门' : 'pintu'})
                  </span>
                  <span className="font-mono text-gray-200">RM {accessSubtotal}</span>
                </div>

                {/* Autogate system row */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">
                    Autogate system
                  </span>
                  <span className="font-mono text-gray-200">RM {autogateSubtotal}</span>
                </div>

                {/* Wiring points row */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">
                    Wiring ({wiringPoints} {language === 'en' ? 'point(s)' : language === 'zh' ? '点位' : 'mata'})
                  </span>
                  <span className="font-mono text-gray-200">RM {wiringSubtotal}</span>
                </div>
              </div>

              {/* Grand Total output section */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-[#25D366] font-black">{approxTotalText}</p>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xl font-extrabold text-cyan-400">RM</span>
                  <span className="text-5xl md:text-6xl font-black tracking-tight text-white font-mono animate-fade-in">
                    {estimatedTotal}
                  </span>
                </div>
              </div>

              {/* WhatsApp direct booking action button */}
              <button
                onClick={handleInquiry}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1ca34d] text-white py-4 px-6 rounded-2xl font-black tracking-tight flex items-center justify-center gap-3 shadow-lg shadow-green-950/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 font-sans cursor-pointer pointer-events-auto"
                id="calculator-whatsapp-cta"
              >
                <span>{btnRequestText}</span>
                <ArrowRight size={18} />
              </button>

              {/* Local Free survey notice banner inside card */}
              <div className="mt-6 flex gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                <Info size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  {disclaimerText}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ServiceCalculator;
