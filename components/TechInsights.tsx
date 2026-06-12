import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  Eye, 
  X, 
  Sparkles, 
  Cpu, 
  Zap, 
  Key, 
  Newspaper,
  Terminal,
  User,
  Heart,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  date: string;
  time: string;
  author: string;
  icon: React.ReactNode;
  tags: string[];
}

const TechInsights: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [likes, setLikes] = useState<Record<string, number>>({ art1: 24, art2: 12, art3: 19 });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  // Parse safety keys
  const sectionBadge = t.techInsights?.badge || 'Tech Insights';
  const sectionTitle = t.techInsights?.title || 'Guides & Technical Knowledge';
  const sectionDesc = t.techInsights?.description || 'Tips and guidelines on CCTV, Power and Smart biometric systems.';
  const labelReadMore = t.techInsights?.readMore || 'Read Full Guide';
  const labelClose = t.techInsights?.closeArticle || 'Close Article';
  const labelMin = t.techInsights?.minutes || 'min read';
  const labelAuthor = t.techInsights?.author || 'Author';

  // Structured articles array dynamically populated using translates with fallback values
  const articles: Article[] = useMemo(() => [
    {
      id: 'art1',
      title: t.techInsights?.art1?.title || '5 Crucial CCTV Maintenance Tips For Penang’s Humid Climate',
      summary: t.techInsights?.art1?.summary || 'High salt-mist and humidity in Penang can silently deteriorate camera lenses.',
      content: t.techInsights?.art1?.content || '',
      category: t.techInsights?.art1?.category || 'CCTV & Vision',
      date: t.techInsights?.art1?.date || 'June 10, 2026',
      time: t.techInsights?.art1?.time || '4',
      author: 'Mike',
      icon: <Cpu className="text-cyan-500" size={18} />,
      tags: language === 'en' 
        ? ['Weatherproofing', 'Maintenance', 'IP66 Rated'] 
        : language === 'zh'
        ? ['防尘抗氧化', '预防性保养', 'IP66防水罩']
        : ['Kalis Cuaca', 'Penyelenggaraan', 'Gred IP66']
    },
    {
      id: 'art2',
      title: t.techInsights?.art2?.title || 'Understanding Suruhanjaya Tenaga 3-Phase Electrical Updates',
      summary: t.techInsights?.art2?.summary || 'New electrical distribution safety guidelines are out. Here is what business owners must comply with.',
      content: t.techInsights?.art2?.content || '',
      category: t.techInsights?.art2?.category || 'Power Standards',
      date: t.techInsights?.art2?.date || 'June 02, 2026',
      time: t.techInsights?.art2?.time || '5',
      author: 'Amir',
      icon: <Zap className="text-amber-500" size={18} />,
      tags: language === 'en'
        ? ['Energy Commission', 'ST Regulations', '3-Phase Grid']
        : language === 'zh'
        ? ['大马能源局', 'ST新配电守则', '3-Phase强电房']
        : ['ST Malaysia', 'Peraturan Elektrik', 'Sistem 3-Fasa']
    },
    {
      id: 'art3',
      title: t.techInsights?.art3?.title || 'Biometrics vs RFID: Choosing The Ideal Factory Access Control',
      summary: t.techInsights?.art3?.summary || 'Is it time to ditch legacy swipe-cards? We breakdown key performance, cost, and security metrics.',
      content: t.techInsights?.art3?.content || '',
      category: t.techInsights?.art3?.category || 'Access Systems',
      date: t.techInsights?.art3?.date || 'May 28, 2026',
      time: t.techInsights?.art3?.time || '4',
      author: 'Ami',
      icon: <Key className="text-indigo-500" size={18} />,
      tags: language === 'en'
        ? ['Access Control', 'RFID Swipes', 'Biometric Locks']
        : language === 'zh'
        ? ['人脸及门禁系统', 'RFID刷卡刷卡', '生物特征解锁']
        : ['Kawalan Akses', 'Kad Imbas RFID', 'Kunci Biometrik']
    }
  ], [t, language]);

  // Categories list based on translations
  const categories = useMemo(() => {
    const list = ['All'];
    articles.forEach(art => {
      if (!list.includes(art.category)) list.push(art.category);
    });
    return list;
  }, [articles]);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked[id]) {
      setLikes(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setHasLiked(prev => ({ ...prev, [id]: false }));
    } else {
      setLikes(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setHasLiked(prev => ({ ...prev, [id]: true }));
    }
  };

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') return articles;
    return articles.filter(art => art.category === selectedCategory);
  }, [articles, selectedCategory]);

  const currentReadingArticle = useMemo(() => {
    return articles.find(art => art.id === selectedArticleId) || null;
  }, [articles, selectedArticleId]);

  return (
    <section id="tech-insights" className="py-24 bg-gray-50 relative overflow-hidden scroll-mt-6 border-b border-gray-100">
      
      {/* Visual backdrop decals */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-155 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-100 text-emerald-800 mb-4 border border-emerald-200">
            <Newspaper size={13} className="text-emerald-600 animate-pulse" />
            {sectionBadge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-901 tracking-tight mb-5">
            {sectionTitle}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed font-semibold">
            {sectionDesc}
          </p>
        </div>

        {/* Filter Chips Row */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all pointer-events-auto cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md shadow-gray-900/10'
                  : 'bg-white border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {cat === 'All' ? (language === 'en' ? 'All Guides' : language === 'zh' ? '全部分类' : 'Semua Rekod') : cat}
            </button>
          ))}
        </div>

        {/* Interactive Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <motion.div
              key={article.id}
              layoutId={`card-container-${article.id}`}
              onClick={() => setSelectedArticleId(article.id)}
              className="bg-white border border-gray-150 rounded-[32px] p-6.5 hover:border-cyan-300 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full group relative cursor-pointer pointer-events-auto"
            >
              <div className="space-y-5">
                
                {/* Topic Header details */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100">
                    {article.icon}
                    <span>{article.category}</span>
                  </span>
                  
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 font-bold">
                    <Clock size={12} />
                    <span>{article.time} {labelMin}</span>
                  </div>
                </div>

                {/* Article Header title */}
                <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight group-hover:text-cyan-600 transition-colors">
                  {article.title}
                </h3>

                {/* Summary snippet */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {article.summary}
                </p>

                {/* Tags row */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {article.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[9px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded border border-gray-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Card Footer section */}
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between shrink-0">
                
                {/* Author attribution info */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-gray-200 flex items-center justify-center text-xs font-black text-slate-700 font-mono">
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block font-semibold leading-none">{labelAuthor}</span>
                    <span className="text-xs font-black text-gray-700 leading-none">{article.author}</span>
                  </div>
                </div>

                {/* Action details with likes interaction */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleLike(article.id, e)}
                    className={`flex items-center gap-1 text-xs font-bold font-mono px-2.5 py-1.5 rounded-lg border transition-colors ${
                      hasLiked[article.id]
                        ? 'bg-rose-50 border-rose-150 text-rose-600'
                        : 'bg-gray-50 border-gray-100 text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Heart size={12} fill={hasLiked[article.id] ? 'currentColor' : 'none'} className={hasLiked[article.id] ? 'scale-110' : ''} />
                    <span>{likes[article.id]}</span>
                  </button>

                  <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center group-hover:bg-cyan-500 transition-colors shadow-xs">
                    <ChevronRight size={16} />
                  </div>
                </div>

              </div>
              
              {/* Eye hover guide */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-cyan-100 text-cyan-805 px-2.5 py-1 rounded-md flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider">
                <Eye size={10} />
                <span>Quick Read</span>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Modal Article Overlay for reading selected item in full details */}
        <AnimatePresence>
          {selectedArticleId && currentReadingArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Overlay background wrapper */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedArticleId(null)}
                className="absolute inset-0 bg-slate-950/65 backdrop-blur-md cursor-pointer"
              />

              {/* Reader Box */}
              <motion.div
                layoutId={`card-container-${currentReadingArticle.id}`}
                className="bg-white rounded-[32px] w-full max-w-3xl max-h-[85vh] overflow-y-auto relative z-10 shadow-2xl border border-white/20 p-6 sm:p-10 pointer-events-auto"
              >
                {/* Dismiss button */}
                <button
                  onClick={() => setSelectedArticleId(null)}
                  className="absolute top-6 right-6 p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-150 rounded-xl transition-all cursor-pointer pointer-events-auto"
                >
                  <X size={18} />
                </button>

                {/* Header details inside reader */}
                <div className="space-y-6 pt-2">
                  
                  {/* Category and Date row */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-widest text-cyan-800 bg-cyan-50 px-3 py-1 ml-0 rounded-lg border border-cyan-100">
                      {currentReadingArticle?.icon}
                      <span>{currentReadingArticle?.category}</span>
                    </span>
                    <span className="text-gray-400 font-bold text-xs">•</span>
                    <span className="font-mono text-xs text-gray-400 font-bold flex items-center gap-1">
                      <Calendar size={13} />
                      {currentReadingArticle?.date}
                    </span>
                    <span className="text-gray-400 font-bold text-xs">•</span>
                    <span className="font-mono text-xs text-gray-400 font-bold flex items-center gap-1">
                      <Clock size={13} />
                      {currentReadingArticle?.time} {labelMin}
                    </span>
                  </div>

                  {/* Complete Title */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-901 tracking-tight leading-tight">
                    {currentReadingArticle?.title}
                  </h1>

                  {/* Creator / Author signature */}
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-750 text-white font-black font-mono flex items-center justify-center text-sm shadow-md">
                      {currentReadingArticle?.author.charAt(0)}
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider block">{labelAuthor} & On-Site Lead Specialist</span>
                      <span className="text-sm font-black text-gray-800">{currentReadingArticle?.author}</span>
                    </div>
                  </div>

                  {/* Fully formatted Article Content with high readability typography */}
                  <div className="prose prose-slate max-w-none text-xs sm:text-sm md:text-base leading-relaxed text-gray-800 font-medium space-y-4 pt-4 border-t border-gray-100">
                    {currentReadingArticle?.content.split('\n\n').map((paragraph, index) => {
                      // Detect lists/bullets inside paragraphs to render cleanly
                      if (paragraph.startsWith('1.') || paragraph.startsWith('*')) {
                        const items = paragraph.split('\n');
                        return (
                          <ul key={index} className="space-y-2 list-none pl-0 my-3">
                            {items.map((item, key) => {
                              // Strip formatting symbols
                              const cleanedItem = item.replace(/^1\.\s+\*\*(.*?)\*\*:\s*/, '$1: ').replace(/^\*\s+\*\*(.*?)\*\*:\s*/, '$1: ');
                              return (
                                <li key={key} className="flex items-start gap-2.5 bg-cyan-50/20 border border-cyan-100/55 p-3 rounded-xl">
                                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                                  <span className="text-gray-700 font-semibold" dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                                </li>
                              );
                            })}
                          </ul>
                        );
                      }
                      
                      // Bold inline highlighter parser
                      const formattedText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                      return (
                        <p 
                          key={index} 
                          className="leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: formattedText }} 
                        />
                      );
                    })}
                  </div>

                  {/* Action Sync to discuss with Tech */}
                  <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-center justify-between">
                    
                    <button
                      onClick={() => {
                        const msg = `Hello ${currentReadingArticle?.author}, I read your guide "${currentReadingArticle?.title}" and have some technical queries.`;
                        const url = `https://wa.me/60175162938?text=${encodeURIComponent(msg)}`;
                        window.open(url, '_blank', 'noreferrer,noopener');
                      }}
                      className="w-full sm:w-auto px-6 py-3.5 bg-[#25D366] hover:bg-[#1fbc5a] text-white font-bold text-xs uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-emerald-900/10 pointer-events-auto cursor-pointer"
                    >
                      <span>{language === 'en' ? 'Discuss with Author' : language === 'zh' ? '与撰写师傅深入交流' : 'Bincang Dengan Penulis'}</span>
                      <ArrowRight size={13} />
                    </button>

                    <button
                      onClick={() => setSelectedArticleId(null)}
                      className="text-xs font-black uppercase text-gray-400 hover:text-gray-800 transition-colors cursor-pointer"
                    >
                      {labelClose}
                    </button>

                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default TechInsights;
