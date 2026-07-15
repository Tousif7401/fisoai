"use client";

/* eslint-disable @next/next/no-img-element */

import { motion } from 'framer-motion';

export function SymbolFold() {
  return (
    <section className="min-h-[350px] bg-[#F5F5F5] flex items-center justify-center pt-40 pb-0 px-4 md:px-6">
      <div className="max-w-6xl mx-auto w-full">
        {/* Mobile Layout - Vision & Symbol on same line, Execution on next line */}
        <div className="md:hidden flex flex-col items-start justify-center min-h-[280px] px-4">
          {/* Line 1: Vision and Symbol */}
          <div className="flex items-center gap-2 mb-2">
            <motion.span
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-medium text-black"
              style={{ fontSize: '48px', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'rgb(5, 8, 12)', opacity: 0.6, fontFamily: 'sans-serif' } }
            >
              Vision
            </motion.span>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              src="/Symbol.avif"
              alt="&"
              style={{ width: '60px', height: 'auto', marginLeft: '-10px' }}
            />
          </div>

          {/* Line 2: Execution */}
          <motion.span
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-medium text-black"
            style={{ fontSize: '48px', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'rgb(5, 8, 12)', opacity: 0.6, fontFamily: 'sans-serif' } }
          >
            Execution
          </motion.span>

          {/* Description - Mobile */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-sm text-black/80 leading-relaxed text-left max-w-[600px] mt-4"
          >
            Vision without execution remains a dream. Execution without vision becomes chaos. We exist between these two worlds, transforming bold ideas into tangible results.
          </motion.p>
        </div>

        {/* Tablet Layout - 768px - Vision & Symbol on same line, Execution on next line */}
        <div className="hidden md:block lg:hidden flex flex-col items-start justify-center min-h-[280px] px-4">
          {/* Line 1: Vision and Symbol */}
          <div className="flex items-center gap-2 mb-2">
            <motion.span
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-medium text-black"
              style={{ fontSize: '72px', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'rgb(5, 8, 12)', opacity: 0.6, fontFamily: 'sans-serif' } }
            >
              Vision
            </motion.span>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              src="/Symbol.avif"
              alt="&"
              style={{ width: '130px', height: 'auto', marginLeft: '-35px' }}
            />
          </div>

          {/* Line 2: Execution */}
          <motion.span
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-medium text-black"
            style={{ fontSize: '72px', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'rgb(5, 8, 12)', opacity: 0.6, fontFamily: 'sans-serif' } }
          >
            Execution
          </motion.span>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-sm text-black/80 leading-relaxed text-left max-w-[600px] mt-4"
          >
            Vision without execution remains a dream. Execution without vision becomes chaos. We exist between these two worlds, transforming bold ideas into tangible results.
          </motion.p>
        </div>

        {/* Laptop/Desktop Layout - Original positioning */}
        <div className="hidden lg:block relative min-h-[500px]">
          {/* Vision - Original */}
          <motion.span
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 lg:left-12 top-0 font-medium text-black -ml-[165px] -mt-[30px]"
            style={{ fontSize: '176px', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'rgb(5, 8, 12)', opacity: 0.6, fontFamily: 'sans-serif' } }
          >
            Vision
          </motion.span>

          {/* Symbol - Original */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-0 -translate-x-1/2 -ml-[440px] -mt-2"
          >
            <img
              src="/Symbol.avif"
              alt="&"
              className="w-[350px] h-auto sm:w-[400px] md:w-[500px]"
            />
          </motion.div>

          {/* Execution - Original */}
          <motion.span
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 lg:right-12 top-1/2 -translate-y-1/2 font-medium text-black -mr-40 -mt-[60px]"
            style={{ fontSize: '196px', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'rgb(5, 8, 12)', opacity: 0.6, fontFamily: 'sans-serif' } }
          >
            Execution
          </motion.span>

          {/* Description - Original */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-base lg:text-lg text-black/80 leading-relaxed text-left absolute max-w-[700px]"
            style={{ top: 'calc(50% + 108px)', left: '487px' }}
          >
            Vision without execution remains a dream. Execution without vision becomes chaos. We exist between these two worlds, transforming bold ideas into tangible results.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
