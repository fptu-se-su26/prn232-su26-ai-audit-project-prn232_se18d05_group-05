import { LayoutDashboard, MapPin, Package, Search, Tag, Truck, Users } from 'lucide-react'
import type { UserRole } from './roles'
import { APP_ROUTES } from '@/routes/app-routes'

export interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

export const NAV_CONFIG: Record<UserRole, NavItem[]> = {
  Admin: [
    { label: 'Tổng quan',        href: APP_ROUTES.admin.dashboard,  icon: LayoutDashboard },
    { label: 'Người dùng',       href: APP_ROUTES.admin.users,       icon: Users },
    { label: 'Nhà cung cấp',     href: APP_ROUTES.admin.suppliers,   icon: Package },
    { label: 'Danh mục',         href: APP_ROUTES.admin.categories,  icon: Tag },
    { label: 'Tài xế logistics', href: APP_ROUTES.admin.logistics,   icon: Truck },
    { label: 'Vùng giao hàng',   href: APP_ROUTES.admin.zones,       icon: MapPin },
  ],
  Supplier: [
    { label: 'Tổng quan', href: APP_ROUTES.dashboard, icon: LayoutDashboard },
    { label: 'Tìm kiếm sản phẩm', href: APP_ROUTES.products, icon: Search },
  ],
  DistributionPoint: [
    { label: 'Tổng quan', href: APP_ROUTES.dashboard, icon: LayoutDashboard },
    { label: 'Tìm kiếm sản phẩm', href: APP_ROUTES.products, icon: Search },
  ],
  LogisticsOperator: [
    { label: 'Tổng quan', href: APP_ROUTES.dashboard, icon: LayoutDashboard },
    { label: 'Tìm kiếm sản phẩm', href: APP_ROUTES.products, icon: Search },
  ],
}
