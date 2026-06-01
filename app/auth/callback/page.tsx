"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabaseClient";

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const supabase = createSupabaseClient();
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.error("Error de autenticación:", error);
                    router.push("/login?error=auth_failed");
                    return;
                }

                if (data?.session) {
                    router.push("/dashboard");
                } else {
                    router.push("/login");
                }
            } catch (error) {
                console.error("Error en callback:", error);
                router.push("/login?error=callback_error");
            }
        };

        handleCallback();
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="text-center">
                <div className="inline-flex h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-cyan-500 mb-4"></div>
                <p className="text-gray-600 text-sm font-medium">Procesando autenticación con Google...</p>
                <p className="text-gray-400 text-xs mt-2">Por favor espera, estamos configurando tu sesión.</p>
            </div>
        </div>
    );
}