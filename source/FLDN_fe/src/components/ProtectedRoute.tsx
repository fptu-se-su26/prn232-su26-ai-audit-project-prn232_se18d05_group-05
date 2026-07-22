'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { UserRole } from '@/config/roles'
import { APP_ROUTES } from '@/routes/app-routes'
import { useAuthStore } from '@/stores/auth.store'

interface ProtectedRouteProps {
  readonly children: React.ReactNode
  readonly allowedRoles?: UserRole[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      setHasHydrated(true)
      return
    }
    return useAuthStore.persist.onFinishHydration(() => setHasHydrated(true))
  }, [])

  useEffect(() => {
    if (!hasHydrated) return
    if (!user) { router.replace(APP_ROUTES.auth.login); return }
    if (allowedRoles && !allowedRoles.includes(user.role)) router.replace(APP_ROUTES.unauthorized)
  }, [hasHydrated, user, router, allowedRoles])

  if (!hasHydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    )
  }

  if (!user) return null
  if (allowedRoles && !allowedRoles.includes(user.role)) return null
  return <>{children}</>
}
