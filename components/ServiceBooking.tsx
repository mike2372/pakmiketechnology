import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  Wrench, 
  Eye, 
  Trash2, 
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingRecord {
  id: string;
  serviceType: string;
  date: string; // YYYY-MM-DD
  timeSlot: string;
  name: string;
  phone: string;
  location: string;
  status: 'pending' | 'confirmed';
  createdAt: string;
}

const ServiceBooking: React.FC = () => {
  const { t, language } = useLanguage();

  // Selected state
  const [activeTab, setActiveTab] = useState<'book' | 'history'>('book');
  const [serviceType, setServiceType] = useState('CCTV Installation & Custom Upgrade');
  const [selectedDate, setSelectedDate] = useState<string>(''); // YYYY-MM-DD format
  const [selectedSlot, setSelectedSlot] = useState<string>('09:30 AM - 11:30 AM');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  
  // App state
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  // Custom Date calendar logic
  const now = new Date();
  const [calendarYear, setCalendarYear] = useState(2026); // Match evergreen current year default
  const [calendarMonth, setCalendarMonth] = useState(5); // Default to June (0-indexed, so 5 is June)

  // Sync state year / month on mount with real/simulated dates
  useEffect(() => {
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    setCalendarYear(currentYear);
    setCalendarMonth(currentMonth);

    // Default to pick tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    // If tomorrow is Sunday, skip to Monday
    if (tomorrow.getDay() === 0) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setSelectedDate(`${yyyy}-${mm}-${dd}`);

    // Load saved bookings
    try {
      const saved = localStorage.getItem('pakmike_bookings');
      if (saved) {
        setBookings(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Local bookings read error:", e);
    }
  }, []);

  // Show status message
  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Translations extraction
  const b = t.booking || {
    badge: 'ONLINE SCHEDULING',
    title: 'Book a Site Survey & Inspection',
    sub: 'Pick your preferred date and time slot. Our engineering squad will perform a precise physical assessment of your property in Penang & Seberang Perai.',
    lblService: 'Required Service & Inspection Type',
    lblDate: 'Pick Inspection Date',
    lblTimeSlot: 'Select Available Time Window',
    lblName: 'Full Name',
    lblPhone: 'WhatsApp Phone Number',
    lblLocation: 'Site Address or Zone in Penang',
    btnBook: 'Confirm & Schedule Site Survey',
    warningPast: 'You cannot select a past date.',
    warningSunday: 'Pakmike Specialists are closed on Sundays for routine restocking. Please select Monday through Saturday.',
    successMsg: 'Site Survey scheduled successfully! Your appointment code is {code}. We have reserved this slot for you.',
    syncWhatsApp: 'Secure Appointment on WhatsApp',
    tabBook: 'Reserve Slot Now',
    tabHistory: 'My Reserved Visits ({count})',
    noHistory: 'You have no booked surveys yet.',
    code: 'Survey Code',
    actions: 'Actions',
    cancel: 'Cancel Booking',
    timeSlotInfo: 'Only {count} technical team slots remaining for this time window!',
  };

  // Popular pre-defined zones in Penang / Prai
  const penangZones = useMemo(() => [
    'Prai Industrial Zone / Seberang Perai',
    'Bayan Lepas FTZ',
    'Georgetown Center',
    'Butterworth / Raja Uda',
    'Bukit Mertajam',
    'Simpang Ampat / Juru',
    'Tanjung Bungah / Batu Ferringhi'
  ], []);

  // Set the service option selections
  const serviceOptions = useMemo(() => [
    { value: 'CCTV Installation & Custom Upgrade', label: 'CCTV Intelligent Surveillance Survey' },
    { value: '3-Phase Electrical Wiring & Surge Protection Inspection', label: '3-Phase Fuse Board & Surge Protection Assessment' },
    { value: 'Biometric Access Control & HR Software Integration Check', label: 'Fingerprint/Face Authentication Terminal Setup' },
    { value: 'Emergency Short-Circuit Diagnosis & Load Remediation', label: 'Urgent Fault Tracing & Power Trip Fix' },
    { value: 'Industrial Machinery Electrical Upgrades', label: 'Factory Power & Control Panel Maintenance' }
  ], []);

  // Time slots with simulated occupancy
  const timeSlots = useMemo(() => [
    { value: '09:30 AM - 11:30 AM', label: '09:30 AM - 11:30 AM (Morning Audit)', descCode: 'morn' },
    { value: '11:30 AM - 01:30 PM', label: '11:30 AM - 01:30 PM (Mid-Day Survey)', descCode: 'mid' },
    { value: '02:00 PM - 04:00 PM', label: '02:00 PM - 04:00 PM (Afternoon Inspect)', descCode: 'after' },
    { value: '04:00 PM - 06:00 PM', label: '04:00 PM - 06:00 PM (Late Shift Audit)', descCode: 'late' },
  ], []);

  // Seeded available slots generator based on the picked date & slot descCode
  const getRemainingSlotsCount = (dateStr: string, slotCode: string) => {
    if (!dateStr) return 3;
    // Fast pseudo-random code
    let val = 0;
    for (let i = 0; i < dateStr.length; i++) {
      val += dateStr.charCodeAt(i);
    }
    for (let i = 0; i < slotCode.length; i++) {
      val += slotCode.charCodeAt(i);
    }
    return (val % 3) + 1; // Generates 1, 2, or 3 remaining slots
  };

  // Month navigation
  const prevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarYear(prev => prev - 1);
      setCalendarMonth(11);
    } else {
      setCalendarMonth(prev => prev - 1);
    }
  };

  const nextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarYear(prev => prev + 1);
      setCalendarMonth(0);
    } else {
      setCalendarMonth(prev => prev + 1);
    }
  };

  // Days in month calculation
  const getDaysInMonthArray = () => {
    const totalDays = new Date(calendarYear, calendarMonth + 1, 0).getDate();
    // Day of the week for the first day of the month (0 = Sun, 1 = Mon... 6 = Sat)
    // Convert so that Mon is 0, Tue is 1, ... Sun is 6
    let startDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay();
    // Adjust Sunday from 0 to 6, and shift Monday-Saturday from 1-6 to 0-5
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    const days = [];
    // Padding
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    // Days
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }
    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Check state of individual calendar day
  const getDayStatus = (dayValue: number) => {
    const calendarDate = new Date(calendarYear, calendarMonth, dayValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isPast = calendarDate < today;
    const isSunday = calendarDate.getDay() === 0;

    return {
      isPast,
      isSunday,
      isSelectable: !isPast && !isSunday
    };
  };

  // Convert calendar year, month, day to YYYY-MM-DD
  const formatIsoDate = (day: number) => {
    const mm = String(calendarMonth + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${calendarYear}-${mm}-${dd}`;
  };

  // Handle booking action
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate) {
      triggerToast(language === 'zh' ? '请先选择上门勘测的日期！' : 'Please select an inspection date first.', 'error');
      return;
    }

    if (!name.trim()) {
      triggerToast(language === 'zh' ? '请输入您的姓名！' : 'Please input your full name.', 'error');
      return;
    }

    if (!phone.trim()) {
      triggerToast(language === 'zh' ? '请输入联络电话！' : 'Please provide a valid phone number.', 'error');
      return;
    }

    if (!location.trim()) {
      triggerToast(language === 'zh' ? '请输入现场测量地址！' : 'Please insert the site address.', 'error');
      return;
    }

    // Secondary sanity checks of date rules
    const [y, m, d] = selectedDate.split('-').map(Number);
    const parsedDate = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (parsedDate < today) {
      triggerToast(b.warningPast || 'You cannot select a past date.', 'error');
      return;
    }

    if (parsedDate.getDay() === 0) {
      triggerToast(b.warningSunday || 'We are closed on Sundays.', 'error');
      return;
    }

    // Booked success record
    const appointmentCode = `PM-SRV-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: BookingRecord = {
      id: appointmentCode,
      serviceType,
      date: selectedDate,
      timeSlot: selectedSlot,
      name,
      phone,
      location,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedBookings = [newBooking, ...bookings];
    setBookings(updatedBookings);
    localStorage.setItem('pakmike_bookings', JSON.stringify(updatedBookings));

    // Clear form inputs
    setName('');
    setPhone('');
    setLocation('');
    
    // Switch to history tab to view our reservation
    setActiveTab('history');
    
    // Toast alert
    const successMsgWithCode = (b.successMsg || 'Scheduled! Code: {code}').replace('{code}', appointmentCode);
    triggerToast(successMsgWithCode, 'success');
  };

  // Cancel reservation
  const handleCancelBooking = (id: string) => {
    if (confirm(language === 'zh' ? '您确定要取消此上门勘测预约吗？' : 'Are you sure you want to cancel this scheduled site survey?')) {
      const filtered = bookings.filter(bk => bk.id !== id);
      setBookings(filtered);
      localStorage.setItem('pakmike_bookings', JSON.stringify(filtered));
      triggerToast(language === 'zh' ? '预约已取消。' : 'Booking cancelled successfully.');
    }
  };

  // Trigger WhatsApp Sync for a specific booking details
  const triggerWhatsAppSync = (bk: BookingRecord) => {
    const textMsg = language === 'en'
      ? `Hello Pakmike Technology! I booked a Site Survey slot via your Online App.\n\n*📌 Booking Details:*\n- *Appointment Code:* ${bk.id}\n- *Service Type:* ${bk.serviceType}\n- *Date:* ${bk.date}\n- *Time Slot:* ${bk.timeSlot}\n- *Client Name:* ${bk.name}\n- *Phone No:* ${bk.phone}\n- *Inspection Address:* ${bk.location}\n\nPlease confirm if this booking slot is verified on your end. Thank you!`
      : language === 'zh'
      ? `阿强/阿张师傅您好！我刚刚在网上自助预约了上门测量勘测，以下是我的预约单信息，请问后台能帮我确认排班吗？感谢！\n\n*📌 预约详情:*\n- *预约凭证号:* ${bk.id}\n- *所需服务:* ${bk.serviceType}\n- *上门日期:* ${bk.date}\n- *首选时段:* ${bk.timeSlot}\n- *客户姓名:* ${bk.name}\n- *联系方式:* ${bk.phone}\n- *勘测地址:* ${bk.location}`
      : `Hello Pakmike Technology! Saya telah menempah slot Lawatan Tapak melalui App atas talian.\n\n*📌 Butiran Tempahan:*\n- *Kod Temujanji:* ${bk.id}\n- *Jenis Servis:* ${bk.serviceType}\n- *Tarikh:* ${bk.date}\n- *Slot Masa:* ${bk.timeSlot}\n- *Nama Pelanggan:* ${bk.name}\n- *Nombor Telefon:* ${bk.phone}\n- *Alamat Tapak:* ${bk.location}\n\nSila sahkan tempahan ini. Terima kasih!`;

    const waLink = `https://wa.me/60175162938?text=${encodeURIComponent(textMsg)}`;
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  // Inline dates highlights
  const isSelectedDate = (day: number) => {
    return formatIsoDate(day) === selectedDate;
  };

  return (
    <section id="service-booking" className="py-20 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block Section */}
        <div className="text-center max-w-3xl mx-auto mb-12.5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-100 text-cyan-800 border border-cyan-200">
            <CalendarIcon size={11} className="text-cyan-600 animate-pulse" />
            <span>{b.badge}</span>
          </span>
          
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mt-3 font-sans leading-tight">
            {b.title}
          </h2>
          
          <p className="text-gray-600 mt-2.5 text-sm md:text-base leading-relaxed font-semibold">
            {b.sub}
          </p>

          {/* Tab Navigation selectors */}
          <div className="flex items-center justify-center mt-8 p-1 bg-gray-200/80 rounded-xl max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('book')}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                activeTab === 'book'
                  ? 'bg-white text-cyan-950 shadow-md font-black'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Wrench size={13} />
                {b.tabBook}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer relative ${
                activeTab === 'history'
                  ? 'bg-white text-cyan-950 shadow-md font-black'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Eye size={13} />
                {(b.tabHistory || 'My Reserved Visits ({count})').replace('{count}', String(bookings.length))}
              </span>
              
              {bookings.length > 0 && (
                <span className="absolute -top-1.5 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-mono font-black text-white outline-2 outline-white">
                  {bookings.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Toast feedback */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-6 py-3.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-black uppercase tracking-wider border ${
                toast.type === 'success'
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                  : 'bg-rose-50 text-rose-950 border-rose-200'
              }`}
            >
              <CheckCircle size={15} className={toast.type === 'success' ? 'text-emerald-600' : 'text-rose-600'} />
              <span>{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Tabs Switcher */}
        <div id="service-booking-tabs" className="max-w-5xl mx-auto">
          {activeTab === 'book' ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xl"
            >
              <form onSubmit={handleBookingSubmit} className="space-y-8">
                
                {/* 1. Required Service Pick */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-gray-750 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={14} className="text-cyan-500 animate-pulse" />
                    <span>{b.lblService}</span>
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {serviceOptions.map((opt) => (
                      <div
                        key={opt.value}
                        onClick={() => setServiceType(opt.value)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 select-none hover:bg-gray-50/50 ${
                          serviceType === opt.value
                            ? 'bg-cyan-50/35 border-cyan-500 shadow-sm'
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          serviceType === opt.value ? 'border-cyan-500 bg-cyan-500' : 'border-gray-300'
                        }`}>
                          {serviceType === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-black text-gray-900 leading-snug">
                            {opt.value}
                          </p>
                          <p className="text-[10px] text-gray-500 font-bold leading-normal">
                            {opt.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Interactive Custom Day Grid Picker */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                  
                  {/* Left component: Custom Calendar Widget */}
                  <div className="lg:col-span-12 xl:col-span-7 space-y-3.5">
                    <label className="text-xs font-black text-gray-750 uppercase tracking-widest flex items-center gap-1.5">
                      <CalendarIcon size={14} className="text-cyan-500" />
                      <span>{b.lblDate}</span>
                    </label>

                    <div className="bg-gray-100/60 border border-gray-250 rounded-2.5xl p-5.5 shadow-xs relative">
                      {/* Month Year Navigator */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-black text-gray-900 uppercase tracking-wider font-mono">
                          {monthNames[calendarMonth]} {calendarYear}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={prevMonth}
                            className="p-1.5 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors cursor-pointer"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={nextMonth}
                            className="p-1.5 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors cursor-pointer"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Day Header */}
                      <div className="grid grid-cols-7 gap-1 text-center font-mono text-[9px] font-black uppercase text-gray-400 tracking-wider mb-2">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span className="text-rose-450">Sun</span>
                      </div>

                      {/* Days Grid */}
                      <div className="grid grid-cols-7 gap-1.5">
                        {getDaysInMonthArray().map((day, idx) => {
                          if (day === null) {
                            return <div key={`empty-${idx}`} className="aspect-square" />;
                          }

                          const formattedDate = formatIsoDate(day);
                          const { isPast, isSunday, isSelectable } = getDayStatus(day);
                          const selected = selectedDate === formattedDate;

                          // Dynamic stylings based on states
                          let btnClass = "aspect-square rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all relative cursor-pointer ";
                          if (selected) {
                            btnClass += "bg-cyan-600 text-white font-black shadow-lg shadow-cyan-600/20 scale-[1.03] border-0";
                          } else if (isSunday) {
                            btnClass += "text-rose-400 bg-rose-50/20 hover:bg-rose-50/50 cursor-not-allowed";
                          } else if (isPast) {
                            btnClass += "text-gray-300 cursor-not-allowed pointer-events-none line-through";
                          } else {
                            btnClass += "bg-white border border-gray-200 text-gray-800 hover:border-cyan-400 hover:scale-[1.02] active:scale-[0.98]";
                          }

                          return (
                            <button
                              key={`day-${day}`}
                              type="button"
                              onClick={() => {
                                if (isPast) {
                                  triggerToast(b.warningPast || 'You cannot select a past date.', 'error');
                                  return;
                                }
                                if (isSunday) {
                                  triggerToast(b.warningSunday || 'Specialists are closed Sundays.', 'error');
                                  return;
                                }
                                setSelectedDate(formattedDate);
                              }}
                              className={btnClass}
                              title={isSunday ? "Closed" : formattedDate}
                            >
                              <span>{day}</span>
                              
                              {/* Today highlighters Dot */}
                              {(() => {
                                const todayDateString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
                                if (formattedDate === todayDateString) {
                                  return (
                                    <span className={`absolute bottom-1 w-1 h-1 rounded-full ${selected ? 'bg-white' : 'bg-cyan-500'}`} />
                                  );
                                }
                                return null;
                              })()}
                            </button>
                          );
                        })}
                      </div>

                      {/* Informational Guidelines bar inside calendar */}
                      <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-500 font-bold bg-white/70 border border-gray-200/50 p-2.5 rounded-xl">
                        <Info size={12} className="text-cyan-500 shrink-0" />
                        <span>
                          {language === 'zh' 
                            ? '日历说明：亮白色块为可勾选时段，周日、过往时段已自锁禁选。'
                            : 'Select standard Monday-Saturday time windows. Sundays and previous dates are disabled.'}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Right side component: Slot selection */}
                  <div className="lg:col-span-12 xl:col-span-5 space-y-3.5">
                    <label className="text-xs font-black text-gray-750 uppercase tracking-widest flex items-center gap-1.5">
                      <Clock size={14} className="text-cyan-500" />
                      <span>{b.lblTimeSlot}</span>
                    </label>

                    <div className="space-y-3">
                      {timeSlots.map((slot) => {
                        const remaining = getRemainingSlotsCount(selectedDate, slot.descCode);
                        const isChosen = selectedSlot === slot.value;
                        const isLastOne = remaining === 1;

                        return (
                          <div
                            key={slot.value}
                            onClick={() => setSelectedSlot(slot.value)}
                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between select-none ${
                              isChosen
                                ? 'bg-cyan-50/35 border-cyan-500 shadow-sm'
                                : 'border-gray-200 bg-white hover:bg-gray-50/50'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="text-xs font-black text-gray-900 font-mono">
                                {slot.label}
                              </span>

                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isChosen ? 'border-cyan-500 bg-cyan-500' : 'border-gray-300'
                              }`}>
                                {isChosen && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </div>
                            
                            {/* Urgent slots left indicator */}
                            <div className="mt-1.5 flex items-center justify-between w-full text-[10px]">
                              <span className={`font-semibold uppercase tracking-wider ${isLastOne ? 'text-amber-600 font-black animate-pulse' : 'text-gray-500'}`}>
                                {(b.timeSlotInfo || 'Only {count} slots left!').replace('{count}', String(remaining))}
                              </span>
                              
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-black uppercase ${
                                isLastOne ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {isLastOne ? 'URGENT' : 'VACANT'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* 3. User Contact Info inputs */}
                <div className="space-y-4 pt-4 border-t border-gray-150">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-gray-750 uppercase tracking-wider flex items-center gap-1">
                        <User size={13} className="text-gray-400" />
                        <span>{b.lblName}</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-11.5 px-4 rounded-xl border border-gray-250 bg-white text-xs font-bold text-gray-800 placeholder-gray-400 outline-hidden hover:border-gray-350 focus:border-cyan-500 transition-all font-sans"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-gray-750 uppercase tracking-wider flex items-center gap-1">
                        <Phone size={13} className="text-gray-400" />
                        <span>{b.lblPhone}</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+6012-3456789"
                        className="w-full h-11.5 px-4 rounded-xl border border-gray-250 bg-white text-xs font-bold text-gray-800 placeholder-gray-400 outline-hidden hover:border-gray-350 focus:border-cyan-500 transition-all font-sans"
                      />
                    </div>

                    {/* Site Location Address */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-gray-750 uppercase tracking-wider flex items-center gap-1">
                        <MapPin size={13} className="text-gray-400" />
                        <span>{b.lblLocation}</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Bayan Lepas, Prai"
                        className="w-full h-11.5 px-4 rounded-xl border border-gray-250 bg-white text-xs font-bold text-gray-800 placeholder-gray-400 outline-hidden hover:border-gray-350 focus:border-cyan-500 transition-all font-sans"
                      />
                    </div>

                  </div>

                  {/* Autocomplete fast pill selection */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">
                      {language === 'zh' ? '⚡ 槟城/北赖常用区域快捷点选:' : '⚡ Quick Zone Selector:'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {penangZones.map((z) => (
                        <button
                          key={z}
                          type="button"
                          onClick={() => setLocation(z)}
                          className={`px-3 py-1.5 border rounded-lg text-[10px] font-bold transition-all cursor-pointer pointer-events-auto ${
                            location === z
                              ? 'bg-cyan-50 text-cyan-800 border-cyan-400 font-black'
                              : 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {z}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit button container */}
                <div className="pt-6 border-t border-gray-150">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-black text-sm uppercase tracking-normal rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/10 cursor-pointer transition-all pointer-events-auto hover:translate-y-[-1px]"
                  >
                    <CalendarIcon size={16} />
                    <span>{b.btnBook}</span>
                  </button>
                </div>

              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xl"
            >
              {bookings.length === 0 ? (
                <div className="text-center py-20">
                  <CalendarIcon size={44} className="mx-auto text-gray-300 animate-bounce mb-3" />
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest">
                    {b.noHistory}
                  </p>
                  <p className="text-[10px] text-gray-400 font-bold mt-1 max-w-sm mx-auto leading-relaxed">
                    {language === 'zh' 
                      ? '通过左侧标签可以根据您的空闲时段预约阿强与阿张师傅，足不出户锁定上门好档期！' 
                      : 'Schedule a free survey slot and track the assigned technician real-time.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookings.map((bk) => (
                    <div
                      key={bk.id}
                      className="border border-gray-150 rounded-2xl p-5 hover:border-cyan-300 transition-colors shadow-xs bg-gray-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                    >
                      {/* Left: Metadata info */}
                      <div className="space-y-2.5 max-w-xl">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="px-2.5 py-1 bg-cyan-50 border border-cyan-200 text-cyan-800 text-[10px] font-mono font-black rounded-lg">
                            {bk.id}
                          </span>
                          
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 text-[9px] font-mono font-black uppercase tracking-widest">
                            {bk.status === 'pending' ? 'RESERVED' : 'CONFIRMED'}
                          </span>
                        </div>

                        <h4 className="text-sm font-black text-gray-900 leading-tight">
                          {bk.serviceType}
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-[11px] text-gray-500 font-semibold leading-relaxed">
                          <span className="flex items-center gap-1.5">
                            <CalendarIcon size={12} className="text-gray-400" />
                            <span>Date: <strong className="text-gray-700">{bk.date}</strong></span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} className="text-gray-400" />
                            <span>Slot: <strong className="text-gray-700">{bk.timeSlot}</strong></span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <User size={12} className="text-gray-400" />
                            <span>Contact: <strong className="text-gray-700">{bk.name} ({bk.phone})</strong></span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-gray-400" />
                            <span>Site Address: <strong className="text-gray-700">{bk.location}</strong></span>
                          </span>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex flex-row md:flex-col sm:items-stretch gap-2 w-full md:w-auto shrink-0">
                        {/* WhatsApp Synchronization */}
                        <button
                          onClick={() => triggerWhatsAppSync(bk)}
                          className="flex-1 px-4 py-2.5 bg-[#25D366] hover:bg-[#1fbc5a] text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer pointer-events-auto shadow-sm"
                        >
                          <ExternalLink size={12} />
                          <span>{b.syncWhatsApp}</span>
                        </button>

                        {/* Cancellation option */}
                        <button
                          onClick={() => handleCancelBooking(bk.id)}
                          className="px-3.5 py-2.5 border border-red-200 hover:bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer pointer-events-auto"
                          title="Delete Booking"
                        >
                          <Trash2 size={12} />
                          <span>{b.cancel}</span>
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
};

export default ServiceBooking;
