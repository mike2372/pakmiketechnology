import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Search, 
  Compass, 
  CheckCircle, 
  AlertCircle, 
  Building2, 
  Navigation,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ZoneItem {
  name: string;
  nameZh: string;
  nameMs: string;
  zone: 'Island' | 'Mainland' | 'Outer';
  type: 'rapid' | 'standard';
  dist: string;
}

const CoverageMap: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTown, setSelectedTown] = useState<ZoneItem | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  // High quality list of Penang and Prai zones we cover
  const locations: ZoneItem[] = useMemo(() => [
    { name: 'Prai / Perai', nameZh: '北赖', nameMs: 'Perai', zone: 'Mainland', type: 'rapid', dist: '0 km (HQ)' },
    { name: 'Georgetown', nameZh: '乔治市', nameMs: 'Georgetown', zone: 'Island', type: 'rapid', dist: '12 km (Main HQ)' },
    { name: 'Bukit Mertajam', nameZh: '大山脚', nameMs: 'Bukit Mertajam', zone: 'Mainland', type: 'rapid', dist: '8 km' },
    { name: 'Butterworth', nameZh: '北海', nameMs: 'Butterworth', zone: 'Mainland', type: 'rapid', dist: '6 km' },
    { name: 'Bayan Lepas', nameZh: '峇六拜', nameMs: 'Bayan Lepas', zone: 'Island', type: 'standard', dist: '16 km' },
    { name: 'Seberang Jaya', nameZh: '诗不朗再也', nameMs: 'Seberang Jaya', zone: 'Mainland', type: 'rapid', dist: '4 km' },
    { name: 'Batu Kawan', nameZh: '峇都交湾', nameMs: 'Batu Kawan', zone: 'Mainland', type: 'standard', dist: '15 km' },
    { name: 'Gurney Drive', nameZh: '新关仔角', nameMs: 'Gurney Drive', zone: 'Island', type: 'standard', dist: '14 km' },
    { name: 'Gelugor', nameZh: '牛汝莪', nameMs: 'Gelugor', zone: 'Island', type: 'standard', dist: '13 km' },
    { name: 'Tanjung Tokong', nameZh: '丹绒tokong', nameMs: 'Tanjung Tokong', zone: 'Island', type: 'standard', dist: '17 km' },
    { name: 'Air Itam', nameZh: '亚依淡', nameMs: 'Air Itam', zone: 'Island', type: 'standard', dist: '15 km' },
    { name: 'Simpang Ampat', nameZh: '新邦安拔', nameMs: 'Simpang Ampat', zone: 'Mainland', type: 'standard', dist: '19 km' },
    { name: 'Balik Pulau', nameZh: '浮罗山背', nameMs: 'Balik Pulau', zone: 'Island', type: 'standard', dist: '28 km' },
    { name: 'Batu Ferringhi', nameZh: '巴都丁宜', nameMs: 'Batu Ferringhi', zone: 'Island', type: 'standard', dist: '24 km' },
    { name: 'Nibong Tebal', nameZh: '高渊', nameMs: 'Nibong Tebal', zone: 'Mainland', type: 'standard', dist: '32 km' },
    { name: 'Kepala Batas', nameZh: '甲抛峇底', nameMs: 'Kepala Batas', zone: 'Mainland', type: 'standard', dist: '22 km' },
  ], []);

  // Filter suggested list based on user typing
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return locations.filter(loc => 
      loc.name.toLowerCase().includes(query) || 
      loc.nameZh.toLowerCase().includes(query) || 
      loc.nameMs.toLowerCase().includes(query)
    );
  }, [searchQuery, locations]);

  const selectLocation = (loc: ZoneItem) => {
    setSelectedTown(loc);
    setSearchQuery(getLocalizedName(loc));
  };

  const getLocalizedName = (loc: ZoneItem) => {
    if (language === 'zh') return loc.nameZh;
    if (language === 'ms') return loc.nameMs;
    return loc.name;
  };

  // Safe translations lookup
  const badgeText = t.coverage?.badge || 'Service Areas';
  const titleText = t.coverage?.title || 'Our Service Coverage';
  const descriptionText = t.coverage?.description || 'We proudly serve both Penang Island and the Prai Mainland.';
  const searchPlaceholder = t.coverage?.searchPlaceholder || 'Search your town...';
  const islandTitle = t.coverage?.islandTitle || 'Penang Island (Zone A)';
  const mainlandTitle = t.coverage?.mainlandTitle || 'Prai & Mainland (Zone B)';
  const activeStatus = t.coverage?.activeStatus || '100% Free Consultation ✅';
  const rapidZoneText = t.coverage?.rapidZone || '⚡ Rapid Response Zone (Within 1 Hour)';
  const outerZoneText = t.coverage?.outerZone || '🚗 Covered Area (Free Site Survey)';
  const statusCovered = t.coverage?.statusCovered || 'Yes! We fully cover this area.';
  const buttonCheck = t.coverage?.buttonCheck || 'Check Status';

  // Popular quick links
  const popularTowns = ['Prai / Perai', 'Georgetown', 'Bukit Mertajam', 'Butterworth', 'Bayan Lepas'];

  return (
    <section id="coverage" className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Visual background details */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-50 rounded-full blur-3xl opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title Grid */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-100 text-emerald-800 mb-4 border border-emerald-200">
            <Compass size={14} className="animate-spin-slow text-emerald-600" />
            {badgeText}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-901 tracking-tight mb-5">
            {titleText}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed font-semibold">
            {descriptionText}
          </p>
        </div>

        {/* Core Coverage Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left Panel: High tech interactive vector SVG map of Penang & Seberang Perai */}
          <div className="lg:col-span-6 bg-slate-950 rounded-[40px] p-6 md:p-8 flex flex-col justify-between border border-slate-800 shadow-2xl relative overflow-hidden min-h-[480px]">
            {/* Soft grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-15 pointer-events-none" />
            
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-black tracking-widest text-emerald-400 uppercase">
                  {language === 'en' ? 'Live Coverage Visualizer' : language === 'zh' ? '实时覆盖范围可视化' : 'Visualisasi Liputan Aktif'}
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-gray-500 uppercase">
                Penang Geo-Zone V1.3
              </span>
            </div>

            {/* Simulated interactive vector map container of Penang & Prai */}
            <div className="relative flex-1 flex items-center justify-center min-h-[300px]">
              
              {/* Central Vector SVG representation */}
              <svg viewBox="0 0 400 320" className="w-full max-w-md h-auto text-slate-800 relative z-10 select-none">
                
                {/* Connecting Bridge lines */}
                <path d="M 130 150 L 250 155" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4,4" className="animate-pulse" />
                <path d="M 115 195 L 270 215" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="4,4" opacity="0.8" />

                {/* PENANG ISLAND SHAPE (Zone A) */}
                <path 
                  d="M 60 70 C 90 70, 105 50, 115 80 C 125 100, 140 120, 135 150 C 130 180, 120 200, 125 220 C 130 240, 100 245, 90 235 C 80 225, 75 230, 65 210 C 55 190, 50 150, 55 120 C 60 90, 45 70, 60 70 Z" 
                  fill="#1e293b" 
                  stroke="#334155" 
                  strokeWidth="2" 
                  className={`transition-all duration-300 ${selectedTown?.zone === 'Island' ? 'fill-cyan-950/40 stroke-cyan-400' : 'hover:fill-slate-900'}`}
                />

                {/* MAINLAND SEBERANG PERAI SHAPE (Zone B) */}
                <path 
                  d="M 235 40 L 310 35 L 320 110 L 335 180 L 325 250 L 315 285 L 265 280 L 250 200 L 250 140 L 235 100 Z" 
                  fill="#0f172a" 
                  stroke="#1e293b" 
                  strokeWidth="2"
                  className={`transition-all duration-300 ${selectedTown?.zone === 'Mainland' ? 'fill-teal-950/40 stroke-teal-400' : 'hover:fill-slate-900'}`}
                />

                {/* Pulsing Base Radars on HQ points */}
                {/* 1. Georgetown Radar */}
                <circle cx="120" cy="110" r="16" fill="#38bdf8" opacity="0.15" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="120" cy="110" r="6" fill="#0ea5e9" stroke="#ffffff" strokeWidth="1.5" />
                
                {/* 2. Prai Mainland HQ Radar */}
                <circle cx="260" cy="130" r="22" fill="#10b981" opacity="0.2" className="animate-ping" style={{ animationDuration: '2.5s' }} />
                <circle cx="260" cy="130" r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />

                {/* Additional Key node coordinates */}
                {/* Butterworth */}
                <circle 
                  cx="255" cy="85" r="4.5" 
                  fill={hoveredPoint === 'Butterworth' ? '#38bdf8' : '#64748b'} 
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredPoint('Butterworth')}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                
                {/* Bukit Mertajam (BM) */}
                <circle 
                  cx="285" cy="165" r="4.5" 
                  fill={hoveredPoint === 'Bukit Mertajam' ? '#38bdf8' : '#64748b'} 
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredPoint('Bukit Mertajam')}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                
                {/* Bayan Lepas */}
                <circle 
                  cx="110" cy="180" r="4.5" 
                  fill={hoveredPoint === 'Bayan Lepas' ? '#38bdf8' : '#64748b'} 
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredPoint('Bayan Lepas')}
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* Simpang Ampat */}
                <circle 
                  cx="290" cy="225" r="4.5" 
                  fill={hoveredPoint === 'Simpang Ampat' ? '#38bdf8' : '#64748b'} 
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredPoint('Simpang Ampat')}
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* Map Labels for elegance */}
                <text x="68" y="150" fill="#475569" fontSize="10" fontWeight="900" letterSpacing="0.05em">PENANG ISLAND</text>
                <text x="280" y="265" fill="#475569" fontSize="10" fontWeight="900" letterSpacing="0.05em">MAINLAND (PRAI)</text>
                
                <text x="127" y="106" fill="#38bdf8" fontSize="8" fontWeight="800">Georgetown</text>
                <text x="272" y="134" fill="#34d399" fontSize="8" fontWeight="800">Prai HQ</text>
              </svg>

              {/* Real-time Tooltip Box Floating based on Map Interaction */}
              <AnimatePresence>
                {hoveredPoint && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-4 left-4 right-4 bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center justify-between shadow-2xl relative z-20"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
                      <div>
                        <p className="text-xs font-black text-white">{hoveredPoint}</p>
                        <p className="text-[10px] text-gray-400 font-semibold">{language === 'en' ? 'Fully Active Support • 100% Covered' : language === 'zh' ? '全范围支持 • 100%覆盖' : 'Sokongan Penuh • 100% Diliputi'}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-cyan-400">
                      Zone B
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Static informational footer map key to show user we cover everything */}
            <div className="mt-6 border-t border-white/5 pt-4 flex flex-wrap justify-between items-center gap-3 text-white/70">
              <div className="flex items-center gap-4 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shrink-0" />
                  {language === 'en' ? 'Main HQs' : language === 'zh' ? '服务中心' : 'HQ Utama'}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-cyan-500 rounded-full shrink-0" />
                  {language === 'en' ? 'Active Stations' : language === 'zh' ? '重点安装点' : 'Stesen Aktif'}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-slate-600 rounded-full shrink-0" />
                  {language === 'en' ? 'Town Limits' : language === 'zh' ? '服务边界' : 'Had Sempadan'}
                </span>
              </div>
              <div className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-emerald-400 font-bold tracking-wider font-mono">
                100% PENANG COVERED
              </div>
            </div>

          </div>

          {/* Right Panel: Interactive Coverage Checker UI */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            
            <div className="space-y-6">
              
              {/* Coverage Checker form title & card */}
              <div className="bg-gray-50 border border-gray-100 p-6 md:p-8 rounded-[32px]">
                
                <h3 className="text-xl font-extrabold text-gray-900 tracking-tight mb-2 flex items-center gap-2">
                  <Building2 size={20} className="text-cyan-500" />
                  {language === 'en' ? 'Interactive Area Checker' : language === 'zh' ? '交互式服务区域查询' : 'Penyemak Kawasan Interaktif'}
                </h3>
                <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
                  {language === 'en' 
                    ? 'Enter your commercial outlet, residence, shop, or factory building site in Penang to verify direct free inspection schedules.' 
                    : language === 'zh'
                    ? '输入您在槟城的商业店面、住宅、商铺或工厂位置，点击即可一键查询我们在北赖与槟岛的快速上门测绘支持。'
                    : 'Sila masukkan premis perniagaan, kediaman, kedai, atau kilang anda di Pulau Pinang untuk menyemak ketersediaan lawatan tapak percuma.'}
                </p>

                {/* Input Search Container */}
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (selectedTown) setSelectedTown(null);
                    }}
                    placeholder={searchPlaceholder}
                    className="w-full pl-11 pr-32 py-4 bg-white border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-150 rounded-2xl outline-hidden text-sm font-semibold transition-all shadow-xs text-gray-900"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => { setSearchQuery(''); setSelectedTown(null); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-red-500 pointer-events-auto cursor-pointer"
                    >
                      {language === 'en' ? 'Clear' : language === 'zh' ? '清空' : 'Padam'}
                    </button>
                  )}
                </div>

                {/* Auto Suggestions popup */}
                <AnimatePresence>
                  {suggestions.length > 0 && !selectedTown && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="bg-white border border-gray-150 rounded-2xl overflow-hidden shadow-xl mb-4 max-h-52 overflow-y-auto"
                    >
                      {suggestions.map((loc) => (
                        <button
                          key={loc.name}
                          onClick={() => selectLocation(loc)}
                          className="w-full text-left px-5 py-3.5 hover:bg-cyan-50 hover:text-cyan-800 transition-colors border-b border-gray-50 last:border-b-0 text-xs font-bold text-gray-700 flex justify-between items-center cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-cyan-500" />
                            <span>{getLocalizedName(loc)}</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-500 font-mono">
                            {loc.zone}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Popular Quick-Select Towns */}
                <div>
                  <p className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-3">
                    {language === 'en' ? 'Popular Local Hubs:' : language === 'zh' ? '热点高频安装城镇：' : 'Kawasan Carian Popular:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {locations.filter(l => popularTowns.includes(l.name)).map((loc) => (
                      <button
                        key={loc.name}
                        onClick={() => selectLocation(loc)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all pointer-events-auto cursor-pointer ${
                          selectedTown?.name === loc.name 
                            ? 'bg-cyan-500 text-white border-cyan-400 font-extrabold shadow-sm'
                            : 'bg-white border-gray-100 text-gray-600 hover:border-cyan-300 hover:text-cyan-600'
                        }`}
                      >
                        {getLocalizedName(loc)}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Real-time calculated status message based on search choice */}
              <AnimatePresence mode="wait">
                {selectedTown ? (
                  <motion.div
                    key={selectedTown.name}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="p-6 md:p-8 rounded-[32px] border border-emerald-100 bg-emerald-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 border border-emerald-200 text-emerald-800">
                        <CheckCircle size={11} />
                        {selectedTown.type === 'rapid' ? rapidZoneText : outerZoneText}
                      </span>
                      <h4 className="text-xl font-black text-gray-900 tracking-tight">
                        {getLocalizedName(selectedTown)} • {selectedTown.zone === 'Island' ? islandTitle : mainlandTitle}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed font-semibold">
                        {statusCovered}
                      </p>
                      <p className="text-[11px] text-gray-400 font-bold">
                        {language === 'en' ? 'Approx. Distance calculation:' : language === 'zh' ? '预计距离参数：' : 'Anggaran Jarak Tapak:'} <span className="font-mono text-cyan-600 font-extrabold">{selectedTown.dist}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const whatsappMsg = language === 'en' 
                          ? `Hello Pakmike, I noticed you cover ${selectedTown.name} in Penang. I would like to arrange an on-site survey inspection for our location: ${getLocalizedName(selectedTown)}`
                          : language === 'zh'
                          ? `您好 Pakmike，我看到你们的服务涵盖槟城的 ${selectedTown.nameZh}。我想为我们的地址安排一个免费的现场测绘和方案制定：${getLocalizedName(selectedTown)}`
                          : `Hello Pakmike, saya dapati anda meliputi kawasan ${selectedTown.nameMs} di Pulau Pinang. Saya ingin membuat janji temu tinjauan tapak percuma untuk alamat kami: ${getLocalizedName(selectedTown)}`;
                        window.open(`https://wa.me/60175162938?text=${encodeURIComponent(whatsappMsg)}`, '_blank', 'noopener,noreferrer');
                      }}
                      className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-900 shadow-md font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 pointer-events-auto cursor-pointer"
                    >
                      <Navigation size={13} className="text-cyan-400" />
                      <span>{language === 'en' ? 'Book Survey' : language === 'zh' ? '立即测绘' : 'Pahatkan Slot'}</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 md:p-8 rounded-[32px] border border-cyan-100 bg-cyan-55/10 flex items-start gap-4"
                  >
                    <AlertCircle size={20} className="text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">{activeStatus}</h4>
                      <p className="text-xs text-gray-500 font-semibold leading-relaxed mt-1">
                        {language === 'en' 
                          ? 'We provide coverage everywhere in Penang state including all core parts of Penang Island and Seberang Perai. Select your town above to schedule instant consultations.'
                          : language === 'zh'
                          ? '我们的技术团队全覆盖槟城州各个县属，包含槟岛全部主要商区及威省/北赖各大工业、住宅和商业中心区域。点击或搜索上方城镇可预约安排最快当天上门实地看场。'
                          : 'Perkhidmatan teknikal kami merangkumi seluruh negeri Pulau Pinang termasuk kawasan perumahan, komersial, dan pusat perindustrian utama. Pilih atau cari bandar anda di atas.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Direct Instant Hotline Call Widget for Quick Scheduling */}
            <div className="mt-8 bg-gradient-to-r from-cyan-900/5 to-slate-900/5 rounded-[28px] border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500 text-white rounded-full">
                  <PhoneCall size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {language === 'en' ? 'Call Office Hotline' : language === 'zh' ? '办公室固话及安装咨询热线' : 'Hubungi Talian Utama'}
                  </p>
                  <p className="text-lg font-black text-gray-900 font-mono mt-0.5">
                    +6017-516 2938
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href="tel:+60175162938"
                  className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 hover:text-cyan-600 border border-gray-200 rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 pointer-events-auto"
                >
                  {language === 'en' ? 'Call Now' : language === 'zh' ? '拨号致电' : 'Hubungi'}
                </a>
                <a
                  href="#contact"
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-bold text-xs shadow-sm shadow-cyan-500/20 transition-all flex items-center gap-1 pointer-events-auto"
                >
                  <span>{language === 'en' ? 'Request Callback' : language === 'zh' ? '留下电话回拨' : 'Minta Hubungi'}</span>
                  <Sparkles size={11} />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CoverageMap;
