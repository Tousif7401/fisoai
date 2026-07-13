import { Conversation, Message as ChatMessage } from './types';

export interface Message {
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

export interface ConversationWithMessages {
  id: string;
  title: string | null;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

/**
 * Create a new conversation
 * Returns a result object with success status
 */
export async function createConversation(
  _userId: string,
  title?: string
): Promise<{ success: true; data: Conversation } | { success: false; error: string }> {
  try {
    const response = await fetch('/api/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });

    if (!response.ok) {
      let errorMessage = 'Failed to create conversation';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }
      return { success: false, error: errorMessage };
    }

    const data = await response.json();
    return { success: true, data };
  } catch {
    // Return error instead of throwing to avoid Next.js error overlay in dev
    return { success: false, error: 'Failed to create conversation' };
  }
}

/**
 * Get all user's conversations grouped by date
 */
export async function getUserConversations(): Promise<{
  pinned: Conversation[];
  today: Conversation[];
  yesterday: Conversation[];
  thisWeek: Conversation[];
  older: Conversation[];
}> {
  const response = await fetch('/api/conversations');

  if (!response.ok) {
    throw new Error('Failed to fetch conversations');
  }

  return response.json();
}

/**
 * Get a conversation with all its messages
 */
export async function getConversationMessages(
  conversationId: string
): Promise<ConversationWithMessages> {
  const response = await fetch(`/api/conversations/${conversationId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch conversation');
  }

  const data = await response.json();

  // Transform database messages to frontend format
  const messages: Message[] = data.messages.map((msg: ChatMessage) => ({
    id: msg.id,
    content: msg.content,
    role: msg.role,
    timestamp: new Date(msg.created_at),
    articleSuggestion: msg.article_suggestion ? {
      slug: msg.article_suggestion.slug,
      title: msg.article_suggestion.title,
      excerpt: msg.article_suggestion.excerpt,
      readTime: msg.article_suggestion.readTime,
      category: msg.article_suggestion.category,
    } : undefined
  }));

  return {
    id: data.conversation.id,
    title: data.conversation.title,
    pinned: data.conversation.pinned,
    createdAt: data.conversation.created_at,
    updatedAt: data.conversation.updated_at,
    messages
  };
}

/**
 * Add a message to a conversation
 * Returns a result object with success status
 */
export async function addMessage(
  conversationId: string,
  role: 'user' | 'assistant',
  content: string,
  articleSuggestion?: Message['articleSuggestion']
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const response = await fetch(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        role,
        content,
        articleSuggestion
      })
    });

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = 'Failed to add message';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        errorMessage = response.statusText || errorMessage;
      }
      return { success: false, error: errorMessage };
    }

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to add message' };
  }
}

/**
 * Update a conversation (rename, pin/unpin)
 */
export async function updateConversation(
  conversationId: string,
  updates: { title?: string; pinned?: boolean }
): Promise<void> {
  const response = await fetch(`/api/conversations/${conversationId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    throw new Error('Failed to update conversation');
  }
}

/**
 * Delete a conversation
 */
export async function deleteConversation(conversationId: string): Promise<void> {
  const response = await fetch(`/api/conversations/${conversationId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Failed to delete conversation');
  }
}

/**
 * Search conversations by title or content
 */
export async function searchConversations(
  userId: string,
  query: string
): Promise<Conversation[]> {
  // This would require a new API endpoint or Supabase RPC function
  // For now, filter on the client side
  const conversations = await getUserConversations();
  const all = [
    ...conversations.pinned,
    ...conversations.today,
    ...conversations.yesterday,
    ...conversations.thisWeek,
    ...conversations.older
  ];

  if (!query.trim()) return all;

  const lowerQuery = query.toLowerCase();
  return all.filter(conv =>
    conv.title?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Export conversation as Markdown
 */
export async function exportConversation(
  conversationId: string,
  conversationTitle: string,
  messages: Message[]
): Promise<string> {
  let markdown = `# ${conversationTitle || 'Chat Export'}\n\n`;
  markdown += `Exported on ${new Date().toLocaleString()}\n\n---\n\n`;

  messages.forEach(msg => {
    const speaker = msg.role === 'user' ? 'You' : 'Calmify';
    markdown += `## ${speaker}\n\n${msg.content}\n\n`;

    if (msg.articleSuggestion) {
      markdown += `**📚 Suggested Reading:** [${msg.articleSuggestion.title}](/articles/${msg.articleSuggestion.slug})\n\n`;
    }
  });

  return markdown;
}
