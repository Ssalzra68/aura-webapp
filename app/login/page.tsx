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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"error" | "success">("error");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  // Validar formato de correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);
  const isValidForgotEmail = emailRegex.test(forgotEmail);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!isValidEmail) {
      setMessageType("error");
      setMessage("Por favor ingresa un correo electrónico válido (debe contener @).");
      setLoading(false);
      return;
    }

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

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setMessage(null);
    const supabase = createSupabaseClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback`,
      },
    });

    setGoogleLoading(false);

    if (error) {
      setMessageType("error");
      setMessage(error.message);
      return;
    }
  };

  const handleForgotPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setForgotLoading(true);
    setMessage(null);

    if (!isValidForgotEmail) {
      setMessageType("error");
      setMessage("Por favor ingresa un correo electrónico válido (debe contener @).");
      setForgotLoading(false);
      return;
    }

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
          <>
            <form onSubmit={handleLogin} className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-700">Correo electrónico</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  title="Por favor ingresa un correo electrónico válido (debe contener @)"
                  className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                  placeholder="usuario@ejemplo.com"
                />
                {email && !isValidEmail && (
                  <p className="mt-1 text-xs text-rose-600">⚠️ El correo debe contener @</p>
                )}
                {email && isValidEmail && (
                  <p className="mt-1 text-xs text-emerald-600">✓ Correo válido</p>
                )}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-700">Contraseña</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172l5.656 5.656M9.172 14.828l5.656-5.656" />
                      </svg>
                    )}
                  </button>
                </div>
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
                disabled={loading || !isValidEmail}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Conectando…" : "Iniciar sesión"}
              </button>
            </form>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-xs font-medium text-gray-600">O continúa con</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {googleLoading ? "Conectando…" : "Google"}
            </button>

            <div className="mt-6 text-center">
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
          </>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-700">Correo electrónico</span>
              <input
                type="email"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                title="Por favor ingresa un correo electrónico válido (debe contener @)"
                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                placeholder="usuario@ejemplo.com"
              />
              {forgotEmail && !isValidForgotEmail && (
                <p className="mt-1 text-xs text-rose-600">⚠️ El correo debe contener @</p>
              )}
              {forgotEmail && isValidForgotEmail && (
                <p className="mt-1 text-xs text-emerald-600">✓ Correo válido</p>
              )}
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
              disabled={forgotLoading || !isValidForgotEmail}
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