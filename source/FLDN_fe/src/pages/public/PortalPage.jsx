import { Link } from 'react-router-dom'
import RoutePath from '../../routes/RoutePath'

function PortalPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-2xl shadow-slate-950/30">
        <div className="space-y-4">
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-sm font-medium text-emerald-200">
            Food Link Portal
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Quan ly chuoi cung cau thanh pho Da Nang
          </h1>
          <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            Day la cong vao chung cua he thong. Ban co the dang nhap de test middleware,
            vao dashboard nguoi dung, hoac vao khu vuc quan tri neu token co role phu hop.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={RoutePath.LOGIN}
            className="rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Mo trang dang nhap
          </Link>
          <Link
            to={RoutePath.DASHBOARD}
            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Thu vao dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}

export default PortalPage
