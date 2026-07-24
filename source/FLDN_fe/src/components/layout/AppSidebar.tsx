'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Truck } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NAV_CONFIG } from '@/config/nav-config'
import { useAuthStore } from '@/stores/auth.store'

export function AppSidebar() {
  const user = useAuthStore((state) => state.user)
  const pathname = usePathname()
  const navItems = user?.role ? (NAV_CONFIG[user.role] ?? []) : []

  const isActive = (href: string) =>
    pathname === href || (href !== '/dashboard' && href !== '/admin' && pathname.startsWith(href))

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative flex size-9 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-sm border border-emerald-100">
            <img src="/logo.png" alt="FoodLink Đà Nẵng" className="size-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="text-sidebar-foreground text-[13px] font-bold leading-tight tracking-wider text-emerald-700">
              FoodLink
            </p>
            <p className="text-sidebar-foreground/70 text-[11px] font-semibold leading-tight">
              Đà Nẵng
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={item.label}
                      className="rounded-md"
                      render={
                        <Link href={item.href} aria-current={active ? 'page' : undefined} />
                      }
                    >
                      <item.icon aria-hidden="true" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
