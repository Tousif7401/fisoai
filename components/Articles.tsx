"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { WordsPullUp } from './animations';
import { getFeaturedArticles } from '@/lib/articles';
import Link from 'next/link';

export function Articles() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const articles = getFeaturedArticles();

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
            <Link key={article.slug} href={`/articles/${article.slug}`} className="block">
              <motion.article
                custom={index}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                variants={cardVariants}
                className="bg-[#101010] rounded-xl p-6 md:p-8 flex flex-col h-full hover:bg-[#1a1a1a] transition-colors cursor-pointer relative group"
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
                  <span
                    className="inline-flex items-center gap-2 text-sm group"
                    style={{ color: '#DEDBC8' }}
                  >
                    Read
                    <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-200" strokeWidth={2} />
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        {/* Browse All Link */}
        <div className="mt-10 text-center">
          <a
            href="/articles"
            className="inline-flex items-center gap-2 hover:gap-3 transition-all text-sm"
            style={{ color: '#DEDBC8' }}
          >
            Browse all articles
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </a>
        </div>
      </div>
    </section>
  );
}
