'use client'

import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useDeleteZoneMutation } from '../../hooks/use-admin'
import type { DistributionZoneResponse } from '../../types/admin.types'

interface ZonesTableProps {
  readonly zones: DistributionZoneResponse[]
  readonly onEdit: (zone: DistributionZoneResponse) => void
}

export function ZonesTable({ zones, onEdit }: ZonesTableProps) {
  const deleteMutation = useDeleteZoneMutation()
  const [pendingId, setPendingId] = useState<string | null>(null)

  function handleDelete(id: string) {
    setPendingId(id)
    deleteMutation.mutate(id, { onSettled: () => setPendingId(null) })
  }

  const fmtCurrency = (n: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="py-3 font-semibold">Vùng giao hàng</TableHead>
            <TableHead className="py-3 font-semibold">Quận/Huyện</TableHead>
            <TableHead className="py-3 font-semibold">Phí vận chuyển</TableHead>
            <TableHead className="py-3 font-semibold">Trạng thái</TableHead>
            <TableHead className="py-3 w-[90px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {zones.map((z) => (
            <TableRow key={z.zoneId} className="hover:bg-muted/30 transition-colors">
              <TableCell className="py-3.5">
                <p className="font-medium text-sm leading-tight">{z.zoneName}</p>
                {z.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate max-w-xs">{z.description}</p>
                )}
              </TableCell>
              <TableCell className="py-3.5 text-sm">{z.districtName}</TableCell>
              <TableCell className="py-3.5 text-sm font-medium tabular-nums">{fmtCurrency(z.shippingFee)}</TableCell>
              <TableCell className="py-3.5">
                <span className={cn(
                  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                  z.isActive
                    ? 'bg-green-50 text-green-700 ring-1 ring-green-200'
                    : 'bg-muted text-muted-foreground ring-1 ring-border',
                )}>
                  {z.isActive ? 'Hoạt động' : 'Tắt'}
                </span>
              </TableCell>
              <TableCell className="py-3.5">
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => onEdit(z)}
                    aria-label="Chỉnh sửa"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    disabled={pendingId === z.zoneId}
                    onClick={() => handleDelete(z.zoneId)}
                    aria-label="Xóa vùng"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
