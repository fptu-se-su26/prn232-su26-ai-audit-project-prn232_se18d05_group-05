'use client'

import Link from 'next/link'
import { Eye, EyeOff, Globe, Loader2, Lock, Mail, Phone, ShieldCheck, Sparkles, User } from 'lucide-react'
import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import type { RegisterFormValues } from '../../schemas/register.schema'

interface RegisterFormProps {
  readonly form: UseFormReturn<RegisterFormValues>
  readonly onSubmit: (values: RegisterFormValues) => Promise<void>
  readonly isLoading: boolean
}

export function RegisterForm({ form, onSubmit, isLoading }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
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
            Tham gia mạng lưới nhà cung ứng
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white leading-tight sm:text-5xl drop-shadow-sm">
            Mở rộng kênh phân phối nông sản của bạn.
          </h1>

          <p className="text-base text-white/95 leading-relaxed font-semibold drop-shadow-xs">
            Đăng ký để kết nối với hơn 500 doanh nghiệp phân phối và tiếp cận thị trường Đà Nẵng hiệu quả hơn.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <Card className="border border-white/40 bg-white/20 p-4.5 shadow-xl backdrop-blur-xl text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-100">MIỄN PHÍ</span>
              <p className="mt-1 text-3xl font-black text-white drop-shadow-xs">0đ</p>
              <p className="text-[11px] font-bold text-white/90 mt-0.5">Chi phí đăng ký ban đầu</p>
            </Card>
            <Card className="border border-white/40 bg-white/20 p-4.5 shadow-xl backdrop-blur-xl text-white">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-100">DUYỆT</span>
              <p className="mt-1 text-3xl font-black text-white drop-shadow-xs">24h</p>
              <p className="text-[11px] font-bold text-white/90 mt-0.5">Thời gian xét duyệt hồ sơ</p>
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
        <div className="w-full max-w-[420px] space-y-7 py-8">
          <div className="flex flex-col items-center text-center lg:hidden">
            <div className="size-16 flex items-center justify-center p-1.5 rounded-2xl bg-white border border-emerald-100 shadow-md mb-2">
              <img src="/logo.png" alt="FoodLink Đà Nẵng" className="size-full object-contain" />
            </div>
            <h2 className="text-xl font-extrabold text-[#006948]">FoodLink Đà Nẵng</h2>
          </div>

          <div className="text-center lg:text-left space-y-1.5">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#006948]">Tạo tài khoản mới</h2>
            <p className="text-xs font-semibold text-slate-500">
              Điền thông tin để đăng ký tài khoản doanh nghiệp trên FoodLink.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Field data-invalid={Boolean(errors.fullName)}>
              <FieldLabel htmlFor="fullName" className="text-xs font-bold text-slate-700">
                Họ và tên *
              </FieldLabel>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                <Input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.fullName)}
                  placeholder="Ví dụ: Nguyễn Văn A"
                  className="pl-10 rounded-2xl border-slate-200 focus:border-[#006948]"
                  {...register('fullName')}
                />
              </div>
              <FieldError>{errors.fullName?.message}</FieldError>
            </Field>

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

            <Field data-invalid={Boolean(errors.phone)}>
              <FieldLabel htmlFor="phone" className="text-xs font-bold text-slate-700">
                Số điện thoại *
              </FieldLabel>
              <div className="relative flex items-center">
                <Phone className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  placeholder="Ví dụ: 0901234567"
                  className="pl-10 rounded-2xl border-slate-200 focus:border-[#006948]"
                  {...register('phone')}
                />
              </div>
              <FieldError>{errors.phone?.message}</FieldError>
            </Field>

            <Field data-invalid={Boolean(errors.password)}>
              <FieldLabel htmlFor="password" className="text-xs font-bold text-slate-700">
                Mật khẩu *
              </FieldLabel>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  aria-invalid={Boolean(errors.password)}
                  placeholder="Ít nhất 8 ký tự"
                  className="pl-10 pr-10 rounded-2xl border-slate-200 focus:border-[#006948]"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              <FieldError>{errors.password?.message}</FieldError>
            </Field>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-gradient-to-r from-[#006948] to-[#00855d] py-3.5 text-xs font-black text-white shadow-lg shadow-[#006948]/25 hover:brightness-110 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin text-white mr-2" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <span>Đăng ký tài khoản</span>
              )}
            </Button>
          </form>

          <Separator />

          <div className="text-center">
            <p className="text-xs font-medium text-slate-500">
              Đã có tài khoản?{' '}
              <Link href="/auth/login" className="font-extrabold text-[#006948] hover:underline ml-1">
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
