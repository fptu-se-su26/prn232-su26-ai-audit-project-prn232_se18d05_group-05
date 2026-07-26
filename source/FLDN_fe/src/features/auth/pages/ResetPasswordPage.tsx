'use client'

import { useForm } from 'react-hook-form'
import { safeZodResolver } from '@/lib/zod-resolver'
import { toast } from 'sonner'
import type { ApiErrorResponse } from '@/types/api'
import { useResetPasswordMutation } from '../hooks/use-auth'
import { resetPasswordSchema, type ResetPasswordFormValues } from '../schemas/reset-password.schema'
import { ResetPasswordForm } from '../components/ResetPasswordPage'
import { setServerErrors } from '../utils/set-server-errors'

interface ResetPasswordPageProps {
  readonly token: string | null
}

export function ResetPasswordPage({ token }: ResetPasswordPageProps) {
  const resetPasswordMutation = useResetPasswordMutation()

  const form = useForm<ResetPasswordFormValues>({
    resolver: safeZodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  })

  async function handleSubmit(values: ResetPasswordFormValues) {
    if (!token) return

    try {
      await resetPasswordMutation.mutateAsync({ token, newPassword: values.newPassword })
      toast.success('Mật khẩu đã được đặt lại thành công!')
    } catch (error) {
      const apiError = error as ApiErrorResponse
      const hadFieldErrors = setServerErrors(apiError, form)
      if (!hadFieldErrors) {
        toast.error(apiError.message ?? 'Không thể đặt lại mật khẩu.')
      }
    }
  }

  return (
    <ResetPasswordForm
      form={form}
      onSubmit={handleSubmit}
      isLoading={resetPasswordMutation.isPending}
      isSuccess={resetPasswordMutation.isSuccess}
      isInvalidToken={!token}
    />
  )
}
