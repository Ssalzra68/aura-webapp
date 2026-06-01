"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabaseClient";

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const handleCallback = async () => {
            const supabase = createSupabaseClient();

            try {
                const url = new URL(window.location.href);
                const code = url.searchParams.get("code");
                const next = url.searchParams.get("next") ?? "/dashboard";

                if (code) {
                    const { error } = await supabase.auth.exchangeCodeForSession(code);

                    if (error) {
                        console.error("Error al intercambiar el codigo:", error.message);
                        router.replace("/login?error=auth_failed");
                        return;
                    }
                }

                const {
                    data: { session },
                    error,
                } = await supabase.auth.getSession();

                if (error) {
                    console.error("Error al obtener la sesion:", error.message);
                    router.replace("/login?error=auth_failed");
                    return;
                }

                if (!session) {
                    router.replace("/login?error=no_session");
                    return;
                }

                router.replace(next);
            } catch (error) {
                console.error("Error en callback:", error);
                router.replace("/login?error=callback_error");
            }
        };

        handleCallback();
    }, [router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <div className="text-center">
                <div className="mb-4 inline-flex h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-cyan-500" />
                <p className="text-sm font-medium text-gray-600">
                    Procesando autenticacion con Google...
                </p>
                <p className="mt-2 text-xs text-gray-400">
                    Por favor espera, estamos configurando tu sesion.
                </p>
            </div>
        </div>
    );
}