'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getUser, signOut } from '@/lib/supabase/auth'
import type { User } from '@supabase/supabase-js'
import { motion, AnimatePresence } from 'framer-motion'
import { User as UserIcon, LogOut } from 'lucide-react'

export function UserMenu() {
  const [user, setUser] = useState<User | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const loadUser = async () => {
      const { user } = await getUser()
      setUser(user)
    }
    loadUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const { error } = await signOut()
    if (!error) {
      window.location.href = '/'
    }
  }

  if (!user) {
    return (
      <a
        href="/login"
        className="px-4 py-2 rounded-full text-sm font-medium border hover:bg-[#DEDBC8]/10 transition-colors"
        style={{ borderColor: 'rgba(222, 219, 200, 0.2)', color: '#E1E0CC' }}
      >
        Sign In
      </a>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border hover:bg-[#DEDBC8]/10 transition-colors"
        style={{ borderColor: 'rgba(222, 219, 200, 0.2)' }}
      >
        <div className="w-8 h-8 rounded-full bg-[#DEDBC8]/20 flex items-center justify-center">
          <UserIcon className="w-4 h-4 text-[#E1E0CC]" />
        </div>
        <span className="text-sm text-[#E1E0CC]">
          {user.email?.split('@')[0]}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 rounded-xl border shadow-xl overflow-hidden z-50"
            style={{
              background: 'rgba(16, 16, 16, 0.95)',
              borderColor: 'rgba(222, 219, 200, 0.1)',
            }}
          >
            <div className="p-3 border-b" style={{ borderColor: 'rgba(222, 219, 200, 0.1)' }}>
              <p className="text-xs text-[#DEDBC8]/60">Signed in as</p>
              <p className="text-sm text-[#E1E0CC] truncate">{user.email}</p>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#DEDBC8] hover:bg-[#DEDBC8]/10 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
