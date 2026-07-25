'use client'

import { useRouter } from 'next/navigation'
import { LogOut, ShieldCheck, User } from 'lucide-react'
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
    toast.success('Đã đăng xuất thành công khỏi hệ thống!')
    router.replace(APP_ROUTES.auth.login)
  }

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/90 px-5 backdrop-blur-md font-sans">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1 rounded-xl hover:bg-emerald-50 text-slate-600 hover:text-emerald-950 transition-colors" aria-label="Toggle sidebar" />
        <Separator orientation="vertical" className="h-5 bg-slate-200" />
        <div className="hidden items-center gap-2 md:flex">
          <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-600">
            Hệ thống Quản lý Nguồn cung Thực phẩm TP. Đà Nẵng (FoodLink B2B)
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-1.5 shadow-2xs">
            <div className="flex size-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
              <User className="size-3.5" aria-hidden="true" />
            </div>
            <span className="text-xs font-extrabold text-slate-800">
              {user.fullName || user.email || 'Nhà Cung Cấp'}
            </span>
          </div>
        )}

        <Separator orientation="vertical" className="h-5 bg-slate-200" />

        <button
          onClick={handleLogout}
          aria-label="Đăng xuất"
          className="inline-flex items-center gap-1.5 rounded-xl border border-rose-100 bg-rose-50/60 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-all active:scale-95 cursor-pointer"
          title="Đăng xuất khỏi tài khoản"
        >
          <LogOut className="size-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Đăng xuất</span>
        </button>
      </div>
    </header>
  )
}
