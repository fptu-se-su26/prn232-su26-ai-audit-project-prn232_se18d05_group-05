import { api } from '@/lib/axios'
import { API_ENDPOINTS } from '@/routes/api-endpoints'
import type { ApiResponse } from '@/types/api'
import type {
  ForgotPasswordRequestDto,
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
  ResetPasswordRequestDto,
} from '../types/auth.types'

export const authService = {
  login: (body: LoginRequestDto) =>
    api
      .post<ApiResponse<LoginResponseDto>>(API_ENDPOINTS.auth.login, body)
      .then((r) => r.data),

  register: (body: RegisterRequestDto) =>
    api
      .post<ApiResponse<RegisterResponseDto>>(API_ENDPOINTS.auth.register, body)
      .then((r) => r.data),

  verifyEmail: (token: string) =>
    api
      .get<ApiResponse<string>>(API_ENDPOINTS.auth.verifyEmail, { params: { token } })
      .then((r) => r.data),

  forgotPassword: (body: ForgotPasswordRequestDto) =>
    api
      .post<ApiResponse<unknown>>(API_ENDPOINTS.auth.forgotPassword, body)
      .then((r) => r.data),

  resetPassword: (body: ResetPasswordRequestDto) =>
    api
      .post<ApiResponse<unknown>>(API_ENDPOINTS.auth.resetPassword, body)
      .then((r) => r.data),

  logout: () =>
    api.post<ApiResponse<unknown>>(API_ENDPOINTS.auth.logout).then((r) => r.data),
}
