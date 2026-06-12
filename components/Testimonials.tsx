import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Star, Quote, ShieldCheck, CheckCircle2, User } from 'lucide-react';

const Testimonials: React.FC = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  const testimonials = [
    {
      id: "t1",
      name: t.testimonials.t1_name,
      role: t.testimonials.t1_role,
      comment: t.testimonials.t1_comment,
      service: t.testimonials.t1_service,
      category: 'residential' as const,
      rating: 5,
      colorClass: 'cyan',
    },
    {
      id: "t2",
      name: t.testimonials.t2_name,
      role: t.testimonials.t2_role,
      comment: t.testimonials.t2_comment,
      service: t.testimonials.t2_service,
      category: 'commercial' as const,
      rating: 5,
      colorClass: 'dark',
    },
    {
      id: "t3",
      name: t.testimonials.t3_name,
      role: t.testimonials.t3_role,
      comment: t.testimonials.t3_comment,
      service: t.testimonials.t3_service,
      category: 'commercial' as const,
      rating: 5,
      colorClass: 'cyan',
    },
    {
      id: "t4",
      name: t.testimonials.t4_name,
      role: t.testimonials.t4_role,
      comment: t.testimonials.t4_comment,
      service: t.testimonials.t4_service,
      category: 'residential' as const,
      rating: 5,
      colorClass: 'dark',
    },
  ];

  const filteredTestimonials = testimonials.filter(
    (t) => filter === 'all' || t.category === filter
  );

  return (
    <section id="testimonials" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decorations for a premium look */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-150 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-100 rounded-full blur-3xl opacity-20 translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-fade-in">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-100 text-cyan-800 mb-4 border border-cyan-200">
            <ShieldCheck size={14} className="animate-pulse" />
            {t.testimonials.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-6">
            {t.testimonials.title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed font-medium">
            {t.testimonials.description}
          </p>
        </div>

        {/* Filters Panel */}
        <div className="flex justify-center gap-3 mb-12">
          {[
            { id: 'all', label: language === 'en' ? 'All Reviews' : language === 'zh' ? '全部评价' : 'Semua Penilaian' },
            { id: 'residential', label: language === 'en' ? 'Residential' : language === 'zh' ? '住宅客户' : 'Kediaman' },
            { id: 'commercial', label: language === 'en' ? 'Commercial & Industrial' : language === 'zh' ? '工商业客户' : 'Komersial & Industri' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 pointer-events-auto cursor-pointer ${
                filter === btn.id
                  ? 'bg-gray-900 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Bento Grid layout of comments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className={`group flex flex-col justify-between p-8 md:p-10 rounded-[32px] border transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                item.colorClass === 'cyan'
                  ? 'bg-gradient-to-br from-white to-cyan-50/20 border-cyan-100 hover:border-cyan-300'
                  : 'bg-gradient-to-br from-white to-gray-50/50 border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Header inside card */}
              <div>
                <div className="flex justify-between items-start mb-6">
                  {/* Stars Rating */}
                  <div className="flex gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  {/* Elegant Quote mark */}
                  <Quote
                    size={40}
                    className="text-cyan-500/10 group-hover:text-cyan-500/20 transition-colors duration-500"
                  />
                </div>

                {/* Comment Content */}
                <p className="text-gray-700 text-lg md:text-xl font-medium leading-relaxed italic mb-8 relative z-10">
                  "{item.comment}"
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100/85">
                <div className="flex items-center gap-4">
                  {/* Avatar Icon */}
                  <div className="w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-extrabold text-base border border-cyan-200 shadow-inner group-hover:scale-105 transition-transform">
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 group-hover:text-cyan-600 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                      {item.role}
                    </p>
                  </div>
                </div>

                {/* Installed Service Tag */}
                <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-600 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full whitespace-nowrap">
                  <CheckCircle2 size={12} />
                  {item.service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Global Business Trust Banner */}
        <div className="mt-16 text-center max-w-md mx-auto">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest gap-2 flex items-center justify-center">
            <span>✓ {language === 'en' ? 'Fully Licensed' : language === 'zh' ? '资质齐全' : 'Berlesen Penuh'}</span>
            <span className="text-gray-300">•</span>
            <span>✓ {language === 'en' ? '1-Year Warranty' : language === 'zh' ? '一年保修' : 'Waranti 1 Tahun'}</span>
            <span className="text-gray-300">•</span>
            <span>✓ {language === 'en' ? '24/7 Priority Support' : language === 'zh' ? '24小时优先支持' : 'Sokongan Utama 24/7'}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
