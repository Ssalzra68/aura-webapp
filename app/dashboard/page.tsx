"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

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

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="rounded-full border border-gray-300 bg-white p-2 text-gray-700 shadow-sm transition hover:bg-gray-100"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-gray-200 bg-white shadow-lg z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-gray-700 transition hover:bg-gray-50 rounded-t-2xl"
                  >
                    Editar perfil
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50 rounded-b-2xl border-t border-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
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
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">Ventilación</p>
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-24 w-24">
                  <Image
                    src="/Ventilador.png"
                    alt="Ventilador"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="w-full text-center">
                  <p className="text-sm text-gray-600">Estado actual</p>
                  <p className="mt-1 text-2xl font-semibold text-cyan-600">Encendida</p>
                </div>
                <button className="w-full rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600">
                  Control
                </button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-6">Iluminación</p>
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-24 w-24">
                  <Image
                    src="/Luz.png"
                    alt="Iluminación"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="w-full text-center">
                  <p className="text-sm text-gray-600">Estado actual</p>
                  <p className="mt-1 text-2xl font-semibold text-amber-600">Automática</p>
                </div>
                <button className="w-full rounded-3xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600">
                  Control
                </button>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
