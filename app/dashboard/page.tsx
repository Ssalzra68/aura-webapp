"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabaseClient";
import ThingSpeakChart from "@/components/ThingSpeakChart";
import ThingSpeakLatestTable from "@/components/ThingSpeakLatestTable";
import DeviceControlCard from "@/components/DeviceControlCard";

export default function DashboardPage() {
    const router = useRouter();
    const [userName, setUserName] = useState("");
    const [loadingUser, setLoadingUser] = useState(true);
    type DeviceMode = "auto" | "manual";

    type DeviceProfile = "STUDY" | "WORK" | "CHILL" | "MUSIC";

    type DeviceControl = {
        device_id: "fan" | "light";
        label: string;
        mode: DeviceMode;
        manual_state: boolean;
        profile?: DeviceProfile;
    };

    const [controls, setControls] = useState<{
        fan: DeviceControl | null;
        light: DeviceControl | null;
    }>({
        fan: null,
        light: null,
    });

    const [savingDevice, setSavingDevice] = useState<"fan" | "light" | null>(null);
    const [latestTemperature, setLatestTemperature] = useState<number | null>(null);
    const [latestLight, setLatestLight] = useState<number | null>(null);
    const [presenceDetected, setPresenceDetected] = useState<boolean | null>(null);
    const [presenceAverage, setPresenceAverage] = useState<number | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createSupabaseClient();
            const { data } = await supabase.auth.getUser();
            const user = data?.user;

            if (!user) {
                // No hay sesión: redirige al login
                router.push("/login");
                return;
            }

            const meta = user.user_metadata as Record<string, unknown> | undefined;
            const fullName =
                (meta?.full_name as string) ||
                (meta?.name as string) ||
                user.email ||
                "";

            setUserName(fullName);
            setLoadingUser(false);
        };

        void fetchUser();
    }, [router]);
    useEffect(() => {
        const loadPresence = async () => {
            try {
                const response = await fetch(
                    `/api/thingspeak?field=1&results=30&t=${Date.now()}`,
                    {
                        cache: "no-store",
                    }
                );

                const json = await response.json();

                const feeds = json.feeds ?? [];

                const presenceHoldMs = 5 * 60 * 1000; // 5 minutos
                const now = Date.now();

                const detections = feeds
                    .map((feed: { created_at: string; field1?: string | null }) => {
                        return {
                            time: new Date(feed.created_at).getTime(),
                            value: Number(feed.field1),
                        };
                    })
                    .filter(
                        (point: { time: number; value: number }) =>
                            !Number.isNaN(point.value) && point.value >= 1
                    );

                const latestDetection = detections.at(-1);

                if (!latestDetection) {
                    setPresenceDetected(false);
                    setPresenceAverage(null);
                    return;
                }

                const timeSinceLastDetection = now - latestDetection.time;

                setPresenceDetected(timeSinceLastDetection <= presenceHoldMs);
                setPresenceAverage(latestDetection.value);
            } catch (error) {
                console.error("Error leyendo presencia:", error);
                setPresenceDetected(null);
                setPresenceAverage(null);
            }
        };

        void loadPresence();

        const intervalId = window.setInterval(() => {
            void loadPresence();
        }, 15000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        const loadControls = async () => {
            const supabase = createSupabaseClient();

            const { data, error } = await supabase
                .from("device_controls")
                .select("*")
                .in("device_id", ["fan", "light"]);

            if (error) {
                console.error("Error cargando controles:", error.message);
                return;
            }

            const fan = data.find((item) => item.device_id === "fan") ?? null;
            const light = data.find((item) => item.device_id === "light") ?? null;

            setControls({
                fan,
                light,
            });
        };

        void loadControls();
    }, []);

    if (loadingUser) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-white text-gray-900">
                <div className="text-center">
                    <p className="text-lg font-medium text-gray-700">Comprobando sesión…</p>
                </div>
            </main>
        );
    }

    const handleLogout = async () => {
        const supabase = createSupabaseClient();
        await supabase.auth.signOut();
        router.push("/login");
    };

    const updateDeviceControl = async (
        deviceId: "fan" | "light",
        changes: Partial<Pick<DeviceControl, "mode" | "manual_state" | "profile">>
    ) => {
        setSavingDevice(deviceId);

        const supabase = createSupabaseClient();

        const { data, error } = await supabase
            .from("device_controls")
            .update({
                ...changes,
                updated_at: new Date().toISOString(),
            })
            .eq("device_id", deviceId)
            .select()
            .single();

        setSavingDevice(null);

        if (error) {
            console.error("Error enviando comando:", error.message);
            return;
        }

        setControls((prev) => ({
            ...prev,
            [deviceId]: data,
        }));
    };
    const profileOptions: {
        value: DeviceProfile;
        label: string;
        description: string;
    }[] = [
            {
                value: "STUDY",
                label: "Estudio",
                description: "Luz fria y mayor intensidad.",
            },
            {
                value: "WORK",
                label: "Trabajo",
                description: "Luz neutra para concentracion.",
            },
            {
                value: "CHILL",
                label: "Relajacion",
                description: "Luz calida e intensidad media.",
            },
            {
                value: "MUSIC",
                label: "Musica",
                description: "Luz calida e intensidad baja.",
            },
        ];

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

                <section className="space-y-6">
                    <div className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <article className="rounded-3xl border border-gray-200 bg-white p-4 shadow-lg">
                                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Temperatura</p>
                                <p className="mt-3 text-4xl font-semibold text-cyan-600">
                                    {latestTemperature !== null
                                        ? `${latestTemperature.toFixed(1)}°C`
                                        : "-- °C"}
                                </p>
                                <p className="mt-2 text-sm text-gray-600">Umbral activo 25.0°C</p>
                            </article>
                            <article className="rounded-3xl border border-gray-200 bg-white p-4 shadow-lg">
                                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Iluminación</p>
                                <p className="mt-3 text-4xl font-semibold text-amber-600">
                                    {latestLight !== null
                                        ? `${latestLight.toFixed(0)} lux`
                                        : "-- lux"}
                                </p>
                                <p className="mt-2 text-sm text-gray-600">Umbral recomendado 400 lux</p>
                            </article>
                            <article className="rounded-3xl border border-gray-200 bg-white p-4 shadow-lg">
                                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                                    Presencia
                                </p>

                                <p
                                    className={`mt-3 text-3xl font-semibold ${presenceDetected === null
                                            ? "text-gray-400"
                                            : presenceDetected
                                                ? "text-emerald-600"
                                                : "text-red-500"
                                        }`}
                                >
                                    {presenceDetected === null
                                        ? "Sin datos"
                                        : presenceDetected
                                            ? "Detectada"
                                            : "No detectada"}
                                </p>

                                <p className="mt-2 text-sm text-gray-600">
                                    Se mantiene activa si hubo deteccion en los ultimos 5 minutos
                                </p>
                            </article>
                        </div>

                        <section className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg">
                            <div className="mb-6">
                                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                                    Control de actuadores
                                </p>
                                <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                                    Modo de operacion del sistema
                                </h2>
                                <p className="mt-2 text-sm text-gray-600">
                                    {"En modo autom\u00e1tico, la Raspberry controla el actuador usando los umbrales locales. En modo manual, el usuario puede encenderlo o apagarlo desde el dashboard."}
                                </p>
                            </div>

                            <div className="grid gap-4 lg:grid-cols-2">
                                                              

                                <DeviceControlCard
                                    title="Iluminacion"
                                    imageSrc="/Luz.png"
                                    variant="light"
                                    mode={controls.light?.mode ?? "auto"}
                                    manualState={controls.light?.manual_state ?? false}
                                    saving={savingDevice === "light"}
                                    onModeChange={(mode) =>
                                        updateDeviceControl("light", { mode })
                                    }
                                    onManualStateChange={(state) =>
                                        updateDeviceControl("light", {
                                            mode: "manual",
                                            manual_state: state,
                                        })
                                    }
                                />

                                <div className="mt-4 rounded-3xl border border-amber-200 bg-amber-50 p-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Perfil de iluminaci{"\u00f3"}n autom{"\u00e1"}tica
                                    </label>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Este perfil se usa cuando el bombillo est{"\u00e1"} en modo autom{"\u00e1"}tico.
                                    </p>

                                    <div className="mt-5 space-y-3">
                                        {profileOptions.map((profile) => {
                                            const isSelected =
                                                (controls.light?.profile ?? "STUDY") === profile.value;

                                            return (
                                                <button
                                                    key={profile.value}
                                                    type="button"
                                                    disabled={savingDevice === "light"}
                                                    onClick={() =>
                                                        updateDeviceControl("light", {
                                                            profile: profile.value,
                                                        })
                                                    }
                                                    className={`w-full rounded-2xl border px-4 py-4 text-left transition ${isSelected
                                                            ? "border-amber-500 bg-amber-500 text-white shadow-md"
                                                            : "border-amber-200 bg-white text-gray-700 hover:border-amber-400 hover:bg-amber-100"
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between gap-3">
                                                        <div>
                                                            <p className="text-base font-semibold">
                                                                {profile.label}
                                                            </p>

                                                            <p
                                                                className={`mt-1 text-sm ${isSelected ? "text-amber-50" : "text-gray-500"
                                                                    }`}
                                                            >
                                                                {profile.description}
                                                            </p>
                                                        </div>

                                                        {isSelected && (
                                                            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                                                                Activo
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </section>

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
                                <ThingSpeakChart
                                    title="Temperatura"
                                    field={2}
                                    unit="°C"
                                    refreshMs={20000}
                                    onLatestValue={setLatestTemperature}
                                />

                                <ThingSpeakChart
                                    title="Iluminación"
                                    field={3}
                                    unit="lux"
                                    refreshMs={20000}
                                    onLatestValue={setLatestLight}
                                />
                            </div>

                            <ThingSpeakLatestTable
                                refreshMs={15000}
                                fields={[
                                    { key: "field2", label: "Temperatura", unit: "°C" },
                                    { key: "field3", label: "Iluminación", unit: "lux" },
                                    { key: "field1", label: "Presencia", unit: "" },
                                ]}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}