import { useNavigate } from 'react-router-dom'
import { removeAuthToken } from '../../utils/authUtils'

function AdminDashboardPage() {
  const navigate = useNavigate()

  const handleLogout = () => {
    removeAuthToken()
    navigate('/login', { replace: true })
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl border border-fuchsia-400/20 bg-fuchsia-400/10 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-fuchsia-200">Admin Area</p>
          <h1 className="mt-3 text-4xl font-semibold">Bang dieu khien quan tri Food Link</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Route nay dang duoc bao ve boi `ProtectedRoute` va chi chap nhan role `Admin`.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          Dang xuat
        </button>
      </div>
    </main>
  )
}

export default AdminDashboardPage
