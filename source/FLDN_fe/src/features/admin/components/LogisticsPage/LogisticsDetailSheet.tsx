'use client'

import { Truck, CreditCard, Phone, Mail, CheckCircle2, UserCheck } from 'lucide-react'
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useLogisticsOperatorQuery } from '../../hooks/use-admin'
import type { LogisticsOperatorStatus } from '../../types/admin.types'

const STATUS_CONFIG: Record<LogisticsOperatorStatus, { label: string; className: string }> = {
  Available: { label: 'Hoạt động',       className: 'bg-green-50 text-green-700 ring-1 ring-green-200' },
  InTransit: { label: 'Đang giao hàng',  className: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' },
  Off:       { label: 'Không hoạt động', className: 'bg-muted text-muted-foreground ring-1 ring-border' },
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b last:border-0">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-medium text-right">{value || '—'}</span>
    </div>
  )
}

interface LogisticsDetailSheetProps {
  readonly operatorId: string | null
  readonly onClose: () => void
}

export function LogisticsDetailSheet({ operatorId, onClose }: LogisticsDetailSheetProps) {
  const { data, isPending } = useLogisticsOperatorQuery(operatorId ?? '')
  const op = data?.data

  return (
    <Sheet open={Boolean(operatorId)} onOpenChange={(open) => { if (!open) onClose() }}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col gap-0 p-0 overflow-y-auto">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle className="text-base">Chi tiết tài xế</SheetTitle>
        </SheetHeader>

        {isPending && (
          <div className="flex-1 flex items-center justify-center py-12">
            <p className="text-muted-foreground text-sm">Đang tải...</p>
          </div>
        )}

        {op && (
          <div className="flex-1 space-y-0 divide-y">
            {/* Header */}
            <div className="px-6 py-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Truck className="size-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-tight">{op.fullName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{op.email}</p>
                  </div>
                </div>
                <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium shrink-0', STATUS_CONFIG[op.status].className)}>
                  {STATUS_CONFIG[op.status].label}
                </span>
              </div>
            </div>

            {/* Contact & Identity */}
            <div className="px-6 py-4 space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="size-3.5 text-muted-foreground" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Thông tin liên lạc</p>
              </div>
              <InfoRow label="Điện thoại"    value={op.phone} />
              <InfoRow label="Email"         value={op.email} />
              <InfoRow label="CCCD/CMND"     value={op.identityCard} />
            </div>

            {/* Vehicle */}
            <div className="px-6 py-4 space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="size-3.5 text-muted-foreground" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Phương tiện</p>
              </div>
              <InfoRow label="Loại xe"      value={op.vehicleType} />
              <InfoRow label="Biển số xe"   value={op.licensePlate} />
            </div>

            {/* Stats */}
            <div className="px-6 py-4">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="size-3.5 text-muted-foreground" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Thống kê</p>
              </div>
              <div className="rounded-lg bg-muted/30 border p-4 text-center">
                <p className="text-3xl font-bold tabular-nums">{op.totalShipments}</p>
                <p className="text-sm text-muted-foreground mt-0.5">Chuyến đã giao</p>
              </div>
            </div>

            {/* Approval */}
            {(op.approvedByName || op.approvedAt) && (
              <div className="px-6 py-4">
                <div className="rounded-lg bg-green-50 border border-green-100 p-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <CheckCircle2 className="size-3.5 text-green-600" />
                    <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Thông tin phê duyệt</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {op.approvedByName && (
                      <div>
                        <p className="text-xs text-green-600">Duyệt bởi</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <UserCheck className="size-3 text-green-700" />
                          <p className="text-sm font-medium text-green-800">{op.approvedByName}</p>
                        </div>
                      </div>
                    )}
                    {op.approvedAt && (
                      <div>
                        <p className="text-xs text-green-600">Ngày duyệt</p>
                        <p className="text-sm font-medium text-green-800 mt-0.5">
                          {new Date(op.approvedAt).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="px-6 py-4">
              <p className="text-xs text-muted-foreground">
                Ngày đăng ký: {new Date(op.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
