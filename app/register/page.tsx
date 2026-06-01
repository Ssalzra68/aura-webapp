"use client";

import Image from "next/image";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseClient } from "@/lib/supabaseClient";
import { validatePasswordStrength } from "@/lib/utils/passwordValidation";

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
                            <span className="mb-2 block text-sm font-medium text-gray-700">Contraseña</span>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                                placeholder="Contraseña segura"
                            />
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
                        <span className="mb-2 block text-sm font-medium text-gray-700">Confirmar contraseña</span>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full rounded-2xl border ${confirmPassword && !passwordsMatch ? "border-rose-300" : "border-gray-300"
                                } bg-gray-50 px-4 py-3 text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200`}
                            placeholder="Repite tu contraseña"
                        />
                        {confirmPassword && !passwordsMatch && (
                            <p className="mt-1 text-xs text-rose-600">Las contraseñas no coinciden</p>
                        )}
                        {confirmPassword && passwordsMatch && (
                            <p className="mt-1 text-xs text-emerald-600">✓ Las contraseñas coinciden</p>
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