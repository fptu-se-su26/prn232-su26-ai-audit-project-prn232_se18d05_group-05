function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-slate-950/30">
        <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-sm font-medium text-amber-200">
          Error 401
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Ban chua duoc xac thuc
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Ban can dang nhap bang tai khoan hop le de tiep tuc truy cap tinh nang nay
            trong he thong Food Link.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/login"
            className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
          >
            Dang nhap
          </a>
          <a
            href="/"
            className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Ve trang chu
          </a>
        </div>
      </div>
    </main>
  )
}

export default UnauthorizedPage
