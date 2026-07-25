export interface ApiResponse<T> {
  isSuccess: boolean
  statusCode: number
  message: string
  data: T
  errors?: Record<string, string[]>
}

export interface ApiErrorResponse {
  statusCode: number
  message: string
  errors?: Record<string, string[]>
}
