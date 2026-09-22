import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { GALLERY_BANNER_IMAGES, GalleryBannerImage } from '../constants';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export const GalleryBanner: React.FC = () => {
  const activeSlides = GALLERY_BANNER_IMAGES.filter((img) => !img.hidden);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto advance every ~5s unless paused on hover
  useEffect(() => {
    if (isHovered || activeSlides.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, activeSlides.length]);

  if (activeSlides.length === 0) {
    return null;
  }

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const currentSlide: GalleryBannerImage = activeSlides[currentIndex];

  return (
    <div className="w-full bg-slate-950 py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative w-full overflow-hidden rounded-2xl shadow-2xl aspect-[21/9] min-h-[220px] md:min-h-[320px] md:aspect-[16/5] bg-slate-900 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-label="Featured Works Showcase"
        >
          {/* Animated Slide */}
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 260, damping: 28 },
                opacity: { duration: 0.35 },
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentSlide.src}
                alt={currentSlide.title || 'Portfolio showcase banner'}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />

              {/* Gradient Scrim Overlay for Legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 pointer-events-none" />

              {/* Caption Overlay */}
              {(currentSlide.title || currentSlide.caption) && (
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end text-white z-10">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/80 text-white backdrop-blur-md mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Featured Project
                    </span>
                    {currentSlide.title && (
                      <h3 className="text-lg sm:text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-md">
                        {currentSlide.title}
                      </h3>
                    )}
                    {currentSlide.caption && (
                      <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-200 line-clamp-2 drop-shadow">
                        {currentSlide.caption}
                      </p>
                    )}
                    {currentSlide.link && (
                      <a
                        href={currentSlide.link}
                        target={currentSlide.link.startsWith('http') ? '_blank' : undefined}
                        rel={currentSlide.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center gap-1.5 mt-3 text-xs sm:text-sm font-semibold text-cyan-300 hover:text-cyan-100 transition-colors group/link"
                      >
                        Explore Project Details
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {activeSlides.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Dot Indicators */}
              <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-6 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                {activeSlides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`transition-all duration-300 rounded-full focus:outline-none ${
                      currentIndex === index
                        ? 'w-6 sm:w-7 h-2 bg-cyan-400 shadow-sm'
                        : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryBanner;
