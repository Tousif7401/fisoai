"use client";

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { WordsPullUpMultiStyle } from './animations';

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const headerSegments = [
    {
      text: 'Mental health support that understands builders.',
      className: 'text-primary'
    },
    {
      text: 'Built for developers. Powered by empathy.',
      className: 'text-gray-500'
    }
  ];

  const features = [
    {
      number: '00',
      title: 'Your Safe Space',
      isVideo: true,
      videoSrc: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4',
      items: ['A calm, judgment-free zone', 'Talk whenever you need', 'No pressure, no expectations', 'You are not alone'],
    },
    {
      number: '01',
      title: 'AI Companion',
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
      backgroundImage: 'https://images.unsplash.com/photo-1675271431213-72537461d50d?q=80&w=3628&auto=format&fit=crop',
      items: ['Powered by Claude AI', 'Warm, non-judgmental conversations', 'Understands burnout & imposter syndrome', 'Available 24/7, always free'],
    },
    {
      number: '02',
      title: 'Curated Articles',
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
      backgroundImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=3628&auto=format&fit=crop',
      items: ['Written for the builder mindset', 'Topics: burnout, anxiety, perfectionism', 'Practical coping strategies', 'Evidence-based insights'],
    },
    {
      number: '03',
      title: 'Forever Free',
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
      backgroundImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=3628&auto=format&fit=crop',
      items: ['No subscriptions or paywalls', 'Supported by community donations', 'Access for everyone who needs it', 'No data collection or tracking'],
    }
  ];

  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) {
      return 1;
    }
    return hoveredIndex === index ? 2.5 : 0.8;
  };

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
    <section ref={ref} className="min-h-screen bg-black py-20 md:py-32 px-4 md:px-6 relative">
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
        <div className="flex gap-3 h-[400px] md:h-[480px] w-full">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="relative cursor-pointer overflow-hidden rounded-2xl"
              style={{ flex: 1 }}
              animate={{ flex: getFlexValue(index) }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => openModal(index)}
            >
              {/* Background - Video or Image */}
              {(feature as any).isVideo ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  src={(feature as any).videoSrc}
                />
              ) : (
                <img
                  src={(feature as any).backgroundImage}
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: hoveredIndex === index ? 0.4 : 0.7 }}
                transition={{ duration: 0.3 }}
              />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Icon and Number */}
                <motion.div
                  className="flex items-center gap-3 mb-4"
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0.8,
                    scale: hoveredIndex === index ? 1.05 : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {(feature as any).icon && (
                    <img
                      src={(feature as any).icon}
                      alt=""
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded"
                    />
                  )}
                  <span className="text-sm text-gray-400">
                    {feature.number}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h3
                  className="text-lg sm:text-xl mb-2"
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
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {feature.items.slice(0, 2).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#DEDBC8' }} />
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
          ))}
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
              className="relative max-w-2xl w-full bg-[#212121] rounded-2xl p-8 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background - Video or Image */}
              {(features[selectedIndex] as any).isVideo ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl -z-10"
                  src={(features[selectedIndex] as any).videoSrc}
                />
              ) : (
                <img
                  src={(features[selectedIndex] as any).backgroundImage}
                  alt={features[selectedIndex].title}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl -z-10"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent rounded-2xl -z-10" />

              {/* Icon and Number */}
              <div className="flex items-center gap-3 mb-4">
                {(features[selectedIndex] as any).icon && (
                  <img
                    src={(features[selectedIndex] as any).icon}
                    alt=""
                    className="w-12 h-12 rounded"
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
