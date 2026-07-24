'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Building2, FileText, MapPin, ShieldCheck,
  CheckCircle2, XCircle, Clock, UserCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { useSupplierQuery, useUpdateSupplierFeeMutation } from '../../hooks/use-admin'
import type { SupplierStatus } from '../../types/admin.types'

const STATUS_CONFIG: Record<SupplierStatus, { label: string; icon: React.ElementType; className: string }> = {
  Pending:  { label: 'Chờ duyệt', icon: Clock,         className: 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' },
  Approved: { label: 'Đã duyệt',  icon: CheckCircle2,  className: 'bg-green-50 text-green-700 ring-1 ring-green-200' },
  Rejected: { label: 'Từ chối',   icon: XCircle,       className: 'bg-red-50 text-red-700 ring-1 ring-red-200' },
}

const feeSchema = z.object({
  serviceFeeRate: z.coerce.number().min(0).max(100),
  discountRate:   z.coerce.number().min(0).max(100),
})
type FeeValues = z.infer<typeof feeSchema>

interface SupplierDetailSheetProps {
  readonly supplierId: string | null
  readonly onClose: () => void
}

function InfoRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2.5 border-b last:border-0">
      <span className="text-sm text-muted-foreground shrink-0">{label}</span>
      <span className="text-sm font-medium text-right">{value || '—'}</span>
    </div>
  )
}

export function SupplierDetailSheet({ supplierId, onClose }: SupplierDetailSheetProps) {
  const { data, isPending } = useSupplierQuery(supplierId ?? '')
  const feeMutation = useUpdateSupplierFeeMutation()
  const supplier = data?.data

  const form = useForm<FeeValues>({
    resolver: zodResolver(feeSchema),
    defaultValues: { serviceFeeRate: 0, discountRate: 0 },
  })

  useEffect(() => {
    if (supplier) {
      form.reset({ serviceFeeRate: supplier.serviceFeeRate, discountRate: supplier.discountRate })
    }
  }, [supplier, form])

  function handleFeeSubmit(values: FeeValues) {
    if (!supplierId) return
    feeMutation.mutate({ id: supplierId, body: values })
  }

  return (
    <Sheet open={Boolean(supplierId)} onOpenChange={(open) => { if (!open) onClose() }}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col gap-0 p-0 overflow-y-auto">

        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle className="text-base">Chi tiết nhà cung cấp</SheetTitle>
        </SheetHeader>

        {isPending && (
          <div className="flex-1 flex items-center justify-center py-12">
            <p className="text-muted-foreground text-sm">Đang tải...</p>
          </div>
        )}

        {supplier && (
          <div className="flex-1 space-y-0 divide-y">

            {/* Identity section */}
            <div className="px-6 py-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <Building2 className="size-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm leading-tight">{supplier.businessName}</p>
                    {supplier.taxCode && (
                      <p className="text-xs text-muted-foreground mt-0.5">MST: {supplier.taxCode}</p>
                    )}
                  </div>
                </div>
                {(() => {
                  const cfg = STATUS_CONFIG[supplier.status]
                  const Icon = cfg.icon
                  return (
                    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium shrink-0', cfg.className)}>
                      <Icon className="size-3" />
                      {cfg.label}
                    </span>
                  )
                })()}
              </div>
            </div>

            {/* Business info */}
            <div className="px-6 py-4 space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="size-3.5 text-muted-foreground" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Thông tin pháp lý</p>
              </div>
              <InfoRow label="Mã số thuế"   value={supplier.taxCode} />
              <InfoRow label="Số giấy phép" value={supplier.licenseNumber} />
              {supplier.address && (
                <div className="flex justify-between items-start gap-4 py-2.5 border-b last:border-0">
                  <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
                    <MapPin className="size-3.5" />
                    <span className="text-sm">Địa chỉ</span>
                  </div>
                  <span className="text-sm font-medium text-right">{supplier.address}</span>
                </div>
              )}
            </div>

            {/* Certificate */}
            {supplier.attpCertificateUrl && (
              <div className="px-6 py-4">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="size-3.5 text-muted-foreground" />
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Chứng nhận</p>
                </div>
                <a
                  href={supplier.attpCertificateUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary font-medium underline-offset-4 hover:underline"
                >
                  <FileText className="size-3.5" />
                  Xem chứng nhận ATTP
                </a>
              </div>
            )}

            {/* Rejection reason */}
            {supplier.status === 'Rejected' && supplier.rejectedReason && (
              <div className="px-6 py-4">
                <div className="rounded-lg bg-red-50 border border-red-100 p-4 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <XCircle className="size-3.5 text-red-600" />
                    <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">Lý do từ chối</p>
                  </div>
                  <p className="text-sm text-red-700 mt-1">{supplier.rejectedReason}</p>
                </div>
              </div>
            )}

            {/* Approval info */}
            {supplier.status === 'Approved' && (supplier.approvedByName || supplier.approvedAt) && (
              <div className="px-6 py-4">
                <div className="rounded-lg bg-green-50 border border-green-100 p-4">
                  <div className="flex items-center gap-1.5 mb-3">
                    <CheckCircle2 className="size-3.5 text-green-600" />
                    <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Thông tin phê duyệt</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {supplier.approvedByName && (
                      <div>
                        <p className="text-xs text-green-600">Duyệt bởi</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <UserCheck className="size-3 text-green-700" />
                          <p className="text-sm font-medium text-green-800">{supplier.approvedByName}</p>
                        </div>
                      </div>
                    )}
                    {supplier.approvedAt && (
                      <div>
                        <p className="text-xs text-green-600">Ngày duyệt</p>
                        <p className="text-sm font-medium text-green-800 mt-0.5">
                          {new Date(supplier.approvedAt).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Fee management */}
            <div className="px-6 py-5 space-y-4">
              <div className="flex items-center gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Biểu phí</p>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-muted-foreground text-xs">Phí dịch vụ hiện tại</p>
                    <p className="font-semibold text-lg mt-0.5">{supplier.serviceFeeRate}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Chiết khấu hiện tại</p>
                    <p className="font-semibold text-lg mt-0.5">{supplier.discountRate}%</p>
                  </div>
                </div>

                <Separator className="mb-4" />

                <form onSubmit={form.handleSubmit(handleFeeSubmit)} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label htmlFor="serviceFeeRate" className="text-xs">Phí dịch vụ (%)</Label>
                      <Input
                        id="serviceFeeRate"
                        type="number"
                        step="0.01"
                        min={0}
                        max={100}
                        className="h-8 text-sm"
                        {...form.register('serviceFeeRate')}
                      />
                      {form.formState.errors.serviceFeeRate && (
                        <p className="text-destructive text-xs">{form.formState.errors.serviceFeeRate.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="discountRate" className="text-xs">Chiết khấu (%)</Label>
                      <Input
                        id="discountRate"
                        type="number"
                        step="0.01"
                        min={0}
                        max={100}
                        className="h-8 text-sm"
                        {...form.register('discountRate')}
                      />
                      {form.formState.errors.discountRate && (
                        <p className="text-destructive text-xs">{form.formState.errors.discountRate.message}</p>
                      )}
                    </div>
                  </div>
                  <Button type="submit" disabled={feeMutation.isPending} className="w-full h-8 text-sm">
                    {feeMutation.isPending ? 'Đang lưu...' : 'Cập nhật biểu phí'}
                  </Button>
                </form>
              </div>
            </div>

          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
