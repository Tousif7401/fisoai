"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { articles } from "@/lib/articles";
import Link from "next/link";
import { useState } from "react";

export default function ArticleBentoGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="pt-32 container mx-auto min-w-screen flex flex-col px-4 md:px-6 pb-20">
      <h1 className="font-medium tracking-tight text-4xl md:text-6xl text-[#E1E0CC]">
        Articles
      </h1>
      <p className="max-w-3xl text-lg md:text-xl mt-4 text-[#DEDBC8]">
        Mental health insights written for the builder mindset.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6">
        <Link key="overcoming-imposter-syndrome" href="/articles/overcoming-imposter-syndrome" className="block">
          <ArticleBentoCard
            category="Self-worth"
            title="Overcoming Imposter Syndrome"
            description="That feeling that everyone else is better than you? You're not alone. Here's how to reframe those thoughts."
            readTime="5 min read"
            graphic={
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            }
            className="max-lg:rounded-t-4xl lg:col-span-2 lg:rounded-tl-4xl"
            slug="overcoming-imposter-syndrome"
            index={0}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </Link>
        <Link key="burnout-recovery-builders-guide" href="/articles/burnout-recovery-builders-guide" className="block">
          <ArticleBentoCard
            category="Burnout"
            title="Burnout Recovery Guide"
            description="When code feels like a burden and motivation has vanished. Practical steps to recover your spark."
            readTime="7 min read"
            graphic={
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            }
            className="lg:col-span-2 lg:rounded-tr-4xl"
            slug="burnout-recovery-builders-guide"
            index={1}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </Link>
        <Link key="shipping-anxiety-why-we-fear-done" href="/articles/shipping-anxiety-why-we-fear-done" className="block">
          <ArticleBentoCard
            category="Productivity"
            title="Shipping Anxiety"
            description="The perfectionism trap that keeps us polishing instead of shipping. How to embrace 'good enough'."
            readTime="4 min read"
            graphic={
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            }
            className="lg:col-span-2"
            slug="shipping-anxiety-why-we-fear-done"
            index={2}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </Link>
        <Link key="context-switching-is-killing-creativity" href="/articles/context-switching-is-killing-creativity" className="block">
          <ArticleBentoCard
            category="Deep Work"
            title="Context Switching Kills Creativity"
            description="Every notification, every Slack ping — they're not just interruptions. They're stealing your ability to do deep work."
            readTime="6 min read"
            graphic={
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            }
            className="lg:col-span-2 lg:rounded-bl-4xl"
            slug="context-switching-is-killing-creativity"
            index={3}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </Link>
        <Link key="lost-your-spark-its-not-discipline-its-rest" href="/articles/lost-your-spark-its-not-discipline-its-rest" className="block">
          <ArticleBentoCard
            category="Motivation"
            title="Lost Your Spark?"
            description="You don't need more hustle. You don't need more discipline. You need actual rest — the kind most builders never get."
            readTime="6 min read"
            graphic={
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            }
            className="lg:col-span-2"
            slug="lost-your-spark-its-not-discipline-its-rest"
            index={4}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </Link>
        <div className="lg:col-span-6 flex justify-center">
          <MissionCard
            className="max-lg:rounded-b-4xl lg:rounded-br-4xl lg:w-2/5"
          />
        </div>
      </div>
    </div>
  );
}

export function ArticleBentoCard({
  dark = false,
  className = "",
  category,
  title,
  description,
  readTime,
  graphic,
  fade = [],
  slug,
  index,
  hoveredIndex,
  setHoveredIndex,
}: {
  dark?: boolean;
  className?: string;
  category: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  readTime?: string;
  graphic?: React.ReactNode;
  fade?: ("top" | "bottom")[];
  slug: string;
  index: number;
  hoveredIndex: number | null;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const isHovered = hoveredIndex === index;
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      data-dark={dark ? "true" : undefined}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ease-out",
        "bg-white/5 backdrop-blur-2xl transform-gpu [border:1px_solid_rgba(255,255,255,.15)] [box-shadow:0_4px_16px_0_rgba(0,0,0,.2)]",
        "hover:bg-white/10 hover:[border:1px_solid_rgba(255,255,255,.25)]",
        isDimmed && "blur-sm scale-[0.98]"
      )}
    >
      {/* Arrow indicator in top-right - always visible */}
      <div className="absolute top-6 right-6 z-20">
        <ArrowRight className="w-5 h-5 text-[#DEDBC8] group-hover:-rotate-45 transition-transform duration-200" strokeWidth={2} />
      </div>

      <div className="relative h-full min-h-[20rem] shrink-0">
        {graphic}
        {fade.includes("top") && (
          <div className="absolute inset-0 bg-gradient-to-b from-white to-50% group-data-[dark]:from-gray-800 opacity-10" />
        )}
        {fade.includes("bottom") && (
          <div className="absolute inset-0 bg-gradient-to-t from-white to-50% group-data-[dark]:from-gray-800 opacity-10" />
        )}

        {/* Content overlay */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col z-10">
          <span className="text-xs uppercase tracking-wider px-2 py-1 rounded bg-white/10 text-[#DEDBC8] inline-block w-fit">
            {category}
          </span>
          <h3 className="text-xl md:text-2xl font-medium text-[#E1E0CC] mt-3 mb-2 group-hover:text-[#DEDBC8] transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
            <Clock className="w-3 h-3" />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function MissionCard({ className }: { className?: string }) {
  return (
    <motion.div
      initial="idle"
      whileHover="active"
      variants={{ idle: {}, active: {} }}
      className={clsx(
        className,
        "group relative flex flex-col overflow-hidden rounded-lg",
        "bg-white/5 backdrop-blur-2xl transform-gpu [border:1px_solid_rgba(255,255,255,.15)] [box-shadow:0_4px_16px_0_rgba(0,0,0,.2)]",
        "hover:bg-white/10 hover:[border:1px_solid_rgba(255,255,255,.25)] transition-all"
      )}
    >
      <div className="relative h-full min-h-[20rem] shrink-0 flex items-center justify-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#DEDBC8]/10 to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center p-6 md:p-8">
          <div className="mb-4">
            <span className="text-4xl">🌿</span>
          </div>
          <h3 className="text-xl md:text-2xl font-medium text-[#E1E0CC] mb-3">
            More on the way
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Your mental health journey matters. We're crafting more stories, insights, and tools to support builders like you.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-[#DEDBC8]/60">
            <div className="w-2 h-2 rounded-full bg-[#DEDBC8]/40 animate-pulse" />
            <span>Coming soon</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
