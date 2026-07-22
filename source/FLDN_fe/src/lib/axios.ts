import { API_ENDPOINTS } from '@/routes/api-endpoints'
import type { ApiErrorResponse } from '@/types/api'
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://localhost:7114'
).replace(/\/+$/, '') + '/api'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const normalizeApiError = (error: AxiosError): ApiErrorResponse => {
  const data = error.response?.data
  const statusCode =
    isRecord(data) && typeof data.statusCode === 'number'
      ? data.statusCode
      : (error.response?.status ?? 500)
  const message =
    isRecord(data) && typeof data.message === 'string' && data.message.trim().length > 0
      ? data.message
      : error.message || 'Something went wrong. Please try again.'
  const errors =
    isRecord(data) && isRecord(data.errors) ? (data.errors as Record<string, string[]>) : undefined

  return { statusCode, message, ...(errors ? { errors } : {}) }
}

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  withCredentials: true, // send HttpOnly refresh_token cookie automatically
  headers: { 'Content-Type': 'application/json' },
})

const isClient = typeof window !== 'undefined'
const getAccessToken = (): string | null => (isClient ? localStorage.getItem('access_token') : null)

const AUTH_401_PASSTHROUGH_ENDPOINTS: string[] = [
  API_ENDPOINTS.auth.login,
]

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }
    const isPassthrough = AUTH_401_PASSTHROUGH_ENDPOINTS.some(
      (ep) => originalRequest?.url === ep
    )

    if (error.response?.status === 401 && !isPassthrough && !originalRequest?._retry) {
      localStorage.removeItem('access_token')
      window.location.href = '/auth/login'
    }

    return Promise.reject(normalizeApiError(error))
  }
)
