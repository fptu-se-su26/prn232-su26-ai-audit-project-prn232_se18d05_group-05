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
  unauthorized: '/unauthorized',
  admin: {
    dashboard:  '/admin',
    users:      '/admin/users',
    suppliers:  '/admin/suppliers',
    categories: '/admin/categories',
    logistics:  '/admin/logistics',
    zones:      '/admin/zones',
  },
} as const
