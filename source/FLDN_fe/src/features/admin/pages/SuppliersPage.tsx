'use client'

import { useSuppliersQuery } from '../hooks/use-admin'
import { SuppliersTable } from '../components/SuppliersPage'

export function SuppliersPage() {
  const { data, isPending, isError } = useSuppliersQuery()

  if (isPending) return <p className="text-muted-foreground text-sm">Đang tải...</p>
  if (isError) return <p className="text-destructive text-sm">Không thể tải danh sách nhà cung cấp.</p>

  const suppliers = data?.data?.items ?? []

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Quản lý nhà cung cấp</h1>
      {suppliers.length === 0 ? (
        <p className="text-muted-foreground text-sm">Không có nhà cung cấp nào.</p>
      ) : (
        <SuppliersTable suppliers={suppliers} />
      )}
    </div>
  )
}
