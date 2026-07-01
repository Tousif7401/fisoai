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

      // Prioritize GitHub avatar_url over Google picture
      const avatarUrl = data.user.user_metadata.avatar_url || data.user.user_metadata.picture || null

      // Create or update user profile with OAuth metadata
      const profileData = {
        id: data.user.id,
        full_name: data.user.user_metadata.full_name || data.user.user_metadata.name || data.user.user_metadata.user_name,
        avatar_url: avatarUrl,
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
