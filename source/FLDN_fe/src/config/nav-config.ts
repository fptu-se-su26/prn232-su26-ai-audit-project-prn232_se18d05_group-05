import { LayoutDashboard, Package, Search, Tag, Users } from 'lucide-react'
import type { UserRole } from './roles'
import { APP_ROUTES } from '@/routes/app-routes'

export interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

export const NAV_CONFIG: Record<UserRole, NavItem[]> = {
  Admin: [
    { label: 'Tổng quan', href: APP_ROUTES.dashboard, icon: LayoutDashboard },
    { label: 'Người dùng', href: APP_ROUTES.admin.users, icon: Users },
    { label: 'Nhà cung cấp', href: APP_ROUTES.admin.suppliers, icon: Package },
    { label: 'Danh mục', href: APP_ROUTES.admin.categories, icon: Tag },
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
