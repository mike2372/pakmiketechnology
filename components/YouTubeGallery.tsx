import React, { useState } from 'react';
import { Play, X, Youtube } from 'lucide-react';
import { extractYouTubeVideoId, getThumbnailUrl, getEmbedUrl, Video } from '../utils/youtubeUtils';

// Sample video data - replace with your actual videos
const VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Pillar Seal Solution (M) Malaysia.Desfire Standalone System',
    description: 'These terminals use advanced encryption to prevent card cloning and unauthorized entry.',
    youtubeUrl: 'https://www.youtube.com/shorts/qMoRDRjB-hg'
  },
  {
    id: '2',
    title: 'Malaysian Companies Are Switching to Mobile App Attendance, So Why Do You Still Need a Hikvision MinMoe DS-K1T323 Access Control System?',
    description: 'Goodbye Access Cards: Smart Face Recognition Meets Your Attendance Mobile App GPS Clocking.',
    youtubeUrl: 'https://www.youtube.com/shorts/v2Pc8mDT_lY'
  },
  {
    id: '3',
    title: 'Caltex petrol Station Lunas',
    description: 'Explore advanced React patterns and component architecture.',
    youtubeUrl: 'https://www.youtube.com/watch?v=oWQ66PKZfnM'
  },
  {
    id: '4',
    title: 'EZVIZ TY1 Pro 4MP',
    description: 'It features a 2560 x1440 resolution, delivering sharp 2K+ video quality that allows for clearer detail than standard 1080p models.Dual-Band Connectivity..',
    youtubeUrl: 'https://www.youtube.com/shorts/8U3wutCoDeI'
  },
  {
    id: '5',
    title: 'Performance Optimization',
    description: 'Techniques to optimize your web application performance.',
    youtubeUrl: 'https://youtu.be/v=w5vGk8DqZw'
  },
  {
    id: '6',
    title: 'Genius Mind Academy (GMA) Memoschool ',
    description: 'Introduction to DevOps practices and CI/CD pipelines.',
    youtubeUrl: 'https://www.youtube.com/watch?v=z0WQpgBjiXg'
  }
];

// Modal Component
const VideoModal: React.FC<{
  videoId: string;
  title: string;
  onClose: () => void;
}> = ({ videoId, title, onClose }) => {
  // Handle escape key and backdrop click
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div
        className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Close video modal"
        >
          <X size={24} />
        </button>

        {/* Video Title */}
        <div className="bg-gradient-to-b from-black/50 to-transparent absolute top-0 left-0 right-0 p-6 z-10">
          <h3 id="video-modal-title" className="text-white text-lg sm:text-xl font-bold truncate">
            {title}
          </h3>
        </div>

        {/* YouTube Embed */}
        <div className="aspect-video w-full">
          <iframe
            src={getEmbedUrl(videoId, { autoplay: true, rel: false, modestbranding: true })}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

// Video Card Component
const VideoCard: React.FC<{
  video: Video;
  onClick: () => void;
}> = ({ video, onClick }) => {
  const videoId = extractYouTubeVideoId(video.youtubeUrl);
  const thumbnailUrl = videoId ? getThumbnailUrl(videoId, 'high') : 'https://via.placeholder.com/480x360?text=Video+Not+Found';

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Play video: ${video.title}`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 shadow-lg">
            <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
          </div>
        </div>

        {/* Duration Badge (Optional - you can add duration to your video schema) */}
        {videoId && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            YouTube
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
          {video.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {video.description}
        </p>
      </div>
    </div>
  );
};

// Main YouTube Gallery Component
const YouTubeGallery: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="youtube-gallery" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-red-100">
            <Youtube size={16} />
            <span>Video Gallery</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Featured <span className="text-red-600">Videos</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Explore our latest video content, tutorials, and insights. Click on any video to watch it in our custom player.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {VIDEOS.map((video) => {
            const videoId = extractYouTubeVideoId(video.youtubeUrl);
            if (!videoId) {
              console.warn(`Invalid YouTube URL for video: ${video.title}`);
              return null;
            }

            return (
              <VideoCard
                key={video.id}
                video={video}
                onClick={() => handleVideoClick(video)}
              />
            );
          })}
        </div>

        {/* Empty State */}
        {VIDEOS.length === 0 && (
          <div className="text-center py-16">
            <Youtube className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No videos available yet.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedVideo && (
        <VideoModal
          videoId={extractYouTubeVideoId(selectedVideo.youtubeUrl) || ''}
          title={selectedVideo.title}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default YouTubeGallery;