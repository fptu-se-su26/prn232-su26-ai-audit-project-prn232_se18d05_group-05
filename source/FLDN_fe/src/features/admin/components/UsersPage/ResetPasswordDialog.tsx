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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useResetUserPasswordMutation } from '../../hooks/use-admin'

const schema = z.object({
  newPassword: z
    .string()
    .min(7, 'Mật khẩu ít nhất 7 ký tự')
    .regex(/[A-Z]/, 'Phải có ít nhất 1 chữ hoa')
    .regex(/[a-z]/, 'Phải có ít nhất 1 chữ thường')
    .regex(/[0-9]/, 'Phải có ít nhất 1 chữ số')
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Phải có ít nhất 1 ký tự đặc biệt'),
})

type FormValues = z.infer<typeof schema>

interface ResetPasswordDialogProps {
  readonly userId: string | null
  readonly onClose: () => void
}

export function ResetPasswordDialog({ userId, onClose }: ResetPasswordDialogProps) {
  const mutation = useResetUserPasswordMutation()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { newPassword: '' },
  })

  function handleSubmit(values: FormValues) {
    if (!userId) return
    mutation.mutate({ id: userId, body: values }, { onSuccess: () => { form.reset(); onClose() } })
  }

  function handleOpenChange(open: boolean) {
    if (!open) { form.reset(); onClose() }
  }

  return (
    <Dialog open={Boolean(userId)} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Reset mật khẩu</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="newPassword">Mật khẩu mới <span className="text-destructive">*</span></Label>
            <Input id="newPassword" type="password" {...form.register('newPassword')} />
            {form.formState.errors.newPassword && (
              <p className="text-destructive text-xs">{form.formState.errors.newPassword.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Hủy</Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Đang lưu...' : 'Xác nhận'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
