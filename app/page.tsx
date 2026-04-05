import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] xl:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300 ring-1 ring-cyan-500/25">
              Solución IoT para ambientes inteligentes
            </span>
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Aura conecta tu espacio con datos claros y diseño accesible.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              Una interfaz pensada para mostrar solo lo esencial: sensores, actuadores y gráficos integrados de ThingSpeak, todo con un estilo moderno y fácil de usar.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/login" className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:bg-cyan-400">
                Iniciar sesión
              </Link>
              <Link href="/register" className="inline-flex items-center justify-center rounded-3xl border border-slate-700/70 bg-slate-900/80 px-6 py-4 text-base font-semibold text-slate-100 transition hover:border-cyan-400/50 hover:bg-slate-900">
                Registrarse
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-700/70 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
            <div className="absolute inset-x-0 top-0 h-48 rounded-b-[2.5rem] bg-cyan-500/10 blur-3xl" />
            <div className="relative space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-slate-950/70 p-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Dashboard</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Estado del ambiente</h2>
                </div>
                <div className="rounded-full bg-slate-900/90 px-4 py-2 text-sm text-slate-300">AURA</div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/70 p-5 text-slate-100">
                  <p className="text-sm text-slate-400">Temperatura</p>
                  <p className="mt-3 text-4xl font-semibold">22.0°C</p>
                </div>
                <div className="rounded-3xl bg-slate-950/70 p-5 text-slate-100">
                  <p className="text-sm text-slate-400">Iluminación</p>
                  <p className="mt-3 text-4xl font-semibold">500 lux</p>
                </div>
              </div>

              <div className="rounded-3xl bg-slate-950/70 p-5 text-slate-100">
                <p className="text-sm text-slate-400">Presencia</p>
                <p className="mt-3 text-3xl font-semibold text-emerald-300">Detectada</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Concepto</p>
                <h2 className="mt-2 text-3xl font-semibold text-white">Una experiencia IoT clara para todos</h2>
              </div>
              <div className="rounded-full bg-slate-950/70 px-4 py-2 text-sm text-slate-300">Datos + diseño</div>
            </div>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300">
              Aura ofrece un panel de usuario ligero y atractivo que combina información técnica relevante con una presentación amigable. Las gráficas se integran como iframes de ThingSpeak y sólo se muestra lo que importa.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-700/70 bg-slate-950/70 p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Sensor</p>
                <p className="mt-3 text-xl font-semibold text-white">Temperatura</p>
              </div>
              <div className="rounded-3xl border border-slate-700/70 bg-slate-950/70 p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Actuador</p>
                <p className="mt-3 text-xl font-semibold text-white">Ventilación</p>
              </div>
              <div className="rounded-3xl border border-slate-700/70 bg-slate-950/70 p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Control</p>
                <p className="mt-3 text-xl font-semibold text-white">Adaptativo</p>
              </div>
            </div>
          </article>

          <aside className="rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/20">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Acceso rápido</p>
            <div className="mt-6 space-y-4">
              <Link href="/login" className="block rounded-3xl bg-cyan-500 px-5 py-4 text-center text-base font-semibold text-slate-950 transition hover:bg-cyan-400">
                Iniciar sesión
              </Link>
              <Link href="/register" className="block rounded-3xl border border-slate-700/70 bg-slate-950/70 px-5 py-4 text-center text-base font-semibold text-slate-100 transition hover:border-cyan-400/50">
                Registrarse
              </Link>
            </div>
            <p className="mt-8 text-sm leading-7 text-slate-400">
              Diseño basado en concentración de contenido, navegación clara y proporción equilibrada entre texto e imágenes para presentar la solución sin saturar.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
}
