import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Wrench, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  Cpu, 
  AlertTriangle, 
  Calendar, 
  FileText, 
  CheckCircle, 
  ClipboardList, 
  ArrowRight, 
  Send, 
  Trash2, 
  LifeBuoy,
  MessageSquare,
  Sparkles,
  Search,
  Tool,
  Camera,
  Upload,
  Image,
  RotateCw,
  X
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
  photos?: string[];
}

const ServiceRequestForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'request' | 'history'>('request');
  const [tickets, setTickets] = useState<LocalTicket[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<LocalTicket | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [systemType, setSystemType] = useState('CCTV Cameras & NVR');
  const [serviceType, setServiceType] = useState('Routine Maintenance');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'emergency'>('medium');
  const [description, setDescription] = useState('');
  const [prefDate, setPrefDate] = useState('');

  // Diagnostic Photo Attachments States
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraMode, setCameraMode] = useState<'user' | 'environment'>('environment');
  const [cameraError, setCameraError] = useState<string>('');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isFlashActive, setIsFlashActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Search filter for tickets
  const [searchQuery, setSearchQuery] = useState('');

  // Towns matching the CoverageMap list for perfect auto selection
  const penangTowns = useMemo(() => [
    'Prai / Perai', 'Georgetown', 'Bukit Mertajam', 'Butterworth',
    'Bayan Lepas', 'Seberang Jaya', 'Batu Kawan', 'Gurney Drive',
    'Gelugor', 'Tanjung Tokong', 'Air Itam', 'Simpang Ampat',
    'Balik Pulau', 'Batu Ferringhi', 'Nibong Tebal', 'Kepala Batas'
  ], []);

  // Prepopulate with high-trust local mock ticket historical data if empty
  useEffect(() => {
    const stored = localStorage.getItem('pakmike_tickets');
    if (stored) {
      setTickets(JSON.parse(stored));
    } else {
      const defaultMockTickets: LocalTicket[] = [
        {
          id: 'PM-83920',
          name: 'Cheah Hock Hin Co.',
          phone: '+6012-409 3822',
          location: 'Butterworth',
          systemType: 'CCTV Cameras & NVR',
          serviceType: 'Routine Maintenance',
          priority: 'low',
          description: 'Routine 6-month lens cleaning and firmware security patching for 16-channel Hikvision NVR dome cameras in industrial retail unit.',
          prefDate: '2026-06-05',
          status: 'completed',
          technicianName: 'Mike (Senior CCTV Specialist)',
          createdAt: '2026-06-04'
        },
        {
          id: 'PM-92102',
          name: 'Vance Wood & Timber Factory',
          phone: '+6017-553 9102',
          location: 'Prai',
          systemType: 'Trackless Autogate System',
          serviceType: 'Urgent Technical Support (Repairs)',
          priority: 'high',
          description: 'Secondary automatic sliding arm motor stuck during wet rain. Left wing bracket is vibrating and requires recalibration and oil grease lubrication.',
          prefDate: '2026-06-12',
          status: 'assigned',
          technicianName: 'Amir (Mechanical Team Lead)',
          createdAt: '2026-06-11'
        }
      ];
      localStorage.setItem('pakmike_tickets', JSON.stringify(defaultMockTickets));
      setTickets(defaultMockTickets);
    }
  }, []);

  // Pre-fill categories from deep-links or QR scans
  useEffect(() => {
    const handleCheckParams = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const svcParam = params.get('systemType') || params.get('service');
        if (svcParam) {
          const decoded = decodeURIComponent(svcParam);
          const validOptions = [
            'CCTV Cameras & NVR',
            'Alarm Security System',
            'Biometric / Access Control',
            'Trackless Autogate System',
            'Electrical DB Power Board'
          ];
          const matched = validOptions.find(o => 
            o.toLowerCase().includes(decoded.toLowerCase()) || 
            decoded.toLowerCase().includes(o.toLowerCase())
          );
          if (matched) {
            setSystemType(matched);
            // Smoothly scroll to the target section
            setTimeout(() => {
              const targetEl = document.getElementById('service-request');
              if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
              }
            }, 150);
          }
        }
      } catch (err) {
        console.error('Error pre-filling systemType from URL', err);
      }
    };

    // Check on initial load
    handleCheckParams();

    // Listen to custom dispatch event
    const handleSvcEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.systemType) {
        setSystemType(customEvent.detail.systemType);
        // Smoothly scroll to the target section
        setTimeout(() => {
          const targetEl = document.getElementById('service-request');
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    };

    window.addEventListener('pakmike-select-service', handleSvcEvent);
    
    // Also respond to hashchange
    window.addEventListener('hashchange', handleCheckParams);
    
    return () => {
      window.removeEventListener('pakmike-select-service', handleSvcEvent);
      window.removeEventListener('hashchange', handleCheckParams);
    };
  }, []);

  // Cleanup camera streams on unmount
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  // Start User Camera Stream
  const startCamera = async () => {
    setCameraError('');
    setIsCameraActive(true);
    try {
      const constraints = {
        video: {
          facingMode: { ideal: cameraMode },
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      // Give a clean, friendly fallback error message
      setCameraError(
        language === 'en' 
          ? 'Failed to start camera. Please verify camera permissions or select image files directly.' 
          : language === 'zh'
          ? '无法启动相机。请检查浏览器摄像头权限，或直接点击“上传图片文件”！'
          : 'Gagal memulakan kamera. Sila semak kebenaran atau muat naik fail gambar terus.'
      );
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  // Toggle Front vs Rear camera
  const toggleCameraFacing = async () => {
    const nextMode = cameraMode === 'environment' ? 'user' : 'environment';
    setCameraMode(nextMode);
    
    // Restart camera with new settings
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }
    
    try {
      const constraints = {
        video: {
          facingMode: { ideal: nextMode },
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Capture Live Photo from video element using offscreen Canvas
  const capturePhoto = () => {
    if (photos.length >= 4) {
      alert(language === 'en' ? 'Maximum 4 photos allowed!' : '最多只能添加 4 张诊断照片！');
      return;
    }

    if (videoRef.current) {
      try {
        const video = videoRef.current;
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Compress quality to 0.7 to fit in localstorage perfectly
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          
          // Trigger Screen Shutter flash animation
          setIsFlashActive(true);
          setTimeout(() => setIsFlashActive(false), 200);
          
          // Play synthetic camera shutter sound beep/buzz!
          playShutterBeep();

          setPhotos(prev => [...prev, dataUrl]);
        }
      } catch (err) {
        console.error("Capture failure:", err);
      }
    }
  };

  // Play synthetic focus and shutter sound via Web Audio API
  const playShutterBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      // Focus high-pitch beep
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);

      // Shutter sound burst (white noise) after the focus beep
      setTimeout(() => {
        const bufferSize = ctx.sampleRate * 0.12; 
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.18, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.11);
        noise.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start();
      }, 70);
    } catch (e) {
      // Quietly ignore if browser blocks audio autoplay/interactions
    }
  };

  // File Upload listener (Drag & drop or Click Select)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 4 - photos.length;
    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      alert(
        language === 'en' 
          ? `You can only attach up to 4 photos total. ${remainingSlots} slot(s) remaining.` 
          : language === 'zh'
          ? `您一共最多只能附带 4 张图片。目前还可以再添加 ${remainingSlots} 张。`
          : `Anda hanya boleh menyertakan up to 4 foto. Baki ${remainingSlots} slot.`
      );
    }

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPhotos(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove individual photo
  const removePhoto = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering lightbox on delete click
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // Save tickets to localstorage upon change
  const saveTicketsToStorage = (updated: LocalTicket[]) => {
    localStorage.setItem('pakmike_tickets', JSON.stringify(updated));
    setTickets(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !location) {
      alert(language === 'en' ? 'Please complete all required fields!' : language === 'zh' ? '请填写所有必填字段！' : 'Sila lengkapkan semua medan wajib!');
      return;
    }

    const ticketId = 'PM-' + Math.floor(10000 + Math.random() * 90000);
    const dateToday = new Date().toISOString().split('T')[0];
    
    // Choose local Malaysian technician based on priority/system randomly to simulate real response
    const technicianPool = [
      'Mike (Senior CCTV Specialist)', 
      'Amir (AutoGate & Power Engineer)', 
      'Ami (Access Network Specialist)'
    ];
    const randomizedTech = technicianPool[Math.floor(Math.random() * technicianPool.length)];

    const newTicket: LocalTicket = {
      id: ticketId,
      name,
      phone,
      location,
      systemType,
      serviceType,
      priority,
      description,
      prefDate: prefDate || dateToday,
      status: 'pending',
      technicianName: randomizedTech,
      createdAt: dateToday,
      photos // Attached diagnostic photos
    };

    const updated = [newTicket, ...tickets];
    saveTicketsToStorage(updated);
    
    setSubmittedTicket(newTicket);
    setIsSubmitted(true);

    // Turn off camera if active
    stopCamera();

    // Reset Form Fields after submission
    setName('');
    setPhone('');
    setLocation('');
    setDescription('');
    setPrefDate('');
    setPhotos([]); // Clear attachments
  };

  // Delete/Clear ticket history if desired
  const handleDeleteTicket = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(language === 'en' ? 'Are you sure you want to remove this report from history?' : language === 'zh' ? '您确定要从历史记录中删除此工单吗？' : 'Adakah anda pasti untuk memadam rekod ini?')) {
      const filtered = tickets.filter(t => t.id !== id);
      saveTicketsToStorage(filtered);
    }
  };

  // Safe translations retrieval
  const badgeText = t.serviceRequest?.badge || 'Support Hub';
  const titleText = t.serviceRequest?.title || 'Service & Maintenance';
  const descriptionText = t.serviceRequest?.description || 'Existing client technical reporting system.';
  const tabNewRequest = t.serviceRequest?.tabNewRequest || 'New Request';
  const tabMyRequests = t.serviceRequest?.tabMyRequests || 'Service History';
  const labelLoc = t.serviceRequest?.formLocation || 'Location';
  const labelPriority = t.serviceRequest?.formPriority || 'Priority Level';
  const btnSubmitText = t.serviceRequest?.btnSubmit || 'Submit Ticket';

  const formatWhatsAppMessage = (ticket: LocalTicket) => {
    const priorityEmoji = ticket.priority === 'emergency' ? '🚨 EMERGENCY' : ticket.priority === 'high' ? '🔴 HIGH' : ticket.priority === 'medium' ? '🟡 MEDIUM' : '🟢 LOW';
    const photosAttachedCount = ticket.photos ? ticket.photos.length : 0;
    const photosStatus = photosAttachedCount > 0 
      ? `📸 Yes, ${photosAttachedCount} Diagnostic Photos attached!` 
      : '❌ None attached';
    
    return `*🛠️ PAKMIKE SERVICE & REPAIR REPORT*
----------------------------------------
*Ticket ID:* ${ticket.id}
*Client Name:* ${ticket.name}
*WhatsApp Phone:* ${ticket.phone}
*Site Location:* ${ticket.location}
*System Type:* ${ticket.systemType}
*Service Action:* ${ticket.serviceType}
*Priority Level:* ${priorityEmoji}
*Preferred Date:* ${ticket.prefDate}
*Photos Attached:* ${photosStatus}

*Detailed Description:*
"${ticket.description || 'No additional note provided'}"
----------------------------------------
_Logged via Pakmike Tech Client Support Portal_`;
  };

  const handleWhatsAppRedirect = (ticket: LocalTicket) => {
    const text = formatWhatsAppMessage(ticket);
    const url = `https://wa.me/60175162938?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noreferrer,noopener');
  };

  // Filter historical tickets based on query
  const filteredTickets = useMemo(() => {
    if (!searchQuery.trim()) return tickets;
    const query = searchQuery.toLowerCase();
    return tickets.filter(t => 
      t.id.toLowerCase().includes(query) ||
      t.name.toLowerCase().includes(query) ||
      t.location.toLowerCase().includes(query) ||
      t.systemType.toLowerCase().includes(query) ||
      t.serviceType.toLowerCase().includes(query)
    );
  }, [tickets, searchQuery]);

  return (
    <section id="service-request" className="py-24 bg-gray-50 relative overflow-hidden border-b border-gray-100">
      {/* Visual glowing points */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-100 text-amber-800 mb-4 border border-amber-200">
            <Wrench size={13} className="animate-pulse text-amber-600" />
            {badgeText}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-5">
            {titleText}
          </h2>
          <p className="text-gray-650 text-base md:text-lg leading-relaxed font-semibold">
            {descriptionText}
          </p>
        </div>

        {/* Tab Toggle Buttons */}
        <div className="max-w-4xl mx-auto mb-12 flex justify-center">
          <div className="bg-white p-1.5 rounded-2xl border border-gray-200 shadow-xs inline-flex w-full sm:w-auto relative">
            <button
              onClick={() => { setActiveTab('request'); setIsSubmitted(false); }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer pointer-events-auto ${
                activeTab === 'request'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-800 bg-transparent'
              }`}
            >
              <LifeBuoy size={14} />
              {tabNewRequest}
            </button>
            <button
              onClick={() => { setActiveTab('history'); setIsSubmitted(false); }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer pointer-events-auto relative ${
                activeTab === 'history'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-gray-500 hover:text-gray-800 bg-transparent'
              }`}
            >
              <ClipboardList size={14} />
              <span>{tabMyRequests}</span>
              {tickets.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-500 text-white flex items-center justify-center text-[10px] font-mono font-bold animate-bounce shadow-md">
                  {tickets.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'request' ? (
              <motion.div
                key="request-form-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {!isSubmitted ? (
                  <form 
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-150 rounded-[32px] p-6 sm:p-10 md:p-12 shadow-md space-y-8"
                  >
                    
                    {/* Dynamic Grid Form Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Customer Full Name */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                          <User size={14} className="text-cyan-500" />
                          {t.serviceRequest?.formName || 'Your Name'} <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Tan Ah Kow"
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 rounded-xl outline-hidden text-sm font-semibold transition-all text-gray-905"
                        />
                      </div>

                      {/* WhatsApp Phone Number */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Phone size={14} className="text-emerald-500" />
                          {t.serviceRequest?.formPhone || 'Phone Number'} <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +6012-345 6789"
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 rounded-xl outline-hidden text-sm font-semibold transition-all text-gray-905"
                        />
                      </div>

                      {/* Site Address Location (Town select) */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                          <MapPin size={14} className="text-red-500" />
                          {labelLoc} <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                          required
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 rounded-xl outline-hidden text-sm font-semibold transition-all text-gray-905 cursor-pointer"
                        >
                          <option value="">-- {language === 'en' ? 'Select Penang / Prai Zone' : language === 'zh' ? '选择槟城/北赖区域' : 'Pilih Kawasan'} --</option>
                          {penangTowns.map((town) => (
                            <option key={town} value={town}>{town}</option>
                          ))}
                        </select>
                      </div>

                      {/* Preferred On-Site Date */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar size={14} className="text-amber-500" />
                          {t.serviceRequest?.formPrefDate || 'Preferred Date'}
                        </label>
                        <input
                          type="date"
                          value={prefDate}
                          onChange={(e) => setPrefDate(e.target.value)}
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 rounded-xl outline-hidden text-sm font-semibold transition-all text-gray-905 cursor-pointer"
                        />
                      </div>

                      {/* Installed System Type */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Cpu size={14} className="text-purple-500" />
                          {t.serviceRequest?.formSystemType || 'Installed System'}
                        </label>
                        <select
                          value={systemType}
                          onChange={(e) => setSystemType(e.target.value)}
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 rounded-xl outline-hidden text-sm font-semibold transition-all text-gray-905 cursor-pointer"
                        >
                          <option value="CCTV Cameras & NVR">{language === 'en' ? 'CCTV Cameras & NVR recording' : language === 'zh' ? '闭路电视安全监控及主机 NVR' : 'Sistem Kamera CCTV & NVR'}</option>
                          <option value="Alarm Security System">{language === 'en' ? 'Smart Wired/Wireless Alarm' : language === 'zh' ? '防盗警报与感应蜂鸣系统' : 'Sistem Penggera Kecurian'}</option>
                          <option value="Biometric / Access Control">{language === 'en' ? 'Biometrics / Face Access Lock' : language === 'zh' ? '生物识别及人脸/吸力锁门禁' : 'Kawalan Akses Biometrik'}</option>
                          <option value="Trackless Autogate System">{language === 'en' ? 'Autogate Arm / Sliding System' : language === 'zh' ? '折叠式无轨电动大门马达' : 'Autogate Tanpa Landasan'}</option>
                          <option value="Electrical DB Power Board">{language === 'en' ? 'Electrical DB Board & Cabling' : language === 'zh' ? '三相配电箱及全屋强电线路' : 'Papan Agihan / Pendawaian Elektrik'}</option>
                        </select>
                      </div>

                      {/* Required Service Action */}
                      <div className="space-y-2">
                        <label className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Wrench size={14} className="text-indigo-500" />
                          {t.serviceRequest?.formServiceType || 'Service Action'}
                        </label>
                        <select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 rounded-xl outline-hidden text-sm font-semibold transition-all text-gray-905 cursor-pointer"
                        >
                          <option value="Routine Maintenance">{language === 'en' ? '6-Month Routine Preventive Maintenance' : language === 'zh' ? '6个月周期的常规预防性保养点检' : 'Penyelenggaraan Pencegahan Berkala'}</option>
                          <option value="Urgent Technical Support (Repairs)">{language === 'en' ? 'Urgent Technical Repairs (Fault Fixing)' : language === 'zh' ? '紧急故障排查与现场抢修施工' : 'Sokongan Pembaikan Teknikal Segera'}</option>
                          <option value="System Relocation / Expansion">{language === 'en' ? 'Add Extra Cameras / Relocate Terminal' : language === 'zh' ? '追加增加摄像头/迁移门禁终端安装点' : 'Relokasi Tapak atau Pembesaran Sistem'}</option>
                          <option value="Calibration & Lens Cleaning">{language === 'en' ? 'Camera Dust Removal & Focus recalibration' : language === 'zh' ? '监控头专业除尘除湿、防水及焦距校准' : 'Kalibrasi & Pembersihan Kanta'}</option>
                        </select>
                      </div>

                    </div>

                    {/* Service Priority */}
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle size={14} className="text-rose-500" />
                        {labelPriority}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        {(['low', 'medium', 'high', 'emergency'] as const).map((level) => {
                          const priorityLabel = 
                            level === 'low' ? t.serviceRequest?.formPriorityLow || 'Low' :
                            level === 'medium' ? t.serviceRequest?.formPriorityMedium || 'Medium' :
                            level === 'high' ? t.serviceRequest?.formPriorityHigh || 'High' :
                            t.serviceRequest?.formPriorityEmergency || 'Emergency';
                          
                          const colorClass = 
                            level === 'low' ? (priority === 'low' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-100 text-emerald-800') :
                            level === 'medium' ? (priority === 'medium' ? 'bg-amber-500 text-white border-amber-400' : 'bg-amber-50/50 hover:bg-amber-50 border-amber-100 text-amber-800') :
                            level === 'high' ? (priority === 'high' ? 'bg-rose-500 text-white border-rose-450' : 'bg-rose-50/50 hover:bg-rose-50 border-rose-100 text-rose-850') :
                            (priority === 'emergency' ? 'bg-red-700 text-white border-red-700' : 'bg-red-50/50 hover:bg-red-50 border-red-100 text-red-900');

                          return (
                            <button
                              key={level}
                              type="button"
                              onClick={() => setPriority(level)}
                              className={`px-4 py-3.5 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer pointer-events-auto ${colorClass}`}
                            >
                              {priorityLabel}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Detail Description */}
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText size={14} className="text-slate-500" />
                        {t.serviceRequest?.formDescription || 'Description'}
                      </label>
                      <textarea
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={
                          language === 'en' 
                            ? 'Please provide as much screen error history, alarm beep patterns, or wiring details as possible to help our tech prepare parts.' 
                            : language === 'zh'
                            ? '例如：昨晚闪电雷击后断电、CCTV NVR 鸣叫或屏幕黑屏不进行录制。以便安装师傅随车携带相应备用零件和备用机。'
                            : 'Sila berikan sebarang kod ralat, kerdipan lampu, atau masalah bunyi menyalak autogate secara terperinci untuk memudahkan juruteknik membawa alat ganti.'
                        }
                        className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 rounded-xl outline-hidden text-sm font-semibold transition-all text-gray-950 resize-y"
                      />
                    </div>

                    {/* Snap & Upload Diagnostic Photos */}
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-black text-gray-750 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                          <Camera size={14} className="text-cyan-500 animate-pulse" />
                          <span>{language === 'en' ? 'Snap & Upload Diagnostic Photos (Max 4)' : language === 'zh' ? '故障拍照与图片上传 (最多 4 张)' : 'Ambil & Muat Naik Gambar Diagnostik (Maks 4)'}</span>
                        </label>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full font-mono font-black border border-gray-200">
                          {photos.length} / 4
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                        {/* Action buttons or Live Camera Viewport */}
                        <div className="md:col-span-6 flex flex-col justify-between space-y-3.5">
                          {!isCameraActive ? (
                            <div className="flex flex-col sm:flex-row gap-3">
                              {/* Open live Camera option */}
                              <button
                                type="button"
                                onClick={startCamera}
                                className="flex-1 flex flex-col items-center justify-center p-6 bg-cyan-50/40 hover:bg-cyan-50 border-2 border-dashed border-cyan-300 hover:border-cyan-400 rounded-2xl text-center transition-all cursor-pointer group pointer-events-auto"
                              >
                                <Camera size={26} className="text-cyan-600 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-black text-cyan-950 uppercase tracking-wider font-sans">
                                  {language === 'en' ? 'Open Camera' : language === 'zh' ? '开启相机自拍' : 'Buka Kamera'}
                                </span>
                                <span className="text-[10px] text-cyan-700 font-bold mt-1 leading-tight">
                                  {language === 'en' ? 'Snap live malfunction' : language === 'zh' ? '拍摄现场焦损跳闸' : 'Ambil gambar langsung'}
                                </span>
                              </button>

                              {/* Upload File option */}
                              <label
                                className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50 hover:bg-gray-100/80 border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-2xl text-center cursor-pointer transition-all group pointer-events-auto"
                              >
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  onChange={handleFileUpload}
                                  className="hidden"
                                />
                                <Upload size={26} className="text-gray-600 mb-2 group-hover:translate-y-[-2px] transition-transform" />
                                <span className="text-xs font-black text-gray-800 uppercase tracking-wider font-sans">
                                  {language === 'en' ? 'Upload Photo' : language === 'zh' ? '上传相册照片' : 'Muat Naik Gambar'}
                                </span>
                                <span className="text-[10px] text-gray-500 font-bold mt-1 leading-tight">
                                  {language === 'en' ? 'Select from device' : language === 'zh' ? '从设备相册中选取' : 'Pilih dari telefon'}
                                </span>
                              </label>
                            </div>
                          ) : (
                            /* Live Video stream panel */
                            <div className="relative bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 aspect-video flex flex-col justify-between p-3.5 shadow-xl">
                              {/* Light Flash Effect overlay */}
                              {isFlashActive && (
                                <div className="absolute inset-0 bg-white z-50 animate-ping" />
                              )}
                              
                              <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                              
                              {/* Top Bar for camera mode / close / error info */}
                              <div className="relative z-10 flex items-center justify-between w-full">
                                <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[9px] font-mono font-black tracking-widest text-cyan-400 uppercase border border-cyan-500/25 flex items-center gap-1.5">
                                  <Sparkles size={10} className="animate-pulse" />
                                  <span>{cameraMode === 'environment' ? 'Rear Camera' : 'Front Camera'}</span>
                                </span>

                                <button
                                  type="button"
                                  onClick={toggleCameraFacing}
                                  className="p-1 px-2.5 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-lg text-white border border-slate-705 transition-colors cursor-pointer pointer-events-auto text-[10px] font-bold flex items-center gap-1"
                                  title="Switch Camera Facing Mode"
                                >
                                  <RotateCw size={11} />
                                  <span>Flip</span>
                                </button>
                              </div>

                              {cameraError && (
                                <div className="relative z-10 p-2.5 bg-rose-950/90 backdrop-blur-sm border border-rose-500/30 rounded-xl text-[10px] text-rose-350 font-black">
                                  {cameraError}
                                </div>
                              )}

                              {/* Capture action row at bottom */}
                              <div className="relative z-10 flex items-center justify-between w-full mt-auto pt-4 gap-2">
                                <button
                                  type="button"
                                  onClick={stopCamera}
                                  className="px-3.5 py-2 bg-slate-900/90 hover:bg-slate-900 text-white rounded-xl text-[10px] font-extrabold uppercase tracking-wider border border-slate-850 cursor-pointer pointer-events-auto"
                                >
                                  {language === 'en' ? 'Close' : language === 'zh' ? '关闭' : 'Tutup'}
                                </button>

                                <button
                                  type="button"
                                  onClick={capturePhoto}
                                  disabled={photos.length >= 4}
                                  className="w-14 h-14 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:scale-100 rounded-full flex items-center justify-center text-white border-4 border-white/30 transition-all cursor-pointer pointer-events-auto"
                                  title="Take Snapshot"
                                >
                                  <div className="w-5 h-5 bg-white rounded-full shadow-inner" />
                                </button>

                                <div className="w-14" /> {/* Layout balancer */}
                              </div>
                            </div>
                          )}

                          {/* Guidelines or error message box */}
                          <div className="p-3 bg-gray-100/70 border border-gray-200/50 rounded-xl text-[10px] text-gray-500 font-bold leading-relaxed flex items-center gap-2">
                            <Sparkles size={12} className="text-cyan-500 shrink-0" />
                            <span>
                              {language === 'en' 
                                ? 'Diagnostic Tip: Snapping a photo of DB board switches, camera lens blur, or beep code readings lets technicians diagnose instantly.' 
                                : language === 'zh' 
                                ? '诊断提示：拍照给师傅看电闸跳闸位置、监控画面重影或防盗警报显示屏上的英文提示码，我们可即刻为您配对备件！' 
                                : 'Tip Diagnostik: Ambil gambar suis DB, kekaburan kanta CCTV, atau mesej ralat untuk diagnosis pantas.'}
                            </span>
                          </div>
                        </div>

                        {/* Thumbnails display area - Right Col */}
                        <div className="md:col-span-6 bg-gray-100/50 border border-gray-200/60 rounded-2xl p-4 flex flex-col justify-center min-h-[160px] relative">
                          {photos.length === 0 ? (
                            <div className="text-center py-8 text-gray-400 space-y-1.5">
                              <Image size={28} className="mx-auto text-gray-300" />
                              <p className="text-[11px] font-black text-gray-500 uppercase tracking-wider">
                                {language === 'en' ? 'No photos attached yet' : language === 'zh' ? '暂未附带任何现场图' : 'Tiada gambar disertakan'}
                              </p>
                              <p className="text-[10px] text-gray-400 font-semibold">
                                {language === 'en' ? 'Attachments will appear here' : language === 'zh' ? '您附带的图片将在此处纵览预览' : 'Gambar akan dipamer di sini'}
                              </p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 xs:grid-cols-4 gap-3">
                              <AnimatePresence>
                                {photos.map((base64, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.85 }}
                                    className="relative aspect-square rounded-xl overflow-hidden border border-gray-250 bg-white group shadow-sm cursor-pointer pointer-events-auto"
                                    onClick={() => setLightboxImage(base64)}
                                  >
                                    <img
                                      src={base64}
                                      alt={`attachment-${index}`}
                                      className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all"
                                      referrerPolicy="no-referrer"
                                    />
                                    
                                    {/* Type badge overlay */}
                                    <span className="absolute bottom-1 left-1.5 px-1.5 py-0.5 bg-black/70 backdrop-blur-xs rounded text-[7px] text-white font-mono font-black uppercase tracking-widest leading-none">
                                      {base64.startsWith('data:image/jpeg') ? 'SNAP' : 'FILE'}
                                    </span>

                                    {/* Hover delete overlay btn */}
                                    <button
                                      type="button"
                                      onClick={(e) => removePhoto(index, e)}
                                      className="absolute top-1 right-1 p-1.5 bg-red-600 text-white rounded-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-red-700 cursor-pointer pointer-events-auto"
                                      title="Delete Image"
                                    >
                                      <Trash2 size={10} />
                                    </button>
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submission Button */}
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-slate-900 hover:bg-slate-800 border border-slate-900 rounded-2xl text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all shadow-md pointer-events-auto cursor-pointer"
                    >
                      <Send size={14} className="text-cyan-400" />
                      <span>{btnSubmitText}</span>
                    </button>

                  </form>
                ) : (
                  /* Success Frame */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50/50 border border-emerald-100 rounded-[32px] p-8 md:p-12 text-center space-y-6"
                  >
                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                      <CheckCircle size={36} />
                    </div>

                    <div className="space-y-2.5 max-w-xl mx-auto">
                      <h3 className="text-2xl font-black text-gray-900 tracking-tight">
                        {t.serviceRequest?.successTitle || 'Ticket Logged Successfully!'}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-semibold leading-relaxed">
                        {t.serviceRequest?.successDesc || 'Your support information is stored locally.'}
                      </p>
                    </div>

                    {submittedTicket && (
                      <div className="max-w-md mx-auto bg-white border border-gray-250 rounded-2xl p-6 text-left space-y-4 shadow-xs">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                          <span className="text-[10px] font-black font-mono bg-cyan-100 text-cyan-800 px-2.5 py-1 rounded-md">
                            {submittedTicket.id}
                          </span>
                          <span className="text-[10px] font-mono text-gray-400 font-bold">
                            {submittedTicket.createdAt}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div>
                            <span className="text-gray-400 block font-semibold text-[10px] uppercase tracking-wider">{language === 'en' ? 'System' : '已装系统'}</span>
                            <span className="font-bold text-gray-800">{submittedTicket.systemType}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block font-semibold text-[10px] uppercase tracking-wider">{labelPriority}</span>
                            <span className="font-extrabold text-rose-600 uppercase">{submittedTicket.priority}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-gray-400 block font-semibold text-[10px] uppercase tracking-wider">{t.serviceRequest?.formServiceType || 'Action'}</span>
                            <span className="font-bold text-gray-800">{submittedTicket.serviceType}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleWhatsAppRedirect(submittedTicket)}
                          className="w-full py-3 bg-[#25D366] hover:bg-[#1ebd59] text-white rounded-xl text-center font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-950/20 pointer-events-auto cursor-pointer"
                        >
                          <MessageSquare size={14} />
                          <span>{t.serviceRequest?.actionSync || 'Notify Technicians Group'}</span>
                        </button>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-3">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="text-xs font-black uppercase text-gray-500 hover:text-gray-800 px-4 py-2 pointer-events-auto cursor-pointer"
                      >
                        {language === 'en' ? 'Submit Another Report' : language === 'zh' ? '添加另一项报修' : 'Hantar Laporan Lain'}
                      </button>
                      <button
                        onClick={() => { setActiveTab('history'); setIsSubmitted(false); }}
                        className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold pointer-events-auto cursor-pointer flex items-center gap-1 hover:bg-slate-800"
                      >
                        <span>{language === 'en' ? 'View Live Historical Progress' : language === 'zh' ? '去查看实时工单进度' : 'Semak Status Penjadualan'}</span>
                        <ArrowRight size={12} />
                      </button>
                    </div>

                  </motion.div>
                )}
              </motion.div>
            ) : (
              /* Support Tickets History and Progress Tracking */
              <motion.div
                key="history-tracker-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                
                {/* Search Bar for filtering tickets */}
                <div className="bg-white border border-gray-150 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
                  <Search size={18} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={language === 'en' ? 'Search ticket history by address or client name...' : language === 'zh' ? '输入客户名称、单号或城镇以快速搜索过滤...' : 'Cari tiket mengikut nama atau alamat premis...'}
                    className="w-full bg-transparent outline-hidden text-sm font-semibold text-gray-800"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-xs text-gray-400 hover:text-red-500 cursor-pointer"
                    >
                      {language === 'en' ? 'Reset' : '重置'}
                    </button>
                  )}
                </div>

                {filteredTickets.length > 0 ? (
                  <div className="space-y-4">
                    {filteredTickets.map((ticket, idx) => {
                      // Status mapping
                      const isPending = ticket.status === 'pending';
                      const isAssigned = ticket.status === 'assigned';
                      const isCompleted = ticket.status === 'completed';

                      const statusLabel = 
                        isPending ? t.serviceRequest?.statusPending || 'Pending' :
                        isAssigned ? t.serviceRequest?.statusAssigned || 'Asspatched' :
                        t.serviceRequest?.statusCompleted || 'Completed';

                      const badgeColor = 
                        isPending ? 'bg-amber-100 text-amber-800 border-amber-200' :
                        isAssigned ? 'bg-sky-100 text-sky-800 border-sky-200' :
                        'bg-emerald-100 text-emerald-800 border-emerald-200';

                      const priorityType = ticket.priority.toUpperCase();

                      return (
                        <motion.div
                          key={ticket.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-white border border-gray-150 rounded-[28px] p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-gray-300 transition-colors"
                        >
                          {/* Ticket core Details */}
                          <div className="space-y-3 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-black font-mono tracking-wider bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                                {ticket.id}
                              </span>
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${badgeColor}`}>
                                {statusLabel}
                              </span>
                              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                                ticket.priority === 'emergency' ? 'bg-red-500 text-white' :
                                ticket.priority === 'high' ? 'bg-rose-100 text-rose-700' :
                                ticket.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                                'bg-emerald-100 text-emerald-700'
                              }`}>
                                {priorityType}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-base font-black text-gray-901 tracking-tight">
                                {ticket.name} • <span className="text-gray-500 font-semibold">{ticket.location}</span>
                              </h4>
                              <p className="text-xs text-gray-400 font-bold mt-0.5">
                                {language === 'en' ? 'Preferred Date' : '希望检测时间'}: <span className="font-mono text-gray-700">{ticket.prefDate}</span>
                              </p>
                            </div>

                            {/* Ticket brief description */}
                            <p className="text-xs text-gray-600 leading-relaxed font-medium bg-gray-50 p-3 rounded-xl border border-gray-100 pr-4">
                              {ticket.description}
                            </p>

                            {/* Historical Attached Diagnostic Photos */}
                            {ticket.photos && ticket.photos.length > 0 && (
                              <div className="space-y-1.5 pt-1.5 pb-0.5">
                                <span className="text-[10px] text-gray-400 block font-bold uppercase tracking-wider flex items-center gap-1">
                                  <Camera size={10} className="text-cyan-500" />
                                  <span>{language === 'en' ? 'Diagnostic Attachments' : language === 'zh' ? '故障图片附件' : 'Gambar Diagnostik'}</span>
                                </span>
                                <div className="flex flex-wrap gap-2 pt-0.5">
                                  {ticket.photos.map((pBase64, pIdx) => (
                                    <div 
                                      key={pIdx} 
                                      onClick={() => setLightboxImage(pBase64)}
                                      className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:border-cyan-500 hover:scale-105 transition-all shadow-xs shrink-0 pointer-events-auto"
                                      title={language === 'en' ? 'Click to enlarge' : language === 'zh' ? '点击放大' : 'Klik untuk besarkan'}
                                    >
                                      <img 
                                        src={pBase64} 
                                        alt="historical-att" 
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Assigned Local Technician information */}
                            {ticket.technicianName && (
                              <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-bold">
                                <span className="text-cyan-500">🧑‍🔧 {language === 'en' ? 'Assigned Duty Tech' : language === 'zh' ? '派单技术负责人' : 'Pegawai Bertugas'}:</span>
                                <span className="text-gray-800 font-black underline decoration-cyan-300 decoration-2">{ticket.technicianName}</span>
                              </div>
                            )}

                          </div>

                          {/* Side Actions Column */}
                          <div className="flex md:flex-col gap-2.5 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 items-center justify-end">
                            
                            {/* Simulate action state change */}
                            {isPending && (
                              <button
                                onClick={() => {
                                  // Progress it from pending -> assigned
                                  const updated = tickets.map(tok => {
                                    if (tok.id === ticket.id) {
                                      return {
                                        ...tok, 
                                        status: 'assigned' as const,
                                        technicianName: 'Mike (Senior CCTV Specialist)'
                                      };
                                    }
                                    return tok;
                                  });
                                  saveTicketsToStorage(updated);
                                }}
                                className="px-3.5 py-2 bg-cyan-50 hover:bg-cyan-100 text-cyan-800 border border-cyan-150 rounded-xl text-[10px] font-black uppercase tracking-wider pointer-events-auto cursor-pointer"
                                title="Admin Simulation ONLY"
                              >
                                {language === 'en' ? 'Simulate Dispatch' : '模拟调度分配师傅'}
                              </button>
                            )}

                            {isAssigned && (
                              <button
                                onClick={() => {
                                  // Progress from assigned -> completed
                                  const updated = tickets.map(tok => {
                                    if (tok.id === ticket.id) {
                                      return { ...tok, status: 'completed' as const };
                                    }
                                    return tok;
                                  });
                                  saveTicketsToStorage(updated);
                                }}
                                className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-150 rounded-xl text-[10px] font-black uppercase tracking-wider pointer-events-auto cursor-pointer"
                                title="Admin Simulation ONLY"
                              >
                                {language === 'en' ? 'Simulate Resolve' : '模拟师傅竣工交付'}
                              </button>
                            )}

                            {/* WhatsApp Direct Link */}
                            <button
                              onClick={() => handleWhatsAppRedirect(ticket)}
                              className="px-4 py-2.5 bg-[#25D366] hover:bg-[#1eba56] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm pointer-events-auto cursor-pointer flex-1 md:flex-none"
                            >
                              <MessageSquare size={12} />
                              <span>{t.serviceRequest?.actionSync || 'Sync'}</span>
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={(e) => handleDeleteTicket(ticket.id, e)}
                              className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-gray-100 pointer-events-auto cursor-pointer"
                              title="Delete Ticket Record"
                            >
                              <Trash2 size={13} />
                            </button>

                          </div>

                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white border border-gray-150 rounded-[32px] p-12 text-center text-gray-400 space-y-4">
                    <ClipboardList size={40} className="mx-auto text-gray-300" />
                    <p className="text-xs font-semibold">
                      {t.serviceRequest?.noRequests || 'No historical complaints registered.'}
                    </p>
                  </div>
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox / Fullscreen Image Viewer Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-slate-955/90 backdrop-blur-xs flex items-center justify-center p-4 z-[999] cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing on content click
            >
              <img
                src={lightboxImage}
                alt="fullscreen view"
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
              
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-md rounded-full text-white border border-slate-700 transition-colors pointer-events-auto cursor-pointer"
                title="Close Fullscreen"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ServiceRequestForm;
