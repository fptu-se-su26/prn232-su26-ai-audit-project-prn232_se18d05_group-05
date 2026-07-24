'use client'

import { useState } from 'react'
import { useSuppliersQuery } from '../hooks/use-admin'
import { SuppliersTable, RejectSupplierDialog, SupplierDetailSheet } from '../components/SuppliersPage'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import type { SupplierStatus } from '../types/admin.types'

export function SuppliersPage() {
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<SupplierStatus | ''>('')
  const [rejectId, setRejectId] = useState<string | null>(null)
  const [detailId, setDetailId] = useState<string | null>(null)

  const params = { page, pageSize: 10, status: status || undefined }
  const { data, isPending, isError } = useSuppliersQuery(params)

  if (isPending) return <p className="text-muted-foreground text-sm">Đang tải...</p>
  if (isError) return <p className="text-destructive text-sm">Không thể tải danh sách nhà cung cấp.</p>

  const suppliers = data?.data?.items ?? []
  const totalPages = data?.data?.totalPages ?? 1

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Quản lý nhà cung cấp</h1>
        <NativeSelect
          value={status}
          onChange={(e) => { setStatus(e.target.value as SupplierStatus | ''); setPage(1) }}
        >
          <NativeSelectOption value="">Tất cả trạng thái</NativeSelectOption>
          <NativeSelectOption value="Pending">Chờ duyệt</NativeSelectOption>
          <NativeSelectOption value="Approved">Đã duyệt</NativeSelectOption>
          <NativeSelectOption value="Rejected">Từ chối</NativeSelectOption>
        </NativeSelect>
      </div>

      {suppliers.length === 0 ? (
        <p className="text-muted-foreground text-sm">Không có nhà cung cấp nào.</p>
      ) : (
        <SuppliersTable
          suppliers={suppliers}
          onReject={setRejectId}
          onViewDetail={setDetailId}
        />
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

      <RejectSupplierDialog supplierId={rejectId} onClose={() => setRejectId(null)} />
      <SupplierDetailSheet supplierId={detailId} onClose={() => setDetailId(null)} />
    </div>
  )
}
