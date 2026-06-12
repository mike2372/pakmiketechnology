import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  QrCode, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Tag, 
  MapPin, 
  Settings, 
  Zap, 
  Video, 
  Fingerprint, 
  Clock, 
  ShieldAlert,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import QRCode from 'qrcode';

interface ServiceCategoryQR {
  id: string;
  systemName: string;
  displayTitle: string;
  zhTitle: string;
  msTitle: string;
  icon: string;
  defaultLocation: string;
  bgTailwind: string;
  borderTailwind: string;
  textTailwind: string;
}

const CategoryQRGenerator: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedCategoryId, setSelectedCategoryId] = useState('cctv');
  const [customLocation, setCustomLocation] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  // The 5 core systems
  const categories: ServiceCategoryQR[] = [
    {
      id: 'cctv',
      systemName: 'CCTV Cameras & NVR',
      displayTitle: 'CCTV & Alarm Protection',
      zhTitle: 'CCTV 监控与智能报警系统',
      msTitle: 'Perlindungan CCTV & Penggera',
      icon: 'video',
      defaultLocation: 'Main Server Cabinet',
      bgTailwind: 'bg-cyan-500/10',
      borderTailwind: 'border-cyan-500/20',
      textTailwind: 'text-cyan-400'
    },
    {
      id: 'wiring',
      systemName: 'Electrical DB Power Board',
      displayTitle: 'Electrical Distribution Board',
      zhTitle: '三相配电箱及强电布线',
      msTitle: 'Sistem Papan DB Elektrik',
      icon: 'zap',
      defaultLocation: 'Main Distribution Room',
      bgTailwind: 'bg-amber-500/10',
      borderTailwind: 'border-amber-500/20',
      textTailwind: 'text-amber-400'
    },
    {
      id: 'biometric',
      systemName: 'Biometric / Access Control',
      displayTitle: 'Biometric Gate & Access',
      zhTitle: '生物识别及人脸识别门禁',
      msTitle: 'Akses Biometrik & Penyata',
      icon: 'fingerprint',
      defaultLocation: 'Office Main Entrance',
      bgTailwind: 'bg-purple-500/10',
      borderTailwind: 'border-purple-500/30',
      textTailwind: 'text-purple-400'
    },
    {
      id: 'autogate',
      systemName: 'Trackless Autogate System',
      displayTitle: 'Automatic Folding Autogate',
      zhTitle: '无轨折叠式电动大门',
      msTitle: 'Sistem Autogate Automatik',
      icon: 'settings',
      defaultLocation: 'Factory Outer Gatehouse',
      bgTailwind: 'bg-pink-500/10',
      borderTailwind: 'border-pink-500/25',
      textTailwind: 'text-pink-400'
    },
    {
      id: 'hr-attendance',
      systemName: 'Alarm Security System', // Pre-populated or maps nicely as alarm
      displayTitle: 'System Safety Alarms',
      zhTitle: '智能报警与防盗广播系统',
      msTitle: 'Sistem Penggera Keselamatan',
      icon: 'clock',
      defaultLocation: 'Reception Counter Wall',
      bgTailwind: 'bg-emerald-500/10',
      borderTailwind: 'border-emerald-500/20',
      textTailwind: 'text-emerald-400'
    }
  ];

  const activeCategory = categories.find(c => c.id === selectedCategoryId) || categories[0];

  // Derive final deep link URL
  const generateDeepLink = () => {
    try {
      const baseUrl = window.location.origin + window.location.pathname;
      return `${baseUrl}?systemType=${encodeURIComponent(activeCategory.systemName)}#service-request`;
    } catch (e) {
      return `https://hdcctvs.blogspot.com/?systemType=${encodeURIComponent(activeCategory.systemName)}`;
    }
  };

  // Regeneration whenever category or parameters change
  useEffect(() => {
    const linkUrl = generateDeepLink();
    setIsGenerating(true);
    
    // Generate QR with optimal contrast ratios
    QRCode.toDataURL(linkUrl, {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 450,
      color: {
        dark: '#020617', // Slate 950 deep contrast
        light: '#ffffff'
      }
    })
    .then(url => {
      setQrImageUrl(url);
      setIsGenerating(false);
    })
    .catch(err => {
      console.error('QR code generation failed', err);
      setIsGenerating(false);
    });
  }, [selectedCategoryId]);

  const handleCopyLink = () => {
    const rawLink = generateDeepLink();
    navigator.clipboard.writeText(rawLink)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Copy link failed: ', err));
  };

  const handleDownload = () => {
    if (!qrImageUrl) return;
    const a = document.createElement('a');
    a.href = qrImageUrl;
    a.download = `pakmike-qr-${activeCategory.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    // Generate specialized standalone print window to layout only the QR badge cleanly
    const badgeLabel = customLocation.trim() || activeCategory.defaultLocation;
    const sysTitle = language === 'zh' ? activeCategory.zhTitle : language === 'ms' ? activeCategory.msTitle : activeCategory.displayTitle;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Technical Tag - ${activeCategory.systemName}</title>
          <style>
            @media print {
              body { margin: 0; padding: 0; }
            }
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #fff;
              color: #000;
              margin: 0;
            }
            .badge-container {
              width: 380px;
              border: 5px double #000;
              padding: 24px;
              text-align: center;
              border-radius: 12px;
              box-shadow: none;
              box-sizing: border-box;
            }
            .header-brand {
              font-size: 20px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 1px;
              border-bottom: 2px solid #000;
              padding-bottom: 8px;
              margin-bottom: 12px;
            }
            .sub-brand {
              font-size: 11px;
              font-weight: bold;
              margin-bottom: 14px;
              color: #333;
              text-transform: uppercase;
            }
            .qr-wrapper {
              margin: 15px auto;
              width: 200px;
              height: 200px;
              border: 1px solid #ddd;
              padding: 4px;
            }
            .qr-image {
              width: 100%;
              height: 100%;
              display: block;
            }
            .system-type {
              font-size: 16px;
              font-weight: bold;
              margin: 8px 0;
              text-transform: uppercase;
              border-top: 1px dashed #000;
              padding-top: 10px;
            }
            .installed-at {
              font-size: 12px;
              font-weight: normal;
              margin-bottom: 15px;
              background: #f0f0f0;
              padding: 6px;
              font-family: monospace;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              border: 1px solid #ccc;
              border-radius: 4px;
            }
            .instruction-text {
              font-size: 9px;
              font-weight: bold;
              color: #000;
              line-height: 1.4;
              border-top: 2px solid #000;
              padding-top: 10px;
              text-transform: uppercase;
            }
            .footer-line {
              font-size: 8px;
              font-family: monospace;
              margin-top: 5px;
              color: #555;
            }
          </style>
        </head>
        <body>
          <div class="badge-container">
            <div class="header-brand">PAKMIKE TECHNOLOGY</div>
            <div class="sub-brand">ELECTRICAL &amp; SECURITY SOLUTIONS</div>
            
            <div class="installed-at">
              LOCATION: ${badgeLabel}
            </div>

            <div class="qr-wrapper">
              <img class="qr-image" src="${qrImageUrl}" />
            </div>

            <div class="system-type">${sysTitle}</div>
            
            <div class="instruction-text">
              SCAN WITH PHONE CAMERA FOR INSTANT上门SERVICE REQUEST DETAILS &amp; DIAGNOSTIC ASSISTANCE
            </div>
            <div class="footer-line">HELPLINE: +6017-516 2938 | PENANG, MALAYSIA</div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Safe translations extractor
  const tr = t.qrGenerator || {
    badge: 'PRINTABLE QR DESKTOP',
    title: 'Scan & Launch Request Form',
    sub: 'Need a physical QR code for your warehouse, shopfront, or distribution board? Generate & print specialized QR codes to let users scan on mobile and instantly load the technical request form.',
    systemLabel: 'Select System Category',
    scanAction: 'Scan on Mobile',
    btnPrint: 'Print Badge',
    btnDownload: 'Download QR Code',
    copied: 'Copied link to clipboard!',
    copyLink: 'Copy Direct Link',
    customTitle: 'Frame Text / Location Label',
    customPlaceholder: 'e.g., Boiler Room DB, Main Entrance, Office Server Pack...',
    scannedSub: 'This QR deep-links directly under Penang local server routing.',
    previewText: 'SCAN ME FOR INSTANT SPEC-SHEET & ASSISTANCE',
  };

  const getSvcIcon = (name: string) => {
    switch (name) {
      case 'zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'video': return <Video className="w-5 h-5 text-cyan-400" />;
      case 'clock': return <Clock className="w-5 h-5 text-emerald-400" />;
      case 'fingerprint': return <Fingerprint className="w-5 h-5 text-purple-400" />;
      case 'settings': return <Settings className="w-5 h-5 text-pink-400" />;
      default: return <QrCode className="w-5 h-5 text-slate-400" />;
    }
  };

  // Direct trigger simulator Link for testing in Dev Preview
  const handleSimulateClick = () => {
    // Dipatch a custom event window level
    const selectEvent = new CustomEvent('pakmike-select-service', {
      detail: { systemType: activeCategory.systemName }
    });
    window.dispatchEvent(selectEvent);
  };

  return (
    <section id="qr-generator" className="py-24 bg-slate-900 border-t border-slate-800 text-white relative overflow-hidden">
      {/* Decorative backdrop shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <QrCode size={12} className="text-cyan-400" />
            <span>{tr.badge}</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-3 font-sans">
            {tr.title}
          </h2>
          <p className="text-slate-400 mt-3 text-sm md:text-base leading-relaxed font-semibold">
            {tr.sub}
          </p>
        </div>

        {/* Major Tool Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Controls Panel (Left side) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 bg-slate-950/60 border border-slate-800 p-6 md:p-8 rounded-3xl">
            
            <div className="space-y-6">
              {/* 1. Selector Title */}
              <div>
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-3.5">
                  {tr.systemLabel}
                </label>
                
                {/* Visual Category grid selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((cat) => {
                    const isSelected = selectedCategoryId === cat.id;
                    const catTitle = language === 'zh' ? cat.zhTitle : language === 'ms' ? cat.msTitle : cat.displayTitle;
                    
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategoryId(cat.id)}
                        className={`p-4 rounded-2xl text-left border-2 flex items-center gap-3.5 transition-all cursor-pointer pointer-events-auto ${
                          isSelected 
                            ? 'bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-950/10' 
                            : 'bg-slate-950/40 border-slate-850 hover:border-slate-750 hover:bg-slate-900/50'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl ${cat.bgTailwind} ${cat.textTailwind} shrink-0`}>
                          {getSvcIcon(cat.icon)}
                        </div>
                        <div>
                          <p className="text-xs font-black text-white group-hover:text-cyan-400 leading-tight">
                            {catTitle}
                          </p>
                          <p className="text-[10px] text-slate-500 font-bold font-mono mt-0.5 leading-none">
                            {cat.systemName}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Custom Location input */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 block">
                  <Tag size={13} className="text-cyan-400" />
                  <span>{tr.customTitle}</span>
                </label>
                
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder={tr.customPlaceholder}
                  className="w-full bg-slate-950 border-2 border-slate-850 rounded-2xl px-4.5 py-3.5 text-xs font-semibold text-white placeholder-slate-500 outline-hidden focus:border-cyan-500/50 transition-all font-mono"
                />
                
                <p className="text-[10px] font-semibold text-slate-500 flex items-center gap-1">
                  <MapPin size={11} className="text-cyan-500" />
                  <span>Default location matches: <code>{activeCategory.defaultLocation}</code> if empty.</span>
                </p>
              </div>
            </div>

            {/* Direct Trigger actions for testing */}
            <div className="pt-6 border-t border-slate-850 space-y-4">
              <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-850 flex items-start gap-3">
                <Info size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-300 leading-tight">
                    Dual QR Channel Routing Active
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                    Once scans occur from tablets or Android/iOS, our deep URL router automatically selects the specified category inside the Request Module on-site.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-3">
                {/* Simulated mobile router jump link */}
                <button
                  type="button"
                  onClick={handleSimulateClick}
                  className="w-full sm:w-auto px-4 py-3 bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/30 font-bold text-xs rounded-xl transition-all cursor-pointer pointer-events-auto flex items-center justify-center gap-2"
                >
                  <ExternalLink size={13} />
                  <span>Test Scan Redirect</span>
                </button>

                {/* Copier link button */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full sm:w-auto px-4 py-3 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-850 hover:border-slate-750 font-bold text-xs rounded-xl transition-all cursor-pointer pointer-events-auto flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="text-emerald-400" size={13} />
                      <span className="text-emerald-400">{tr.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>{tr.copyLink}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Sticker Preview Render Block (Right side) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-950 border border-slate-800 rounded-3xl p-6 relative">
            
            {/* Visual Industrial Tick marks */}
            <div className="absolute top-4 left-4 text-slate-850 font-mono text-[9px] font-black select-none">┌─── PM-TECH sticker preview ───</div>
            <div className="absolute bottom-4 right-4 text-slate-850 font-mono text-[9px] font-black select-none">───────────────────────────────┘</div>

            {/* Inner Sticker layout (Printable Mock) */}
            <div 
              ref={printAreaRef}
              className="bg-white text-slate-950 p-[18px] md:p-[22px] rounded-2xl border-[3px] border-slate-900 w-full max-w-[340px] flex flex-col items-stretch space-y-4 shadow-2xl relative overflow-hidden text-center"
            >
              {/* Tech Header bar */}
              <div className="border-b-2 border-slate-900 pb-2.5">
                <h4 className="text-sm font-black tracking-widest text-slate-950 font-sans leading-none uppercase">
                  PAKMIKE TECHNOLOGY
                </h4>
                <p className="text-[8px] font-black tracking-widest text-slate-600 font-mono mt-1 leading-none uppercase">
                  Penang Electrical &amp; Security Engineering
                </p>
              </div>

              {/* Status Location ID badge */}
              <div className="bg-slate-100 border border-slate-300 rounded-lg p-2 flex flex-col items-center justify-center font-mono">
                <span className="text-[7px] text-slate-500 font-black tracking-widest uppercase mb-0.5 block leading-none">
                  INSTALLATION METADATA / LOCATION
                </span>
                <span className="text-xs font-black text-slate-950 truncate max-w-full uppercase tracking-wide">
                  {customLocation.trim() || activeCategory.defaultLocation}
                </span>
              </div>

              {/* QR Image Frame */}
              <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs mx-auto w-40 h-40 flex items-center justify-center relative">
                {isGenerating ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/90">
                    <span className="text-[10px] font-mono animate-pulse">GENERATING...</span>
                  </div>
                ) : (
                  qrImageUrl && (
                    <img 
                      src={qrImageUrl} 
                      alt="Pakmike Service QR Link" 
                      className="w-full h-full object-contain select-none"
                    />
                  )
                )}
              </div>

              {/* Category Designation tag */}
              <div className="text-center">
                <span className="inline-block px-3 py-1.5 bg-slate-900 text-white font-mono text-[9px] font-black rounded-md tracking-wider uppercase">
                  {language === 'zh' ? activeCategory.zhTitle : language === 'ms' ? activeCategory.msTitle : activeCategory.displayTitle}
                </span>
              </div>

              {/* Scanning helper text */}
              <div className="border-t-2 border-slate-900 pt-2 text-[8px] font-black tracking-wider text-slate-900 leading-normal uppercase">
                {tr.previewText}
              </div>

              <div className="text-[6.5px] font-mono text-slate-500 leading-none">
                HOTLINE: +6017-516 2938 | PENANG, MY
              </div>
            </div>

            {/* Sticker Execution Panel (Download + Prints) */}
            <div className="w-full max-w-[340px] mt-6.5 grid grid-cols-2 gap-3 font-semibold text-xs">
              
              {/* PRINT BTN */}
              <button
                type="button"
                onClick={handlePrint}
                className="py-3 px-4 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black rounded-xl uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer pointer-events-auto"
              >
                <Printer size={13} />
                <span>{tr.btnPrint}</span>
              </button>

              {/* DOWNLOAD BTN */}
              <button
                type="button"
                onClick={handleDownload}
                className="py-3 px-4 bg-slate-905 hover:bg-slate-850 text-white hover:text-cyan-400 border border-slate-800 hover:border-slate-750 font-black rounded-xl uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer pointer-events-auto"
              >
                <Download size={13} />
                <span>{tr.btnDownload}</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CategoryQRGenerator;
