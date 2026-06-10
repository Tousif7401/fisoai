"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { WordsPullUp } from './animations';

export function Donation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const donationAmounts = [
    { amount: '₹100', label: 'A cup of coffee' },
    { amount: '₹500', label: 'Support the cause' },
    { amount: '₹1000', label: 'Keep Calmify free' },
  ];

  return (
    <section ref={ref} className="min-h-screen bg-black py-20 md:py-32 px-4 md:px-6 relative flex items-center">
      {/* Background Noise */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative w-full">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="backdrop-blur-xl rounded-2xl md:rounded-[2rem] p-8 md:p-16 text-center border"
          style={{
            background: 'rgba(16, 16, 16, 0.6)',
            borderColor: 'rgba(222, 219, 200, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(222, 219, 200, 0.05)'
          }}
        >
          {/* Heart Icon */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#212121' }}>
              <Heart className="w-8 h-8 text-red-500" fill="#EF4444" strokeWidth={1} />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="mb-6">
            <WordsPullUp
              text="Keep Calmify Free"
              showAsterisk={false}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[0.9] tracking-[-0.05em] text-[#E1E0CC]"
            />
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm md:text-base mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#DEDBC8' }}
          >
            Calmify is and will always be free. Your donation helps cover API costs and keeps mental health support accessible to every developer who needs it.
          </motion.p>

          {/* Donation Amounts */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {donationAmounts.map((option) => (
              <button
                key={option.amount}
                className="px-6 py-4 rounded-3xl border transition-all hover:scale-105 backdrop-blur-sm"
                style={{
                  borderColor: 'rgba(222, 219, 200, 0.2)',
                  color: '#E1E0CC',
                  background: 'rgba(33, 33, 33, 0.4)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(222, 219, 200, 0.9)';
                  e.currentTarget.style.color = '#000';
                  e.currentTarget.style.borderColor = '#DEDBC8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(33, 33, 33, 0.4)';
                  e.currentTarget.style.color = '#E1E0CC';
                  e.currentTarget.style.borderColor = 'rgba(222, 219, 200, 0.2)';
                }}
              >
                <div className="text-lg font-medium">{option.amount}</div>
                <div className="text-xs opacity-70 mt-1">{option.label}</div>
              </button>
            ))}
          </motion.div>

          {/* Custom Amount */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Custom amount"
                className="backdrop-blur-sm border rounded-3xl px-4 py-3 text-sm w-40 text-center focus:outline-none transition-all"
                style={{
                  borderColor: 'rgba(222, 219, 200, 0.2)',
                  color: '#E1E0CC',
                  background: 'rgba(33, 33, 33, 0.4)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
                }}
              />
              <button
                className="group flex items-center gap-2 rounded-full px-4 py-2 text-black font-medium text-xs sm:text-sm hover:gap-3 transition-all"
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
                Donate
                <span className="bg-black rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E1E0CC]" strokeWidth={2} />
                </span>
              </button>
            </div>
          </motion.div>

          {/* Razorpay Note */}
          <motion.p
            variants={itemVariants}
            className="text-xs text-gray-500"
          >
            Secured by Razorpay
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
