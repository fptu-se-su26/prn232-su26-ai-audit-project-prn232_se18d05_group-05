'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { APP_ROUTES } from '@/routes/app-routes'
import { useAuthStore } from '@/stores/auth.store'
import { useLoginMutation } from '../hooks/use-auth'
import { loginSchema, type LoginFormValues } from '../schemas/login.schema'
import { decodeJwtUser } from '../utils/decode-jwt-user'
import { LoginForm } from '../components/LoginPage'

export function LoginPage() {
  const router = useRouter()
  const setAuth = useAuthStore((state) => state.setAuth)
  const loginMutation = useLoginMutation()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
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
      router.replace(APP_ROUTES.dashboard)
    } catch (error) {
      console.error(error)
      // useLoginMutation.onError already shows toast
    }
  }

  return <LoginForm form={form} onSubmit={handleSubmit} isLoading={loginMutation.isPending} />
}
