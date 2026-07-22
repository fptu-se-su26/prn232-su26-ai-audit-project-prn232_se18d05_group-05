import { ProtectedRoute } from '@/components/ProtectedRoute'

export default function AdminLayout({ children }: { readonly children: React.ReactNode }) {
  return <ProtectedRoute allowedRoles={['Admin']}>{children}</ProtectedRoute>
}
