// Database types for Calmify

export interface Profile {
  id: string
  full_name?: string
  avatar_url?: string
  created_at: string
}

export interface Conversation {
  id: string
  user_id: string
  title?: string
  mood?: 'Low' | 'Anxious' | 'Okay' | 'Good' | 'Great'
  created_at: string
}

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
  created_at: string
}

export interface MoodCheckIn {
  id: string
  user_id: string
  mood: 'Low' | 'Anxious' | 'Okay' | 'Good' | 'Great'
  note?: string
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
