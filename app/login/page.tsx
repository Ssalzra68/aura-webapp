"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const supabase = createSupabaseClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-700/70 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-cyan-500/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-300 ring-1 ring-cyan-500/20">
            Acceso Aura IoT
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Inicia sesión para acceder al panel.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-400">
            Controla tu ambiente inteligente, revisa datos en tiempo real y administra tus actuadores desde una interfaz clara y moderna.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">Correo electrónico</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="usuario@ejemplo.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">Contraseña</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="********"
            />
          </label>

          {message ? (
            <p className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Conectando…" : "Iniciar sesión"}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-700/60 pt-6 text-sm text-slate-400 sm:flex-row">
          <p>¿No tienes cuenta?</p>
          <Link href="/register" className="font-semibold text-cyan-300 transition hover:text-cyan-100">
            Crear cuenta ahora
          </Link>
        </div>
      </div>
    </div>
  );
}
