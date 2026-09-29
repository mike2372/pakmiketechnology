import React, { useState } from 'react';
import { 
  Zap, 
  Target, 
  Moon, 
  Smartphone, 
  ShieldCheck, 
  Wrench, 
  PackageCheck, 
  MessageCircle, 
  ShoppingCart, 
  Check, 
  Copy, 
  Sparkles, 
  ArrowRight,
  MapPin,
  Clock,
  Play,
  Image as ImageIcon
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

export const MonthlyPromoSection: React.FC = () => {
  const { addToCart, openCart } = useCart();
  const [copied, setCopied] = useState(false);
  const [added, setAdded] = useState(false);
  const [mediaMode, setMediaMode] = useState<'video' | 'photo'>('video');

  const promoProduct = {
    id: 'ds-k1t323-existing-terminal-upgrading',
    name: 'Hikvision MinMoe DS-K1T323 Face Recognition Upgrade',
    price: 699.00,
    description: 'Existing terminal upgrading package with 2-Year Warranty. Exclusively for Simpang Ampat & Batu Kawan SMEs.',
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgXdozt9DTR9JkbDAUH1LeVCRgiChbrxEJuVFljPbkPsIJz1u2Ikg8Psb8cva4NzRrCGx-PF0I3OtAV0H-z7PBT3X11NhO6R3L0xU8H1IEJL6Pi8FwoHH5DlqihKf62cq2HLsIEJ2TYEJ_WcFxNpEQqAq5apvquJth8HIc4dK9IaCa6aSHs_pHNR-_CVUk/s1280-rw/maxresdefault.jpg'
  };

  const handleAddToCart = () => {
    addToCart(promoProduct, 1);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 3000);
  };

  const promoTextToCopy = `🔥 SIMPANG AMPAT & BATU KAWAN SMEs: UPGRADE YOUR OLD ACCESS CONTROL READER TO HIKVISION FACE RECOGNITION FROM ONLY RM699! 🔥

Attention SME business owners, factory managers, and retail shops in Simpang Ampat, Batu Kawan, Bukit Minyak, and surrounding areas!

Are you still relying on outdated card-swiping or PIN-code terminals? Lost access cards, forgotten PINs, and employee buddy-punching are draining your time, money, and security.

It's time to modernize. Seamlessly upgrade your existing door access system to the latest AI-powered Hikvision MinMoe DS-K1T323 Series Face Recognition Terminals for touchless, foolproof security!

💡 Why local SMEs are upgrading to the MinMoe 323 Series:
⚡ Instant Verification – Reads faces in less than 0.2 seconds to eliminate morning punch-in queues.
🎯 Anti-Spoofing Tech – Advanced AI means no one can punch in using printed photos or phone screens.
🌙 Industrial Ready – Works perfectly in dark warehouse entrances or low-light factory floors.
📱 Smart Monitoring – Easily track time attendance and manage staff access directly via your PC or the Hik-Connect mobile app.

We use back your existing compatible door locks and wiring, making this a quick, hassle-free upgrade with zero downtime for your operations!

🏷️ Exclusive SME Promo: From only RM699!
🛡️ Extended Protection: Comes with a solid 2-Year Warranty!
📦 Package includes: Terminal upgrade, integration with existing locks, and system setup.

📲 Secure your facility today! WhatsApp: https://wa.me/60175162938

#Hikvision #MinMoe #DSK1T323 #SMEPenang #BatuKawan #SimpangAmpat #BukitMinyak #AccessControl #FaceRecognition #TimeAttendance #SecurityUpgrade #PenangBusiness`;

  const handleCopyPost = () => {
    navigator.clipboard.writeText(promoTextToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    "Hi Pak Mike! I saw your SME Upgrade Promo (Simpang Ampat & Batu Kawan) for the Hikvision MinMoe Face Recognition terminal at RM699. I would like to schedule a quick consult / site evaluation."
  );

  return (
    <section id="promo" className="relative py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-gray-900 text-white overflow-hidden border-y border-cyan-500/20">
      {/* Background Glows & Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-600/15 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black tracking-wide uppercase bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/20 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              Monthly Promotional Special
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              Simpang Ampat • Batu Kawan • Bukit Minyak • Prai
            </span>
          </div>


        </div>

        {/* Main Content Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Offer Details & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-cyan-400 font-bold text-sm tracking-wider uppercase mb-1">
                SME Upgrade Post - Simpang Ampat & Batu Kawan
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                Upgrade Your Old Access Reader to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-300">
                  Hikvision Face Recognition
                </span>
              </h2>
              <div className="mt-3 inline-flex items-baseline gap-2">
                <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">From Only</span>
                <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">RM699</span>
                <span className="px-2.5 py-0.5 text-xs font-bold bg-amber-400/20 text-amber-300 rounded border border-amber-400/30">
                  Full Upgrade Package
                </span>
              </div>
            </div>

            {/* Pain Point & Solution Note */}
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 text-sm sm:text-base leading-relaxed backdrop-blur-sm">
              <p className="font-semibold text-white mb-2">
                Attention SME business owners, factory managers, and retail shops:
              </p>
              <p className="text-slate-300">
                Are you still relying on outdated card-swiping or PIN-code terminals? Lost access cards, forgotten PINs, and employee buddy-punching drain your time, money, and security.
              </p>
              <p className="mt-2 text-cyan-300 font-medium">
                Modernize seamlessly to AI-powered <span className="font-bold text-white">Hikvision MinMoe DS-K1T323 Series</span> for touchless, foolproof security!
              </p>
            </div>

            {/* 4 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-colors">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-white">Instant Verification</h4>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Reads faces in &lt; 0.2 seconds to eliminate morning punch-in queues.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-colors">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-white">Anti-Spoofing AI</h4>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Deep-learning prevents buddy-punching with printed photos or phone screens.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-colors">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400">
                    <Moon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-white">Industrial Ready</h4>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Performs flawlessly in low-light entrances or dark factory floors.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 transition-colors">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="p-1.5 rounded-md bg-teal-500/10 text-teal-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm text-white">Smart Monitoring</h4>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  Track attendance & staff access logs via PC or Hik-Connect mobile app.
                </p>
              </div>
            </div>

            {/* Zero Downtime & Inclusions Pill */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/40 px-3 py-2 rounded-lg border border-slate-700/40">
                <Wrench className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Uses existing locks & wiring (Zero downtime)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/40 px-3 py-2 rounded-lg border border-slate-700/40">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-emerald-300">2-Year Solid Warranty</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/40 px-3 py-2 rounded-lg border border-slate-700/40">
                <PackageCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Full terminal upgrade & setup</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <a
                href={`https://wa.me/60175162938?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-base bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp for Site Evaluation</span>
              </a>

              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-base bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-green-300" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Book Package Online (RM699)</span>
                  </>
                )}
              </button>
            </div>

            {/* Hashtag Strip */}
            <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-slate-400">
              {['#Hikvision', '#MinMoe', '#DSK1T323', '#SMEPenang', '#BatuKawan', '#SimpangAmpat', '#BukitMinyak', '#AccessControl', '#FaceRecognition', '#TimeAttendance', '#SecurityUpgrade'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded bg-slate-800/70 border border-slate-700/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Product Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md rounded-2xl overflow-hidden bg-gradient-to-b from-slate-800 to-slate-900 p-2 shadow-2xl border border-cyan-500/30 group"
            >
              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-bold">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Limited Monthly Slots</span>
              </div>

              {/* Floating Price Pill */}
              <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-amber-500 text-slate-950 text-xs font-black shadow-lg">
                FROM RM699
              </div>

              {/* Media Toggle Switch */}
              <div className="flex items-center justify-center gap-2 mb-2 pt-2 px-2">
                <button
                  type="button"
                  onClick={() => setMediaMode('video')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    mediaMode === 'video'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Live Demo Video</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMediaMode('photo')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    mediaMode === 'photo'
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Product Specs</span>
                </button>
              </div>

              {/* Terminal Video & Image Container */}
              <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center">
                {mediaMode === 'video' ? (
                  <video
                    src="/videos/hikvision-minmoe.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <>
                    <img
                      src={promoProduct.image}
                      alt="Hikvision MinMoe DS-K1T323 Series Face Recognition"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback to local access control project photo if external fails
                        e.currentTarget.src = '/images/Hikvision Biometric access control system.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  </>
                )}
              </div>

              {/* Card Footer Highlights */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-700/60 pb-2">
                  <span>Model: <strong>DS-K1T323 Series</strong></span>
                  <span className="text-emerald-400 font-semibold">Touchless AI Sensor</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Free on-site consultation in Simpang Ampat & Batu Kawan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Integrates with your existing electromagnetic locks & exit buttons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Includes cloud mobile app setup & staff training</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/60175162938?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 transition-colors"
                >
                  <span>Chat directly on WhatsApp (017-5162938)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MonthlyPromoSection;
