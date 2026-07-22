'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/routes/app-routes'
import { useAuthStore } from '@/stores/auth.store'

export default function DashboardPage() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)

  useEffect(() => {
    if (!user) return
    if (user.role === 'Admin') router.replace(APP_ROUTES.admin.users)
    // other roles stay on /dashboard
  }, [user, router])

  return <h1 className="text-2xl font-semibold">Tổng quan</h1>
}
