"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WordsPullUp } from './animations';
import { useRouter } from 'next/navigation';

export function Hero() {
  const router = useRouter();

  const handleNavClick = (item: string) => {
    if (item === 'Articles' || item === 'Resources') {
      const articlesSection = document.getElementById('articles');
      if (articlesSection) {
        articlesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item === 'About') {
      router.push('/about');
    } else if (item === 'Chat') {
      router.push('/chat');
    } else if (item === 'Donate') {
      const donateSection = document.getElementById('donate');
      if (donateSection) {
        donateSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleReadArticlesClick = () => {
    const articlesSection = document.getElementById('articles');
    if (articlesSection) {
      articlesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    'About',
    'Articles',
    'Chat',
    'Donate',
    'Resources'
  ];

  return (
    <section className="h-screen p-4 sm:p-6 md:p-8">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Primary: CloudFront */}
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
            type="video/mp4"
          />
          {/* Fallback: Supabase */}
          <source
            src="https://iitgrdkrhqrrkrdmwvpo.supabase.co/storage/v1/object/public/videos/Hero.mp4"
            type="video/mp4"
          />
        </video>

        {/* Noise Overlay */}
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Navbar */}
        <nav className="absolute top-0 left-1/2 -translate-x-1/2 backdrop-blur-md rounded-b-2xl md:rounded-b-3xl px-3 sm:px-4 py-2 md:px-8">
          <ul className="flex items-center gap-2 sm:gap-3 md:gap-12 lg:gap-14">
            {navItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleNavClick(item)}
                  className="text-[9px] sm:text-[10px] md:text-sm whitespace-nowrap bg-transparent border-0 cursor-pointer"
                  style={{
                    color: 'rgba(225, 224, 204, 0.8)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#E1E0CC'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)'}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
            {/* Giant Heading - Full width on mobile, 8 columns on desktop */}
            <div className="col-span-1 md:col-span-8">
              <WordsPullUp
                text="Calmify"
                showAsterisk={true}
                className="text-[18vw] sm:text-[20vw] md:text-[232px] lg:text-[252px] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC]"
              />
            </div>

            {/* Description + CTA - Full width on mobile, 4 columns on desktop */}
            <div className="col-span-1 md:col-span-4 flex flex-col justify-end gap-4 md:gap-8">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.5,
                }}
                className="text-[11px] sm:text-xs md:text-base leading-snug"
                style={{ color: '#DEDBC8' }}
              >
                A free AI-powered mental health companion for developers, builders, and creators who need support. Talk to Calmify anytime — no judgment, just understanding.
              </motion.p>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <motion.a
                  href="/login"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.7,
                  }}
                  className="group flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-black font-medium text-[11px] sm:text-xs md:text-sm hover:gap-3 transition-all w-fit"
                  style={{ backgroundColor: '#FFFFFF' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#999';
                    const arrowCircle = e.currentTarget.querySelector('span');
                    if (arrowCircle) {
                      arrowCircle.setAttribute('style', 'background-color: #E1E0CC');
                    }
                    const arrowIcon = e.currentTarget.querySelector('svg');
                    if (arrowIcon) {
                      arrowIcon.setAttribute('style', 'color: #000');
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    const arrowCircle = e.currentTarget.querySelector('span');
                    if (arrowCircle) {
                      arrowCircle.setAttribute('style', 'background-color: #000');
                    }
                    const arrowIcon = e.currentTarget.querySelector('svg');
                    if (arrowIcon) {
                      arrowIcon.setAttribute('style', 'color: #E1E0CC');
                    }
                  }}
                >
                  Talk to Calmify
                  <span className="bg-black rounded-full w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-[#E1E0CC]" strokeWidth={2} />
                  </span>
                </motion.a>

                <motion.button
                  onClick={handleReadArticlesClick}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.8,
                  }}
                  className="group flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-black font-medium text-[11px] sm:text-xs md:text-sm hover:gap-3 transition-all w-fit cursor-pointer border-0"
                  style={{ backgroundColor: '#FFFFFF' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#999';
                    const arrowCircle = e.currentTarget.querySelector('span');
                    if (arrowCircle) {
                      arrowCircle.setAttribute('style', 'background-color: #E1E0CC');
                    }
                    const arrowIcon = e.currentTarget.querySelector('svg');
                    if (arrowIcon) {
                      arrowIcon.setAttribute('style', 'color: #000');
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    const arrowCircle = e.currentTarget.querySelector('span');
                    if (arrowCircle) {
                      arrowCircle.setAttribute('style', 'background-color: #000');
                    }
                    const arrowIcon = e.currentTarget.querySelector('svg');
                    if (arrowIcon) {
                      arrowIcon.setAttribute('style', 'color: #E1E0CC');
                    }
                  }}
                >
                  Read Articles
                  <span className="bg-black rounded-full w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-[#E1E0CC]" strokeWidth={2} />
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
