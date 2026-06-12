
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

type Category = 'all' | 'cctv' | 'wiring' | 'access' | 'autogate';

const ProjectGallery: React.FC = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Category>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const projects = [
    {
      id: 1,
      title: t.gallery.projects.p1_title,
      category: 'cctv',
      image: '/images/Caltex station surveillance system.WEBP.webp',
      desc: t.gallery.projects.p1_desc
    },
    {
      id: 2,
      title: t.gallery.projects.p2_title,
      category: 'autogate',
      image: '/images/dcmoto.webp',
      desc: t.gallery.projects.p2_desc
    },
    {
      id: 3,
      title: t.gallery.projects.p3_title,
      category: 'access',
      image: '/images/Hikvision Biometric access control system.jpg',
      desc: t.gallery.projects.p3_desc
    },
    {
      id: 4,
      title: t.gallery.projects.p4_title,
      category: 'wiring',
      image: '/images/caltex stations electrical works.png',
      desc: t.gallery.projects.p4_desc
    },
    {
      id: 5,
      title: t.gallery.projects.p5_title,
      category: 'cctv',
      image: '/images/Smart Ai Homeoffice security.jpg',
      desc: t.gallery.projects.p5_desc
    },
    {
      id: 6,
      title: t.gallery.projects.p6_title,
      category: 'wiring',
      image: '/images/retail store security system.jpg',
      desc: t.gallery.projects.p6_desc
    }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: t.gallery.filters.all },
    { id: 'cctv', label: t.gallery.filters.cctv },
    { id: 'wiring', label: t.gallery.filters.wiring },
    { id: 'access', label: t.gallery.filters.access },
    { id: 'autogate', label: t.gallery.filters.autogate },
  ];

  const handleFilterChange = (catId: Category) => {
    setFilter(catId);
    setActiveIndex(null);
  };

  const handleProjectClick = (projectId: number) => {
    const index = filteredProjects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    if (activeIndex === null || filteredProjects.length === 0) return;
    setActiveIndex((activeIndex + 1) % filteredProjects.length);
  };

  const handlePrev = () => {
    if (activeIndex === null || filteredProjects.length === 0) return;
    setActiveIndex((activeIndex - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleClose = () => {
    setActiveIndex(null);
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeIndex, filteredProjects.length]);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-4">{t.gallery.badge}</h2>
          <p className="text-4xl md:text-5xl font-black text-gray-900 mb-6">{t.gallery.title}</p>
          <div className="w-24 h-2 bg-cyan-500 mx-auto rounded-full mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg font-medium">
            {t.gallery.description}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleFilterChange(cat.id)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-gray-900 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              onClick={() => handleProjectClick(project.id)}
              className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:shadow-cyan-100 transition-all duration-500 bg-gray-100 aspect-[4/3]"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                    {categories.find(c => c.id === project.category)?.label}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.desc}</p>
                  
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    View Project <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIndex !== null && filteredProjects[activeIndex] && (
        <div 
          id="lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md select-none p-4"
          onClick={handleClose}
        >
          {/* Top Bar */}
          <div className="absolute top-0 inset-x-0 h-20 px-6 md:px-12 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
            <div>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest block mb-0.5">
                {categories.find(c => c.id === filteredProjects[activeIndex].category)?.label}
              </span>
              <h4 className="text-white text-base md:text-lg font-bold truncate max-w-[200px] sm:max-w-md md:max-w-xl">
                {filteredProjects[activeIndex].title}
              </h4>
            </div>
            <button 
              id="lightbox-close-btn"
              onClick={handleClose}
              className="p-3 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white transition-all cursor-pointer border border-white/10 hover:scale-105 active:scale-95"
              title="Close (Esc)"
            >
              <X size={24} />
            </button>
          </div>

          {/* Previous Button */}
          <button 
            id="lightbox-prev-btn"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 md:left-8 p-3.5 rounded-full bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 text-white/80 hover:text-white hover:scale-110 active:scale-90 transition-all duration-200 z-20 cursor-pointer hidden sm:flex"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Next Button */}
          <button 
            id="lightbox-next-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 md:right-8 p-3.5 rounded-full bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 text-white/80 hover:text-white hover:scale-110 active:scale-90 transition-all duration-200 z-20 cursor-pointer hidden sm:flex"
            title="Next (Right Arrow)"
          >
            <ChevronRight size={28} />
          </button>

          {/* Main Visual Frame */}
          <div 
            className="relative max-w-5xl max-h-[70vh] flex flex-col items-center justify-center pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              id="lightbox-image"
              src={filteredProjects[activeIndex].image} 
              alt={filteredProjects[activeIndex].title} 
              className="max-w-full max-h-[55vh] md:max-h-[65vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            
            {/* Description & Counter */}
            <div id="lightbox-info" className="mt-6 text-center max-w-2xl px-4">
              <p className="text-gray-300 text-sm md:text-base font-medium leading-relaxed">
                {filteredProjects[activeIndex].desc}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-cyan-400">
                <span>{activeIndex + 1}</span>
                <span className="text-white/40">/</span>
                <span>{filteredProjects.length}</span>
              </div>
            </div>
          </div>

          {/* Mobile swipe indicator / navigation helper at the bottom */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 sm:hidden z-20">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white active:bg-cyan-500/20"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="p-3 rounded-full bg-white/5 border border-white/10 text-white active:bg-cyan-500/20"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;
