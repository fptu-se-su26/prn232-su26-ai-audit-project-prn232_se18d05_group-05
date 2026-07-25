'use client'

import { useForm } from 'react-hook-form'
import { safeZodResolver } from '@/lib/zod-resolver'
import { toast } from 'sonner'
import type { ApiErrorResponse } from '@/types/api'
import { useForgotPasswordMutation } from '../hooks/use-auth'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../schemas/forgot-password.schema'
import { ForgotPasswordForm } from '../components/ForgotPasswordPage'
import { setServerErrors } from '../utils/set-server-errors'

export function ForgotPasswordPage() {
  const forgotPasswordMutation = useForgotPasswordMutation()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: safeZodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })

  async function handleSubmit(values: ForgotPasswordFormValues) {
    try {
      await forgotPasswordMutation.mutateAsync(values)
      toast.success('Đã gửi email đặt lại mật khẩu!')
    } catch (error) {
      const apiError = error as ApiErrorResponse
      const hadFieldErrors = setServerErrors(apiError, form)
      if (!hadFieldErrors) {
        toast.error(apiError.message ?? 'Không thể gửi email đặt lại mật khẩu.')
      }
    }
  }

  return (
    <ForgotPasswordForm
      form={form}
      onSubmit={handleSubmit}
      isLoading={forgotPasswordMutation.isPending}
      isSuccess={forgotPasswordMutation.isSuccess}
    />
  )
}
