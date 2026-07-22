'use client'

import { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useApproveSupplierMutation, useRejectSupplierMutation } from '../../hooks/use-admin'
import type { SupplierListResponse, SupplierStatus } from '../../types/admin.types'

const STATUS_LABEL: Record<SupplierStatus, string> = {
  Pending: 'Chờ duyệt',
  Approved: 'Đã duyệt',
  Rejected: 'Từ chối',
}

const STATUS_VARIANT: Record<SupplierStatus, 'default' | 'secondary' | 'destructive'> = {
  Pending: 'secondary',
  Approved: 'default',
  Rejected: 'destructive',
}

interface SuppliersTableProps {
  readonly suppliers: SupplierListResponse[]
}

export function SuppliersTable({ suppliers }: SuppliersTableProps) {
  const approveMutation = useApproveSupplierMutation()
  const rejectMutation = useRejectSupplierMutation()
  const [pendingId, setPendingId] = useState<string | null>(null)

  function handleApprove(id: string) {
    setPendingId(id)
    approveMutation.mutate(id, { onSettled: () => setPendingId(null) })
  }

  function handleReject(id: string) {
    setPendingId(id)
    rejectMutation.mutate({ id, body: { reason: 'Không đáp ứng yêu cầu' } }, { onSettled: () => setPendingId(null) })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên doanh nghiệp</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Ngày tạo</TableHead>
          <TableHead className="w-[120px]" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers.map((s) => (
          <TableRow key={s.supplierId}>
            <TableCell className="font-medium">{s.businessName}</TableCell>
            <TableCell>
              <Badge variant={STATUS_VARIANT[s.status]}>{STATUS_LABEL[s.status]}</Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {new Date(s.createdAt).toLocaleDateString('vi-VN')}
            </TableCell>
            <TableCell>
              {s.status === 'Pending' && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={pendingId === s.supplierId}
                    onClick={() => handleApprove(s.supplierId)}
                    aria-label="Phê duyệt"
                  >
                    <CheckCircle className="size-4 text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={pendingId === s.supplierId}
                    onClick={() => handleReject(s.supplierId)}
                    aria-label="Từ chối"
                  >
                    <XCircle className="size-4 text-destructive" />
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
