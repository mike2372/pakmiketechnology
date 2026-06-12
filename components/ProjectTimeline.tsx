import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Compass, 
  Settings, 
  Cable, 
  Hammer, 
  Award, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Info,
  Clock,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TimelineStep {
  id: number;
  durationEn: string;
  durationZh: string;
  durationMs: string;
  icon: React.ReactNode;
  titleKey: 'step1' | 'step2' | 'step3' | 'step4' | 'step5';
  descKey: 'step1_desc' | 'step2_desc' | 'step3_desc' | 'step4_desc' | 'step5_desc';
  checklistEn: string[];
  checklistZh: string[];
  checklistMs: string[];
  tipEn: string;
  tipZh: string;
  tipMs: string;
}

const ProjectTimeline: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(1);

  // Core Timeline Steps Data
  const steps: TimelineStep[] = [
    {
      id: 1,
      durationEn: '1 - 2 Hours',
      durationZh: '1 - 2 小时',
      durationMs: '1 - 2 Jam',
      icon: <Compass size={22} />,
      titleKey: 'step1',
      descKey: 'step1_desc',
      checklistEn: [
        "Identify site blind spots & security risks",
        "Assess electrical distribution board capacity",
        "Determine optimal camera lens focal lengths",
        "Provide instant cost illustration & transparency"
      ],
      checklistZh: [
        "勘测建筑监控盲区与潜在安防风险点",
        "评估配电箱、负荷余量及敷设布线路径",
        "规划闭路电视摄像头的镜头焦距及广角范围",
        "提供即时透明的项目工程预算与明细说明"
      ],
      checklistMs: [
        "Kenal pasti sudut buta & risiko keselamatan",
        "Periksa kapasiti papan pengedaran elektrikal",
        "Tentukan jarak fokus kanta kamera CCTV",
        "Sediakan sebut harga telus serta-merta tanpa komitmen"
      ],
      tipEn: 'Have your layout blueprints or electric bills ready to accelerate the design process!',
      tipZh: '准备好建筑平面图或电费账单，可以极大加速工程师设计电路路径！',
      tipMs: 'Sediakan pelan tindakan premis atau bil elektrik untuk mempercepatkan proses reka bentuk!'
    },
    {
      id: 2,
      durationEn: '1 Day',
      durationZh: '1 天',
      durationMs: '1 Hari',
      icon: <Settings size={22} />,
      titleKey: 'step2',
      descKey: 'step2_desc',
      checklistEn: [
        "Pre-configure router ports and local IP addresses",
        "Mount hardware on temporary racks for burn-in test",
        "Package specialized cables, conduits and brackets",
        "Review checklist with key installers before departures"
      ],
      checklistZh: [
        "在机房预先配置录像机端口及本地静态IP",
        "安装摄像机与门禁到测试架上进行24小时通电老化测试",
        "分类打包高品质PVC阻燃管、五金支架及高屏蔽网线",
        "出工程单前师傅对照工程图纸核对清单避免漏件"
      ],
      checklistMs: [
        "Konfigurasi port penghala & alamat IP statik tempatan",
        "Pasang peranti pada rak sementara untuk ujian ketahanan",
        "Bungkus konduit PVC prima, braket & kabel perisai khas",
        "Runding semula rajah lakaran bersama krew sebelum bertolak"
      ],
      tipEn: 'Inform us of any specific user roles or access codes you want pre-configured.',
      tipZh: '提前告知我们您需要录入的员工总数或临时访客组，我们可以帮您预录系统！',
      tipMs: 'Maklumkan kepada kami sebarang kod akses atau peranan pekerja yang ingin dipre-konfigurasi.'
    },
    {
      id: 3,
      durationEn: '1 - 3 Days',
      durationZh: '1 - 3 天',
      durationMs: '1 - 3 Hari',
      icon: <Cable size={22} />,
      titleKey: 'step3',
      descKey: 'step3_desc',
      checklistEn: [
        "Clean drill and seal premium protective conduits",
        "Incorporate noise barriers for interference-free feeds",
        "Maintain strict cabling standards & cable tie binding",
        "Clear wiring paths from moving high-heat machinery"
      ],
      checklistZh: [
        "使用专业防尘电锤施工打孔并包覆耐磨PVC线管",
        "布线铺设平直美观，拉开强弱电安全距离以阻隔电导干扰",
        "水晶头与接线端子进行专业压线保护与绝缘套管加固",
        "高电力布线严格遵守马来西亚国家电力部门Suruhanjaya Tenaga规范"
      ],
      checklistMs: [
        "Gerudi dengan teliti & sapu pelekat silikon kalis air",
        "Asingkan kabel isyarat daripada laluan elektrik arus tinggi",
        "Pemasangan konduit selari dengan tiang bangunan untuk kekemasan",
        "Sediakan sistem pelabelan kabel (Cable Labeling) profesional"
      ],
      tipEn: 'Kindly clear paths around designated cable trunking walls before our crew arrives.',
      tipZh: '请在师傅进场前，协助清空指定需排线线槽墙面周边的杂物，确保施工安全。',
      tipMs: 'Sila kosongkan laluan berhampiran dinding konduit sebelum ketibaan krew.'
    },
    {
      id: 4,
      durationEn: '1 - 2 Days',
      durationZh: '1 - 2 天',
      durationMs: '1 - 2 Hari',
      icon: <Hammer size={22} />,
      titleKey: 'step4',
      descKey: 'step4_desc',
      checklistEn: [
        "Perfect 3-axis camera fine-aligning & leveling",
        "Install heavy-duty 600lbs high magnetic holding locks",
        "Secure and weld trackless gate mechanical motor arms",
        "Weather-proof all external electric junctions & boxes"
      ],
      checklistZh: [
        "利用红外水平仪定位并进行摄像机三轴视野微调，消灭视角盲区",
        "坚固装配测试承重达600磅的智能弱电电磁控锁系统",
        "装配折叠电动门钢轴高扭矩机械感应马达并焊接支架",
        "全部户外电气接头均加装IP66专业防雨防褪色安全接线密封盒"
      ],
      checklistMs: [
        "Laraskan 3-paksi sudut kamera & penentuan ufuk",
        "Pasang kunci magnetik bersandaran tinggi 600lbs",
        "Pasang & kimpalkan lengan motor autogate dengan utuh",
        "Gunakan kotak penyambung (junction box) kalis air gred IP66"
      ],
      tipEn: 'Ensure someone with authorization is present to approve the final alignment angles on-site.',
      tipZh: '安装测试时，建议由负责人或业主在现场直接核对监控视频画面的实际广角角度！',
      tipMs: 'Pastikan wakil yang diberi kuasa hadir untuk mengesahkan sudut pandangan kamera secara langsung.'
    },
    {
      id: 5,
      durationEn: '2 - 3 Hours',
      durationZh: '2 - 3 小时',
      durationMs: '2 - 3 Jam',
      icon: <Award size={22} />,
      titleKey: 'step5',
      descKey: 'step5_desc',
      checklistEn: [
        "Execute comprehensive client system walkthrough",
        "Register primary face-Recognition and fingerprint keys",
        "Configure mobile remote monitoring apps (on Android/iOS)",
        "Activate structural 1-Year hardware and craft warranties"
      ],
      checklistZh: [
        "教导业主使用录像主机（NVR）进行本地录像回放及随身 U 盘备份抽取",
        "录入并审核高频率门禁的人脸密钥、静电指纹和授权RFID卡",
        "调式宽带网络，配置手机客户端APP，教导远程智能防盗哨警配置",
        "发放纸质精美保修画册，注册激活12个月全包全额工料售后联保服务"
      ],
      checklistMs: [
        "Selesaikan latihan walkthrough penuh bersama pemilik premis",
        "Daftar ID wajah serta cap jari pentadbir utama",
        "Lakukan ujian sandaran bateri sekiranya berlaku gangguan bekalan elektrik",
        "Serahkan dokumen waranti bertulis 1 tahun & talian sokongan 24/7"
      ],
      tipEn: 'Connect your internet router beforehand so we can program the remote cloud viewing feature.',
      tipZh: '请提早准备并调试好宽带网络和路由器，以便师傅能够当场测试手机远程连线！',
      tipMs: 'Sediakan sambungan internet router terlebih dahulu supaya kami boleh memprogramkan pemantauan awan mudah alih.'
    }
  ];

  const currentStep = steps.find(s => s.id === activeStep) || steps[0];

  // Helper translations lookup
  const badgeText = t.timeline?.badge || 'Project Journey';
  const titleText = t.timeline?.title || 'Our Installation Process';
  const descriptionText = t.timeline?.description || 'Discover how we deliver neat, high-performing electrical and security systems step-by-step from day one.';
  const estDurationLabel = t.timeline?.duration || 'Est. Duration';
  const checklistLabel = t.timeline?.checklist || 'Step Objectives';
  const tipLabel = t.timeline?.tip || 'Pro Installer Tip';

  const getStepTitle = (step: TimelineStep) => {
    return t.timeline?.[step.titleKey] || step.titleKey;
  };

  const getStepDesc = (step: TimelineStep) => {
    return t.timeline?.[step.descKey] || step.descKey;
  };

  const getStepDuration = (step: TimelineStep) => {
    if (language === 'zh') return step.durationZh;
    if (language === 'ms') return step.durationMs;
    return step.durationEn;
  };

  const getStepChecklist = (step: TimelineStep) => {
    if (language === 'zh') return step.checklistZh;
    if (language === 'ms') return step.checklistMs;
    return step.checklistEn;
  };

  const getStepTip = (step: TimelineStep) => {
    if (language === 'zh') return step.tipZh;
    if (language === 'ms') return step.tipMs;
    return step.tipEn;
  };

  return (
    <section id="project-timeline" className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
      {/* Decorative cyber grid accent lines */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-50 rounded-full blur-3xl opacity-55 pointer-events-none" />
      <div className="absolute bottom-10 left-5 w-72 h-72 bg-emerald-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-100 text-cyan-800 mb-4 border border-cyan-200">
            <Sparkles size={13} className="text-cyan-600 animate-pulse" />
            {badgeText}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tight mb-5">
            {titleText}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed font-semibold">
            {descriptionText}
          </p>
        </div>

        {/* Step Indicators Tracker (Horizontal on Desktop, Vertical list on Left for Tablet/Mobile) */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
            {steps.map((step) => {
              const isActive = step.id === activeStep;
              const isPassed = step.id < activeStep;
              
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 pointer-events-auto cursor-pointer focus:outline-hidden relative overflow-hidden group ${
                    isActive 
                      ? 'bg-slate-900 border-slate-900 shadow-lg text-white' 
                      : 'bg-gray-50 hover:bg-gray-100 border-gray-100 hover:border-gray-200 text-gray-700'
                  }`}
                  id={`timeline-step-btn-${step.id}`}
                >
                  {/* Small number count */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-black tracking-widest font-mono uppercase px-2 py-0.5 rounded-md ${
                      isActive 
                        ? 'bg-cyan-500/20 text-cyan-400' 
                        : 'bg-gray-200/60 text-gray-400'
                    }`}>
                      0{step.id}
                    </span>
                    {/* Tick or indicator icon */}
                    <div className={`transition-colors ${
                      isActive 
                        ? 'text-cyan-400' 
                        : isPassed ? 'text-emerald-500' : 'text-gray-300'
                    }`}>
                      {isActive ? <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> : step.icon}
                    </div>
                  </div>

                  {/* Title of Step */}
                  <h4 className="text-xs sm:text-xs md:text-sm font-black tracking-tight line-clamp-1">
                    {getStepTitle(step)}
                  </h4>

                  {/* Est. duration compact tag */}
                  <p className={`text-[10px] font-bold mt-1.5 font-mono ${
                    isActive ? 'text-gray-300' : 'text-gray-400'
                  }`}>
                    {getStepDuration(step)}
                  </p>

                  {/* Bottom underline accent line for active status */}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTimelineLine"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500" 
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Layout Card with Dynamic Info */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 border border-gray-100 rounded-[36px] p-8 md:p-12 relative overflow-hidden"
            >
              
              {/* Backing accent */}
              <div className="absolute top-0 right-0 p-8 text-black/[0.02] pointer-events-none select-none">
                <span className="text-9xl font-black font-mono">0{currentStep.id}</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                
                {/* Left col: Title, description, timing (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Badge & Title */}
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-black tracking-widest uppercase bg-cyan-50 border border-cyan-100 text-cyan-700">
                      <Clock size={12} />
                      {estDurationLabel}: {getStepDuration(currentStep)}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tight leading-tight">
                      {getStepTitle(currentStep)}
                    </h3>
                    <p className="text-gray-600 font-medium text-sm sm:text-base leading-relaxed pr-2">
                      {getStepDesc(currentStep)}
                    </p>
                  </div>

                  {/* Objectives Checkboxes List */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">
                      {checklistLabel}
                    </h4>
                    <div className="space-y-3">
                      {getStepChecklist(currentStep).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="bg-cyan-50 border border-cyan-100 text-cyan-600 rounded-full p-0.5 mt-0.5 shrink-0">
                            <CheckCircle size={14} className="fill-cyan-100" />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-850 font-semibold leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right col: Pro tips and Quote prompt card (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6">
                  
                  {/* Pro installer tip card */}
                  <div className="bg-white p-6 rounded-3xl border border-gray-150 relative overflow-hidden shadow-sm">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-50 rounded-bl-full flex items-center justify-center pl-4 pb-4">
                      <Info size={16} className="text-cyan-500" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-cyan-600 mb-2">
                      💡 {tipLabel}
                    </p>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed pr-6">
                      {getStepTip(currentStep)}
                    </p>
                  </div>

                  {/* Call to action card for booking */}
                  <div className="bg-gradient-to-br from-gray-900 to-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-md flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#25D366]">
                        {language === 'en' ? 'Tackle and install today' : language === 'zh' ? '开启您的安防升级之旅' : 'Mulakan Projek Anda Hari Ini'}
                      </p>
                      <h4 className="text-base font-extrabold text-white tracking-tight mt-1 leading-snug">
                        {language === 'en' ? 'Need customized planning or quick turnaround?' : language === 'zh' ? '有特殊定制化需求还是紧急工期排班？' : 'Perlukan perancangan khas atau penyiapan segera?'}
                      </h4>
                    </div>
                    
                    <button
                      onClick={() => {
                        const stageTitle = getStepTitle(currentStep);
                        const message = language === 'en'
                          ? `Hello Pakmike Technology, I am interested in regular electrical / security installation. I am reaching out to discuss Stage: "${stageTitle}"`
                          : language === 'zh'
                          ? `您好 Pakmike Technology，我想咨询我们的家庭/商业电气安全工程。我想对流程中的这一步骤开展探讨: "${stageTitle}"`
                          : `Hello Pakmike Technology, saya ingin bertanya tentang perkhidmatan kami berkait rapat dengan Langkah: "${stageTitle}"`;
                        window.open(`https://wa.me/60175162938?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
                      }}
                      className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-cyan-950/20 transition-all cursor-pointer pointer-events-auto"
                      id="timeline-cta-btn"
                    >
                      <span>{language === 'en' ? 'Consult Installer' : language === 'zh' ? '咨询工程总监' : 'Runding Pakar'}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>

                </div>

              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default ProjectTimeline;
