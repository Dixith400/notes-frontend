const AuthShell = ({ title, subtitle, children }) => (
  <main className="min-h-screen bg-[#f4f0e8] px-4 py-8 text-stone-950 sm:px-6">
    <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-5xl overflow-hidden rounded-[1.25rem] border border-stone-200 bg-white shadow-2xl shadow-stone-300/40 md:grid-cols-[1fr_1.1fr]">
      <div className="hidden bg-[url('/src/assets/hero.png')] bg-cover bg-center md:block" />

      <div className="flex items-center justify-center px-6 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Notes App
          </p>
          <h1 className="text-3xl font-bold text-stone-950">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-stone-600">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  </main>
);

export default AuthShell;
