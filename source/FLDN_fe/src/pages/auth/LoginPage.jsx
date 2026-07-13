import { useNavigate } from 'react-router-dom'
import { ROLES } from '../../middleware/roles'
import RoutePath from '../../routes/RoutePath'
import { createDevToken, setAuthToken } from '../../utils/authUtils'

function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = (role) => {
    setAuthToken(createDevToken(role))
    let target = RoutePath.DASHBOARD
    if (role === ROLES.ADMIN) target = RoutePath.ADMIN
    else if (role === ROLES.SHIPPER) target = RoutePath.SHIPPER_DASHBOARD
    navigate(target, { replace: true })
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-slate-950/30">
        <div className="space-y-3">
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-sm font-medium text-emerald-200">
            Food Link Access
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Dang nhap he thong
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Trang nay dang dung token local de ban co the kiem tra luong middleware truoc
            khi noi API dang nhap that.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => handleLogin(ROLES.STAFF)}
            className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-4 text-left transition hover:bg-cyan-400/20"
          >
            <span className="block text-lg font-semibold text-cyan-100">Dang nhap User</span>
            <span className="mt-1 block text-sm text-slate-300">Chuyen toi dashboard nguoi dung</span>
          </button>
          <button
            type="button"
            onClick={() => handleLogin(ROLES.ADMIN)}
            className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/10 px-5 py-4 text-left transition hover:bg-fuchsia-400/20"
          >
            <span className="block text-lg font-semibold text-fuchsia-100">Dang nhap Admin</span>
            <span className="mt-1 block text-sm text-slate-300">Chuyen toi khu vuc quan tri</span>
          </button>
          <button
            type="button"
            onClick={() => handleLogin(ROLES.SHIPPER)}
            className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-left transition hover:bg-emerald-400/20"
          >
            <span className="block text-lg font-semibold text-emerald-100">Dang nhap Shipper</span>
            <span className="mt-1 block text-sm text-slate-300">Chuyen toi khu vuc van chuyen</span>
          </button>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
