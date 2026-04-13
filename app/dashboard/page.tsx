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
    <main className="min-h-screen bg-white px-6 py-8 text-gray-900 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-6 rounded-[2rem] bg-gray-50 p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-3xl bg-cyan-100 text-cyan-600 ring-1 ring-cyan-200">
                A
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Aura IoT</p>
                <h1 className="text-3xl font-semibold text-gray-900">Panel de control ambiental</h1>
              </div>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Un tablero pensado para que la información crítica sea clara, visual y útil. Todo el flujo de datos es sencillo de entender y muestra solo lo necesario.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700">
            <span className="rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm">
              Dashboard
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-red-300 bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100 hover:text-red-700"
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Temperatura</p>
                <p className="mt-4 text-5xl font-semibold text-cyan-600">22.0°C</p>
                <p className="mt-3 text-sm text-gray-600">Umbral activo 25.0°C</p>
              </article>
              <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Iluminación</p>
                <p className="mt-4 text-5xl font-semibold text-amber-600">500 lux</p>
                <p className="mt-3 text-sm text-gray-600">Umbral recomendado 400 lux</p>
              </article>
              <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Presencia</p>
                <p className="mt-4 text-3xl font-semibold text-emerald-600">Detectada</p>
                <p className="mt-3 text-sm text-gray-600">Modo adaptativo activado</p>
              </article>
              <article className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
                <p className="text-sm uppercase tracking-[0.25em] text-gray-500">Actuadores</p>
                <p className="mt-4 text-3xl font-semibold text-purple-600">Ventilación + Iluminación</p>
                <p className="mt-3 text-sm text-gray-600">Estado: activo</p>
              </article>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Historial ambiental</p>
                  <h2 className="mt-2 text-2xl font-semibold text-gray-900">Datos de las últimas 24 horas</h2>
                </div>
                <div className="rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-700">
                  Past 24 hours ▼
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <iframe
                  title="Temperatura"
                  src="https://thingspeak.com/channels/9/charts/1?bgcolor=%23ffffff&color=%230070f3&dynamic=true"
                  className="h-60 w-full rounded-3xl border border-gray-200 bg-white"
                />
                <iframe
                  title="Iluminación"
                  src="https://thingspeak.com/channels/9/charts/2?bgcolor=%23ffffff&color=%23f59e0b&dynamic=true"
                  className="h-60 w-full rounded-3xl border border-gray-200 bg-white"
                />
                <iframe
                  title="Presencia"
                  src="https://thingspeak.com/channels/9/charts/3?bgcolor=%23ffffff&color=%233cb371&dynamic=true"
                  className="h-60 w-full rounded-3xl border border-gray-200 bg-white"
                />
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Setpoints activos</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">Temperatura objetivo</p>
                  <p className="mt-2 text-2xl font-semibold text-cyan-600">24°C</p>
                </div>
                <div className="rounded-3xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">Iluminación objetivo</p>
                  <p className="mt-2 text-2xl font-semibold text-amber-600">420 lux</p>
                </div>
                <div className="rounded-3xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">Modo</p>
                  <p className="mt-2 text-2xl font-semibold text-emerald-600">Adaptivo</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Control de actuadores</p>
              <div className="mt-6 grid gap-4">
                <button className="rounded-3xl bg-cyan-500 px-5 py-4 text-left text-sm font-semibold text-white transition hover:bg-cyan-600">
                  Ventilación: Encendida
                </button>
                <button className="rounded-3xl bg-amber-500 px-5 py-4 text-left text-sm font-semibold text-white transition hover:bg-amber-600">
                  Iluminación: Automática
                </button>
                <button className="rounded-3xl border border-gray-300 bg-gray-50 px-5 py-4 text-left text-sm text-gray-700 transition hover:border-cyan-400 hover:bg-cyan-50">
                  Ver modo adaptativo
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">Resumen rápido</p>
              <ul className="mt-6 space-y-4 text-gray-700">
                <li className="flex items-center gap-3 rounded-3xl bg-gray-50 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-600">1</span>
                  Temperatura y luz balanceadas para bienestar y eficiencia.
                </li>
                <li className="flex items-center gap-3 rounded-3xl bg-gray-50 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">2</span>
                  Interfaz accesible diseñada para usuarios no técnicos.
                </li>
                <li className="flex items-center gap-3 rounded-3xl bg-gray-50 p-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">3</span>
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
