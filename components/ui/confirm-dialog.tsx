"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title = 'Confirm Action',
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998]"
            onClick={onCancel}
          />

          {/* Dialog */}
          <div className="fixed inset-0 flex items-end sm:items-center justify-center z-[99999] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto w-full max-w-md mx-4 sm:mx-0"
            >
              <div
                className="rounded-t-2xl sm:rounded-2xl border shadow-2xl overflow-hidden"
                style={{
                  background: 'rgba(16, 16, 16, 0.98)',
                  borderColor: 'rgba(239, 68, 68, 0.3)',
                  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(222, 219, 200, 0.05)',
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-red-500/20">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <h2 className="text-lg font-semibold" style={{ color: '#DEDBC8' }}>
                    {title}
                  </h2>
                </div>

                {/* Body */}
                <div className="px-6 py-4">
                  <p className="text-sm leading-relaxed" style={{ color: '#A0A0A0' }}>
                    {message}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/10 pb-safe">
                  <button
                    onClick={onCancel}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:bg-white/5"
                    style={{ color: '#DEDBC8' }}
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={onConfirm}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30"
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
