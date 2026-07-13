import { createClient } from './client'
import type { Profile } from './types'

export async function signUp(email: string, password: string, next?: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (!error && data.user) {
    // Return success so caller can handle redirect
    return { data, error: null, redirectTo: next || '/chat' }
  }

  return { data, error }
}

export async function signIn(email: string, password: string, next?: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (!error && data.user) {
    // Return success so caller can handle redirect
    return { data, error: null, redirectTo: next || '/chat' }
  }

  return { data, error }
}

export async function signInWithOAuth(provider: 'github' | 'google', next?: string) {
  const supabase = createClient()

  // scopes for GitHub to get user profile info including avatar
  const githubScopes = 'read:user,user:email'

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      // Always redirect to /chat after login, unless next is specified
      redirectTo: `${window.location.origin}/auth/callback?next=${next || '/chat'}`,
      scopes: provider === 'github' ? githubScopes : undefined,
    },
  })
  return { data, error }
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getUser() {
  const supabase = createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return data || null
}

export async function createProfile(userId: string, metadata?: { full_name?: string; avatar_url?: string }) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      full_name: metadata?.full_name,
      avatar_url: metadata?.avatar_url,
    })

  return { data, error }
}
