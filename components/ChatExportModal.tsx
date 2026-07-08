"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Code, FileJson } from 'lucide-react';
import { createPortal } from 'react-dom';
import * as chatService from '@/lib/supabase/chat';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  articleSuggestion?: {
    slug: string;
    title: string;
    excerpt: string;
    readTime: string;
    category: string;
  };
}

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  conversationTitle: string;
  messages?: Message[]; // Optional - will load if not provided
}

type ExportFormat = 'markdown' | 'text' | 'json';

export function ChatExportModal({
  isOpen,
  onClose,
  conversationId,
  conversationTitle,
  messages: initialMessages = []
}: ExportModalProps) {
  const [format, setFormat] = useState<ExportFormat>('markdown');
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    if (isOpen) {
      // If messages are not provided, fetch them
      if (initialMessages.length === 0) {
        setIsLoading(true);
        chatService.getConversationMessages(conversationId)
          .then(conversation => {
            setMessages(conversation.messages);
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      } else {
        generatePreview();
      }
    }
  }, [isOpen, conversationId, initialMessages.length]);

  // Regenerate preview when format or messages change
  useEffect(() => {
    if (messages.length > 0) {
      generatePreview();
    }
  }, [format, messages]);

  const generatePreview = () => {
    let content = '';

    switch (format) {
      case 'markdown':
        content = `# ${conversationTitle || 'Chat Export'}\n\n`;
        content += `Exported on ${new Date().toLocaleString()}\n\n---\n\n`;
        messages.forEach(msg => {
          const speaker = msg.role === 'user' ? 'You' : 'Calmify';
          content += `## ${speaker}\n\n${msg.content}\n\n`;
          if (msg.articleSuggestion) {
            content += `**📚 Suggested Reading:** [${msg.articleSuggestion.title}](/articles/${msg.articleSuggestion.slug})\n\n`;
          }
        });
        break;

      case 'text':
        content = `${conversationTitle || 'Chat Export'}\n`;
        content += `Exported on ${new Date().toLocaleString()}\n\n${'='.repeat(50)}\n\n`;
        messages.forEach(msg => {
          const speaker = msg.role === 'user' ? 'You' : 'Calmify';
          content += `[${speaker}]:\n${msg.content}\n\n`;
        });
        break;

      case 'json':
        content = JSON.stringify({
          title: conversationTitle,
          exportedAt: new Date().toISOString(),
          messages: messages.map(msg => ({
            id: msg.id,
            role: msg.role,
            content: msg.content,
            timestamp: msg.timestamp.toISOString(),
            articleSuggestion: msg.articleSuggestion
          }))
        }, null, 2);
        break;
    }

    setPreview(content.slice(0, 500) + (content.length > 500 ? '\n\n... (truncated)' : ''));
  };

  const handleExport = () => {
    setIsExporting(true);

    setTimeout(() => {
      let content = '';
      let filename = '';
      let mimeType = '';

      switch (format) {
        case 'markdown':
          content = `# ${conversationTitle || 'Chat Export'}\n\n`;
          content += `Exported on ${new Date().toLocaleString()}\n\n---\n\n`;
          messages.forEach(msg => {
            const speaker = msg.role === 'user' ? 'You' : 'Calmify';
            content += `## ${speaker}\n\n${msg.content}\n\n`;
            if (msg.articleSuggestion) {
              content += `**📚 Suggested Reading:** [${msg.articleSuggestion.title}](/articles/${msg.articleSuggestion.slug})\n\n`;
            }
          });
          filename = `${conversationTitle || 'chat'}-${Date.now()}.md`;
          mimeType = 'text/markdown';
          break;

        case 'text':
          content = `${conversationTitle || 'Chat Export'}\n`;
          content += `Exported on ${new Date().toLocaleString()}\n\n${'='.repeat(50)}\n\n`;
          messages.forEach(msg => {
            const speaker = msg.role === 'user' ? 'You' : 'Calmify';
            content += `[${speaker}]:\n${msg.content}\n\n`;
          });
          filename = `${conversationTitle || 'chat'}-${Date.now()}.txt`;
          mimeType = 'text/plain';
          break;

        case 'json':
          const data = {
            title: conversationTitle,
            exportedAt: new Date().toISOString(),
            messages: messages.map(msg => ({
              id: msg.id,
              role: msg.role,
              content: msg.content,
              timestamp: msg.timestamp.toISOString(),
              articleSuggestion: msg.articleSuggestion
            }))
          };
          content = JSON.stringify(data, null, 2);
          filename = `${conversationTitle || 'chat'}-${Date.now()}.json`;
          mimeType = 'application/json';
          break;
      }

      // Create and trigger download
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsExporting(false);
      onClose();
    }, 500);
  };

  const formatOptions = [
    { value: 'markdown', label: 'Markdown', icon: FileText },
    { value: 'text', label: 'Plain Text', icon: Code },
    { value: 'json', label: 'JSON', icon: FileJson },
  ] as const;

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center pointer-events-none p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-auto bg-[#1F2023] border border-[#444444] rounded-2xl p-6 max-w-md w-full shadow-2xl font-['Almarai'] min-h-[300px] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-white">Export Conversation</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <p className="text-sm text-gray-400">Loading conversation...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Format Selection */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3">
                  Export Format
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {formatOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormat(option.value)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                        format === option.value
                          ? 'bg-white/10 border-[#666666]'
                          : 'bg-white/5 border-[#444444] hover:border-[#666666]'
                      }`}
                    >
                      <option.icon className={`w-5 h-5 ${format === option.value ? 'text-white' : 'text-gray-400'}`} />
                      <span className={`text-xs ${format === option.value ? 'text-white' : 'text-gray-400'}`}>
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider text-gray-400 mb-3">
                  Preview
                </label>
                <div className="bg-black/50 border border-[#444444] rounded-lg p-3 max-h-40 overflow-y-auto">
                  <pre className="text-xs text-gray-400 whitespace-pre-wrap font-mono">
                    {preview}
                  </pre>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-2 rounded-full border border-[#444444] text-gray-300 hover:bg-white/5 transition-colors font-['Almarai']"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex-1 px-4 py-2 rounded-full bg-white hover:bg-gray-200 text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-['Almarai']"
                >
                  {isExporting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Export
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </>,
    document.body
  );
}
