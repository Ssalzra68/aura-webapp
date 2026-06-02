"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabaseClient";

export default function ResetPasswordPage() {
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");

        if (password.length < 6) {
            setMessage("La contrase\u00f1a debe tener al menos 6 caracteres.");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Las contrase\u00f1as no coinciden.");
            return;
        }

        setLoading(true);

        const supabase = createSupabaseClient();

        const { error } = await supabase.auth.updateUser({
            password,
        });

        setLoading(false);

        if (error) {
            console.error("Error actualizando contrase\u00f1a:", error.message);
            setMessage("No se pudo cambiar la contrase\u00f1a.");
            return;
        }

        setMessage("Contrase\u00f1a actualizada correctamente.");

        setTimeout(() => {
            router.push("/login");
        }, 1500);
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-white px-6">
            <form
                onSubmit={handleResetPassword}
                className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
            >
                <h1 className="text-3xl font-semibold text-sky-900">
                    {"Cambiar contrase\u00f1a"}
                </h1>

                <p className="mt-3 text-sm text-gray-600">
                    {"Ingresa tu nueva contrase\u00f1a para recuperar el acceso."}
                </p>

                <div className="mt-6">
                    <label className="text-sm font-medium text-gray-700">
                        {"Nueva contrase\u00f1a"}
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={"Nueva contrase\u00f1a"}
                        className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-sky-500"
                    />
                </div>

                <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700">
                        {"Confirmar contrase\u00f1a"}
                    </label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={"Confirmar contrase\u00f1a"}
                        className="mt-2 w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-sky-500"
                    />
                </div>

                {message && (
                    <p className="mt-4 text-sm text-gray-600">{message}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 w-full rounded-3xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60"
                >
                    {loading ? "Actualizando..." : "Actualizar contrase\u00f1a"}
                </button>
            </form>
        </main>
    );
}