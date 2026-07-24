'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useApproveSupplierMutation } from '../../hooks/use-admin'
import type { SupplierListResponse, SupplierStatus } from '../../types/admin.types'

const STATUS_CONFIG: Record<SupplierStatus, { label: string; className: string }> = {
  Pending:  { label: 'Chờ duyệt', className: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' },
  Approved: { label: 'Đã duyệt',  className: 'bg-green-50 text-green-700 ring-1 ring-green-200' },
  Rejected: { label: 'Từ chối',   className: 'bg-red-50 text-red-700 ring-1 ring-red-200' },
}

interface SuppliersTableProps {
  readonly suppliers: SupplierListResponse[]
  readonly onReject: (id: string) => void
  readonly onViewDetail: (id: string) => void
}

export function SuppliersTable({ suppliers, onReject, onViewDetail }: SuppliersTableProps) {
  const approveMutation = useApproveSupplierMutation()
  const [pendingId, setPendingId] = useState<string | null>(null)

  function handleApprove(id: string) {
    setPendingId(id)
    approveMutation.mutate(id, { onSettled: () => setPendingId(null) })
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="py-3 font-semibold">Doanh nghiệp</TableHead>
            <TableHead className="py-3 font-semibold">Trạng thái</TableHead>
            <TableHead className="py-3 font-semibold">Ngày đăng ký</TableHead>
            <TableHead className="py-3 w-[120px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((s) => {
            const status = STATUS_CONFIG[s.status]
            return (
              <TableRow key={s.supplierId} className="hover:bg-muted/30 transition-colors">
                <TableCell className="py-3.5">
                  <p className="font-medium text-sm leading-tight">{s.businessName}</p>
                  {s.taxCode && (
                    <p className="text-xs text-muted-foreground mt-0.5">MST: {s.taxCode}</p>
                  )}
                </TableCell>
                <TableCell className="py-3.5">
                  <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', status.className)}>
                    {status.label}
                  </span>
                </TableCell>
                <TableCell className="py-3.5 text-sm text-muted-foreground">
                  {new Date(s.createdAt).toLocaleDateString('vi-VN')}
                </TableCell>
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onViewDetail(s.supplierId)}
                      aria-label="Xem chi tiết"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Eye className="size-4" />
                    </Button>
                    {s.status === 'Pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          disabled={pendingId === s.supplierId}
                          onClick={() => handleApprove(s.supplierId)}
                          aria-label="Phê duyệt"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <CheckCircle className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          disabled={pendingId === s.supplierId}
                          onClick={() => onReject(s.supplierId)}
                          aria-label="Từ chối"
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="size-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
