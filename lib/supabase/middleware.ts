import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Debug logging (remove in production)
  console.log('Middleware - Path:', request.nextUrl.pathname)
  console.log('Middleware - User:', user ? 'Authenticated' : 'Not authenticated')

  // Protected routes that require authentication
  const protectedRoutes = ['/chat', '/profile', '/settings']

  // Check for exact path match (for /chat) or startsWith (for /profile, /settings which may have sub-routes)
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route === '/chat') {
      return request.nextUrl.pathname === '/chat'
    }
    return request.nextUrl.pathname.startsWith(route)
  })

  console.log('Middleware - Protected route:', isProtectedRoute)

  if (!user && isProtectedRoute) {
    // Redirect to login if trying to access protected route
    console.log('Middleware - Redirecting to login')
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You must avoid returning the response before auth checks
  // are complete to avoid users being able to bypass protected routes.

  return supabaseResponse
}
