'use client'

import Link from 'next/link'
import { ArrowLeft, CheckCircle, Loader2, MailCheck, XCircle } from 'lucide-react'

interface VerifyEmailStatusProps {
  readonly status: 'loading' | 'success' | 'error' | 'missing-token'
}

export function VerifyEmailStatus({ status }: VerifyEmailStatusProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8FAFC] p-6 font-sans antialiased">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5 shadow-xl border border-emerald-100">
            <img src="/logo.png" alt="FoodLink Đà Nẵng" className="size-full object-contain" />
          </div>
        </div>

        {status === 'loading' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-200">
                <Loader2 className="size-10 text-[#006948] animate-spin" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-[#006948]">Đang xác thực email...</h1>
              <p className="text-sm text-slate-500">Vui lòng chờ trong giây lát.</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-200">
                <CheckCircle className="size-10 text-[#006948]" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-[#006948]">Email đã được xác thực!</h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tài khoản của bạn đã được kích hoạt thành công. Bạn có thể đăng nhập ngay bây giờ.
              </p>
            </div>
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#006948] to-[#00855d] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#006948]/25 hover:brightness-110 transition-all"
            >
              <MailCheck className="size-4" />
              Đăng nhập ngay
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-red-50 border-2 border-red-200">
                <XCircle className="size-10 text-red-500" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-red-600">Xác thực thất bại</h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Liên kết xác thực đã hết hạn hoặc không hợp lệ. Vui lòng liên hệ hỗ trợ nếu vấn đề tiếp tục.
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
        )}

        {status === 'missing-token' && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-amber-50 border-2 border-amber-200">
                <XCircle className="size-10 text-amber-500" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-amber-600">Thiếu token xác thực</h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Đường dẫn không hợp lệ. Vui lòng sử dụng đường dẫn từ email xác thực đã được gửi.
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
        )}

        <p className="text-xs text-slate-400">© 2026 FoodLink Đà Nẵng • Hệ thống Quản trị B2B</p>
      </div>
    </div>
  )
}
