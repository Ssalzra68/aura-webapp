"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-6 rounded-[2rem] bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-3xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-400/20">
                A
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Aura IoT</p>
                <h1 className="text-3xl font-semibold text-white">Panel de control ambiental</h1>
              </div>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Un tablero pensado para que la información crítica sea clara, visual y útil. Todo el flujo de datos es sencillo de entender y muestra solo lo necesario.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-slate-700/60 bg-slate-950/80 px-4 py-2 text-white">
              Dashboard
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-rose-500/60 bg-rose-500/10 px-4 py-2 text-rose-200 transition hover:bg-rose-500/20 hover:text-white"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Temperatura</p>
                <p className="mt-4 text-5xl font-semibold text-white">22.0°C</p>
                <p className="mt-3 text-sm text-slate-400">Umbral activo 25.0°C</p>
              </article>
              <article className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Iluminación</p>
                <p className="mt-4 text-5xl font-semibold text-white">500 lux</p>
                <p className="mt-3 text-sm text-slate-400">Umbral recomendado 400 lux</p>
              </article>
              <article className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Presencia</p>
                <p className="mt-4 text-3xl font-semibold text-emerald-300">Detectada</p>
                <p className="mt-3 text-sm text-slate-400">Modo adaptativo activado</p>
              </article>
              <article className="rounded-3xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Actuadores</p>
                <p className="mt-4 text-3xl font-semibold text-amber-300">Ventilación + Iluminación</p>
                <p className="mt-3 text-sm text-slate-400">Estado: activo</p>
              </article>
            </div>

            <div className="rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Historial ambiental</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Datos de las últimas 24 horas</h2>
                </div>
                <div className="rounded-full border border-slate-700/70 bg-slate-950/70 px-4 py-2 text-sm text-slate-300">
                  Past 24 hours ▼
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <iframe
                  title="Temperatura"
                  src="https://thingspeak.com/channels/9/charts/1?bgcolor=%23ffffff&color=%230070f3&dynamic=true"
                  className="h-60 w-full rounded-3xl border border-slate-700/60 bg-slate-950"
                />
                <iframe
                  title="Iluminación"
                  src="https://thingspeak.com/channels/9/charts/2?bgcolor=%23ffffff&color=%23f59e0b&dynamic=true"
                  className="h-60 w-full rounded-3xl border border-slate-700/60 bg-slate-950"
                />
                <iframe
                  title="Presencia"
                  src="https://thingspeak.com/channels/9/charts/3?bgcolor=%23ffffff&color=%233cb371&dynamic=true"
                  className="h-60 w-full rounded-3xl border border-slate-700/60 bg-slate-950"
                />
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Setpoints activos</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-400">Temperatura objetivo</p>
                  <p className="mt-2 text-2xl font-semibold text-white">24°C</p>
                </div>
                <div className="rounded-3xl bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-400">Iluminación objetivo</p>
                  <p className="mt-2 text-2xl font-semibold text-white">420 lux</p>
                </div>
                <div className="rounded-3xl bg-slate-950/60 p-4">
                  <p className="text-sm text-slate-400">Modo</p>
                  <p className="mt-2 text-2xl font-semibold text-emerald-300">Adaptivo</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Control de actuadores</p>
              <div className="mt-6 grid gap-4">
                <button className="rounded-3xl bg-cyan-500 px-5 py-4 text-left text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                  Ventilación: Encendida
                </button>
                <button className="rounded-3xl bg-amber-400 px-5 py-4 text-left text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
                  Iluminación: Automática
                </button>
                <button className="rounded-3xl border border-slate-700/70 bg-slate-950/70 px-5 py-4 text-left text-sm text-slate-200 transition hover:border-cyan-400/40">
                  Ver modo adaptativo
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Resumen rápido</p>
              <ul className="mt-6 space-y-4 text-slate-300">
                <li className="flex items-center gap-3 rounded-3xl bg-slate-950/60 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300">1</span>
                  Temperatura y luz balanceadas para bienestar y eficiencia.
                </li>
                <li className="flex items-center gap-3 rounded-3xl bg-slate-950/60 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-300">2</span>
                  Interfaz accesible diseñada para usuarios no técnicos.
                </li>
                <li className="flex items-center gap-3 rounded-3xl bg-slate-950/60 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-300">3</span>
                  Gráficos embebidos con datos reales de ThingSpeak.
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
