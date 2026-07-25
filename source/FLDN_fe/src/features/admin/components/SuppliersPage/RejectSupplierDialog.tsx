'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useRejectSupplierMutation } from '../../hooks/use-admin'

const schema = z.object({
  reason: z.string().min(1, 'Vui lòng nhập lý do').max(500, 'Tối đa 500 ký tự'),
})

type FormValues = z.infer<typeof schema>

interface RejectSupplierDialogProps {
  readonly supplierId: string | null
  readonly onClose: () => void
}

export function RejectSupplierDialog({ supplierId, onClose }: RejectSupplierDialogProps) {
  const mutation = useRejectSupplierMutation()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { reason: '' },
  })

  function handleSubmit(values: FormValues) {
    if (!supplierId) return
    mutation.mutate(
      { id: supplierId, body: { reason: values.reason } },
      { onSuccess: () => { form.reset(); onClose() } },
    )
  }

  function handleOpenChange(open: boolean) {
    if (!open) { form.reset(); onClose() }
  }

  return (
    <Dialog open={Boolean(supplierId)} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Từ chối hồ sơ</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="reason">Lý do từ chối <span className="text-destructive">*</span></Label>
            <Textarea id="reason" rows={3} {...form.register('reason')} />
            {form.formState.errors.reason && (
              <p className="text-destructive text-xs">{form.formState.errors.reason.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
            <Button type="submit" variant="destructive" disabled={mutation.isPending}>
              {mutation.isPending ? 'Đang xử lý...' : 'Từ chối'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
