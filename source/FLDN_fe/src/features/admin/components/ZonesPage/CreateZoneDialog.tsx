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
import { useCreateZoneMutation, useDistrictsQuery } from '../../hooks/use-admin'

const schema = z.object({
  districtId:  z.string().min(1, 'Chọn quận/huyện'),
  zoneName:    z.string().min(1, 'Nhập tên vùng'),
  description: z.string().optional(),
  shippingFee: z.coerce.number().min(0, 'Phí không âm'),
})
type FormValues = z.infer<typeof schema>

interface CreateZoneDialogProps {
  readonly open: boolean
  readonly onClose: () => void
}

export function CreateZoneDialog({ open, onClose }: CreateZoneDialogProps) {
  const { data: districtsData } = useDistrictsQuery()
  const districts = districtsData?.data ?? []
  const mutation = useCreateZoneMutation()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { districtId: '', zoneName: '', description: '', shippingFee: 0 },
  })

  useEffect(() => {
    if (!open) form.reset()
  }, [open, form])

  function onSubmit(values: FormValues) {
    mutation.mutate(
      { ...values, description: values.description || undefined },
      { onSuccess: onClose },
    )
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo vùng giao hàng</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="districtId">Quận/Huyện *</Label>
            <select
              id="districtId"
              {...form.register('districtId')}
              className="w-full h-9 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">-- Chọn quận/huyện --</option>
              {districts.map((d) => (
                <option key={d.districtId} value={d.districtId}>{d.name} ({d.code})</option>
              ))}
            </select>
            {form.formState.errors.districtId && (
              <p className="text-xs text-destructive">{form.formState.errors.districtId.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="zoneName">Tên vùng *</Label>
            <Input id="zoneName" {...form.register('zoneName')} placeholder="Ví dụ: Quận 1 - Nội thành" />
            {form.formState.errors.zoneName && (
              <p className="text-xs text-destructive">{form.formState.errors.zoneName.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Mô tả</Label>
            <Input id="description" {...form.register('description')} placeholder="Mô tả thêm (tùy chọn)" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="shippingFee">Phí vận chuyển (VNĐ) *</Label>
            <Input id="shippingFee" type="number" min={0} step={1000} {...form.register('shippingFee')} />
            {form.formState.errors.shippingFee && (
              <p className="text-xs text-destructive">{form.formState.errors.shippingFee.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Đang tạo...' : 'Tạo vùng'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
