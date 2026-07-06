"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, Code, FileJson } from 'lucide-react';
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
  messages: Message[];
}

type ExportFormat = 'markdown' | 'text' | 'json';

export function ChatExportModal({
  isOpen,
  onClose,
  conversationId,
  conversationTitle,
  messages
}: ExportModalProps) {
  const [format, setFormat] = useState<ExportFormat>('markdown');
  const [isExporting, setIsExporting] = useState(false);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (isOpen) {
      generatePreview();
    }
  }, [isOpen, format]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#1F2023] border border-white/10 rounded-2xl p-6 max-w-lg w-full mx-4 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Export Conversation</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Export Format
          </label>
          <div className="grid grid-cols-3 gap-3">
            {formatOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFormat(option.value)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                  format === option.value
                    ? 'bg-purple-500/20 border-purple-500/50'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <option.icon className="w-5 h-5" style={{ color: format === option.value ? '#a855f7' : '#9ca3af' }} />
                <span className="text-xs" style={{ color: format === option.value ? '#e9d5ff' : '#9ca3af' }}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Preview
          </label>
          <div className="bg-black/50 border border-white/10 rounded-lg p-3 max-h-40 overflow-y-auto">
            <pre className="text-xs text-gray-400 whitespace-pre-wrap font-mono">
              {preview}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-white/10 text-gray-300 hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
      </motion.div>
    </div>
  );
}
