import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { ApiErrorResponse, ApiResponse } from '@/types/api'
import { authService } from '../services/auth.service'
import type {
  ForgotPasswordRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
  ResetPasswordRequestDto,
} from '../types/auth.types'

function logAuthError(action: string, error: ApiErrorResponse) {
  console.warn(`[auth] ${action} failed`, error)
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: authService.login,
    onError: (error: ApiErrorResponse) => {
      logAuthError('login', error)
      toast.error(error.message ?? 'Đăng nhập thất bại. Vui lòng thử lại.')
    },
  })
}

export function useRegisterMutation() {
  return useMutation<ApiResponse<RegisterResponseDto>, ApiErrorResponse, RegisterRequestDto>({
    mutationFn: authService.register,
    onError: (error) => {
      logAuthError('register', error)
      toast.error(error.message ?? 'Không thể đăng ký tài khoản. Vui lòng thử lại.')
    },
  })
}

export function useForgotPasswordMutation() {
  return useMutation<ApiResponse<unknown>, ApiErrorResponse, ForgotPasswordRequestDto>({
    mutationFn: authService.forgotPassword,
    onError: (error) => {
      logAuthError('forgot-password', error)
      toast.error(error.message ?? 'Không thể gửi email đặt lại mật khẩu.')
    },
  })
}

export function useResetPasswordMutation() {
  return useMutation<ApiResponse<unknown>, ApiErrorResponse, ResetPasswordRequestDto>({
    mutationFn: authService.resetPassword,
    onError: (error) => {
      logAuthError('reset-password', error)
      toast.error(error.message ?? 'Không thể đặt lại mật khẩu.')
    },
  })
}

export function useLogoutMutation() {
  return useMutation<ApiResponse<unknown>, ApiErrorResponse>({
    mutationFn: authService.logout,
  })
}
