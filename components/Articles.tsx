"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { WordsPullUp } from './animations';

export function Articles() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const articles = [
    {
      title: 'Overcoming Imposter Syndrome as a Developer',
      excerpt: 'That feeling that everyone else is better than you? You\'re not alone. Here\'s how to reframe those thoughts.',
      readTime: '5 min read',
      category: 'Self-worth'
    },
    {
      title: 'Burnout Recovery: A Builder\'s Guide',
      excerpt: 'When code feels like a burden and motivation has vanished. Practical steps to recover your spark.',
      readTime: '7 min read',
      category: 'Burnout'
    },
    {
      title: 'Shipping Anxiety: Why We Fear Done',
      excerpt: 'The perfectionism trap that keeps us polishing instead of shipping. How to embrace "good enough".',
      readTime: '4 min read',
      category: 'Productivity'
    }
  ];

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
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
          <WordsPullUp
            text="Articles"
            showAsterisk={false}
            className="text-4xl sm:text-5xl md:text-6xl font-medium leading-[0.9] tracking-[-0.05em] text-[#E1E0CC]"
          />
          <p className="mt-4 text-sm md:text-base max-w-2xl" style={{ color: '#DEDBC8' }}>
            Mental health insights written for the builder mindset.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              custom={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={cardVariants}
              className="bg-[#101010] rounded-xl p-6 md:p-8 flex flex-col h-full hover:bg-[#1a1a1a] transition-colors"
            >
              {/* Category */}
              <p
                className="text-[10px] sm:text-xs uppercase tracking-wider mb-4"
                style={{ color: '#DEDBC8' }}
              >
                {article.category}
              </p>

              {/* Title */}
              <h3 className="text-lg sm:text-xl mb-3" style={{ color: '#E1E0CC' }}>
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-gray-400 mb-6 flex-1 leading-relaxed">
                {article.excerpt}
              </p>

              {/* Footer with read time and link */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span>{article.readTime}</span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 hover:gap-3 transition-all text-sm"
                  style={{ color: '#DEDBC8' }}
                >
                  Read
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
