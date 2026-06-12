import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Award, Sparkles, MessageSquare, Briefcase, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const MeetOurTeam: React.FC = () => {
  const { t, language } = useLanguage();

  // Safely extract translations with placeholders to guarantee zero rendering errors
  const teamBadge = t.team?.badge || 'Certified Experts';
  const teamTitle = t.team?.title || 'Our Specialist Technicians';
  const teamDesc = t.team?.description || 'Experienced professional technicians serving Penang & Prai.';

  const teamMembers = [
    {
      id: 'member1',
      name: t.team?.member1?.name || 'Ah Keong',
      role: t.team?.member1?.role || 'Senior CCTV & AI Vision Lead',
      exp: t.team?.member1?.exp || '14+ Years Experience',
      bio: t.team?.member1?.bio || 'Certified IP-Camera expert specializing in H.265+ NVR server setups, fiber-optic splicing, and smart AI facial recognition systems.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
      skills: language === 'en' 
        ? ['CCTV & NVR Server', 'Optical Splicing', 'AI face ID', 'Multi-Floor Matrix'] 
        : language === 'zh'
        ? ['4K 极速监控组网', '光纤冷接熔接', 'AI 刷脸识音', '多层楼宇安防']
        : ['Server CCTV NVR', 'Splicing Gentian Optik', 'Pengecaman Wajah AI', 'Matriks Multi-Aras'],
      whatsappMsg: language === 'en'
        ? 'Hello Ah Keong, I have a query about setting up an AI CCTV camera network or routine CCTV diagnostic service.'
        : language === 'zh'
        ? '阿强师傅您好，我想向您咨询关于 4K AI 智能监控组网与摄像机镜头校准维护方案。'
        : 'Halo Ah Keong, saya ingin bertanya tentang persediaan rangkaian kamera CCTV AI atau ujian diagnostik CCTV rutin.'
    },
    {
      id: 'member2',
      name: t.team?.member2?.name || 'Rizal Bin Osman',
      role: t.team?.member2?.role || 'Mechanical Autogate & Power Engineer',
      exp: t.team?.member2?.exp || '11+ Years Experience',
      bio: t.team?.member2?.bio || 'Suruhanjaya Tenaga (ST) certified competency wireman. Master of heavy autogate motor calibration, 3-phase high-voltage db board wiring, and smart backup batteries.',
      image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=400&h=400',
      badge: 'ST CERTIFIED',
      skills: language === 'en' 
        ? ['ST Certified', '3-Phase Wiring DB', 'Autogate Motor', 'Lightning Arrestors'] 
        : language === 'zh'
        ? ['马来西亚ST能源局执照', '3相强电配电盘', '自动折叠门机头轴承', '防雷地线网络']
        : ['Bertauliah ST', 'Pendawaian DB 3-Fasa', 'Motor Gerbang Autogate', 'Penangkap Kilat'],
      whatsappMsg: language === 'en'
        ? 'Hello Rizal, I would like to consult you regarding 3-Phase power board upgrades or automatic sliding autogate motor repair.'
        : language === 'zh'
        ? 'Rizal 工程师您好，我想了解关于 3-Phase 三相强电大配电箱升级、或折叠无轨自动门电机校正调试。'
        : 'Halo Rizal, saya ingin berunding mengenai naik taraf papan kuasa 3-Fasa atau pembaikan motor autogate gelongsor.'
    },
    {
      id: 'member3',
      name: t.team?.member3?.name || 'Bala Subramaniam',
      role: t.team?.member3?.role || 'Access Control & Network Specialist',
      exp: t.team?.member3?.exp || '9+ Years Experience',
      bio: t.team?.member3?.bio || 'Local network infrastructure guru. Specialist in biometrics, high-strength magnetic smart lock hardware integrations, and cloud mobile synchronized configurations.',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400&h=400',
      skills: language === 'en' 
        ? ['Fingerprint & Face ID', 'Magnetic Smart Locks', 'WiFi Bridge Routing', 'Mobile App Sync'] 
        : language === 'zh'
        ? ['面部/指纹识别一体机', '千磅超强磁力锁扣', '远距离微波网桥', '云端APP实时同步']
        : ['Face ID & Cap Jari', 'Kunci Magnetik Pintar', 'Jambatan Wayarles WiFi', 'Segerak App Telefon'],
      whatsappMsg: language === 'en'
        ? 'Hello Bala, I need a consultation on smart biometric access control systems, magnetic locks, or multi-terminal synchronizations.'
        : language === 'zh'
        ? 'Bala 师傅您好，我想咨询关于生物识别面部指纹门禁考勤吸力锁、以及手机APP报警联动同步配置。'
        : 'Halo Bala, saya ingin berunding mengenai kawalan akses biometrik pintar, kunci magnetik, atau penyegerakan aplikasi awan.'
    }
  ];

  const handleConsult = (msg: string) => {
    const url = `https://wa.me/60175162938?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="meet-team" className="py-24 bg-white relative overflow-hidden scroll-mt-10 border-b border-gray-100">
      {/* Decorative background visual elements */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-50 rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-slate-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Headings */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-100 text-cyan-800 mb-4 border border-cyan-200">
            <Shield size={13} className="text-cyan-600 animate-pulse" />
            {teamBadge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-5">
            {teamTitle}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed font-semibold">
            {teamDesc}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group flex flex-col h-full bg-white border border-gray-150 rounded-[32px] p-5 shadow-xs hover:shadow-2xl hover:border-gray-300 transition-all duration-300 relative"
            >
              
              {/* Photo section */}
              <div className="relative rounded-[24px] overflow-hidden aspect-square w-full bg-gray-100 mb-6 shrink-0 shadow-inner">
                {/* Image element with required referrer policy */}
                <img
                  src={member.image}
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-[1.02] group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Experience Badge Overlay */}
                <div className="absolute top-4 left-4 bg-gray-950/80 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md">
                  <Award size={13} className="text-yellow-400" />
                  <span>{member.exp}</span>
                </div>

                {/* Professional stamp tag (e.g. Rizal ST Certified) */}
                {member.badge && (
                  <div className="absolute bottom-4 right-4 bg-emerald-500 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-lg shadow-md border border-emerald-400 flex items-center gap-1">
                    <Sparkles size={10} className="animate-spin duration-3000" />
                    <span>{member.badge}</span>
                  </div>
                )}
              </div>

              {/* Technician Info */}
              <div className="flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-none mb-2 group-hover:text-cyan-600 transition-colors">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-gray-500 transition-colors uppercase tracking-wider">
                    <Briefcase size={12} className="text-cyan-500 shrink-0" />
                    <span>{member.role}</span>
                  </div>
                </div>

                {/* Detailed bio */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium mb-6 flex-1">
                  {member.bio}
                </p>

                {/* Expert Specialties Pill tags */}
                <div className="space-y-2 mt-auto mb-6">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-1.5 mb-2 flex items-center gap-1">
                    <span>✨ {language === 'en' ? 'Core Expertise' : language === 'zh' ? '专修特长技艺' : 'Kepakaran Utama'}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-gray-50 text-gray-700 border border-gray-180"
                      >
                        <CheckCircle2 size={10} className="text-cyan-500" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct Action Link with Lead Technician via WhatsApp query */}
                <button
                  onClick={() => handleConsult(member.whatsappMsg)}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-900 rounded-2xl text-center font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all group-hover:bg-cyan-600 group-hover:border-cyan-600 cursor-pointer pointer-events-auto"
                >
                  <MessageSquare size={13} className="text-cyan-400 group-hover:text-white" />
                  <span>{language === 'en' ? 'Consult Me Directly' : language === 'zh' ? '直接向我咨询' : 'Rujuk Saya Terus'}</span>
                </button>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MeetOurTeam;
