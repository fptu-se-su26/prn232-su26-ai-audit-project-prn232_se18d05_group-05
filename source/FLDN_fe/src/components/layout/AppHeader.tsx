'use client'

import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { toast } from 'sonner'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { APP_ROUTES } from '@/routes/app-routes'
import { useAuthStore } from '@/stores/auth.store'

export function AppHeader() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  function handleLogout() {
    clearAuth()
    toast.success('Đã đăng xuất')
    router.replace(APP_ROUTES.auth.login)
  }

  return (
    <header className="sticky top-0 z-10 flex h-12 shrink-0 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" aria-label="Toggle sidebar" />
        <Separator orientation="vertical" className="mr-1 h-4" />
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">{user.fullName || user.email}</span>
          </div>
        )}
        <Separator orientation="vertical" className="h-4" />
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleLogout}
          aria-label="Đăng xuất"
          className="text-muted-foreground hover:text-destructive"
        >
          <LogOut className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </header>
  )
}
