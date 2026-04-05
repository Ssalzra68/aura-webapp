import Link from "next/link";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Settings</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Configuración del usuario</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
            Ajusta los parámetros de tu experiencia IoT y administra las opciones de notificación del sistema.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-700/70 bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold text-white">Preferencias generales</h2>
            <p className="mt-3 text-slate-400">
              Elige entre modos adaptativo o manual, y define los umbrales de alerta para tu proyecto IoT.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-700/70 bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold text-white">Seguridad</h2>
            <p className="mt-3 text-slate-400">
              Gestiona tu acceso de usuario de forma segura con Supabase y asegurate de que solo personas autorizadas vean los datos.
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
