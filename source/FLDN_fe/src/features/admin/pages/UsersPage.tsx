'use client'

import { useUsersQuery } from '../hooks/use-admin'
import { UsersTable } from '../components/UsersPage'

export function UsersPage() {
  const { data, isPending, isError } = useUsersQuery()

  if (isPending) return <p className="text-muted-foreground text-sm">Đang tải...</p>
  if (isError) return <p className="text-destructive text-sm">Không thể tải danh sách người dùng.</p>

  const users = data?.data?.items ?? []

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Quản lý người dùng</h1>
      {users.length === 0 ? (
        <p className="text-muted-foreground text-sm">Không có người dùng nào.</p>
      ) : (
        <UsersTable users={users} />
      )}
    </div>
  )
}
