import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Search, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Truck, 
  FileText, 
  ArrowRight,
  ShieldAlert,
  Loader2,
  Cpu,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LocalTicket {
  id: string;
  name: string;
  phone: string;
  location: string;
  systemType: string;
  serviceType: string;
  priority: 'low' | 'medium' | 'high' | 'emergency';
  description: string;
  prefDate: string;
  status: 'pending' | 'assigned' | 'completed';
  technicianName?: string;
  createdAt: string;
}

interface BookingRecord {
  id: string;
  serviceType: string;
  date: string;
  timeSlot: string;
  name: string;
  phone: string;
  location: string;
  status: 'pending' | 'confirmed';
  createdAt: string;
}

const LiveServiceTracker: React.FC = () => {
  const { t, language } = useLanguage();
  const [ticketId, setTicketId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchedJob, setSearchedJob] = useState<any | null>(null);
  
  // Local reactive status toggler for testing the flow easily
  const [simulationStatus, setSimulationStatus] = useState<'pending' | 'en_route' | 'on_site' | 'completed' | null>(null);

  // Default pre-seeded demo tickets for Penang dispatching
  const demoTickets = useMemo(() => [
    {
      id: 'PM-92102',
      name: 'Vance Wood Factory',
      phone: '+6017-553 9102',
      location: 'Prai Industrial Area',
      systemType: 'CCTV Cameras & NVR',
      serviceType: 'Monsoon Lightning Retrofitting',
      priority: 'emergency',
      description: 'Factory CCTV power supplies got blown out during the thunderstorm last night. Urgent site assessment is needed to wire robust spike arresters.',
      prefDate: '2026-06-12',
      status: 'assigned' as const, // Maps to 'On Site'
      technicianName: 'Mike (Senior CCTV Specialist)',
      createdAt: '2026-06-11'
    },
    {
      id: 'PM-77218',
      name: 'Lin Mansion',
      phone: '+6011-889 2311',
      location: 'Bayan Lepas FTZ',
      systemType: 'Smart Access & Biometric Gates',
      serviceType: 'Magnetic Autogate System Malfunction',
      priority: 'high',
      description: 'Main biometric sensor and barrier arm showing constant fault loop. Needs diagnostic on terminal controller board.',
      prefDate: '2026-06-12',
      status: 'pending' as const, // Maps to 'En Route'
      technicianName: 'Ah Zhang (Smart Access Engineer)',
      createdAt: '2026-06-11'
    },
    {
      id: 'PM-83920',
      name: 'Cheah Hock Hin Co.',
      phone: '+6012-409 3822',
      location: 'Georgetown Core Heritage',
      systemType: '3-Phase Fuseboard / DB Box',
      serviceType: 'Routine Maintenance & Safety Validation',
      priority: 'low',
      description: '6-month compliance checks of central distributions and circuit breakers validation certificates.',
      prefDate: '2026-06-05',
      status: 'completed' as const, // Maps to 'Completed'
      technicianName: 'Lee (3-Phase Wiring Expert)',
      createdAt: '2026-06-04'
    }
  ], []);

  // Safe translations extractor
  const tr = t.tracker || {
    badge: 'LIVE DISPATCH STATUS',
    title: 'Technician Live Tracking',
    sub: 'Track your scheduled installation or urgent electrical maintenance visit in real-time. Simply enter your Technical Ticket or Booking ID.',
    placeholder: 'Enter ID (e.g., PM-83920, PM-92102)...',
    btnTrack: 'Track Specialist Location',
    invalidId: 'No active job or booking found with this ID. Please verify the format (e.g., PM-XXXXX).',
    lblStatus: 'Current Dispatch Status',
    lblTechnician: 'Assigned Specialist Team',
    lblEta: 'Estimated Timeframe',
    etaText: 'Within 15 - 35 Minutes',
    lblContact: 'Direct WhatsApp Helpline',
    statusEnRoute: 'En Route (On the Way)',
    statusOnSite: 'On Site (Resolving Fault)',
    statusCompleted: 'Completed & Verified',
    statusPending: 'Queued & Reserved',
    timelineStep1: 'Dispatch Recieved',
    timelineStep1Sub: 'Engineering office has registered the site request.',
    timelineStep2: 'En Route',
    timelineStep2Sub: 'On the road in Penang with tools, CCTV packs, or fuse spares.',
    timelineStep3: 'On Site',
    timelineStep3Sub: 'Specialists are actively testing, wiring, or mounting devices.',
    timelineStep4: 'Completed',
    timelineStep4Sub: 'System test is verified and job signed off successfully.',
    suggestTitle: 'Want to view live demo?',
    suggestSub: 'Type or click these sample active Penang tickets: {codes}',
    activeStatus: 'Active Status'
  };

  // Find job from local storage or pre-seeded lists
  const handleSearch = (searchVal: string) => {
    if (!searchVal.trim()) return;
    
    setLoading(true);
    setSearchedJob(null);
    setSimulationStatus(null);

    setTimeout(() => {
      const cleanId = searchVal.trim().toUpperCase();
      
      // 1. Try to find in custom seed demos
      let job = demoTickets.find(t => t.id.toUpperCase() === cleanId);

      // 2. Try to find in pakmike_tickets
      if (!job) {
        try {
          const ticketsSaved = localStorage.getItem('pakmike_tickets');
          if (ticketsSaved) {
            const parsedList: LocalTicket[] = JSON.parse(ticketsSaved);
            const found = parsedList.find(t => t.id.toUpperCase() === cleanId);
            if (found) {
              job = {
                id: found.id,
                name: found.name,
                phone: found.phone,
                location: found.location,
                systemType: found.systemType,
                serviceType: found.serviceType,
                priority: found.priority,
                description: found.description,
                prefDate: found.prefDate,
                status: found.status,
                technicianName: found.technicianName || 'Pakmike Dispatch Squad (A)',
                createdAt: found.createdAt
              };
            }
          }
        } catch (e) {
          console.error("Failed load local tickets in tracker", e);
        }
      }

      // 3. Try to find in pakmike_bookings
      if (!job) {
        try {
          const bookingsSaved = localStorage.getItem('pakmike_bookings');
          if (bookingsSaved) {
            const parsedBookings: BookingRecord[] = JSON.parse(bookingsSaved);
            const found = parsedBookings.find(b => b.id.toUpperCase() === cleanId);
            if (found) {
              job = {
                id: found.id,
                name: found.name,
                phone: found.phone,
                location: found.location,
                systemType: found.serviceType,
                serviceType: 'Initial Site Survey Audit',
                priority: 'medium',
                description: `Initial physical property survey booked for slot: ${found.timeSlot}.`,
                prefDate: found.date,
                status: found.status === 'confirmed' ? 'assigned' : 'pending',
                technicianName: 'Ah Zhang (Lead Survey Officer)',
                createdAt: found.createdAt
              };
            }
          }
        } catch (e) {
          console.error("Failed load local bookings in tracker", e);
        }
      }

      if (job) {
        setSearchedJob(job);
        // Map original properties to current timeline simulation status
        let initialSim: 'pending' | 'en_route' | 'on_site' | 'completed' = 'pending';
        if (job.status === 'completed') {
          initialSim = 'completed';
        } else if (job.status === 'assigned') {
          initialSim = 'on_site';
        } else {
          // 'pending' goes to en_route for dynamic realism or pending
          initialSim = 'en_route';
        }
        setSimulationStatus(initialSim);
      } else {
        setSearchedJob({ notFound: true });
      }
      setLoading(false);
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(ticketId);
  };

  // Instant demo clicker
  const handleQuickDemoClick = (demoId: string) => {
    setTicketId(demoId);
    handleSearch(demoId);
  };

  // Maps display names
  const getSimulatedStatusLabel = (status: 'pending' | 'en_route' | 'on_site' | 'completed') => {
    switch (status) {
      case 'pending': return tr.statusPending || 'Queued & Reserved';
      case 'en_route': return tr.statusEnRoute || 'En Route (On the Way)';
      case 'on_site': return tr.statusOnSite || 'On Site (Resolving Fault)';
      case 'completed': return tr.statusCompleted || 'Completed & Verified';
    }
  };

  const getSimulatedStatusColor = (status: 'pending' | 'en_route' | 'on_site' | 'completed') => {
    switch (status) {
      case 'pending': return 'bg-amber-500 text-white shadow-amber-500/10 border-amber-400/20';
      case 'en_route': return 'bg-cyan-500 text-white shadow-cyan-500/10 border-cyan-400/20';
      case 'on_site': return 'bg-purple-500 text-white shadow-purple-500/10 border-purple-400/20';
      case 'completed': return 'bg-emerald-500 text-white shadow-emerald-500/10 border-emerald-400/20';
    }
  };

  // Pre-fill active sample links string based on demo ids
  const samplePillsMarkup = useMemo(() => {
    return (
      <div className="flex flex-wrap gap-2.5 justify-center mt-3">
        {demoTickets.map(dt => (
          <button
            key={dt.id}
            type="button"
            onClick={() => handleQuickDemoClick(dt.id)}
            className="px-3.5 py-1.5 bg-slate-900 border border-slate-750 text-xs font-black font-mono text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/50 rounded-xl transition-all cursor-pointer pointer-events-auto"
          >
            {dt.id} ({dt.priority === 'emergency' ? '🚨 SOS' : '⚡ Live'})
          </button>
        ))}
      </div>
    );
  }, [demoTickets]);

  const handleDialWhatsApp = (job: any) => {
    const textMsg = language === 'en'
      ? `Hello Pakmike Specialists! I am tracking Ticket ${job.id}. Could I get a status update from ${job.technicianName || 'the squad'}?`
      : language === 'zh'
      ? `师傅您好！我正在跟踪我的监控与用电检测工单，单号为 ${job.id}。请问技术员 ${job.technicianName || '师傅'} 已经出发拉吗？`
      : `Hello Pakmike! Saya sedang menjejaki Status Tiket ${job.id}. Hubungi Juruteknik yang sedang bertugas (${job.technicianName || 'squad Pakmike'}).`;
    
    const waUrl = `https://wa.me/60175162938?text=${encodeURIComponent(textMsg)}`;
    window.open(waUrl, '_blank', 'noreferrer,noopener');
  };

  return (
    <section id="dispatch-tracker" className="py-20 bg-slate-950 text-white border-t border-slate-850 relative overflow-hidden">
      {/* Dynamic tech HUD borders */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-linear-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute top-1/4 right-5 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-5 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Tracker Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12.5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
            <Cpu size={12} className="text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>{tr.badge}</span>
          </span>
          
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-3 font-sans leading-tight">
            {tr.title}
          </h2>
          
          <p className="text-slate-400 mt-2.5 text-sm md:text-base leading-relaxed font-semibold">
            {tr.sub}
          </p>
        </div>

        {/* Search Module Glass Panel */}
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleFormSubmit} className="relative">
            <div className="relative flex items-center bg-slate-900 border-2 border-slate-800 rounded-2xl p-1 focus-within:border-cyan-500/50 focus-within:shadow-lg focus-within:shadow-cyan-500/5 transition-all">
              <Search className="absolute left-4.5 text-slate-500 shrink-0" size={17} />
              
              <input
                type="text"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                placeholder={tr.placeholder}
                className="w-full bg-transparent pl-12 pr-4.5 py-3 text-xs font-mono font-bold text-white placeholder-slate-500 outline-hidden tracking-wide"
              />

              <button
                type="submit"
                disabled={loading}
                className="px-5 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer pointer-events-auto flex items-center gap-1.5 shrink-0"
              >
                {loading ? (
                  <Loader2 size={13} className="animate-spin text-slate-400" />
                ) : (
                  <>
                    <span>{tr.btnTrack}</span>
                    <ArrowRight size={13} />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Prompting Active Penang job simulation */}
          <div className="mt-4 text-center">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              {tr.suggestTitle}
            </p>
            {samplePillsMarkup}
          </div>
        </div>

        {/* Live HUD Output Terminal */}
        <div className="max-w-4xl mx-auto mt-12.5">
          <AnimatePresence mode="wait">
            
            {/* Loading Ring */}
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 flex flex-col items-center justify-center gap-3.5 bg-slate-900/30 border border-slate-850 rounded-3xl"
              >
                <Loader2 size={36} className="text-cyan-400 animate-spin" />
                <span className="text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest animate-pulse">
                  syncing real-time sat-receiver telemetry...
                </span>
              </motion.div>
            )}

            {/* If query entered but ID is invalid */}
            {!loading && searchedJob && searchedJob.notFound && (
              <motion.div
                key="notfound"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-8 text-center bg-slate-900/60 border border-rose-950 rounded-3xl space-y-3.5 max-w-xl mx-auto shadow-2xl"
              >
                <div className="w-12 h-12 bg-rose-500/15 rounded-full flex items-center justify-center mx-auto text-rose-500">
                  <ShieldAlert size={22} className="animate-pulse" />
                </div>
                <h4 className="text-sm font-black text-rose-450 uppercase tracking-widest font-mono">
                  Dispatch Job Not Found
                </h4>
                <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                  {tr.invalidId}
                </p>
              </motion.div>
            )}

            {/* Found Active Job Dispatch Control and Tracker Visual */}
            {!loading && searchedJob && !searchedJob.notFound && simulationStatus && (
              <motion.div
                key="jobhud"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl shadow-3xl overflow-hidden shadow-cyan-950/20"
              >
                {/* 1. Header Job Status Hub Info strip */}
                <div className="p-6 md:p-8 border-b border-slate-800 bg-slate-950/40 grid grid-cols-1 md:grid-cols-2 gap-5.5 items-center">
                  
                  {/* Job ID & General Client details */}
                  <div className="space-y-1.5 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <span className="px-3 py-1 bg-slate-850 hover:bg-slate-800 text-teal-400 font-mono font-black text-xs rounded-lg select-none">
                        {searchedJob.id}
                      </span>
                      
                      <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg ${
                        searchedJob.priority === 'emergency'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : searchedJob.priority === 'high'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                      }`}>
                        {searchedJob.priority} priority
                      </span>
                    </div>

                    <h3 className="text-base font-black text-white leading-tight">
                      {searchedJob.name}
                    </h3>
                    
                    <p className="text-xs text-slate-500 font-bold flex items-center justify-center md:justify-start gap-1.5 font-mono">
                      <MapPin size={11.5} className="text-slate-500" />
                      <span>{searchedJob.location}</span>
                    </p>
                  </div>

                  {/* Operational Interactive simulation state modifier */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 flex flex-col items-stretch space-y-2.5">
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest text-center">
                      🔬 Interactive Simulator: Switch dispatch status to test HUD states
                    </span>

                    <div className="grid grid-cols-3 gap-1.5">
                      <button
                        onClick={() => setSimulationStatus('en_route')}
                        className={`py-2 text-[9px] font-black uppercase tracking-widest rounded-lg border-2 cursor-pointer transition-all ${
                          simulationStatus === 'en_route'
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-xs'
                            : 'bg-transparent text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        En Route
                      </button>

                      <button
                        onClick={() => setSimulationStatus('on_site')}
                        className={`py-2 text-[9px] font-black uppercase tracking-widest rounded-lg border-2 cursor-pointer transition-all ${
                          simulationStatus === 'on_site'
                            ? 'bg-purple-500 text-white border-purple-400 font-bold shadow-xs'
                            : 'bg-transparent text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        On Site
                      </button>

                      <button
                        onClick={() => setSimulationStatus('completed')}
                        className={`py-2 text-[9px] font-black uppercase tracking-widest rounded-lg border-2 cursor-pointer transition-all ${
                          simulationStatus === 'completed'
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-xs'
                            : 'bg-transparent text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        Completed
                      </button>
                    </div>
                  </div>

                </div>

                {/* 2. Map-like Stepper Grid with Animation */}
                <div className="p-6 md:p-8 xl:p-10 border-b border-relay-800 space-y-10">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                      <Clock size={12} />
                      <span>{tr.activeStatus}</span>
                    </span>

                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${getSimulatedStatusColor(simulationStatus)}`}>
                      <Truck size={12} className="animate-pulse" />
                      <span>{getSimulatedStatusLabel(simulationStatus)}</span>
                    </span>
                  </div>

                  {/* Horizontal Timeline Path Stepper with Custom animations */}
                  <div className="relative pt-6">
                    {/* Visual Gray background pipe */}
                    <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-slate-800 -translate-y-1/2 rounded-full pointer-events-none" />

                    {/* Colored Active pipeline meter */}
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{
                        width:
                          simulationStatus === 'pending' ? '5%' :
                          simulationStatus === 'en_route' ? '40%' :
                          simulationStatus === 'on_site' ? '70%' : '100%'
                      }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      className={`absolute top-1/2 left-0 h-[3px] -translate-y-1/2 rounded-full pointer-events-none ${
                        simulationStatus === 'completed'
                          ? 'bg-linear-to-r from-cyan-500 to-emerald-500'
                          : 'bg-linear-to-r from-cyan-500 to-purple-500'
                      }`}
                    />

                    {/* Timeline Interactive circular nodes */}
                    <div className="relative z-10 grid grid-cols-4 select-none">
                      
                      {/* Step 1: Received */}
                      <div className="flex flex-col items-center">
                        <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border font-mono text-[10px] font-black transition-all ${
                          simulationStatus === 'pending' || simulationStatus === 'en_route' || simulationStatus === 'on_site' || simulationStatus === 'completed'
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-lg shadow-cyan-500/20'
                            : 'bg-slate-900 text-slate-500 border-slate-800'
                        }`}>
                          01
                        </div>
                        <span className="text-[10px] text-white mt-3 font-semibold text-center leading-tight">
                          {tr.timelineStep1}
                        </span>
                      </div>

                      {/* Step 2: En Route */}
                      <div className="flex flex-col items-center">
                        <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border font-mono text-[10px] font-black transition-all ${
                          simulationStatus === 'en_route' || simulationStatus === 'on_site' || simulationStatus === 'completed'
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-black shadow-lg shadow-cyan-500/20'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}>
                          02
                        </div>
                        <span className={`text-[10px] mt-3 font-semibold text-center leading-tight ${simulationStatus === 'en_route' ? 'text-cyan-400 font-black' : 'text-slate-400'}`}>
                          {tr.timelineStep2}
                        </span>
                      </div>

                      {/* Step 3: On Site */}
                      <div className="flex flex-col items-center">
                        <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border font-mono text-[10px] font-black transition-all ${
                          simulationStatus === 'on_site' || simulationStatus === 'completed'
                            ? 'bg-purple-500 text-white border-purple-400 font-bold shadow-lg shadow-purple-500/20'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}>
                          03
                        </div>
                        <span className={`text-[10px] mt-3 font-semibold text-center leading-tight ${simulationStatus === 'on_site' ? 'text-purple-400 font-black' : 'text-slate-400'}`}>
                          {tr.timelineStep3}
                        </span>
                      </div>

                      {/* Step 4: Completed */}
                      <div className="flex flex-col items-center">
                        <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border font-mono text-[10px] font-black transition-all ${
                          simulationStatus === 'completed'
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold shadow-lg shadow-emerald-500/20 animate-pulse'
                            : 'bg-slate-900 border-slate-800 text-slate-500'
                        }`}>
                          04
                        </div>
                        <span className={`text-[10px] mt-3 font-semibold text-center leading-tight ${simulationStatus === 'completed' ? 'text-emerald-400 font-black' : 'text-slate-400'}`}>
                          {tr.timelineStep4}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Dynamic helper description of current block */}
                  <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-slate-400 font-semibold">
                    <FileText size={18} className="text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      {simulationStatus === 'pending' && <p>{tr.timelineStep1Sub}</p>}
                      {simulationStatus === 'en_route' && <p>{tr.timelineStep2Sub}</p>}
                      {simulationStatus === 'on_site' && <p>{tr.timelineStep3Sub}</p>}
                      {simulationStatus === 'completed' && <p>{tr.timelineStep4Sub}</p>}
                    </div>
                  </div>

                </div>

                {/* 3. Tech squad assigned metadata checklist */}
                <div className="p-6 md:p-8 bg-slate-950/20 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-semibold">
                  
                  {/* Coordinator */}
                  <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 pr-4">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest block">
                      {tr.lblTechnician}
                    </span>
                    <span className="text-sm font-black text-white flex items-center gap-1.5 mt-1">
                      <User size={14} className="text-cyan-400 shrink-0" />
                      {searchedJob.technicianName || 'Mike (Senior CCTV Specialist)'}
                    </span>
                  </div>

                  {/* ETA */}
                  <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-slate-800 pb-4 md:pb-0 pr-4">
                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest block">
                      {tr.lblEta}
                    </span>
                    <span className="text-sm font-black text-white flex items-center gap-1.5 mt-1">
                      <Clock size={14} className="text-cyan-400 shrink-0" />
                      {simulationStatus === 'completed' ? 'Successfully Delivered' : tr.etaText}
                    </span>
                  </div>

                  {/* Action Sync direct Hotline */}
                  <div className="flex items-center">
                    <button
                      onClick={() => handleDialWhatsApp(searchedJob)}
                      className="w-full py-3.5 bg-slate-900 hover:bg-slate-850 text-emerald-400 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/30 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer pointer-events-auto transition-all"
                    >
                      <Phone size={13} fill="currentColor" />
                      <span>{tr.lblContact}</span>
                    </button>
                  </div>

                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default LiveServiceTracker;
