"use client";

import { useState, useEffect, useRef, memo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Pin, MessageSquare, MoreVertical, Edit3, Trash2, Check, X, ChevronDown, Download } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import * as chatService from '@/lib/supabase/chat';
import { useToast } from '@/components/ui/toast';
import { ChatExportModal } from '@/components/ChatExportModal';
import { Conversation as DbConversation } from '@/lib/supabase/types';

interface Conversation extends DbConversation {
  created_at: string;
}

interface ConversationListProps {
  currentConversationId?: string | null;
  onConversationSelect?: (id: string) => void;
  isCollapsed?: boolean;
}

interface ConversationItemProps {
  conversation: Conversation;
  showPin?: boolean;
  currentConversationId?: string | null;
  editingId: string | null;
  menuOpen: string | null;
  editedTitle: string;
  onSetMenuOpen: (id: string | null) => void;
  onSelectConversation: (id: string) => void;
  onStartEdit: (id: string, title: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onPinConversation: (id: string, pinned: boolean) => void;
  onExportConversation: (id: string, title: string) => void;
  onDeleteConversation: (id: string) => void;
  onSetEditedTitle: (title: string) => void;
  onSetButtonRef: (id: string, ref: HTMLButtonElement | null) => void;
  onSetDropdownRef: (id: string, ref: HTMLDivElement | null) => void;
  getRelativeTime: (date: string) => string;
}

interface ConversationSectionProps {
  title: string;
  conversations: Conversation[];
  showPin?: boolean;
  defaultExpanded?: boolean;
  collapsedSections: Set<string>;
  onToggleSection: (section: string) => void;
  currentConversationId?: string | null;
  editingId: string | null;
  menuOpen: string | null;
  editedTitle: string;
  onSetMenuOpen: (id: string | null) => void;
  onSelectConversation: (id: string) => void;
  onStartEdit: (id: string, title: string) => void;
  onSaveEdit: (id: string) => void;
  onCancelEdit: () => void;
  onPinConversation: (id: string, pinned: boolean) => void;
  onExportConversation: (id: string, title: string) => void;
  onDeleteConversation: (id: string) => void;
  onSetEditedTitle: (title: string) => void;
  onSetButtonRef: (id: string, ref: HTMLButtonElement | null) => void;
  onSetDropdownRef: (id: string, ref: HTMLDivElement | null) => void;
  getRelativeTime: (date: string) => string;
}

const ConversationSection = memo(({ title, conversations, showPin = true, defaultExpanded = true, collapsedSections, onToggleSection, currentConversationId, editingId, menuOpen, editedTitle, onSetMenuOpen, onSelectConversation, onStartEdit, onSaveEdit, onCancelEdit, onPinConversation, onExportConversation, onDeleteConversation, onSetEditedTitle, onSetButtonRef, onSetDropdownRef, getRelativeTime }: ConversationSectionProps) => {
  if (conversations.length === 0) return null;

  // Simple logic: section is expanded if it's NOT in the collapsedSections set
  const isExpanded = !collapsedSections.has(title);

  return (
    <div className="mt-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log('Section clicked:', title, 'isExpanded:', isExpanded);
          onToggleSection(title);
        }}
        className="w-full flex items-center gap-2 px-3 py-1 text-[10px] text-black/40 hover:text-black/60 transition-colors font-medium uppercase tracking-wide"
      >
        <ChevronDown
          className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
        />
        {title} ({conversations.length})
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-0.5"
          >
            {conversations.map((conv) => (
              <ConversationItem
                key={conv.id}
                conversation={conv}
                showPin={showPin}
                currentConversationId={currentConversationId}
                editingId={editingId}
                menuOpen={menuOpen}
                editedTitle={editedTitle}
                onSetMenuOpen={onSetMenuOpen}
                onSelectConversation={onSelectConversation}
                onStartEdit={onStartEdit}
                onSaveEdit={onSaveEdit}
                onCancelEdit={onCancelEdit}
                onPinConversation={onPinConversation}
                onExportConversation={onExportConversation}
                onDeleteConversation={onDeleteConversation}
                onSetEditedTitle={onSetEditedTitle}
                onSetButtonRef={onSetButtonRef}
                onSetDropdownRef={onSetDropdownRef}
                getRelativeTime={getRelativeTime}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

// Temporarily removed memo to debug collapse/expand issue
ConversationSection.displayName = 'ConversationSection';

const ConversationItemNoMemo = ({ conversation, showPin = true, currentConversationId, editingId, menuOpen, editedTitle, onSetMenuOpen, onSelectConversation, onStartEdit, onSaveEdit, onCancelEdit, onPinConversation, onExportConversation, onDeleteConversation, onSetEditedTitle, onSetButtonRef, onSetDropdownRef, getRelativeTime }: ConversationItemProps) => {
  const isActive = currentConversationId === conversation.id;
  const isEditing = editingId === conversation.id;

  const setButtonRef = (el: HTMLButtonElement | null) => {
    onSetButtonRef(conversation.id, el);
  };

  const setDropdownRef = (el: HTMLDivElement | null) => {
    onSetDropdownRef(conversation.id, el);
  };

  return (
    <div className="relative group">
      <div
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg relative cursor-pointer transition-colors ${
          isActive ? 'bg-white/10 text-black' : 'text-black hover:bg-gray-200/50'
        }`}
        onClick={() => !isEditing && onSelectConversation(conversation.id)}
      >
        {/* Pin icon for pinned conversations */}
        {showPin && conversation.pinned && (
          <Pin className="w-5 h-5 flex-shrink-0 text-yellow-500" />
        )}

        {/* Edit mode or display mode */}
        {isEditing ? (
          <div className="flex-1 flex items-center gap-1">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => onSetEditedTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSaveEdit(conversation.id)}
              className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-sm text-black focus:outline-none"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSaveEdit(conversation.id);
              }}
              className="text-green-600 hover:text-green-700"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCancelEdit();
              }}
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <span className="flex-1 text-left truncate text-xs">
              {conversation.title || 'New Conversation'}
            </span>
            <span className="text-[10px] text-black/40 flex-shrink-0">
              {getRelativeTime(conversation.created_at)}
            </span>

            {/* Action menu button */}
            <button
              ref={setButtonRef}
              onClick={(e) => {
                e.stopPropagation();
                onSetMenuOpen(menuOpen === conversation.id ? null : conversation.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all"
            >
              <MoreVertical className="w-4 h-4 text-black" />
            </button>
          </>
        )}
      </div>

      {/* Dropdown menu */}
      <AnimatePresence>
        {menuOpen === conversation.id && !isEditing && (
          <motion.div
            ref={setDropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 bg-[#1F2023] border border-white/10 rounded-lg shadow-xl py-1 z-50 min-w-[140px] will-change-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartEdit(conversation.id, conversation.title || '');
              }}
              className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Rename
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPinConversation(conversation.id, conversation.pinned);
              }}
              className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2"
            >
              <Pin className="w-4 h-4" />
              {conversation.pinned ? 'Unpin' : 'Pin'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onExportConversation(conversation.id, conversation.title || '');
              }}
              className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/5 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteConversation(conversation.id);
              }}
              className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-white/5 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Use memo with simple comparison
const ConversationItem = memo(ConversationItemNoMemo, (prevProps, nextProps) => {
  // Check if this item's menu state changed
  const prevMenuOpen = prevProps.menuOpen === prevProps.conversation.id;
  const nextMenuOpen = nextProps.menuOpen === nextProps.conversation.id;

  // When this item is being edited, always re-render to show input changes
  if (prevProps.editingId === prevProps.conversation.id || nextProps.editingId === nextProps.conversation.id) {
    return false;
  }

  return (
    prevProps.conversation.id === nextProps.conversation.id &&
    prevProps.conversation.title === nextProps.conversation.title &&
    prevProps.conversation.pinned === nextProps.conversation.pinned &&
    prevProps.currentConversationId === nextProps.currentConversationId &&
    prevProps.editingId === nextProps.editingId &&
    prevMenuOpen === nextMenuOpen
  );
});

ConversationItem.displayName = 'ConversationItem';

function ConversationList({ currentConversationId, onConversationSelect, isCollapsed = false }: ConversationListProps) {
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const [conversations, setConversations] = useState<{
    pinned: Conversation[];
    today: Conversation[];
    yesterday: Conversation[];
    thisWeek: Conversation[];
    older: Conversation[];
  }>({
    pinned: [],
    today: [],
    yesterday: [],
    thisWeek: [],
    older: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // Initialize with sections that are collapsed by default (This Week, Older)
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set(['This Week', 'Older']));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<{
    id: string;
    title: string;
    messages: any[];
  } | null>(null);

  // Store refs for each conversation item
  const menuRefs = useRef<Map<string, { button: HTMLButtonElement | null; dropdown: HTMLDivElement | null }>>(new Map());

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuOpen) {
        const refs = menuRefs.current.get(menuOpen);
        if (refs) {
          const clickedOutside =
            !refs.dropdown?.contains(event.target as Node) &&
            !refs.button?.contains(event.target as Node);
          if (clickedOutside) {
            setMenuOpen(null);
          }
        }
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [menuOpen]);

  const loadConversations = useCallback(async () => {
    setIsLoading(true);
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const convs = await chatService.getUserConversations(user.id);
      setConversations(convs);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // Listen for conversation updates from the chat page
  useEffect(() => {
    const handleConversationUpdate = (event: CustomEvent<{ id: string; title: string }>) => {
      const { id, title } = event.detail;
      // Update the conversation title in local state
      setConversations(prev => {
        const updateList = (list: Conversation[]) => list.map(conv =>
          conv.id === id ? { ...conv, title } : conv
        );
        return {
          pinned: updateList(prev.pinned),
          today: updateList(prev.today),
          yesterday: updateList(prev.yesterday),
          thisWeek: updateList(prev.thisWeek),
          older: updateList(prev.older)
        };
      });
    };

    window.addEventListener('conversation-updated', handleConversationUpdate as EventListener);
    return () => window.removeEventListener('conversation-updated', handleConversationUpdate as EventListener);
  }, []);

  // Listen for new conversations created from the chat page
  useEffect(() => {
    const handleConversationCreated = (event: Event) => {
      console.log('conversation-created event received:', event);
      const customEvent = event as CustomEvent<{ conversation: Conversation }>;
      const conversation = customEvent.detail.conversation;
      console.log('Conversation from event:', conversation);
      if (!conversation) return;

      // Add the new conversation to the appropriate section
      const now = new Date();

      // Determine which section this conversation belongs to
      const getConversationSection = (conv: Conversation) => {
        if (conv.pinned) return 'pinned';

        const createdAt = new Date(conv.created_at);

        // Get the start of today (midnight) in local timezone
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get the start of yesterday
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        // Get the start of 7 days ago
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        // Normalize the created date to start of its day
        const createdDay = new Date(createdAt);
        createdDay.setHours(0, 0, 0, 0);

        console.log('Date comparison:', {
          createdDay: createdDay.toISOString(),
          today: today.toISOString(),
          yesterday: yesterday.toISOString(),
          weekAgo: weekAgo.toISOString()
        });

        // Compare the dates
        if (createdDay.getTime() === today.getTime()) return 'today';
        if (createdDay.getTime() === yesterday.getTime()) return 'yesterday';
        if (createdDay >= weekAgo) return 'thisWeek';
        return 'older';
      };

      const section = getConversationSection(conversation);
      console.log('Adding conversation to section:', section);

      setConversations(prev => {
        console.log('Previous conversations:', prev);
        const newState = {
          ...prev,
          [section]: [conversation, ...prev[section]]
        };
        console.log('New conversations state:', newState);
        return newState;
      });
    };

    window.addEventListener('conversation-created', handleConversationCreated as EventListener);
    return () => window.removeEventListener('conversation-created', handleConversationCreated as EventListener);
  }, []);

  // Listen for conversation deletions from the chat page
  useEffect(() => {
    const handleConversationDeleted = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string }>;
      const { id } = customEvent.detail;
      // Remove the conversation from all sections
      setConversations(prev => {
        const filterList = (list: Conversation[]) => list.filter(conv => conv.id !== id);
        return {
          pinned: filterList(prev.pinned),
          today: filterList(prev.today),
          yesterday: filterList(prev.yesterday),
          thisWeek: filterList(prev.thisWeek),
          older: filterList(prev.older)
        };
      });
    };

    window.addEventListener('conversation-deleted', handleConversationDeleted as EventListener);
    return () => window.removeEventListener('conversation-deleted', handleConversationDeleted as EventListener);
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    // Dispatch custom event to notify chat page
    window.dispatchEvent(new CustomEvent('conversation-selected', { detail: { id } }));
    // Use shallow routing to update URL without full page reload
    if (window.location.pathname !== `/chat/${id}`) {
      window.history.pushState({}, '', `/chat/${id}`);
    }
  }, []);

  const handlePinConversation = useCallback(async (id: string, currentPinned: boolean) => {
    try {
      await chatService.updateConversation(id, { pinned: !currentPinned });
      showSuccess(currentPinned ? 'Conversation unpinned' : 'Conversation pinned');
      // Optimistically update local state
      setConversations(prev => {
        const updateList = (list: Conversation[]) => list.map(conv =>
          conv.id === id ? { ...conv, pinned: !currentPinned } : conv
        );
        return {
          pinned: updateList(prev.pinned),
          today: updateList(prev.today),
          yesterday: updateList(prev.yesterday),
          thisWeek: updateList(prev.thisWeek),
          older: updateList(prev.older)
        };
      });
    } catch (error) {
      showError('Failed to update conversation');
    }
    setMenuOpen(null);
  }, [showSuccess, showError]);

  const handleDeleteConversation = useCallback((id: string) => {
    // Dispatch event to let the chat page handle deletion
    window.dispatchEvent(new CustomEvent('delete-conversation-request', { detail: { id } }));
    setMenuOpen(null);
  }, []);

  const handleStartEdit = useCallback((id: string, title: string) => {
    setEditingId(id);
    setEditedTitle(title || 'New Conversation');
    setMenuOpen(null);
  }, []);

  const handleSaveEdit = useCallback(async (id: string) => {
    const newTitle = editedTitle.trim();
    if (!newTitle) {
      setEditingId(null);
      return;
    }

    try {
      await chatService.updateConversation(id, { title: newTitle });
      showSuccess('Conversation renamed');

      // Update local state directly instead of reloading all conversations
      setConversations(prev => {
        const updateList = (list: Conversation[]) => list.map(conv =>
          conv.id === id ? { ...conv, title: newTitle } : conv
        );
        return {
          pinned: updateList(prev.pinned),
          today: updateList(prev.today),
          yesterday: updateList(prev.yesterday),
          thisWeek: updateList(prev.thisWeek),
          older: updateList(prev.older)
        };
      });

      // Exit edit mode after successful update
      setEditingId(null);
      setMenuOpen(null);
    } catch (error) {
      showError('Failed to rename conversation');
    }
  }, [editedTitle, showSuccess, showError]);

  const handleCancelEdit = useCallback(() => {
    setEditingId(null);
    setEditedTitle('');
  }, []);

  const handleExportConversation = useCallback(async (id: string, title: string) => {
    setSelectedConversation({
      id,
      title: title || 'New Conversation',
      messages: [] // Start empty, will load in modal
    });
    setExportModalOpen(true);
    setMenuOpen(null);
  }, []);

  const getRelativeTime = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString();
  }, []);

  // Helper functions for managing refs per conversation
  const handleSetButtonRef = useCallback((id: string, ref: HTMLButtonElement | null) => {
    const existing = menuRefs.current.get(id) ?? { button: null, dropdown: null };
    menuRefs.current.set(id, { ...existing, button: ref });
  }, []);

  const handleSetDropdownRef = useCallback((id: string, ref: HTMLDivElement | null) => {
    const existing = menuRefs.current.get(id) ?? { button: null, dropdown: null };
    menuRefs.current.set(id, { ...existing, dropdown: ref });
  }, []);

  const handleToggleSection = useCallback((section: string) => {
    setCollapsedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  }, []);

  if (isLoading) {
    // When collapsed, don't show the loading message
    if (isCollapsed) {
      return null;
    }
    return (
      <div className="px-2 py-4 text-center text-sm text-black/50">
        Loading conversations...
      </div>
    );
  }

  const totalConversations =
    conversations.pinned.length +
    conversations.today.length +
    conversations.yesterday.length +
    conversations.thisWeek.length +
    conversations.older.length;

  return (
    <div className="px-2 min-h-0">
      {/* Search - Hidden when collapsed */}
      {!isCollapsed && (
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-black/50" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-black placeholder:text-black/50 focus:outline-none focus:border-white/20 hover:bg-gray-200/50 transition-all"
          />
        </div>
      )}

      {/* Empty state - Hidden when collapsed */}
      {!isCollapsed && totalConversations === 0 && (
        <div className="text-center py-8">
          <MessageSquare className="w-8 h-8 mx-auto text-black/30 mb-2" />
          <p className="text-sm text-black/50">No conversations yet</p>
          <p className="text-xs text-black/40 mt-1">Start a new chat to begin</p>
        </div>
      )}

      {/* Conversation sections */}
      {!isCollapsed && (
        <>
          {searchQuery && (
            <div className="space-y-0.5 mt-3">
              {[
                ...conversations.pinned,
                ...conversations.today,
                ...conversations.yesterday,
                ...conversations.thisWeek,
                ...conversations.older
              ]
                .filter(conv =>
                  conv.title?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    currentConversationId={currentConversationId}
                    editingId={editingId}
                    menuOpen={menuOpen}
                    editedTitle={editedTitle}
                    onSetMenuOpen={setMenuOpen}
                    onSelectConversation={handleSelectConversation}
                    onStartEdit={handleStartEdit}
                    onSaveEdit={handleSaveEdit}
                    onCancelEdit={handleCancelEdit}
                    onPinConversation={handlePinConversation}
                    onExportConversation={handleExportConversation}
                    onDeleteConversation={handleDeleteConversation}
                    onSetEditedTitle={setEditedTitle}
                    onSetButtonRef={handleSetButtonRef}
                    onSetDropdownRef={handleSetDropdownRef}
                    getRelativeTime={getRelativeTime}
                  />
                ))}
            </div>
          )}

          {!searchQuery && (
            <>
              <ConversationSection
                title="Pinned"
                conversations={conversations.pinned}
                showPin={false}
                defaultExpanded={true}
                collapsedSections={collapsedSections}
                onToggleSection={handleToggleSection}
                currentConversationId={currentConversationId}
                editingId={editingId}
                menuOpen={menuOpen}
                editedTitle={editedTitle}
                onSetMenuOpen={setMenuOpen}
                onSelectConversation={handleSelectConversation}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                onPinConversation={handlePinConversation}
                onExportConversation={handleExportConversation}
                onDeleteConversation={handleDeleteConversation}
                onSetEditedTitle={setEditedTitle}
                onSetButtonRef={handleSetButtonRef}
                onSetDropdownRef={handleSetDropdownRef}
                getRelativeTime={getRelativeTime}
              />
              <ConversationSection
                title="Today"
                conversations={conversations.today}
                collapsedSections={collapsedSections}
                onToggleSection={handleToggleSection}
                currentConversationId={currentConversationId}
                editingId={editingId}
                menuOpen={menuOpen}
                editedTitle={editedTitle}
                onSetMenuOpen={setMenuOpen}
                onSelectConversation={handleSelectConversation}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                onPinConversation={handlePinConversation}
                onExportConversation={handleExportConversation}
                onDeleteConversation={handleDeleteConversation}
                onSetEditedTitle={setEditedTitle}
                onSetButtonRef={handleSetButtonRef}
                onSetDropdownRef={handleSetDropdownRef}
                getRelativeTime={getRelativeTime}
              />
              <ConversationSection
                title="Yesterday"
                conversations={conversations.yesterday}
                collapsedSections={collapsedSections}
                onToggleSection={handleToggleSection}
                currentConversationId={currentConversationId}
                editingId={editingId}
                menuOpen={menuOpen}
                editedTitle={editedTitle}
                onSetMenuOpen={setMenuOpen}
                onSelectConversation={handleSelectConversation}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                onPinConversation={handlePinConversation}
                onExportConversation={handleExportConversation}
                onDeleteConversation={handleDeleteConversation}
                onSetEditedTitle={setEditedTitle}
                onSetButtonRef={handleSetButtonRef}
                onSetDropdownRef={handleSetDropdownRef}
                getRelativeTime={getRelativeTime}
              />
              <ConversationSection
                title="This Week"
                conversations={conversations.thisWeek}
                defaultExpanded={false}
                collapsedSections={collapsedSections}
                onToggleSection={handleToggleSection}
                currentConversationId={currentConversationId}
                editingId={editingId}
                menuOpen={menuOpen}
                editedTitle={editedTitle}
                onSetMenuOpen={setMenuOpen}
                onSelectConversation={handleSelectConversation}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                onPinConversation={handlePinConversation}
                onExportConversation={handleExportConversation}
                onDeleteConversation={handleDeleteConversation}
                onSetEditedTitle={setEditedTitle}
                onSetButtonRef={handleSetButtonRef}
                onSetDropdownRef={handleSetDropdownRef}
                getRelativeTime={getRelativeTime}
              />
              <ConversationSection
                title="Older"
                conversations={conversations.older}
                defaultExpanded={false}
                collapsedSections={collapsedSections}
                onToggleSection={handleToggleSection}
                currentConversationId={currentConversationId}
                editingId={editingId}
                menuOpen={menuOpen}
                editedTitle={editedTitle}
                onSetMenuOpen={setMenuOpen}
                onSelectConversation={handleSelectConversation}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                onPinConversation={handlePinConversation}
                onExportConversation={handleExportConversation}
                onDeleteConversation={handleDeleteConversation}
                onSetEditedTitle={setEditedTitle}
                onSetButtonRef={handleSetButtonRef}
                onSetDropdownRef={handleSetDropdownRef}
                getRelativeTime={getRelativeTime}
              />
            </>
          )}
        </>
      )}

      {/* Collapsed state - Show search icon only */}
      {isCollapsed && totalConversations > 0 && (
        <div className="flex justify-center py-2">
          <Search className="w-5 h-5 text-black/50" />
        </div>
      )}

      {/* Export Modal */}
      {selectedConversation && (
        <ChatExportModal
          isOpen={exportModalOpen}
          onClose={() => {
            setExportModalOpen(false);
            setSelectedConversation(null);
          }}
          conversationId={selectedConversation.id}
          conversationTitle={selectedConversation.title}
          messages={selectedConversation.messages}
        />
      )}
    </div>
  );
}

export default memo(ConversationList, (prevProps, nextProps) => {
  // Only re-render if these props change
  return (
    prevProps.currentConversationId === nextProps.currentConversationId &&
    prevProps.isCollapsed === nextProps.isCollapsed
  );
});
