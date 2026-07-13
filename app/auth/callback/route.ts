import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Default to /chat after successful login
  const next = searchParams.get('next') ?? '/chat'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error && data.user) {
      // Debug: Log user metadata
      console.log('User metadata:', data.user.user_metadata)

      // Check if profile already exists (including email field)
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('avatar_url, avatar_id, email')
        .eq('id', data.user.id)
        .single()

      // Prioritize GitHub avatar_url over Google picture
      const avatarUrl = data.user.user_metadata.avatar_url || data.user.user_metadata.picture || null

      // Get email from Supabase auth user (available for both Google and GitHub)
      // GitHub users may have null email if they didn't make it public
      const userEmail = data.user.email || null

      // Create or update user profile with OAuth metadata
      const profileData: {
        id: string;
        full_name?: string;
        avatar_url?: string | null;
        email?: string | null;
      } = {
        id: data.user.id,
        full_name: data.user.user_metadata.full_name || data.user.user_metadata.name || data.user.user_metadata.user_name,
      }

      // Only set avatar_url if user doesn't already have an avatar (either uploaded or selected from picker)
      // This preserves user's avatar selection on subsequent logins
      if (!existingProfile || (!existingProfile.avatar_url && !existingProfile.avatar_id)) {
        profileData.avatar_url = avatarUrl
      }

      // Only set email if:
      // 1. Profile doesn't exist, OR
      // 2. Email is null (user hasn't manually set it)
      // This preserves user's manual email updates
      if (!existingProfile || !existingProfile.email) {
        profileData.email = userEmail
      }

      console.log('Saving profile data:', profileData)

      const { error: profileError } = await supabase
        .from('profiles')
        .upsert(profileData, {
          onConflict: 'id'
        })

      if (profileError) {
        console.error('Error creating profile:', profileError)
      } else {
        console.log('Profile saved successfully')
      }

      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
