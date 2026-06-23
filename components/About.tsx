"use client";

import { WordsPullUpMultiStyle, AnimatedLetter } from './animations';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

// Word component with scroll-linked blur animation
function AnimatedWord({
  word,
  className,
  index,
  totalWords,
  progress
}: {
  word: string;
  className: string;
  index: number;
  totalWords: number;
  progress: any;
}) {
  // Each word gets equal portion of scroll range - sequential, no overlap
  // Start animation after 50% delay
  const animationStart = 0.5;
  const availableProgress = 1 - animationStart;
  // Distribute words across the available range
  const wordStart = animationStart + (index / totalWords) * availableProgress;
  const wordEnd = animationStart + ((index + 1) / totalWords) * availableProgress;

  const opacity = useTransform(
    progress,
    [wordStart, wordEnd],
    [0, 1]
  );

  const blurValue = useTransform(
    progress,
    [wordStart, wordEnd],
    [15, 0]
  );

  const filter = useMotionTemplate`blur(${blurValue}px)`;

  const y = useTransform(
    progress,
    [wordStart, wordEnd],
    [-60, 0]
  );

  return (
    <motion.span
      style={{ opacity, filter, y }}
      className={`${className} mr-[0.25em]`}
    >
      {word}
    </motion.span>
  );
}

export function About() {
  const headingSegments = [
    { text: 'Built by developers,', className: 'font-normal' },
    { text: 'for developers.', className: 'italic font-serif bg-amber-400/30' },
    { text: 'Calmify understands the builder mindset because we live it every day.', className: 'font-normal' },
  ];

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  const bodyText = "I created Calmify after experiencing burnout, imposter syndrome, and the isolation that comes with building things. I needed someone who understood the pressure of shipping, the fear of not being good enough, and the weight of expectations. Calmify is that companionwhen free, judgment-free, and always here for you.";

  const chars = bodyText.split('');
  const totalChars = chars.length;

  return (
    <section ref={sectionRef} className="bg-black relative py-20 md:py-32 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] p-8 md:p-16 text-center flex flex-col items-center justify-center">
          {/* Label */}
          <p className="text-[50px] sm:text-[52px] mb-8 md:mb-12" style={{ color: '#DEDBC8' }}>
            Why <em className="italic font-serif">Calmify</em>
          </p>

          {/* Main Heading */}
          <div
            className="inline-flex flex-wrap justify-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]"
            style={{ color: '#DEDBC8' }}
          >
            {headingSegments.map((segment, segIndex) => {
              const words = segment.text.split(' ');
              const wordsBeforeThisSegment = headingSegments
                .slice(0, segIndex)
                .reduce((acc, seg) => acc + seg.text.split(' ').length, 0);

              return words.map((word, wordIndex) => {
                const globalWordIndex = wordsBeforeThisSegment + wordIndex;
                const totalWords = headingSegments.reduce(
                  (acc, seg) => acc + seg.text.split(' ').length,
                  0
                );

                return (
                  <AnimatedWord
                    key={`${segIndex}-${wordIndex}`}
                    word={word}
                    className={segment.className}
                    index={globalWordIndex}
                    totalWords={totalWords}
                    progress={scrollYProgress}
                  />
                );
              });
            })}
          </div>

          {/* Body Paragraph */}
          <p className="mt-8 md:mt-12 text-[17px] sm:text-[18px] md:text-[16px] max-w-3xl mx-auto leading-relaxed" style={{ color: '#DEDBC8' }}>
            {chars.map((char, index) => (
              <AnimatedLetter
                key={index}
                char={char}
                index={index}
                totalChars={totalChars}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
