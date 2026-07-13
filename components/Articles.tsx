"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { WordsPullUp } from './animations';
import { getFeaturedArticles } from '@/lib/articles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PageLoader } from '@/components/PageLoader';

export function Articles() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showLoader, setShowLoader] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const router = useRouter();

  const articles = getFeaturedArticles();

  const handleBrowseAll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowLoader(true);
    // Use Next.js router for proper loading state
    setTimeout(() => {
      router.push('/articles');
    }, 800);
  };

  const handleArticleClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string, index: number) => {
    e.preventDefault();
    setClickedIndex(index);
    setShowLoader(true);
    // Use Next.js router for proper loading state
    setTimeout(() => {
      router.push(`/articles/${slug}`);
    }, 800);
  };

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

  if (showLoader) {
    return <PageLoader onComplete={() => {}} />;
  }

  return (
    <section ref={ref} id="articles" className="min-h-screen bg-black py-20 md:py-32 px-4 md:px-6 relative">
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
          {articles.map((article, index) => {
            const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
            const isClicked = clickedIndex === index;

            return (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                onClick={(e) => handleArticleClick(e, article.slug, index)}
                className="block"
              >
                <motion.article
                  custom={index}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  variants={cardVariants}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`
                    rounded-xl p-6 md:p-8 flex flex-col h-full cursor-pointer relative group
                    bg-white/5 backdrop-blur-xl transform-gpu
                    [border:1px_solid_rgba(255,255,255,.15)] [box-shadow:0_4px_16px_0_rgba(0,0,0,.2)]
                    hover:bg-white/10 hover:[border:1px_solid_rgba(255,255,255,.25)]
                    transition-all duration-300 ease-out
                    ${isDimmed ? 'blur-sm scale-[0.98]' : ''}
                    ${isClicked ? 'scale-95 bg-white/15' : ''}
                  `}
                  style={{ color: '#DEDBC8' }}
                >
                  {/* Category */}
                  <p className="text-[10px] sm:text-xs uppercase tracking-wider mb-4 px-2 py-1 rounded bg-white/10 inline-block w-fit">
                    {article.category}
                  </p>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl mb-3 group-hover:text-[#DEDBC8] transition-colors" style={{ color: '#E1E0CC' }}>
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
                      className="inline-flex items-center gap-2 text-sm"
                      style={{ color: '#DEDBC8' }}
                    >
                      Read
                      <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform duration-200" strokeWidth={2} />
                    </span>
                  </div>
                </motion.article>
              </Link>
            );
          })}
        </div>

        {/* Browse All Link */}
        <div className="mt-10 text-center">
          <Link
            href="/articles"
            onClick={handleBrowseAll}
            className="inline-flex items-center gap-2 hover:gap-3 transition-all text-sm cursor-pointer"
            style={{ color: '#DEDBC8' }}
          >
            Browse all articles
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
