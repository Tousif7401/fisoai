"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background - Same as Donate Page */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: 'brightness(1.2)',
        }}
      >
        {/* Primary: CloudFront */}
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_070729_32a7eb4e-d6e2-4571-badc-91b4dab1ecbe.mp4"
          type="video/mp4"
        />
        {/* Fallback: Supabase */}
        <source
          src="https://iitgrdkrhqrrkrdmwvpo.supabase.co/storage/v1/object/public/videos/Donate%20Page.mp4"
          type="video/mp4"
        />
      </video>

      {/* Content Overlay - Same styling as Donate Page */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl text-center"
        >
          {/* 404 Heading - Same color as Donate page heading */}
          <h1 className="text-6xl md:text-8xl font-medium text-[#c4b896] mb-4 tracking-[-0.05em]">
            404
          </h1>

          {/* Message - Same color as Donate page description */}
          <p className="text-lg md:text-xl text-[#b0a87a] mb-8 leading-relaxed max-w-md mx-auto">
            Oops! This page doesn't exist. Let's get you back to safety.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Back Button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-black hover:text-gray-800 transition-colors group bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 font-medium"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Go Back</span>
            </button>

            {/* Home Button */}
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-black hover:text-gray-800 transition-colors group bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 font-medium"
            >
              <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>Home</span>
            </button>
          </div>

          {/* Helpful text */}
          <p className="text-xs text-gray-600 mt-8 max-w-md mx-auto">
            If you think this is a mistake, please contact us at calmify.devteam@gmail.com
          </p>
        </motion.div>
      </div>
    </div>
  );
}
