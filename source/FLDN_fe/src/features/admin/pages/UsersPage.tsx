'use client'

import { useState } from 'react'
import { useUsersQuery } from '../hooks/use-admin'
import { UsersTable, ResetPasswordDialog } from '../components/UsersPage'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export function UsersPage() {
  const [page, setPage] = useState(1)
  const [role, setRole] = useState('')
  const [isActive, setIsActive] = useState('')
  const [resetUserId, setResetUserId] = useState<string | null>(null)

  const params = {
    page,
    pageSize: 10,
    role: role || undefined,
    isActive: isActive === '' ? undefined : isActive === 'true',
  }

  const { data, isPending, isError } = useUsersQuery(params)

  if (isPending) return <p className="text-muted-foreground text-sm">Đang tải...</p>
  if (isError) return <p className="text-destructive text-sm">Không thể tải danh sách người dùng.</p>

  const users = data?.data?.items ?? []
  const totalPages = data?.data?.totalPages ?? 1

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Quản lý người dùng</h1>
        <div className="flex gap-2">
          <NativeSelect value={role} onChange={(e) => { setRole(e.target.value); setPage(1) }}>
            <NativeSelectOption value="">Tất cả vai trò</NativeSelectOption>
            <NativeSelectOption value="Admin">Admin</NativeSelectOption>
            <NativeSelectOption value="Supplier">Nhà cung cấp</NativeSelectOption>
            <NativeSelectOption value="DistributionPoint">Điểm phân phối</NativeSelectOption>
            <NativeSelectOption value="LogisticsOperator">Vận hành logistics</NativeSelectOption>
          </NativeSelect>
          <NativeSelect value={isActive} onChange={(e) => { setIsActive(e.target.value); setPage(1) }}>
            <NativeSelectOption value="">Tất cả trạng thái</NativeSelectOption>
            <NativeSelectOption value="true">Hoạt động</NativeSelectOption>
            <NativeSelectOption value="false">Đã khóa</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>

      {users.length === 0 ? (
        <p className="text-muted-foreground text-sm">Không có người dùng nào.</p>
      ) : (
        <UsersTable users={users} onResetPassword={setResetUserId} />
      )}

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                text="Trước"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-disabled={page === 1}
                className={page === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            <PaginationItem className="text-sm px-3 flex items-center">
              {page} / {totalPages}
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                text="Sau"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-disabled={page === totalPages}
                className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <ResetPasswordDialog userId={resetUserId} onClose={() => setResetUserId(null)} />
    </div>
  )
}
