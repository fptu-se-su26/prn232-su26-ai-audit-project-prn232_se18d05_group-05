import { z } from 'zod'

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  phone: z
    .string()
    .min(10, 'Số điện thoại không hợp lệ')
    .regex(/^[0-9+]+$/, 'Số điện thoại chỉ chứa số'),
  password: z
    .string()
    .min(7, 'Mật khẩu phải có ít nhất 7 ký tự')
    .regex(/[A-Z]/, 'Mật khẩu phải có ít nhất 1 chữ hoa')
    .regex(/[a-z]/, 'Mật khẩu phải có ít nhất 1 chữ thường')
    .regex(/[0-9]/, 'Mật khẩu phải có ít nhất 1 chữ số')
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt'),
})

export type RegisterFormValues = z.infer<typeof registerSchema>
