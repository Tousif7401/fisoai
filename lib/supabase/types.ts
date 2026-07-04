// Database types for Calmify

export interface Profile {
  id: string
  full_name?: string
  avatar_url?: string
  avatar_id?: number
  email?: string
  created_at: string
}

export interface Conversation {
  id: string
  user_id: string
  title?: string
  pinned: boolean
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
  article_suggestion?: {
    slug: string
    title: string
    excerpt: string
    readTime: string
    category: string
  }
  created_at: string
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: string
  category?: 'Burnout' | 'Imposter Syndrome' | 'Deep Work' | 'Anxiety' | 'Motivation'
  tags?: string[]
  read_time?: number
  created_at: string
}
