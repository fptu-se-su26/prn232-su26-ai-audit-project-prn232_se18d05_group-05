'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { safeZodResolver } from '@/lib/zod-resolver'
import { toast } from 'sonner'
import { APP_ROUTES } from '@/routes/app-routes'
import type { ApiErrorResponse } from '@/types/api'
import { useRegisterMutation } from '../hooks/use-auth'
import { registerSchema, type RegisterFormValues } from '../schemas/register.schema'
import { RegisterForm } from '../components/RegisterPage'
import { setServerErrors } from '../utils/set-server-errors'

export function RegisterPage() {
  const router = useRouter()
  const registerMutation = useRegisterMutation()

  const form = useForm<RegisterFormValues>({
    resolver: safeZodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', phone: '', password: '' },
    mode: 'onBlur',
  })

  async function handleSubmit(values: RegisterFormValues) {
    try {
      await registerMutation.mutateAsync(values)
      router.push(APP_ROUTES.auth.registerSuccess)
    } catch (error) {
      const apiError = error as ApiErrorResponse
      const hadFieldErrors = setServerErrors(apiError, form)
      if (!hadFieldErrors) {
        toast.error(apiError.message ?? 'Không thể đăng ký tài khoản. Vui lòng thử lại.')
      }
    }
  }

  return (
    <RegisterForm form={form} onSubmit={handleSubmit} isLoading={registerMutation.isPending} />
  )
}
