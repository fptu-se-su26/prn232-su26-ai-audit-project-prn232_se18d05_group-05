import Link from 'next/link'
import { CheckCircle, Globe, Mail, ShieldCheck } from 'lucide-react'

export default function Page() {
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
          <h1 className="text-4xl font-black tracking-tight text-white leading-tight sm:text-5xl drop-shadow-sm">
            Chào mừng bạn đến với FoodLink Đà Nẵng!
          </h1>
          <p className="text-base text-white/95 leading-relaxed font-semibold drop-shadow-xs">
            Tài khoản của bạn đang chờ xác thực. Kiểm tra hộp thư để hoàn tất và bắt đầu kết nối với mạng lưới phân phối.
          </p>
        </div>

        <div className="relative z-20 flex items-center justify-between text-xs font-semibold text-white/80 border-t border-white/20 pt-4">
          <p>© 2026 FoodLink Đà Nẵng • Hệ thống Quản trị B2B Chuyên dụng.</p>
          <span className="inline-flex items-center gap-1 text-[11px] text-white font-extrabold">
            <Globe className="size-3 text-emerald-300" /> Thành Phố Đà Nẵng
          </span>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="flex w-full items-center justify-center p-6 lg:w-1/2 lg:p-12 bg-white">
        <div className="w-full max-w-[420px] space-y-8 text-center">
          {/* Mobile logo */}
          <div className="flex justify-center lg:hidden">
            <div className="size-16 flex items-center justify-center p-1.5 rounded-2xl bg-white border border-emerald-100 shadow-md">
              <img src="/logo.png" alt="FoodLink Đà Nẵng" className="size-full object-contain" />
            </div>
          </div>

          {/* Success icon */}
          <div className="flex justify-center">
            <div className="relative flex size-24 items-center justify-center rounded-full bg-emerald-50 border-2 border-emerald-200 shadow-lg shadow-emerald-100">
              <CheckCircle className="size-12 text-[#006948]" strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-[#006948] shadow-md">
                <Mail className="size-3.5 text-white" />
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#006948]">
              Đăng ký thành công!
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tài khoản của bạn đã được tạo. Chúng tôi đã gửi một email xác thực đến hộp thư của bạn.
            </p>
          </div>

          {/* Steps */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left space-y-4">
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">Các bước tiếp theo</p>

            <div className="space-y-3">
              {[
                { step: '1', text: 'Mở ứng dụng email của bạn' },
                { step: '2', text: 'Tìm email từ FoodLink Đà Nẵng' },
                { step: '3', text: 'Nhấn vào liên kết "Xác nhận tài khoản"' },
                { step: '4', text: 'Đăng nhập và bắt đầu sử dụng' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#006948] text-[10px] font-black text-white">
                    {step}
                  </span>
                  <p className="text-sm font-medium text-slate-700">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <p className="text-xs text-slate-400 leading-relaxed">
            Không thấy email? Kiểm tra thư mục <span className="font-bold text-slate-600">Spam</span> hoặc{' '}
            <span className="font-bold text-slate-600">Quảng cáo</span>. Email xác thực có hiệu lực trong{' '}
            <span className="font-bold text-slate-600">10 phút</span>.
          </p>

          {/* CTA */}
          <Link
            href="/auth/login"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#006948] to-[#00855d] py-3.5 text-sm font-black text-white shadow-lg shadow-[#006948]/25 hover:brightness-110 transition-all"
          >
            Đến trang đăng nhập
          </Link>
        </div>
      </section>
    </div>
  )
}
