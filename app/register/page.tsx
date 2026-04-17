"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const supabase = createSupabaseClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 text-gray-900 sm:px-10 lg:px-16">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-3 text-lg font-semibold text-amber-600 transition hover:text-amber-700">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">A</span>
          AURA
        </Link>
      </div>
      <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-4 py-1 text-xs uppercase tracking-[0.3em] text-amber-700 ring-1 ring-amber-200">
            Registro de usuarios
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Únete a Aura y empieza a controlar tu ambiente.
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-gray-600">
            Registra tu cuenta y accede a un panel IoT intuitivo creado para que cualquier usuario comprenda fácilmente los datos importantes de su entorno.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">Nombre completo</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              placeholder="Ej. María Pérez"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">Correo electrónico</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              placeholder="usuario@ejemplo.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">Contraseña</span>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              placeholder="Mínimo 8 caracteres"
            />
          </label>

          {message ? (
            <p className="rounded-2xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {message}
            </p>
          ) : (
            <p className="rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-600">
              Recibirás un correo de confirmación si tu proveedor de Supabase lo requiere.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creando cuenta…" : "Crear mi cuenta"}
          </button>
        </form>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-gray-200 pt-6 text-sm text-gray-600 sm:flex-row">
          <p>¿Ya tienes cuenta?</p>
          <Link href="/login" className="font-semibold text-amber-600 transition hover:text-amber-700">
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
