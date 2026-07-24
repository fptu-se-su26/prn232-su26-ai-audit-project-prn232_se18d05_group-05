'use client'

import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { LoginFormValues } from '../../schemas/login.schema'

interface LoginFormProps {
  readonly form: UseFormReturn<LoginFormValues>
  readonly onSubmit: (values: LoginFormValues) => Promise<void>
  readonly isLoading: boolean
}

export function LoginForm({ form, onSubmit, isLoading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const { register, handleSubmit, formState: { errors } } = form

  return (
    <div className="flex min-h-dvh items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6">
        <header className="space-y-2 text-center flex flex-col items-center">
          <div className="size-20 flex items-center justify-center p-1 rounded-2xl bg-emerald-50/80 border border-emerald-100/80 shadow-xs mb-1">
            <img src="/logo.png" alt="FoodLink Đà Nẵng" className="size-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-emerald-950">Đăng nhập</h1>
          <p className="text-sm text-muted-foreground">
            Hệ thống Cung ứng & Truy xuất Nguồn gốc Thực phẩm Đà Nẵng
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Field data-invalid={Boolean(errors.email)}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register('email')}
            />
            <FieldError>{errors.email?.message}</FieldError>
          </Field>

          <Field data-invalid={Boolean(errors.password)}>
            <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                className="pr-10"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
            <FieldError>{errors.password?.message}</FieldError>
          </Field>

          <Button type="submit" size="lg" disabled={isLoading} className="w-full">
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              'Đăng nhập'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
