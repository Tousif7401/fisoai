"use client";

// RAZORPAY TODO: Once Razorpay integration is complete, uncomment the following imports and payment logic:
// import { initializeRazorpay, rupeesToPaise } from '@/lib/razorpay';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { WordsPullUp } from './animations';
import BorderGlow from './ui/BorderGlow';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function Donation() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const router = useRouter();

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

  return (
    <section ref={ref} id="donate" className="min-h-screen bg-black py-20 md:py-32 px-4 md:px-6 relative flex items-center">
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
          {/* Logo Icon */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <motion.div
              className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: '#212121' }}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Image src="/logo.svg" alt="Calmify Logo" width={96} height={96} className="brightness-0 invert" />
            </motion.div>
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

          {/* Donate Button */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <BorderGlow
              edgeSensitivity={30}
              glowColor="45 30 85"
              backgroundColor="rgba(255, 255, 255, 0.05)"
              borderRadius={9999}
              glowRadius={35}
              glowIntensity={1.2}
              coneSpread={25}
              animated={true}
              colors={['#E1E0CC', '#DEDBC8', '#c4b896']}
              className="cursor-pointer"
            >
              <button
                onClick={() => router.push('/donate')}
                className="group flex items-center gap-2 rounded-full px-8 py-4 text-[#E1E0CC] font-medium text-sm hover:gap-3 transition-all bg-transparent border-0"
              >
                Donate
                <span className="bg-white/10 backdrop-blur-sm rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E1E0CC]" strokeWidth={2} />
                </span>
              </button>
            </BorderGlow>
          </motion.div>

          {/* Razorpay Note - TODO: Uncomment when Razorpay is integrated */}
          {/* <motion.p
            variants={itemVariants}
            className="text-xs text-gray-500"
          >
            Secured by Razorpay
          </motion.p> */}
        </motion.div>
      </div>
    </section>
  );
}
