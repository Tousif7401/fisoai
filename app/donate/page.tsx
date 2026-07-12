"use client";

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DonatePage() {
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
      {/* Video Background */}
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

      {/* Back Button - Top Left */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-black hover:text-gray-800 transition-colors group bg-white/80 backdrop-blur-sm rounded-full px-4 py-2"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex items-start justify-center px-4 md:px-6 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-lg"
        >
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-medium text-[#c4b896] text-center mb-2 tracking-[-0.05em]">
            Scan to Donate
          </h1>

          {/* Description */}
          <p className="text-sm text-[#b0a87a] text-center mb-8 leading-relaxed max-w-md mx-auto">
            Scan the QR code below to donate via UPI. Your contribution helps keep Calmify free for everyone.
          </p>

          {/* QR Code */}
          <div className="flex justify-center mb-8">
            <Image
              src="/QR.png"
              alt="Donate QR Code"
              width={200}
              height={200}
              className="w-48 h-48 md:w-56 md:h-56 rounded-xl"
            />
          </div>

          {/* Instructions */}
          <p className="text-xs text-gray-600 text-center max-w-md mx-auto">
            Open any UPI app (PhonePe, Google Pay, Paytm) and scan this QR code to donate
          </p>
        </motion.div>
      </div>
    </div>
  );
}
