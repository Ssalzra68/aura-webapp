"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createSupabaseClient();
      const { data } = await supabase.auth.getUser();
      const user = data?.user;

      if (!user) {
        return;
      }

      const meta = user.user_metadata as Record<string, unknown> | undefined;
      const fullName =
        (meta?.full_name as string) ||
        (meta?.name as string) ||
        user.email ||
        "";

      setUserName(fullName);
    };

    void fetchUser();
  }, []);

  const handleLogout = async () => {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-white px-6 py-8 text-gray-900 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-sky-700">Bienvenido</p>
            <h1 className="mt-4 text-4xl font-semibold text-sky-900">{userName ? `¡Hola, ${userName}!` : "¡Hola, bienvenido!"}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
              Ahora puedes acceder rápidamente a tus datos ambientales y a los controles de tu espacio inteligente.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="shrink-0 rounded-3xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Cerrar sesión
          </button>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-3xl border border-gray-200 bg-white p-4 shadow-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Temperatura</p>
                <p className="mt-3 text-4xl font-semibold text-cyan-600">22.0°C</p>
                <p className="mt-2 text-sm text-gray-600">Umbral activo 25.0°C</p>
              </article>
              <article className="rounded-3xl border border-gray-200 bg-white p-4 shadow-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Iluminación</p>
                <p className="mt-3 text-4xl font-semibold text-amber-600">500 lux</p>
                <p className="mt-2 text-sm text-gray-600">Umbral recomendado 400 lux</p>
              </article>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Ventilación</p>
                <div className="flex flex-col items-center gap-3">
                  <div className="relative h-20 w-20">
                    <Image
                      src="/Ventilador.png"
                      alt="Ventilador"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="w-full text-center">
                    <p className="text-sm text-gray-600">Estado actual</p>
                    <p className="mt-1 text-xl font-semibold text-cyan-600">Encendida</p>
                  </div>
                  <button className="w-full rounded-3xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-600">
                    Control
                  </button>
                </div>
              </div>
              <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-lg">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Iluminación</p>
                <div className="flex flex-col items-center gap-3">
                  <div className="relative h-20 w-20">
                    <Image
                      src="/Luz.png"
                      alt="Iluminación"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="w-full text-center">
                    <p className="text-sm text-gray-600">Estado actual</p>
                    <p className="mt-1 text-xl font-semibold text-amber-600">Automática</p>
                  </div>
                  <button className="w-full rounded-3xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-600">
                    Control
                  </button>
                </div>
              </div>
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

              <div className="grid gap-4">
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
                </div>
            </div>
          </div>

          <div className="space-y-6">
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
          </div>
        </section>
      </div>
    </main>
  );
}
