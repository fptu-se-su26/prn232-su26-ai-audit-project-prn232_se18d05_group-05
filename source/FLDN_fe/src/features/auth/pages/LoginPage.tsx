'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { safeZodResolver } from '@/lib/zod-resolver'
import { toast } from 'sonner'
import { APP_ROUTES } from '@/routes/app-routes'
import { useAuthStore } from '@/stores/auth.store'
import type { ApiErrorResponse } from '@/types/api'
import { useLoginMutation } from '../hooks/use-auth'
import { loginSchema, type LoginFormValues } from '../schemas/login.schema'
import { decodeJwtUser } from '../utils/decode-jwt-user'
import { LoginForm } from '../components/LoginPage'
import { setServerErrors } from '../utils/set-server-errors'

export function LoginPage() {
  const router = useRouter()
  const setAuth = useAuthStore((state) => state.setAuth)
  const loginMutation = useLoginMutation()

  const form = useForm<LoginFormValues>({
    resolver: safeZodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  async function handleSubmit(values: LoginFormValues) {
    try {
      const response = await loginMutation.mutateAsync(values)
      const accessToken = response.data?.accessToken?.trim()

      if (!accessToken) {
        toast.error('Phản hồi đăng nhập không hợp lệ. Vui lòng thử lại.')
        return
      }

      const user = decodeJwtUser(accessToken)
      setAuth(user, accessToken)

      const destination =
        user.role === 'Admin'
          ? APP_ROUTES.admin.users
          : user.role === 'LogisticsOperator'
            ? APP_ROUTES.logistics.pending
            : user.role === 'Supplier'
              ? APP_ROUTES.dashboard
              : APP_ROUTES.products
      router.replace(destination)
    } catch (error) {
      const apiError = error as ApiErrorResponse
      setServerErrors(apiError, form)
      const apiError = error as ApiErrorResponse
      setServerErrors(apiError, form)
    }
  }

  return <LoginForm form={form} onSubmit={handleSubmit} isLoading={loginMutation.isPending} />
}
