function NotFoundPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-slate-950/30">
        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-200">
          Error 404
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Khong tim thay trang
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Duong dan ban vua truy cap khong ton tai hoac da duoc di chuyen. Hay kiem tra
            lai URL hoac quay ve trang chinh cua Food Link.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/"
            className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Ve trang chu
          </a>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Quay lai
          </button>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
