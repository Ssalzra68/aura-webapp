"use client";

import Image from "next/image";
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
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

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
      setMessageType("error");
      setMessage(error.message);
      return;
    }

    router.push("/dashboard");
  };

  const handleForgotPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForgotLoading(true);
    setMessage(null);

    const supabase = createSupabaseClient();

    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback?next=/reset-password`,
    });

    setForgotLoading(false);

    if (error) {
      setMessageType("error");
      setMessage(error.message);
      return;
    }

    setMessageType("success");
    setMessage("Se ha enviado un enlace de recuperación a tu correo electrónico. Por favor, revisa tu bandeja de entrada.");
    setTimeout(() => {
      setShowForgotPassword(false);
      setForgotEmail("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 text-gray-900 sm:px-10 lg:px-16">
      <div className="mb-8 flex items-center">
        <Link href="/" aria-label="Volver al inicio" className="inline-flex items-center rounded-2xl transition hover:opacity-90">
          <Image src="/AURA.png" alt="AURA logo" width={44} height={44} className="rounded-2xl" />
        </Link>
      </div>
      <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-cyan-100 px-4 py-1 text-xs uppercase tracking-[0.3em] text-cyan-700 ring-1 ring-cyan-200">
            {showForgotPassword ? "Recuperar contraseña" : "Acceso Aura IoT"}
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            {showForgotPassword
              ? "Recupera tu contraseña"
              : "Inicia sesión para acceder al panel."}
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-gray-600">
            {showForgotPassword
              ? "Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña."
              : "Controla tu ambiente inteligente, revisa datos en tiempo real y administra tus actuadores desde una interfaz clara y moderna."}
          </p>
        </div>

        {!showForgotPassword ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Correo electrónico</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="usuario@ejemplo.com"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Contraseña</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="********"
              />
            </label>

            {message ? (
              <div className={`rounded-2xl border px-4 py-3 text-sm ${
                messageType === "error"
                  ? "border-rose-300 bg-rose-50 text-rose-700"
                  : "border-emerald-300 bg-emerald-50 text-emerald-700"
              }`}>
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Conectando…" : "Iniciar sesión"}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(true);
                  setMessage(null);
                }}
                className="text-sm text-cyan-600 transition hover:text-cyan-700 font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Correo electrónico</span>
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="usuario@ejemplo.com"
              />
            </label>

            {message ? (
              <div className={`rounded-2xl border px-4 py-3 text-sm ${
                messageType === "error"
                  ? "border-rose-300 bg-rose-50 text-rose-700"
                  : "border-emerald-300 bg-emerald-50 text-emerald-700"
              }`}>
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={forgotLoading}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {forgotLoading ? "Enviando…" : "Enviar enlace de recuperación"}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                setMessage(null);
                setForgotEmail("");
              }}
              className="w-full text-sm text-gray-600 transition hover:text-gray-900 font-medium"
            >
              ← Volver a iniciar sesión
            </button>
          </form>
        )}

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-gray-600 sm:flex-row">
          <p>¿No tienes cuenta?</p>
          <Link href="/register" className="font-semibold text-cyan-600 transition hover:text-cyan-700">
            Crear cuenta ahora
          </Link>
        </div>
      </div>
    </div>
  );
}