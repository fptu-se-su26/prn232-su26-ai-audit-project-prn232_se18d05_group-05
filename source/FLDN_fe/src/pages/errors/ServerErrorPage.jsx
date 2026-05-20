function ServerErrorPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl shadow-slate-950/30">
        <span className="rounded-full border border-rose-400/30 bg-rose-400/10 px-4 py-1 text-sm font-medium text-rose-200">
          Error 500
        </span>
        <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            He thong dang gap su co
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            May chu dang tam thoi khong the xu ly yeu cau. Vui long thu lai sau it phut
            hoac lien he quan tri vien neu loi van tiep tuc xay ra.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-xl bg-rose-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-rose-300"
          >
            Thu lai
          </button>
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

export default ServerErrorPage
