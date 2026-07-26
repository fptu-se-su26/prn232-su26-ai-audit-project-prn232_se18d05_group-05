'use client'

import Link from 'next/link'
import { ArrowLeft, CheckCircle, Globe, Loader2, Mail, ShieldCheck, Sparkles } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { ForgotPasswordFormValues } from '../../schemas/forgot-password.schema'

interface ForgotPasswordFormProps {
  readonly form: UseFormReturn<ForgotPasswordFormValues>
  readonly onSubmit: (values: ForgotPasswordFormValues) => Promise<void>
  readonly isLoading: boolean
  readonly isSuccess: boolean
}

export function ForgotPasswordForm({ form, onSubmit, isLoading, isSuccess }: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = form

  return (
    <div className="flex min-h-screen w-full overflow-hidden font-sans text-slate-800 antialiased bg-[#F8FAFC]">
      {/* LEFT SIDE */}
      <section className="relative hidden w-1/2 overflow-hidden bg-[#006948] lg:flex lg:flex-col lg:justify-between p-12 text-white">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1600&auto=format&fit=crop"
            alt="Nông nghiệp công nghệ cao FoodLink Đà Nẵng"
            className="h-full w-full object-cover opacity-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#006948]/90 via-[#006948]/50 to-transparent z-10" />
        </div>

        <div className="relative z-20 flex items-center gap-3">
          <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-xl border border-white/60">
            <img src="/logo.png" alt="FoodLink Đà Nẵng" className="size-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white drop-shadow-xs">FoodLink</span>
              <span className="rounded-md bg-white/20 border border-white/40 px-2 py-0.5 text-[10px] font-black uppercase text-white backdrop-blur-md">
                Đà Nẵng
              </span>
            </div>
            <p className="text-xs font-bold text-emerald-100 flex items-center gap-1 mt-0.5">
              <ShieldCheck className="size-3.5 text-emerald-300" />
              Nền tảng Quản trị Nông sản B2B
            </p>
          </div>
        </div>

        <div className="relative z-20 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-extrabold text-white backdrop-blur-md shadow-sm">
            <Sparkles className="size-3.5 text-amber-300" />
            Bảo mật tài khoản
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white leading-tight sm:text-5xl drop-shadow-sm">
            Khôi phục quyền truy cập tài khoản của bạn.
          </h1>

          <p className="text-base text-white/95 leading-relaxed font-semibold drop-shadow-xs">
            Chúng tôi sẽ gửi liên kết đặt lại mật khẩu đến email đã đăng ký trong vòng vài phút.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Card className="border border-white/40 bg-white/20 p-4.5 shadow-xl backdrop-blur-xl text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-100">TỐC ĐỘ</span>
              <p className="mt-1 text-3xl font-black text-white drop-shadow-xs">&lt; 5 Phút</p>
              <p className="text-[11px] font-bold text-white/90 mt-0.5">Nhận email đặt lại</p>
            </Card>
            <Card className="border border-white/40 bg-white/20 p-4.5 shadow-xl backdrop-blur-xl text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-100">BẢO MẬT</span>
              <p className="mt-1 text-3xl font-black text-white drop-shadow-xs">SSL</p>
              <p className="text-[11px] font-bold text-white/90 mt-0.5">Mã hóa đầu cuối</p>
            </Card>
          </div>
        </div>

        <div className="relative z-20 flex items-center justify-between text-xs font-semibold text-white/80 border-t border-white/20 pt-4">
          <p>© 2026 FoodLink Đà Nẵng • Hệ thống Quản trị B2B Chuyên dụng.</p>
          <span className="inline-flex items-center gap-1 text-[11px] text-white font-extrabold">
            <Globe className="size-3 text-emerald-300" /> Thành Phố Đà Nẵng
          </span>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-[420px] space-y-8">
          <div className="flex flex-col items-center text-center lg:hidden">
            <div className="size-16 flex items-center justify-center p-1.5 rounded-2xl bg-white border border-emerald-100 shadow-md mb-2">
              <img src="/logo.png" alt="FoodLink Đà Nẵng" className="size-full object-contain" />
            </div>
          </div>

          {isSuccess ? (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="flex size-20 items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-200">
                  <CheckCircle className="size-10 text-[#006948]" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-[#006948]">Email đã được gửi!</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Chúng tôi đã gửi liên kết đặt lại mật khẩu đến{' '}
                  <span className="font-bold text-slate-800">{getValues('email')}</span>.
                  Vui lòng kiểm tra hộp thư (kể cả thư mục Spam).
                </p>
              </div>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#006948] hover:underline"
              >
                <ArrowLeft className="size-4" />
                Quay lại đăng nhập
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-1.5">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#006948]">Quên mật khẩu?</h2>
                <p className="text-xs font-semibold text-slate-500">
                  Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <Field data-invalid={Boolean(errors.email)}>
                  <FieldLabel htmlFor="email" className="text-xs font-bold text-slate-700">
                    Địa chỉ Email *
                  </FieldLabel>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      placeholder="Ví dụ: supplier@foodlink.vn"
                      className="pl-10 rounded-2xl border-slate-200 focus:border-[#006948]"
                      {...register('email')}
                    />
                  </div>
                  <FieldError>{errors.email?.message}</FieldError>
                </Field>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#006948] to-[#00855d] py-3.5 text-xs font-black text-white shadow-lg shadow-[#006948]/25 hover:brightness-110"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-white mr-2" />
                      <span>Đang gửi email...</span>
                    </>
                  ) : (
                    <span>Gửi liên kết đặt lại</span>
                  )}
                </Button>
              </form>

              <div className="text-center">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#006948] transition-colors"
                >
                  <ArrowLeft className="size-3.5" />
                  Quay lại đăng nhập
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
