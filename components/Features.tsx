"use client";

/* eslint-disable @next/next/no-img-element */

import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { WordsPullUpMultiStyle } from './animations';

interface Feature {
  number: string;
  title: string;
  isVideo?: true;
  videoSrc?: string;
  videoFallback?: string;
  backgroundImage?: string;
  icon?: string;
  items: string[];
}

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const headerSegments = [
    {
      text: 'Mental health support that understands builders.',
      className: 'text-black'
    },
    {
      text: 'Built for developers. Powered by empathy.',
      className: 'text-gray-600'
    }
  ];

  const features: Feature[] = [
    {
      number: '00',
      title: 'Your Safe Space',
      isVideo: true,
      videoSrc: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4',
      videoFallback: 'https://iitgrdkrhqrrkrdmwvpo.supabase.co/storage/v1/object/public/videos/safe_space.mp4',
      items: ['A calm, judgment-free zone', 'Talk whenever you need', 'No pressure, no expectations', 'You are not alone'],
    },
    {
      number: '01',
      title: 'AI Companion',
      isVideo: true,
      videoSrc: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260411_104032_69319010-2458-492b-b04d-b40a5dfa4482.mp4',
      videoFallback: 'https://iitgrdkrhqrrkrdmwvpo.supabase.co/storage/v1/object/public/videos/AI_Companion.mp4',
      items: ['Powered by Claude AI', 'Warm, non-judgmental conversations', 'Understands burnout & imposter syndrome', 'Available 24/7, always free'],
    },
    {
      number: '02',
      title: 'Curated Articles',
      isVideo: true,
      videoSrc: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
      videoFallback: 'https://iitgrdkrhqrrkrdmwvpo.supabase.co/storage/v1/object/public/videos/Curated_articles.mp4',
      items: ['Written for the builder mindset', 'Topics: burnout, anxiety, perfectionism', 'Practical coping strategies', 'Evidence-based insights'],
    },
    {
      number: '03',
      title: 'Forever Free',
      isVideo: true,
      videoSrc: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260525_052706_d2e390fd-1846-4fe7-a4d8-8d2f1c875358.mp4',
      videoFallback: 'https://iitgrdkrhqrrkrdmwvpo.supabase.co/storage/v1/object/public/videos/free_forever.mp4',
      items: ['No subscriptions or paywalls', 'Supported by community donations', 'Access for everyone who needs it', 'No data collection or tracking'],
    }
  ];

  const openModal = (index: number) => {
    setSelectedIndex(index);
  };

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % features.length);
    }
  };

  const goToPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + features.length) % features.length);
    }
  };

  return (
    <section ref={ref} className="min-h-screen bg-white py-20 md:py-32 px-4 md:px-6 relative">
      {/* Background Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <WordsPullUpMultiStyle
            segments={headerSegments}
            containerClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal"
          />
        </div>

        {/* Expandable Gallery */}
        {/* Mobile: Vertical stack, Desktop: Horizontal expandable */}
        <div className="flex md:flex gap-3 md:gap-3 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-3">
          {features.map((feature, index) => {
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
            return (
            <motion.div
              key={feature.title}
              className="relative cursor-pointer overflow-hidden rounded-2xl h-[450px] sm:h-[350px] md:h-[400px] lg:h-[480px]"
              style={{
                flex: '1 1 0%',
                filter: isDimmed ? 'blur(4px)' : 'blur(0px)',
              }}
              animate={{
                flex: hoveredIndex === index ? 2.5 : hoveredIndex === null ? 1 : 0.8,
                scale: isDimmed ? 0.98 : 1,
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => openModal(index)}
            >
              {/* Background - Video or Image */}
              {index === 0 ? (
                <>
                  {feature.isVideo ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        const video = e.target as HTMLVideoElement;
                        if (feature.videoFallback && video.src !== feature.videoFallback) {
                          video.src = feature.videoFallback;
                        }
                      }}
                      src={feature.videoSrc}
                    />
                  ) : (
                    <img
                      src={feature.backgroundImage}
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </>
              ) : (
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  animate={{ scale: hoveredIndex === index ? 1.15 : 1 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  {feature.isVideo ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        const video = e.target as HTMLVideoElement;
                        if (feature.videoFallback && video.src !== feature.videoFallback) {
                          video.src = feature.videoFallback;
                        }
                      }}
                      src={feature.videoSrc}
                    />
                  ) : (
                    <img
                      src={feature.backgroundImage}
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              )}

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: hoveredIndex === index ? 0.4 : 0.7 }}
                transition={{ duration: 0.3 }}
              />

              {/* Glassmorphism blur at bottom - only visible when not hovered */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1/3 backdrop-blur-sm bg-gradient-to-t from-white/8 via-white/5 via-white/3 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  maskImage: 'linear-gradient(to top, black 0%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)'
                }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end">
                {/* Icon and Number */}
                <motion.div
                  className="flex items-center gap-3 mb-3 sm:mb-4 mt-2 sm:mt-4"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0.8,
                    scale: hoveredIndex === index ? 1.05 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon && (
                    <img
                      src={feature.icon}
                      alt=""
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded"
                    />
                  )}
                  <span className="text-xs sm:text-sm text-gray-400">
                    {feature.number}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-base sm:text-lg md:text-xl mb-2"
                  style={{ color: '#E1E0CC' }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0.9,
                    y: hoveredIndex === index ? 0 : 10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.title}
                </motion.h3>

                {/* Items (only show when hovered) */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.ul
                      className="space-y-1 sm:space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {feature.items.slice(0, 2).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs sm:text-sm">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" style={{ color: '#DEDBC8' }} />
                          <span className="text-gray-300 leading-snug">{item}</span>
                        </li>
                      ))}
                      <li className="text-xs text-gray-400 italic">
                        + {feature.items.length - 2} more
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
            onClick={closeModal}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
              onClick={closeModal}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Previous Button */}
            <button
              className="absolute left-4 z-10 text-white hover:text-gray-300 transition-colors"
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            {/* Content */}
            <motion.div
              className="relative max-w-2xl w-full bg-[#212121] rounded-2xl p-8 overflow-hidden z-10"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background - Video or Image */}
              {selectedIndex === 0 ? (
                <>
                  {features[selectedIndex].isVideo ? (
                    <video
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl -z-10"
                      onError={(e) => {
                        const video = e.target as HTMLVideoElement;
                        const feature = features[selectedIndex];
                        if (feature.videoFallback && video.src !== feature.videoFallback) {
                          video.src = feature.videoFallback;
                        }
                      }}
                      src={features[selectedIndex].videoSrc}
                    />
                  ) : (
                    <img
                      src={features[selectedIndex].backgroundImage}
                      alt={features[selectedIndex].title}
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl -z-10"
                    />
                  )}
                </>
              ) : (
                <motion.div
                  className="absolute inset-0 w-full h-full"
                >
                  {features[selectedIndex].isVideo ? (
                    <video
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl -z-10"
                      onError={(e) => {
                        const video = e.target as HTMLVideoElement;
                        const feature = features[selectedIndex];
                        if (feature.videoFallback && video.src !== feature.videoFallback) {
                          video.src = feature.videoFallback;
                        }
                      }}
                      src={features[selectedIndex].videoSrc}
                    />
                  ) : (
                    <img
                      src={features[selectedIndex].backgroundImage}
                      alt={features[selectedIndex].title}
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl -z-10"
                    />
                  )}
                </motion.div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/20 to-black/20 rounded-2xl z-0" />

              {/* Icon and Number */}
              <div className="flex items-center gap-3 mb-4">
                {features[selectedIndex].icon && (
                  <img
                    src={features[selectedIndex].icon}
                    alt=""
                    className="w-16 h-16 rounded"
                  />
                )}
                <span className="text-lg text-gray-400">
                  {features[selectedIndex].number}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl mb-6" style={{ color: '#E1E0CC' }}>
                {features[selectedIndex].title}
              </h2>

              {/* Items */}
              <ul className="space-y-3 mb-6">
                {features[selectedIndex].items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#DEDBC8' }} />
                    <span className="text-base text-gray-200 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Learn More Link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 hover:gap-3 transition-all text-base"
                style={{ color: '#DEDBC8' }}
              >
                Learn more
                <ArrowRight className="w-5 h-5 -rotate-45" strokeWidth={2} />
              </a>
            </motion.div>

            {/* Next Button */}
            <button
              className="absolute right-4 z-10 text-white hover:text-gray-300 transition-colors"
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-md">
              {selectedIndex + 1} / {features.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
