'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Boxes,
  ChevronRight,
  LogOut,
  ShieldCheck,
  Sparkles,
  User,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NAV_CONFIG } from '@/config/nav-config'
import { useAuthStore } from '@/stores/auth.store'

export function AppSidebar() {
  const user = useAuthStore((state) => state.user)
  const pathname = usePathname()
  const navItems = user?.role ? (NAV_CONFIG[user.role] ?? []) : []

  const isActive = (href: string) => {
    if (pathname === href) return true
    if (href === '/dashboard' || href === '/admin') return false
    if (!pathname.startsWith(href)) return false
    // Prevent /orders matching when /orders/create is the active item
    return !navItems.some(item => item.href !== href && item.href.startsWith(href) && pathname.startsWith(item.href))
  }

  const userInitial = user?.fullName ? user.fullName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'N'

  return (
    <Sidebar collapsible="offcanvas" className="border-r border-slate-200/80 bg-white/95 font-sans">
      {/* Brand Header with Original Project Logo */}
      <SidebarHeader className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white p-1 shadow-md border border-emerald-100">
            <img src="/logo.png" alt="FoodLink Đà Nẵng" className="size-full object-contain" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-black tracking-tight text-slate-900">
                FoodLink
              </p>
              <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[9px] font-black uppercase text-emerald-900">
                Đà Nẵng
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-400 mt-0.5 flex items-center gap-1">
              <ShieldCheck className="size-3 text-emerald-600" />
              Nông sản VietGAP
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Main Navigation Menu */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {navItems.map((item) => {
                const active = isActive(item.href)
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={`group relative flex w-full items-center justify-between rounded-2xl px-4 py-3 text-xs font-bold transition-all duration-200 cursor-pointer ${
                        active
                          ? 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-md shadow-emerald-950/20 font-black'
                          : 'text-slate-600 hover:bg-emerald-50/80 hover:text-emerald-950 hover:translate-x-0.5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-8 items-center justify-center rounded-xl transition-all ${
                            active
                              ? 'bg-white/15 text-emerald-300'
                              : 'bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                          }`}
                        >
                          <Icon className="size-4 shrink-0" />
                        </div>
                        <span className="tracking-tight">{item.label}</span>
                      </div>

                      {active && (
                        <div className="size-1.5 rounded-full bg-emerald-400 shadow-sm animate-pulse" />
                      )}
                    </Link>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Footer Profile Card */}
      <SidebarFooter className="border-t border-slate-100 p-4">
        <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/80 p-3 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-700 to-teal-900 font-mono text-sm font-black text-white shadow-sm">
              {userInitial}
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-extrabold text-slate-900">
                {user?.fullName || 'Nguyễn Văn Nhà Cung Cấp'}
              </p>
              <p className="truncate text-[10px] font-bold text-emerald-800 mt-0.5">
                Nhà Cung Cấp • Active
              </p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
