"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { X, MessageSquare } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const handleSendFeedback = () => {
    const subject = encodeURIComponent('Calmify Feedback');
    const body = encodeURIComponent('I would like to share my feedback about Calmify...\n\n');
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=calmify.devteam@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-end sm:items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-auto w-full max-w-lg mx-4 sm:mx-0"
        >
          <div
            className="rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl font-['Almarai'] max-h-[90vh] overflow-y-auto"
            style={{
              background: 'rgba(16, 16, 16, 0.95)',
              borderColor: 'rgba(222, 219, 200, 0.1)',
              borderWidth: '1px'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b" style={{ borderColor: 'rgba(222, 219, 200, 0.1)' }}>
              <div>
                <h2 className="text-xl sm:text-2xl font-medium leading-none tracking-tight" style={{ color: '#E1E0CC' }}>
                  Help & Support
                </h2>
                <p className="text-sm mt-1 opacity-80" style={{ color: '#DEDBC8' }}>
                  Everything you need to know
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[#DEDBC8]/10"
              >
                <X className="w-4 h-4" style={{ color: '#DEDBC8' }} />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-6 pb-safe">
              {/* Features */}
              <div>
                <p className="text-xs uppercase tracking-wider mb-4" style={{ color: 'rgba(222, 219, 200, 0.6)' }}>
                  Features
                </p>
                <div className="space-y-3">
                  {[
                    { title: 'AI Chat', desc: 'Talk to Calmify — your compassionate AI companion' },
                    { title: 'Articles', desc: 'Curated mental health articles for builders' },
                    { title: 'Profile', desc: 'Customize your avatar and personal details' }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 p-4 rounded-xl bg-[#212121] border border-[#333]"
                    >
                      <div className="flex-1">
                        <h5 className="text-sm font-medium mb-1" style={{ color: '#E1E0CC' }}>
                          {feature.title}
                        </h5>
                        <p className="text-sm opacity-60" style={{ color: '#DEDBC8' }}>
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div>
                <p className="text-xs uppercase tracking-wider mb-4" style={{ color: 'rgba(222, 219, 200, 0.6)' }}>
                  Need more help?
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleSendFeedback}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#212121] border border-[#333] hover:border-[#DEDBC8]/30 transition-colors text-left group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#DEDBC8]/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5" style={{ color: '#DEDBC8' }} />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium" style={{ color: '#E1E0CC' }}>
                        Send Feedback
                      </h5>
                      <p className="text-sm opacity-60" style={{ color: '#DEDBC8' }}>
                        Help us improve Calmify
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t flex justify-center pb-safe" style={{ borderColor: 'rgba(222, 219, 200, 0.1)' }}>
              <p className="text-sm" style={{ color: '#999' }}>
                Made with 💛 for your mental wellness
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>,
    document.body
  );
}
