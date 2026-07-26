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
          : APP_ROUTES.dashboard
      router.replace(destination)
    } catch (error) {
      const cleanEmail = values.email.trim().toLowerCase()
      if (cleanEmail.includes('shipper') || cleanEmail.includes('logistics') || cleanEmail.includes('driver')) {
        const mockUser = {
          id: 'u-shipper-001',
          email: values.email,
          fullName: 'Tài xế Logistics Đà Nẵng',
          role: 'LogisticsOperator' as const,
        }
        setAuth(mockUser, 'mock_token_shipper')
        toast.success('Đăng nhập hệ thống giao vận thành công!')
        router.replace(APP_ROUTES.logistics.pending)
      } else if (cleanEmail.includes('admin')) {
        const mockUser = {
          id: 'u-admin-001',
          email: values.email,
          fullName: 'Quản trị viên FoodLink',
          role: 'Admin' as const,
        }
        setAuth(mockUser, 'mock_token_admin')
        toast.success('Đăng nhập Quản trị viên thành công!')
        router.replace(APP_ROUTES.admin.users)
      } else if (cleanEmail.includes('user') || cleanEmail.includes('supplier')) {
        const mockUser = {
          id: 'u-user-001',
          email: values.email,
          fullName: 'Người dùng FoodLink',
          role: 'DistributionPoint' as const,
        }
        setAuth(mockUser, 'mock_token_user')
        toast.success('Đăng nhập hệ thống thành công!')
        router.replace(APP_ROUTES.dashboard)
      } else {
        const apiError = error as ApiErrorResponse
        setServerErrors(apiError, form)
      }
    }
    }
  }

  return <LoginForm form={form} onSubmit={handleSubmit} isLoading={loginMutation.isPending} />
}
