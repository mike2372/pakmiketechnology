import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, HelpCircle, Shield, Clock, Hammer, HelpCircle as QuestionIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle, index }) => {
  // Select icon based on question index to look highly hand-crafted and professional
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Clock size={20} className="text-cyan-500 shrink-0" />;
      case 1:
        return <Shield size={20} className="text-[#25D366] shrink-0" />;
      case 2:
        return <Hammer size={20} className="text-amber-500 shrink-0" />;
      default:
        return <HelpCircle size={20} className="text-cyan-500 shrink-0" />;
    }
  };

  return (
    <div 
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen 
          ? 'bg-white border-cyan-300 shadow-lg shadow-cyan-100/50' 
          : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 pointer-events-auto cursor-pointer focus:outline-hidden"
        id={`faq-btn-${index}`}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          {getIcon(index)}
          <span className="font-extrabold text-sm md:text-base text-gray-905 tracking-tight group-hover:text-cyan-600">
            {question}
          </span>
        </div>
        <ChevronDown 
          size={18} 
          className={`text-gray-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-cyan-500' : ''}`} 
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium border-t border-gray-50 pt-4 pl-14">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first FAQ item

  // Verify that the translation paths exist, fallback safely just in case
  const faqData = t.faq ? [
    { question: t.faq.q1_q, answer: t.faq.q1_a },
    { question: t.faq.q2_q, answer: t.faq.q2_a },
    { question: t.faq.q3_q, answer: t.faq.q3_a },
    { question: t.faq.q4_q, answer: t.faq.q4_a },
  ] : [
    { 
      question: 'How long does a general system installation take?', 
      answer: 'Most residential and office installations are completed within 1 to 2 business days. Larger industrial projects or rewiring may take 4 to 7 business days.' 
    },
    { 
      question: 'What warranties and service guarantees do you offer?', 
      answer: 'We provide a 1-year product warranty on hardware and a 12-month workmanship guarantee on all electrical and mounting tasks.' 
    },
    { 
      question: 'How often do security systems need routine maintenance?', 
      answer: 'We recommend routine inspections every 6 months to clean cameras, test backups, and verify hard drive logs are clear.' 
    },
    { 
      question: 'Are site surveys and initial quotations free in Penang?', 
      answer: 'Yes! We offer 100% free site visits and quotation design surveys anywhere in Penang, Prai, BM, and Butterworth.' 
    },
  ];

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const badgeText = t.faq?.badge || 'Support & Help';
  const titleText = t.faq?.title || 'Frequently Asked Questions';
  const descriptionText = t.faq?.description || 'Find lightning-fast answers to common queries regarding security installations, electrical wiring, and service agreements.';

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Light subtle visual elements */}
      <div className="absolute top-1/2 left-full -translate-x-1/2 w-80 h-80 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-100 text-cyan-850 mb-4 border border-cyan-200">
            <QuestionIcon size={14} className="text-cyan-600 animate-pulse" />
            {badgeText}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
            {titleText}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed font-medium">
            {descriptionText}
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqData.map((item, idx) => (
            <FAQItem
              key={idx}
              index={idx}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>

        {/* Help Notice Block */}
        <div className="mt-14 text-center max-w-lg mx-auto p-6 bg-gradient-to-r from-cyan-50/50 to-gray-50/50 border border-gray-100 rounded-2xl">
          <p className="text-sm font-semibold text-gray-700">
            {language === 'en' 
              ? 'Have an emergency issue or different technical requirement?' 
              : language === 'zh'
              ? '有紧急情况或不同的定制技术要求安装？'
              : 'Mempunyai isu kecemasan atau keperluan teknikal yang berbeza?'}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs text-cyan-600 hover:text-cyan-700 font-extrabold uppercase tracking-wider mt-2.5 transition-colors group"
          >
            <span>
              {language === 'en' 
                ? 'Get Direct Consultation' 
                : language === 'zh'
                ? '索取专属免费方案'
                : 'Dapatkan Rundingan Terus'}
            </span>
            <Sparkles size={13} className="group-hover:scale-110 transition-transform text-cyan-500 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
