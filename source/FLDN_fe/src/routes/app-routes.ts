export const APP_ROUTES = {
  home: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    verifyEmail: '/auth/verify-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
  },
  dashboard: '/dashboard',
  products: '/products',
  orders: {
    list: '/orders',
    create: '/orders/create',
  },
  unauthorized: '/unauthorized',
  admin: {
    dashboard:  '/admin',
    users:      '/admin/users',
    suppliers:  '/admin/suppliers',
    categories: '/admin/categories',
    logistics:  '/admin/logistics',
    zones:      '/admin/zones',
  },
  supplier: {
    products: '/supplier/products',
    supplyRequests: '/supplier/supply-requests',
    analytics: '/supplier/analytics',
  },
  logistics: {
    pending: '/logistics',
    myShipments: '/logistics/my-shipments',
    confirm: (id: string) => `/logistics/${id}/confirm`,
    pod: (id: string) => `/logistics/${id}/pod`,
  },
} as const
