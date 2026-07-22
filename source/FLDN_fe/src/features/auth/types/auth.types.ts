import type { UserRole } from '@/config/roles'

export interface AuthUser {
  id: string
  fullName: string
  email: string
  role: UserRole
}

export interface LoginRequestDto {
  email: string
  password: string
}

export interface LoginResponseDto {
  accessToken: string
  expiresIn: number
}

export interface RegisterRequestDto {
  fullName: string
  email: string
  phone: string
  password: string
}

export interface RegisterResponseDto {
  id: string
  fullName: string
  email: string
  phone: string
}

export interface ForgotPasswordRequestDto {
  email: string
}

export interface ResetPasswordRequestDto {
  token: string
  newPassword: string
}
