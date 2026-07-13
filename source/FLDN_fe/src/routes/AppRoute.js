import { ROLES } from '../middleware/roles'
import LoginPage from '../pages/auth/LoginPage'
import AdminDashboardPage from '../pages/dashboard/AdminDashboardPage'
import UserDashboardPage from '../pages/dashboard/UserDashboardPage'
import ShipperDashboardPage from '../pages/dashboard/ShipperDashboardPage'
import ServerErrorPage from '../pages/errors/ServerErrorPage'
import UnauthorizedPage from '../pages/errors/UnauthorizedPage'
import PortalPage from '../pages/public/PortalPage'
import RoutePath from './RoutePath'

export const publicRoutes = [
  {
    path: RoutePath.PORTAL,
    component: PortalPage,
  },
  {
    path: RoutePath.LOGIN,
    component: LoginPage,
    guestOnly: true,
  },
  {
    path: RoutePath.UNAUTHORIZED,
    component: UnauthorizedPage,
  },
  {
    path: RoutePath.SERVER_ERROR,
    component: ServerErrorPage,
  },
]

export const protectedRoutes = [
  {
    path: RoutePath.DASHBOARD,
    component: UserDashboardPage,
    roles: [ROLES.STAFF, ROLES.ADMIN],
  },
  {
    path: RoutePath.ADMIN,
    component: AdminDashboardPage,
    roles: [ROLES.ADMIN],
  },
  {
    path: RoutePath.SHIPPER_DASHBOARD,
    component: ShipperDashboardPage,
    roles: [ROLES.SHIPPER],
  },
]
