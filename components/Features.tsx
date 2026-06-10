"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { WordsPullUpMultiStyle } from './animations';

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
      number: '01',
      title: 'AI Companion',
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
      items: ['Powered by Claude AI', 'Warm, non-judgmental conversations', 'Understands burnout & imposter syndrome', 'Available 24/7, always free'],
      isVideo: false
    },
    {
      number: '02',
      title: 'Curated Articles',
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
      items: ['Written for the builder mindset', 'Topics: burnout, anxiety, perfectionism', 'Practical coping strategies', 'Evidence-based insights'],
      isVideo: false
    },
    {
      number: '03',
      title: 'Forever Free',
      icon: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
      items: ['No subscriptions or paywalls', 'Supported by community donations', 'Access for everyone who needs it', 'No data collection or tracking'],
      isVideo: false
    }
  ];

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1">
          {/* Video Card */}
          <motion.div
            custom={0}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={cardVariants}
            className="lg:h-[480px] rounded-xl overflow-hidden relative"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-sm" style={{ color: '#E1E0CC' }}>
                Your safe space to talk.
              </p>
            </div>
          </motion.div>

          {/* Feature Cards */}
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index + 1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={cardVariants}
              className="lg:h-[480px] bg-[#212121] rounded-xl p-6 flex flex-col"
            >
              {/* Icon and Number */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={feature.icon}
                  alt=""
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded"
                />
                <span className="text-sm text-gray-400">
                  {feature.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl mb-6" style={{ color: '#E1E0CC' }}>
                {feature.title}
              </h3>

              {/* Checklist Items */}
              <ul className="flex-1 space-y-3">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#DEDBC8' }} />
                    <span className="text-sm text-gray-400 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Learn More Link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 hover:gap-3 transition-all mt-4 text-sm"
                style={{ color: '#DEDBC8' }}
              >
                Learn more
                <ArrowRight className="w-4 h-4 -rotate-45" strokeWidth={2} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
