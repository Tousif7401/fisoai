"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { Sidebar } from '@/components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Plus, Edit2, Check, MoreVertical, Pin, Trash2 } from 'lucide-react';
import { getUser, getProfile } from '@/lib/supabase/auth';
import { articles } from '@/lib/articles';
import * as chatService from '@/lib/supabase/chat';
import { useToast } from '@/components/ui/toast';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { AvatarPicker, avatarList } from '@/components/ui/avatar-picker';
import { createBrowserClient } from '@supabase/ssr';

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

const CALMIFY_DESCRIPTION = `I'm **Calmify**, an AI companion designed for developers, builders, and anyone who needs mental health support.

I'm here to:
- Listen without judgment
- Help you navigate burnout, imposter syndrome, and the unique pressures of building things
- Offer grounded, practical perspectives
- Be a calm presence when things feel overwhelming

**Important:** I'm not a clinical therapist or substitute for professional mental health care. If you're in serious distress, please reach out to a professional.

How can I support you today?`;

// Keywords that trigger the Calmify description
const CALMIFY_KEYWORDS = [
  'what r u',
  'what are you',
  'who are you',
  'what is calmify',
  'what is this',
  'what can you do',
  'help',
  'about you',
  'your name',
];

// Article keyword mapping for suggestions
const ARTICLE_KEYWORDS: Record<string, string[]> = {
  'overcoming-imposter-syndrome': ['imposter', 'imposter syndrome', 'not good enough', 'fraud', 'fake', 'doubt', 'inadequate'],
  'burnout-recovery-builders-guide': ['burnout', 'burnt', 'exhausted', 'tired', 'overwhelmed', 'drained', 'motivation'],
  'shipping-anxiety-why-we-fear-done': ['shipping', 'deploy', 'anxiety', 'perfection', 'done', 'finish', 'complete', 'fear'],
  'context-switching-is-killing-creativity': ['focus', 'context', 'switch', 'distract', 'interruption', 'deep work', 'concentrate'],
  'sunday-scaries-for-developers': ['sunday', 'monday', 'dread', 'scaries', 'weekend', 'anxious'],
  'lost-your-spark-its-not-discipline-its-rest': ['spark', 'rest', 'discipline', 'hustle', 'motivation', 'energy', 'passion'],
};

// Get article suggestions based on message
function getArticleSuggestion(message: string): { slug: string; title: string; excerpt: string; readTime: string; category: string } | null {
  const lowerMessage = message.toLowerCase();

  for (const [slug, keywords] of Object.entries(ARTICLE_KEYWORDS)) {
    if (keywords.some(keyword => lowerMessage.includes(keyword))) {
      const article = articles.find(a => a.slug === slug);
      if (article) return article;
    }
  }

  // Random article suggestion (30% chance)
  if (Math.random() > 0.7) {
    return articles[Math.floor(Math.random() * articles.length)];
  }

  return null;
}

// Get time-based greeting
const getTimeBasedGreeting = (): string => {
  const hour = new Date().getHours();
  const name = "Mohammed";

  if (hour >= 5 && hour < 12) {
    return `Good morning, ${name}. How are you looking to start your day?`;
  } else if (hour >= 12 && hour < 17) {
    return `Hey ${name}, how is your day going so far?`;
  } else {
    return `Winding down, ${name}? How can I help you reset?`;
  }
};

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const { showError, showSuccess } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebar-collapsed');
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });

  // Persist sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStartedChat, setHasStartedChat] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [displayedGreeting, setDisplayedGreeting] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Conversation state
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationTitle, setConversationTitle] = useState<string | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null);

  // User profile state
  const [profileName, setProfileName] = useState('User');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [savedAvatarSvg, setSavedAvatarSvg] = useState<React.ReactNode>(null);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { user } = await getUser();
      if (!user) {
        router.replace('/login');
      } else {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [router]);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      if (profile) {
        setProfileName(profile.full_name || 'User');
        if (profile.avatar_url) {
          setAvatarUrl(profile.avatar_url);
        }
        // Load selected avatar from avatar_id
        if (profile.avatar_id) {
          const avatar = avatarList.find(a => a.id === profile.avatar_id);
          if (avatar) {
            setSavedAvatarSvg(avatar.svg);
          }
        }
      }
    };
    fetchProfile();
  }, []);

  // Listen for custom new chat event from sidebar
  useEffect(() => {
    const handleNewChatRequest = () => {
      // Reset state for new chat
      setConversationId(null);
      setConversationTitle(null);
      setMessages([]);
      setHasStartedChat(false);
      setIsPinned(false);
      setIsEditingTitle(false);
      setEditedTitle('');
      setIsMenuOpen(false);
      // Update URL to match
      if (window.location.pathname !== '/chat/new') {
        window.history.pushState({}, '', '/chat/new');
      }
    };

    window.addEventListener('new-chat-request', handleNewChatRequest);
    return () => window.removeEventListener('new-chat-request', handleNewChatRequest);
  }, []);

  // Listen for conversation selection from sidebar
  useEffect(() => {
    const handleConversationSelected = async (event: CustomEvent<{ id: string }>) => {
      const { id } = event.detail;
      setIsLoadingConversation(true);

      try {
        const conversation = await chatService.getConversationMessages(id);
        setConversationId(id);
        setConversationTitle(conversation.title);
        setIsPinned(conversation.pinned);
        setMessages(conversation.messages);
        setHasStartedChat(conversation.messages.length > 0);
      } catch (error) {
        console.error('Failed to load conversation:', error);
      } finally {
        setIsLoadingConversation(false);
      }
    };

    window.addEventListener('conversation-selected', handleConversationSelected as EventListener);
    return () => window.removeEventListener('conversation-selected', handleConversationSelected as EventListener);
  }, []);

  // Listen for delete conversation request from sidebar
  useEffect(() => {
    const handleDeleteRequest = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string }>;
      setConversationToDelete(customEvent.detail.id);
      setDeleteDialogOpen(true);
    };

    window.addEventListener('delete-conversation-request', handleDeleteRequest as EventListener);
    return () => window.removeEventListener('delete-conversation-request', handleDeleteRequest as EventListener);
  }, []);

  // Load conversation from URL on mount
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadConversation = async () => {
      const id = params.id as string;

      // Reset state when navigating to 'new'
      if (id === 'new' || !id) {
        setConversationId(null);
        setConversationTitle(null);
        setMessages([]);
        setHasStartedChat(false);
        setIsPinned(false);
        setIsEditingTitle(false);
        setEditedTitle('');
        setIsMenuOpen(false);
        return;
      }

      // Load existing conversation
      try {
        const conversation = await chatService.getConversationMessages(id);
        setConversationId(id);
        setConversationTitle(conversation.title);
        setIsPinned(conversation.pinned);
        setMessages(conversation.messages);
        if (conversation.messages.length > 0) {
          setHasStartedChat(true);
        }
      } catch (error) {
        console.error('Failed to load conversation:', error);
        // If conversation not found, redirect to new chat
        router.replace('/chat/new');
      }
    };

    loadConversation();
  }, [isAuthenticated, params.id, router]);

  // Initialize greeting on client side only
  useEffect(() => {
    if (isAuthenticated) {
      setGreeting(getTimeBasedGreeting());
    }
  }, [isAuthenticated]);

  // Typewriter effect for greeting
  useEffect(() => {
    if (!isAuthenticated || hasStartedChat || !greeting) return;

    let index = 0;
    setDisplayedGreeting('');

    const timer = setInterval(() => {
      if (index < greeting.length) {
        setDisplayedGreeting(greeting.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [greeting, hasStartedChat, isAuthenticated]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const shouldShowCalmifyDescription = (message: string): boolean => {
    const lowerMessage = message.toLowerCase().trim();
    return CALMIFY_KEYWORDS.some(keyword => lowerMessage.includes(keyword));
  };

  const createNewConversation = () => {
    // Reset state for new chat
    setConversationId(null);
    setConversationTitle(null);
    setMessages([]);
    setHasStartedChat(false);
  };

  const saveConversationTitle = async () => {
    if (!conversationId || !editedTitle.trim()) return;

    setIsSaving(true);
    try {
      await chatService.updateConversation(conversationId, { title: editedTitle.trim() });
      setConversationTitle(editedTitle.trim());
      setIsEditingTitle(false);
      showSuccess('Conversation renamed');
      // Dispatch event to notify sidebar of the update
      window.dispatchEvent(new CustomEvent('conversation-updated', { detail: { id: conversationId, title: editedTitle.trim() } }));
    } catch (error) {
      console.error('Failed to update title:', error);
      showError('Failed to rename conversation');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePinConversation = async () => {
    if (!conversationId) return;
    try {
      await chatService.updateConversation(conversationId, { pinned: !isPinned });
      setIsPinned(!isPinned);
      showSuccess(isPinned ? 'Conversation unpinned' : 'Conversation pinned');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Failed to update conversation:', error);
      showError('Failed to update conversation');
    }
  };

  const handleDeleteConversation = async () => {
    if (!conversationId) return;
    if (!confirm('Are you sure you want to delete this conversation?')) return;

    try {
      await chatService.deleteConversation(conversationId);
      showSuccess('Conversation deleted');
      createNewConversation();
      // Dispatch event to notify sidebar
      window.dispatchEvent(new CustomEvent('conversation-deleted', { detail: { id: conversationId } }));
      // Update URL to /chat/new
      window.history.replaceState({}, '', '/chat/new');
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      showError('Failed to delete conversation');
    }
  };

  // Handlers for dialog-based deletion (from sidebar)
  const confirmDeleteConversation = async () => {
    if (!conversationToDelete) return;

    try {
      await chatService.deleteConversation(conversationToDelete);
      showSuccess('Conversation deleted');

      // Dispatch event to notify sidebar
      window.dispatchEvent(new CustomEvent('conversation-deleted', { detail: { id: conversationToDelete } }));

      // If we deleted the current conversation, reset state
      if (conversationToDelete === conversationId) {
        createNewConversation();
        window.history.replaceState({}, '', '/chat/new');
      }

      setDeleteDialogOpen(false);
      setConversationToDelete(null);
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      showError('Failed to delete conversation');
    }
  };

  const cancelDeleteConversation = () => {
    setDeleteDialogOpen(false);
    setConversationToDelete(null);
  };

  const handleSendMessage = async (message: string, files?: File[]) => {
    if (!message.trim()) return;

    // Start chat mode on first message
    if (!hasStartedChat) {
      setHasStartedChat(true);
    }

    // Create conversation if none exists
    if (!conversationId) {
      try {
        const newConv = await chatService.createConversation(
          (await getUser()).user!.id,
          message.slice(0, 50) + (message.length > 50 ? '...' : '')
        );
        console.log('New conversation created:', newConv);
        setConversationId(newConv.id);
        setConversationTitle(newConv.title ?? null);
        // Use shallow routing to avoid page remount
        window.history.replaceState({}, '', `/chat/${newConv.id}`);
        // Dispatch event to notify sidebar of new conversation
        console.log('Dispatching conversation-created event with:', newConv);
        window.dispatchEvent(new CustomEvent('conversation-created', { detail: { conversation: newConv } }));
      } catch (error) {
        console.error('Failed to create conversation:', error);
        showError('Failed to save conversation');
      }
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Save user message to database
    if (conversationId) {
      try {
        await chatService.addMessage(conversationId, 'user', message);
      } catch (error) {
        console.error('Failed to save message:', error);
      }
    }

    // Check if we should show Calmify description
    if (shouldShowCalmifyDescription(message)) {
      setIsTyping(true);
      setTimeout(async () => {
        const calmifyMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: CALMIFY_DESCRIPTION,
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, calmifyMessage]);
        setIsTyping(false);

        // Save to database
        if (conversationId) {
          try {
            await chatService.addMessage(conversationId, 'assistant', CALMIFY_DESCRIPTION);
          } catch (error) {
            console.error('Failed to save message:', error);
          }
        }
      }, 1000);
    } else {
      // For other messages, provide a supportive response with article suggestions
      setIsTyping(true);
      setTimeout(async () => {
        const articleSuggestion = getArticleSuggestion(message);

        let response = `I hear you. ${getSupportiveResponse(message)}`;

        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response,
          role: 'assistant',
          timestamp: new Date(),
          articleSuggestion: articleSuggestion ? {
            slug: articleSuggestion.slug,
            title: articleSuggestion.title,
            excerpt: articleSuggestion.excerpt,
            readTime: articleSuggestion.readTime,
            category: articleSuggestion.category,
          } : undefined,
        };
        setMessages(prev => [...prev, responseMessage]);
        setIsTyping(false);

        // Save to database
        if (conversationId) {
          try {
            await chatService.addMessage(
              conversationId,
              'assistant',
              response,
              responseMessage.articleSuggestion
            );
          } catch (error) {
            console.error('Failed to save message:', error);
          }
        }
      }, 1000);
    }
  };

  // Get a supportive response based on message content
  const getSupportiveResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    // Simple keyword-based supportive responses
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
      return "It sounds like you're going through a stressful time. That's really tough, and it's okay to feel this way.";
    } else if (lowerMessage.includes('tired') || lowerMessage.includes('exhaust') || lowerMessage.includes('burnout')) {
      return "Burnout and exhaustion are real challenges, especially in our field. Taking time to acknowledge this is the first step.";
    } else if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depress')) {
      return "I'm sorry you're feeling down. These moments happen, and you don't have to navigate them alone.";
    } else if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
      return "That's wonderful to hear! It's important to acknowledge the good moments too.";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('advice')) {
      return "I'm here to listen. Sometimes talking through what's on your mind can help clarify things.";
    } else {
      return "Thank you for sharing that with me. How are you feeling about it?";
    }
  };

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className="flex h-screen font-['Almarai'] bg-[radial-gradient(125%_125%_at_50%_101%,rgba(245,87,2,1)_10.5%,rgba(245,120,2,1)_16%,rgba(245,140,2,1)_17.5%,rgba(245,170,100,1)_25%,rgba(238,174,202,1)_40%,rgba(202,179,214,1)_65%,rgba(148,201,233,1)_100%)]"
    >
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        currentConversationId={conversationId}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Conversation Header */}
        {conversationId && (
          <>
            {/* Loading indicator above header */}
            {isLoadingConversation && (
              <div className="px-4 py-2">
                <div className="w-full h-0.5 bg-black/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
                    className="h-full bg-black/60"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              {isEditingTitle ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveConversationTitle()}
                    className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-black focus:outline-none focus:border-white/40"
                    autoFocus
                  />
                  <button
                    onClick={saveConversationTitle}
                    disabled={isSaving}
                    className="text-green-600 hover:text-green-700 disabled:opacity-50"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <h2 className="text-black font-medium truncate max-w-md">
                  {conversationTitle || 'New Conversation'}
                </h2>
              )}
              {!isEditingTitle && (
                <button
                  onClick={() => {
                    setIsEditingTitle(true);
                    setEditedTitle(conversationTitle || '');
                  }}
                  className="text-black/50 hover:text-black transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors text-black"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsMenuOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 z-20 bg-[#1F2023] border border-white/10 rounded-lg shadow-xl py-1 min-w-[160px]"
                    >
                      <button
                        onClick={createNewConversation}
                        className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 flex items-center gap-3"
                      >
                        <Plus className="w-4 h-4" />
                        New chat
                      </button>
                      <button
                        onClick={handlePinConversation}
                        className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 flex items-center gap-3"
                      >
                        <Pin className="w-4 h-4" />
                        {isPinned ? 'Unpin' : 'Pin'}
                      </button>
                      <button
                        onClick={handleDeleteConversation}
                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/5 flex items-center gap-3"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
          </>
        )}

        {/* Top Spacer - keeps input centered initially */}
        <motion.div
          animate={{ flex: hasStartedChat ? 0 : 1 }}
          transition={{ duration: 1.0, ease: [0.42, 0, 0.58, 1] }}
          style={{ flex: hasStartedChat ? 0 : 1, minHeight: 0 }}
        />

        {/* Messages Area - Always exists but hidden initially */}
        <motion.div
          initial={{ opacity: 0, flex: 0 }}
          animate={{
            opacity: hasStartedChat ? 1 : 0,
            flex: hasStartedChat ? 1 : 0,
          }}
          transition={{ duration: 1.0, ease: [0.42, 0, 0.58, 1] }}
          className="overflow-y-auto px-3 py-4 sm:px-4 sm:py-6"
          style={{ minHeight: 0, pointerEvents: hasStartedChat ? 'auto' : 'none' }}
        >
          <div className="max-w-3xl mx-auto space-y-4 px-2 sm:px-0">
            {/* Messages */}
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
                    <img src="/logo.svg" alt="Calmify" className="w-full h-full object-cover" />
                  </div>
                )}
                <div
                  className="max-w-[85%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-3 bg-[#1F2023] text-gray-300 border border-[#444444] text-sm sm:text-base"
                >
                  <div dangerouslySetInnerHTML={{
                    __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />')
                  }}
                  />
                  {/* Article Suggestion Card - Inside the message bubble */}
                  {message.articleSuggestion && (
                    <Link href={`/articles/${message.articleSuggestion.slug}`} className="block mt-3">
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-lg p-3 bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer group max-w-[280px]"
                      >
                        <div className="flex items-start gap-2 mb-2">
                          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-gray-400">
                            {message.articleSuggestion.category}
                          </span>
                          <span className="text-[10px] text-gray-500 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                              <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
                            </svg>
                            {message.articleSuggestion.readTime}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-gray-200 mb-1 group-hover:text-white transition-colors">
                          {message.articleSuggestion.title}
                        </h4>
                        <p className="text-xs text-gray-500 line-clamp-2">
                          {message.articleSuggestion.excerpt}
                        </p>
                        <div className="flex items-center gap-1 mt-2 text-gray-400 text-xs group-hover:text-gray-300 group-hover:gap-2 transition-all">
                          <span>Read article</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </motion.div>
                    </Link>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg border border-white/20 overflow-hidden">
                    {savedAvatarSvg ? (
                      <div className="w-full h-full flex items-center justify-center">
                        {savedAvatarSvg}
                      </div>
                    ) : avatarUrl ? (
                      <img src={avatarUrl} alt={profileName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-semibold text-xs">{profileName.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                )}
              </motion.div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden">
                  <img src="/logo.svg" alt="Calmify" className="w-full h-full object-cover" />
                </div>
                <div className="bg-[#1F2023] border border-[#444444] rounded-2xl px-3 py-2 sm:px-4 sm:py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </motion.div>

        {/* Input Area */}
        <div className="flex flex-col items-center px-4">
          {/* Greeting Text - Only visible before chat starts */}
          <AnimatePresence>
            {!hasStartedChat && (
              <motion.div
                initial={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 1.0, ease: [0.42, 0, 0.58, 1] }}
                className="mb-4 sm:mb-6 text-center font-['Almarai'] overflow-hidden px-4"
              >
                <p className="text-white/80 text-lg sm:text-xl md:text-2xl">
                  {displayedGreeting}
                  <span className="animate-pulse">|</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Box - Width expands on page load and when chat starts */}
          <motion.div
            className="w-full pb-4 sm:pb-6"
            initial={{ maxWidth: '320px' }}
            animate={{ maxWidth: hasStartedChat ? '768px' : '500px' }}
            transition={{
              duration: hasStartedChat ? 1.0 : 1.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <PromptInputBox onSend={handleSendMessage} />
          </motion.div>
        </div>

        {/* Bottom Spacer - keeps input centered initially */}
        <motion.div
          animate={{ flex: hasStartedChat ? 0 : 1 }}
          transition={{ duration: 1.0, ease: [0.42, 0, 0.58, 1] }}
          style={{ flex: hasStartedChat ? 0 : 1, minHeight: 0 }}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        title="Delete Conversation"
        message="Are you sure you want to delete this conversation? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeleteConversation}
        onCancel={cancelDeleteConversation}
      />
    </div>
  );
}
