import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthUser } from '@/features/auth/types/auth.types'

interface AuthState {
  user: AuthUser | null
  setAuth: (user: AuthUser, accessToken: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setAuth: (user, accessToken) => {
        localStorage.setItem('access_token', accessToken)
        set({ user })
      },
      clearAuth: () => {
        localStorage.removeItem('access_token')
        set({ user: null })
      },
    }),
    { name: 'auth', partialize: (state) => ({ user: state.user }) }
  )
)
