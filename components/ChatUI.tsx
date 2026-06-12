"use client";

import { useState } from 'react';
import { VideoBackground } from './VideoBackground';
import { ChevronDownIcon, UpArrowIcon, StarIcon, AISparkleIcon, PaperclipIcon, MicrophoneIcon, SearchIcon } from './icons';

export function ChatUI() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Chat message:', searchQuery);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <VideoBackground />

      {/* Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between" style={{ padding: '16px 120px' }}>
        {/* Logo */}
        <div className="font-semibold" style={{ fontFamily: 'Schibsted Grotesk, sans-serif', fontSize: '24px', letterSpacing: '-1.44px', color: '#E1E0CC' }}>
          Calmify
        </div>

        {/* Menu Items */}
        <div className="flex items-center gap-8">
          <a href="#" style={{ fontFamily: 'Schibsted Grotesk, sans-serif', fontSize: '16px', fontWeight: '500', letterSpacing: '-0.2px', color: '#E1E0CC' }}>
            Home
          </a>
          <a href="#" className="flex items-center gap-1" style={{ fontFamily: 'Schibsted Grotesk, sans-serif', fontSize: '16px', fontWeight: '500', letterSpacing: '-0.2px', color: '#E1E0CC' }}>
            Resources
            <ChevronDownIcon />
          </a>
          <a href="#" style={{ fontFamily: 'Schibsted Grotesk, sans-serif', fontSize: '16px', fontWeight: '500', letterSpacing: '-0.2px', color: '#E1E0CC' }}>
            Articles
          </a>
          <a href="#" style={{ fontFamily: 'Schibsted Grotesk, sans-serif', fontSize: '16px', fontWeight: '500', letterSpacing: '-0.2px', color: '#E1E0CC' }}>
            About
          </a>
          <a href="#" style={{ fontFamily: 'Schibsted Grotesk, sans-serif', fontSize: '16px', fontWeight: '500', letterSpacing: '-0.2px', color: '#E1E0CC' }}>
            Donate
          </a>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-4">
          <button
            className="rounded-lg"
            style={{
              backgroundColor: 'transparent',
              width: '82px',
              height: '44px',
              fontFamily: 'Schibsted Grotesk, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              color: '#E1E0CC',
              border: '1px solid rgba(225, 224, 204, 0.3)'
            }}
          >
            Sign Up
          </button>
          <button
            className="rounded-lg"
            style={{
              backgroundColor: '#FFFFFF',
              width: '101px',
              height: '44px',
              fontFamily: 'Schibsted Grotesk, sans-serif',
              fontSize: '14px',
              fontWeight: '500',
              color: '#000000'
            }}
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center"
        style={{
          marginTop: '120px',
          paddingLeft: '120px',
          paddingRight: '120px'
        }}
      >
        {/* Badge Component */}
        <div className="flex items-center gap-2 mb-[34px]">
          {/* Dark Badge */}
          <div
            className="flex items-center gap-1 px-3 py-1 rounded-full"
            style={{
              backgroundColor: '#0e1311',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <StarIcon />
            <span className="text-white" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '400' }}>
              New
            </span>
          </div>

          {/* Light Badge */}
          <div
            className="px-3 py-1 rounded-full"
            style={{
              backgroundColor: '#f8f8f8',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '400', color: '#000000' }}>
              Your mental wellness companion
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h1
          className="text-center mb-[34px]"
          style={{
            fontFamily: 'Fustat, serif',
            fontSize: '80px',
            fontWeight: '700',
            letterSpacing: '-4.8px',
            lineHeight: '1',
            color: '#E1E0CC',
            textAlign: 'center'
          }}
        >
          How are you feeling today?
        </h1>

        {/* Subtitle */}
        <p
          className="text-center mb-[44px]"
          style={{
            fontFamily: 'Fustat, serif',
            fontSize: '20px',
            fontWeight: '500',
            letterSpacing: '-0.4px',
            color: '#DEDBC8',
            maxWidth: '542px',
            width: '100%',
            textAlign: 'center'
          }}
        >
          Take a moment to check in with yourself. Share what's on your mind, and let's explore your thoughts together.
        </p>

        {/* Chat Input Box */}
        <div
          className="backdrop-blur-sm rounded-[18px]"
          style={{
            maxWidth: '728px',
            width: '100%',
            height: '200px',
            backgroundColor: 'rgba(0,0,0,0.24)'
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            {/* Top Row - Session Info */}
            <div className="flex items-center justify-between px-6 pt-4 pb-3">
              {/* Left - Session Info */}
              <div className="flex items-center gap-2">
                <span style={{ fontFamily: 'Schibsted Grotesk, sans-serif', fontSize: '12px', fontWeight: '500', color: '#ffffff' }}>
                  Free session
                </span>
                <button
                  className="px-2 py-1 rounded text-white text-xs"
                  style={{ backgroundColor: 'rgba(90,225,76,0.89)', fontFamily: 'Schibsted Grotesk, sans-serif', fontWeight: '500' }}
                >
                  Start
                </button>
              </div>

              {/* Right - AI Info */}
              <div className="flex items-center gap-1">
                <AISparkleIcon />
                <span style={{ fontFamily: 'Schibsted Grotesk, sans-serif', fontSize: '12px', fontWeight: '500', color: '#ffffff' }}>
                  Powered by AI
                </span>
              </div>
            </div>

            {/* Main Input Area */}
            <div className="flex-1 px-6 pb-3">
              <div className="relative w-full h-full">
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full rounded-xl px-4 pr-12 shadow-sm focus:outline-none"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: 'rgba(0,0,0,0.6)',
                    backgroundColor: '#ffffff'
                  }}
                />
                {/* Submit Button */}
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center"
                  style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: '#000000'
                  }}
                >
                  <UpArrowIcon />
                </button>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between px-6 pb-4">
              {/* Left - Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded"
                  style={{ backgroundColor: '#f8f8f8' }}
                >
                  <PaperclipIcon />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '500', color: '#505050' }}>
                    Attach
                  </span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded"
                  style={{ backgroundColor: '#f8f8f8' }}
                >
                  <MicrophoneIcon />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '500', color: '#505050' }}>
                    Voice
                  </span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded"
                  style={{ backgroundColor: '#f8f8f8' }}
                >
                  <SearchIcon />
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '500', color: '#505050' }}>
                    Topics
                  </span>
                </button>
              </div>

              {/* Right - Character Counter */}
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#999999' }}>
                {searchQuery.length}/3,000
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
