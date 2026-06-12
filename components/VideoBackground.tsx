"use client";

import { useEffect, useRef } from 'react';

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Fade in function
    const fadeIn = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const startTime = performance.now();
      const duration = 250; // 250ms fade-in

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        video.style.opacity = progress.toString();

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Fade out function
    const fadeOut = () => {
      if (fadingOutRef.current) return;
      fadingOutRef.current = true;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const startTime = performance.now();
      const duration = 250; // 250ms fade-out
      const startOpacity = parseFloat(video.style.opacity || '1');

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        video.style.opacity = (startOpacity * (1 - progress)).toString();

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Fade in on load
    fadeIn();

    // Handle time update for fade out
    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;
      const timeRemaining = duration - currentTime;

      // Trigger fade out when 0.55 seconds remain
      if (timeRemaining <= 0.55 && timeRemaining > 0) {
        fadeOut();
      }
    };

    // Handle video end
    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        video.currentTime = 0;
        video.play();
        fadingOutRef.current = false;
        fadeIn();
      }, 100);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        width: '115%',
        height: '115%',
        objectPosition: 'center top',
        objectFit: 'cover',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260329_050842_be71947f-f16e-4a14-810c-06e83d23ddb5.mp4"
    />
  );
}
