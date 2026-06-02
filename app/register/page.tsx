"use client";

import Image from "next/image";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabaseClient";

interface PasswordStrength {
  score: number;
  isValid: boolean;
  feedback: string[];
}

function validatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push("Mínimo 8 caracteres");
  }

  if (password.length >= 12) {
    score += 1;
  } else if (password.length >= 8) {
    feedback.push("Se recomienda 12 o más caracteres");
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Incluye letras minúsculas");
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Incluye letras mayúsculas");
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Incluye números");
  }

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1;
  } else {
    feedback.push("Incluye caracteres especiales (!@#$%^&* etc.)");
  }

  return {
    score,
    isValid: score >= 4,
    feedback,
  };
}

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [messageType, setMessageType] = useState<"error" | "success">("error");

    const passwordValidation = validatePasswordStrength(password);
    const passwordsMatch = password === confirmPassword && password.length > 0;
    const canSubmit = passwordValidation.isValid && passwordsMatch && name && email;

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setMessage(null);

        if (!passwordValidation.isValid) {
            setMessageType("error");
            setMessage("La contraseña no cumple con los requisitos mínimos de seguridad.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setMessageType("error");
            setMessage("Las contraseñas no coinciden.");
            setLoading(false);
            return;
        }

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
            setMessageType("error");
            setMessage(error.message);
            return;
        }

        setMessageType("success");
        setMessage("¡Cuenta creada exitosamente! Redirigiendo al panel...");
        setTimeout(() => {
            router.push("/dashboard");
        }, 1500);
    };

    const getPasswordStrengthColor = () => {
        if (passwordValidation.score < 2) return "bg-rose-500";
        if (passwordValidation.score < 4) return "bg-amber-500";
        return "bg-emerald-500";
    };

    const getPasswordStrengthText = () => {
        if (passwordValidation.score < 2) return "Muy débil";
        if (passwordValidation.score < 4) return "Débil";
        if (passwordValidation.score < 5) return "Buena";
        return "Muy fuerte";
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

                    <div className="space-y-3">
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-gray-700">
                                Contraseña
                            </span>

                            <div className="relative">
                                <input
                                    type={showRegisterPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                                    placeholder="Contraseña segura"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
                                    aria-label={
                                        showRegisterPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                                    }
                                >
                                    {showRegisterPassword ? (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.066 7.5a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </label>

                        {password && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-600">Fortaleza de contraseña:</span>
                                    <span className={`text-xs font-semibold ${passwordValidation.score < 2 ? "text-rose-600" :
                                            passwordValidation.score < 4 ? "text-amber-600" :
                                                "text-emerald-600"
                                        }`}>
                                        {getPasswordStrengthText()}
                                    </span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                        style={{ width: `${(passwordValidation.score / 6) * 100}%` }}
                                    />
                                </div>

                                {passwordValidation.feedback.length > 0 && (
                                    <ul className="text-xs text-gray-600 space-y-1 mt-2">
                                        {passwordValidation.feedback.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                <span className="text-amber-600 mt-0.5">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-gray-700">
                            Confirmar contraseña
                        </span>

                        <div className="relative">
                            <input
                                type={showRegisterConfirmPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`w-full rounded-2xl border ${confirmPassword && !passwordsMatch ? "border-rose-300" : "border-gray-300"
                                    } bg-gray-50 px-4 py-3 pr-12 text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200`}
                                placeholder="Repite tu contraseña"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowRegisterConfirmPassword(!showRegisterConfirmPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-700"
                                aria-label={
                                    showRegisterConfirmPassword
                                        ? "Ocultar contraseña"
                                        : "Mostrar contraseña"
                                }
                            >
                                {showRegisterConfirmPassword ? (
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.066 7.5a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L9.88 9.88"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {confirmPassword && !passwordsMatch && (
                            <p className="mt-1 text-xs text-rose-600">
                                Las contraseñas no coinciden
                            </p>
                        )}

                        {confirmPassword && passwordsMatch && (
                            <p className="mt-1 text-xs text-emerald-600">
                                ✓ Las contraseñas coinciden
                            </p>
                        )}
                    </label>

                    {message ? (
                        <div className={`rounded-2xl border px-4 py-3 text-sm ${messageType === "error"
                                ? "border-rose-300 bg-rose-50 text-rose-700"
                                : "border-emerald-300 bg-emerald-50 text-emerald-700"
                            }`}>
                            {message}
                        </div>
                    ) : null}

                    <button
                        type="submit"
                        disabled={loading || !canSubmit}
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