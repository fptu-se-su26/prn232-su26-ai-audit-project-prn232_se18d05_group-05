'use client'

import { useState } from 'react'
import { Eye, Power, PowerOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useActivateOperatorMutation, useDeactivateOperatorMutation } from '../../hooks/use-admin'
import type { LogisticsListResponse, LogisticsOperatorStatus } from '../../types/admin.types'

const STATUS_CONFIG: Record<LogisticsOperatorStatus, { label: string; className: string }> = {
  Available: { label: 'Hoạt động',   className: 'bg-green-50 text-green-700 ring-1 ring-green-200' },
  InTransit: { label: 'Đang giao',   className: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' },
  Off:       { label: 'Không hoạt động', className: 'bg-muted text-muted-foreground ring-1 ring-border' },
}

interface LogisticsTableProps {
  readonly operators: LogisticsListResponse[]
  readonly onViewDetail: (id: string) => void
}

export function LogisticsTable({ operators, onViewDetail }: LogisticsTableProps) {
  const activateMutation   = useActivateOperatorMutation()
  const deactivateMutation = useDeactivateOperatorMutation()
  const [pendingId, setPendingId] = useState<string | null>(null)

  function handleToggle(op: LogisticsListResponse) {
    setPendingId(op.logisticsId)
    const mutation = op.status === 'Available' ? deactivateMutation : activateMutation
    mutation.mutate(op.logisticsId, { onSettled: () => setPendingId(null) })
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="py-3 font-semibold">Tài xế</TableHead>
            <TableHead className="py-3 font-semibold">Phương tiện</TableHead>
            <TableHead className="py-3 font-semibold">Trạng thái</TableHead>
            <TableHead className="py-3 font-semibold">Chuyến đã giao</TableHead>
            <TableHead className="py-3 font-semibold">Ngày đăng ký</TableHead>
            <TableHead className="py-3 w-[100px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {operators.map((op) => {
            const status = STATUS_CONFIG[op.status]
            return (
              <TableRow key={op.logisticsId} className="hover:bg-muted/30 transition-colors">
                <TableCell className="py-3.5">
                  <p className="font-medium text-sm leading-tight">{op.fullName}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{op.email}</p>
                  {op.phone && <p className="text-xs text-muted-foreground">{op.phone}</p>}
                </TableCell>
                <TableCell className="py-3.5 text-sm">
                  {op.vehicleType && <p className="font-medium">{op.vehicleType}</p>}
                  {op.licensePlate && <p className="text-xs text-muted-foreground mt-0.5">{op.licensePlate}</p>}
                  {!op.vehicleType && !op.licensePlate && <span className="text-muted-foreground">—</span>}
                </TableCell>
                <TableCell className="py-3.5">
                  <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', status.className)}>
                    {status.label}
                  </span>
                </TableCell>
                <TableCell className="py-3.5 text-sm tabular-nums">{op.totalShipments}</TableCell>
                <TableCell className="py-3.5 text-sm text-muted-foreground">
                  {new Date(op.createdAt).toLocaleDateString('vi-VN')}
                </TableCell>
                <TableCell className="py-3.5">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => onViewDetail(op.logisticsId)}
                      aria-label="Xem chi tiết"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      disabled={pendingId === op.logisticsId}
                      onClick={() => handleToggle(op)}
                      aria-label={op.status === 'Available' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                      className={op.status === 'Available'
                        ? 'text-red-500 hover:text-red-600 hover:bg-red-50'
                        : 'text-green-600 hover:text-green-700 hover:bg-green-50'}
                    >
                      {op.status === 'Available'
                        ? <PowerOff className="size-4" />
                        : <Power className="size-4" />}
                    </Button>
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
