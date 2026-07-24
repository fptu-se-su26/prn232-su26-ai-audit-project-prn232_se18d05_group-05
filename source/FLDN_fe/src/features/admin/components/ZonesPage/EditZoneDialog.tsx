'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import { useUpdateZoneMutation } from '../../hooks/use-admin'
import type { DistributionZoneResponse } from '../../types/admin.types'

const schema = z.object({
  zoneName:    z.string().min(1, 'Nhập tên vùng'),
  description: z.string().optional(),
  shippingFee: z.coerce.number().min(0, 'Phí không âm'),
  isActive:    z.boolean(),
})
type FormValues = z.infer<typeof schema>

interface EditZoneDialogProps {
  readonly zone: DistributionZoneResponse | null
  readonly onClose: () => void
}

export function EditZoneDialog({ zone, onClose }: EditZoneDialogProps) {
  const mutation = useUpdateZoneMutation()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { zoneName: '', description: '', shippingFee: 0, isActive: true },
  })

  useEffect(() => {
    if (zone) {
      form.reset({
        zoneName:    zone.zoneName,
        description: zone.description ?? '',
        shippingFee: zone.shippingFee,
        isActive:    zone.isActive,
      })
    }
  }, [zone, form])

  function onSubmit(values: FormValues) {
    if (!zone) return
    mutation.mutate(
      { id: zone.zoneId, body: { ...values, description: values.description || undefined } },
      { onSuccess: onClose },
    )
  }

  return (
    <Dialog open={Boolean(zone)} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa vùng giao hàng</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="edit-zoneName">Tên vùng *</Label>
            <Input id="edit-zoneName" {...form.register('zoneName')} />
            {form.formState.errors.zoneName && (
              <p className="text-xs text-destructive">{form.formState.errors.zoneName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-description">Mô tả</Label>
            <Input id="edit-description" {...form.register('description')} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-shippingFee">Phí vận chuyển (VNĐ) *</Label>
            <Input id="edit-shippingFee" type="number" min={0} step={1000} {...form.register('shippingFee')} />
            {form.formState.errors.shippingFee && (
              <p className="text-xs text-destructive">{form.formState.errors.shippingFee.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              id="edit-isActive"
              type="checkbox"
              {...form.register('isActive')}
              className="rounded border"
            />
            <Label htmlFor="edit-isActive">Đang hoạt động</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
