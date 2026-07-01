import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Delete user's profile data
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', user.id)

    if (profileError) {
      console.error('Error deleting profile:', profileError)
    }

    // Delete user's avatar files from storage
    const { data: files } = await supabase.storage
      .from('avatars')
      .list(`${user.id}`)

    if (files && files.length > 0) {
      const filePaths = files.map(file => `${user.id}/${file.name}`)
      await supabase.storage
        .from('avatars')
        .remove(filePaths)
    }

    // Sign out the user first
    await supabase.auth.signOut()

    // Note: Actual user deletion requires service role key
    // For now, we'll clear the session and data
    // To fully delete the auth user, you'd need to call the admin API from a server action
    // with the service role key

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Delete account error:', error)
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    )
  }
}
