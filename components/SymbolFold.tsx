"use client";

/* eslint-disable @next/next/no-img-element */

import { motion } from 'framer-motion';

export function SymbolFold() {
  return (
    <section className="min-h-screen bg-[#F5F5F5] flex items-center justify-center py-20">
      <div className="max-w-6xl mx-auto w-full">
        {/* Main Content Area - Vision, Symbol, Execution */}
        <div className="relative min-h-[500px]">
          {/* Vision - Independent Position */}
          <motion.span
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 md:left-12 top-0 font-medium text-black -ml-[165px] -mt-[30px]"
            style={{ fontSize: '176px', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'rgb(5, 8, 12)', opacity: 0.6, fontFamily: 'sans-serif' } }
          >
            Vision
          </motion.span>

          {/* Symbol - Independent Position */}
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

          {/* Execution - Independent Position */}
          <motion.span
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 md:right-12 top-1/2 -translate-y-1/2 font-medium text-black -mr-40 -mt-[60px]"
            style={{ fontSize: '196px', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.9, color: 'rgb(5, 8, 12)', opacity: 0.6, fontFamily: 'sans-serif' } }
          >
            Execution
          </motion.span>
        </div>

        {/* Description - Below all elements */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-black/80 leading-relaxed text-left absolute right-[148px] -mt-32 max-w-[700px]"
        >
          Vision without execution remains a dream. Execution without vision becomes chaos. We exist between these two worlds, transforming bold ideas into tangible results.
        </motion.p>
      </div>
    </section>
  );
}
