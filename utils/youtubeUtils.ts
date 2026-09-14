/**
 * YouTube URL Utilities
 * Provides functions for parsing YouTube URLs and extracting video IDs
 */

/**
 * Extracts the 11-character video ID from various YouTube URL formats
 * Supports standard URLs, short links (youtu.be), YouTube Shorts, and embed URLs
 * 
 * @param url - The YouTube video URL
 * @returns The 11-character video ID or null if invalid
 * 
 * @example
 * extractYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
 * // Returns: 'dQw4w9WgXcQ'
 * 
 * @example
 * extractYouTubeVideoId('https://youtu.be/3tmd-ClpJxA')
 * // Returns: '3tmd-ClpJxA'
 * 
 * @example
 * extractYouTubeVideoId('https://www.youtube.com/shorts/dQw4w9WgXcQ')
 * // Returns: 'dQw4w9WgXcQ'
 */
export const extractYouTubeVideoId = (url: string): string | null => {
  if (!url || typeof url !== 'string') return null;

  // Trim whitespace
  const trimmedUrl = url.trim();

  // Regular expressions for different YouTube URL formats
  const patterns = [
    // Standard YouTube URL: https://www.youtube.com/watch?v=VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/,
    // Short URL: https://youtu.be/VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    // YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    // Embed URL: https://www.youtube.com/embed/VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    // Mobile URL: https://m.youtube.com/watch?v=VIDEO_ID
    /(?:https?:\/\/)?m\.youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]{11})/,
    // Live URL: https://www.youtube.com/live/VIDEO_ID
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = trimmedUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Generates the thumbnail URL for a YouTube video
 * 
 * @param videoId - The 11-character YouTube video ID
 * @param quality - Thumbnail quality (default, medium, high, maxres)
 * @returns The thumbnail URL
 * 
 * @example
 * getThumbnailUrl('dQw4w9WgXcQ', 'high')
 * // Returns: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg'
 */
export const getThumbnailUrl = (
  videoId: string,
  quality: 'default' | 'medium' | 'high' | 'maxres' = 'medium'
): string => {
  const qualityMap = {
    default: 'default',
    medium: 'mqdefault',
    high: 'hqdefault',
    maxres: 'maxresdefault'
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
};

/**
 * Generates the YouTube embed URL for a video
 * 
 * @param videoId - The 11-character YouTube video ID
 * @param options - Embed options
 * @returns The embed URL
 * 
 * @example
 * getEmbedUrl('dQw4w9WgXcQ', { autoplay: true })
 * // Returns: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
 */
export const getEmbedUrl = (
  videoId: string,
  options: {
    autoplay?: boolean;
    rel?: boolean;
    modestbranding?: boolean;
    controls?: boolean;
  } = {}
): string => {
  const params = new URLSearchParams();

  if (options.autoplay) params.append('autoplay', '1');
  if (options.rel !== undefined) params.append('rel', options.rel ? '1' : '0');
  if (options.modestbranding) params.append('modestbranding', '1');
  if (options.controls !== undefined) params.append('controls', options.controls ? '1' : '0');

  const queryString = params.toString();
  return `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ''}`;
};

/**
 * Validates if a string is a valid YouTube video URL
 * 
 * @param url - The URL to validate
 * @returns True if valid YouTube URL, false otherwise
 */
export const isValidYouTubeUrl = (url: string): boolean => {
  return extractYouTubeVideoId(url) !== null;
};

/**
 * Video data interface for type safety
 */
export interface Video {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
}