import Link from "next/link";

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Reports</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Ventas de datos y tendencias de ambiente</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            Esta vista muestra información orientada a reportes. Puedes sustituirla por gráficos de ThingSpeak y resúmenes de estado para que cualquier usuario comprenda la solución IoT.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-700/70 bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold text-white">Resumen de ambiente</h2>
            <p className="mt-3 text-slate-400">
              Temperatura, iluminación y presencia en un solo reporte visual. El diseño evita saturar al usuario con datos innecesarios.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-700/70 bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold text-white">Información útil</h2>
            <p className="mt-3 text-slate-400">
              Los reportes se presentan con contenido conciso y accesible, manteniendo la proporción entre información técnica y valor práctico.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/dashboard" className="rounded-3xl border border-cyan-500/40 bg-slate-950/80 px-6 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-slate-900">
            Volver al panel
          </Link>
          <Link href="/" className="rounded-3xl border border-slate-700/70 bg-slate-950/80 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50">
            Volver a inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
