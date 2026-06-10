"use client";

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// WordsPullUp: Splits text by spaces, each word slides up with staggered delay
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export function WordsPullUp({ text, className = '', showAsterisk = false }: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  const words = text.split(' ');

  return (
    <div ref={ref} className={className}>
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;
        const showAsteriskOnWord = showAsterisk && isLastWord && word.toLowerCase().includes('a');

        return (
          <span key={index} className="inline-block relative mr-[0.25em]">
            <motion.span
              initial={{ y: 20 }}
              animate={isInView ? { y: 0 } : { y: 20 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.08,
              }}
              className="inline-block"
            >
              {word}
              {showAsteriskOnWord && (
                <sup className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] leading-none">*</sup>
              )}
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}

// WordsPullUpMultiStyle: Takes segments with different styles, splits into words with animation
interface TextSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  containerClassName?: string;
}

export function WordsPullUpMultiStyle({ segments, containerClassName = '' }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px' });

  // Process all segments and split into individual words with their className
  const allWords: Array<{ word: string; className: string }> = [];

  segments.forEach(segment => {
    const words = segment.text.split(' ');
    words.forEach(word => {
      allWords.push({
        word,
        className: segment.className || '',
      });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${containerClassName}`}>
      {allWords.map((item, index) => (
        <motion.span
          key={index}
          initial={{ y: 20 }}
          animate={isInView ? { y: 0 } : { y: 20 }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
            delay: index * 0.08,
          }}
          className={`${item.className} mr-[0.25em]`}
        >
          {item.word}
        </motion.span>
      ))}
    </div>
  );
}

// AnimatedLetter: Individual character with scroll-linked opacity animation
interface AnimatedLetterProps {
  char: string;
  index: number;
  totalChars: number;
}

export function AnimatedLetter({ char, index, totalChars }: AnimatedLetterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Calculate character progress for staggering effect
  const charProgress = index / totalChars;
  const range = [charProgress - 0.1, charProgress + 0.05];
  const opacity = useTransform(scrollYProgress, range as [number, number], [0.2, 1]);

  return (
    <motion.span
      ref={ref}
      style={{ opacity }}
      className="inline-block"
    >
      {char === ' ' ? ' ' : char}
    </motion.span>
  );
}
