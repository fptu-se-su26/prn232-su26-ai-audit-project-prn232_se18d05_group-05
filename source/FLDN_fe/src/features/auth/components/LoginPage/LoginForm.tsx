'use client'

import Link from 'next/link'
import {
  Eye,
  EyeOff,
  Globe,
  Loader2,
  Lock,
  LogIn,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'

interface LoginFormProps {
  readonly form: UseFormReturn<{ email: string; password: string }>
  readonly onSubmit: (values: { email: string; password: string }) => Promise<void>
  readonly isLoading: boolean
}

export function LoginForm({ form, onSubmit, isLoading }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans text-slate-800 antialiased bg-[#F8FAFC]">
      {/* LEFT SIDE: Premium Fresh High-Tech Agricultural Backdrop */}
      <section className="relative hidden w-1/2 overflow-hidden bg-[#006948] lg:flex lg:flex-col lg:justify-between p-12 text-white">
        {/* Cinematic 4K High-Tech Smart Farm Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1600&auto=format&fit=crop"
            alt="Nông nghiệp công nghệ cao FoodLink Đà Nẵng"
            className="h-full w-full object-cover opacity-75 scale-105 transition-all duration-700 hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#006948]/90 via-[#006948]/50 to-transparent z-10" />
        </div>

        {/* Top Header Logo using Project Original Logo */}
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

        {/* Middle Hero Content */}
        <div className="relative z-20 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-extrabold text-white backdrop-blur-md shadow-sm">
            <Sparkles className="size-3.5 text-amber-300" />
            Công nghệ Truy xuất Nguồn gốc 4.0
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white leading-tight sm:text-5xl drop-shadow-sm">
            Số hóa chuỗi cung ứng nông sản tại Đà Nẵng.
          </h1>

          <p className="text-base text-white/95 leading-relaxed font-semibold drop-shadow-xs">
            Kết nối trực tiếp nhà sản xuất với mạng lưới phân phối hiện đại thông qua nền tảng vận hành tối ưu và minh bạch.
          </p>

          {/* Glassmorphism Bento Grid Cards */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="rounded-2xl border border-white/40 bg-white/20 p-4.5 shadow-xl backdrop-blur-xl transition-all hover:bg-white/25">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-100">ĐỐI TÁC</span>
              <p className="mt-1 text-3xl font-black text-white drop-shadow-xs">500+</p>
              <p className="text-[11px] font-bold text-white/90 mt-0.5">Doanh nghiệp phân phối</p>
            </div>
            <div className="rounded-2xl border border-white/40 bg-white/20 p-4.5 shadow-xl backdrop-blur-xl transition-all hover:bg-white/25">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-100">SẢN LƯỢNG</span>
              <p className="mt-1 text-3xl font-black text-white drop-shadow-xs">120 Tấn/Tháng</p>
              <p className="text-[11px] font-bold text-white/90 mt-0.5">Nông sản sạch VietGAP</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer Note */}
        <div className="relative z-20 flex items-center justify-between text-xs font-semibold text-white/80 border-t border-white/20 pt-4">
          <p>© 2026 FoodLink Đà Nẵng • Hệ thống Quản trị B2B Chuyên dụng.</p>
          <span className="inline-flex items-center gap-1 text-[11px] text-white font-extrabold">
            <Globe className="size-3 text-emerald-300" /> Thành Phố Đà Nẵng
          </span>
        </div>
      </section>

      {/* RIGHT SIDE: Direct B2B Login Portal */}
      <section className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12 bg-white overflow-y-auto">
        <div className="w-full max-w-[420px] space-y-8">
          {/* Branding Header Mobile Only */}
          <div className="flex flex-col items-center text-center lg:hidden">
            <div className="size-16 flex items-center justify-center p-1.5 rounded-2xl bg-white border border-emerald-100 shadow-md mb-2">
              <img src="/logo.png" alt="FoodLink Đà Nẵng" className="size-full object-contain" />
            </div>
            <h2 className="text-xl font-extrabold text-[#006948]">FoodLink Đà Nẵng</h2>
            <p className="text-xs font-bold text-slate-400">Quản trị Chuỗi Cung ứng Nông sản</p>
          </div>

          {/* Form Header Title */}
          <div className="text-center lg:text-left space-y-1.5">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#006948]">
              Chào mừng trở lại
            </h2>
            <p className="text-xs font-semibold text-slate-500">
              Vui lòng đăng nhập để tiếp tục quản lý chuỗi cung ứng.
            </p>
          </div>

          {/* Main Auth Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-bold text-slate-700">
                Địa chỉ Email / Tên người dùng *
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Ví dụ: supplier@foodlink.vn"
                  className={`w-full rounded-2xl border bg-white py-3 pl-10 pr-4 text-xs font-semibold transition-all duration-200 focus:outline-hidden ${
                    errors.email
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-[#006948] focus:ring-3 focus:ring-[#006948]/10'
                  }`}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="block text-xs font-bold text-slate-700">
                Mật khẩu *
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 size-4 text-slate-400 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`w-full rounded-2xl border bg-white py-3 pl-10 pr-10 text-xs font-semibold transition-all duration-200 focus:outline-hidden ${
                    errors.password
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/10'
                      : 'border-slate-200 focus:border-[#006948] focus:ring-3 focus:ring-[#006948]/10'
                  }`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[11px] font-bold text-rose-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Checkbox & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="size-4 rounded-md border-slate-300 text-[#006948] focus:ring-[#006948]/20"
                />
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-800 transition-colors">
                  Duy trì đăng nhập
                </span>
              </label>
              <a href="#" className="text-xs font-extrabold text-[#006948] hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            {/* Bright & Fresh Gradient Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#006948] to-[#00855d] py-3.5 text-xs font-black text-white shadow-lg shadow-[#006948]/25 transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin text-white" />
                  <span>Đang xử lý đăng nhập...</span>
                </>
              ) : (
                <>
                  <span>Đăng nhập hệ thống</span>
                  <LogIn className="size-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Register & Support Links */}
          <div className="border-t border-slate-100 pt-6 text-center space-y-3">
            <p className="text-xs font-medium text-slate-500">
              Bạn chưa có tài khoản doanh nghiệp?{' '}
              <Link href="/auth/register" className="font-extrabold text-[#006948] hover:underline ml-1">
                Đăng ký tài khoản mới
              </Link>
            </p>

            <div className="flex items-center justify-center gap-4 text-[11px] font-bold text-slate-400">
              <a href="#" className="hover:text-slate-700 transition-colors">
                Trợ giúp kỹ thuật
              </a>
              <span className="size-1 rounded-full bg-slate-300" />
              <a href="#" className="hover:text-slate-700 transition-colors">
                Chính sách bảo mật
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
