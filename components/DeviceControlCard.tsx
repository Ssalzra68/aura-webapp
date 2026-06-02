"use client";

import Image from "next/image";

type DeviceMode = "auto" | "manual";

type DeviceControlCardProps = {
    title: string;
    imageSrc: string;
    variant: "fan" | "light";
    mode: DeviceMode;
    manualState: boolean;
    saving?: boolean;
    onModeChange: (mode: DeviceMode) => void;
    onManualStateChange: (state: boolean) => void;
};

export default function DeviceControlCard({
    title,
    imageSrc,
    variant,
    mode,
    manualState,
    saving = false,
    onModeChange,
    onManualStateChange,
}: DeviceControlCardProps) {
    const isFan = variant === "fan";

    const accentText = isFan ? "text-cyan-600" : "text-amber-600";
    const accentBg = isFan ? "bg-cyan-500" : "bg-amber-500";
    const accentHover = isFan ? "hover:bg-cyan-600" : "hover:bg-amber-600";
    const softBg = isFan ? "bg-cyan-50" : "bg-amber-50";
    const borderColor = isFan ? "border-cyan-200" : "border-amber-200";

    return (
        <article className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                        {title}
                    </p>

                    <h3 className={`mt-3 text-2xl font-semibold ${accentText}`}>
                        {mode === "auto" ? "Modo automatico" : "Modo manual"}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600">
                        {mode === "auto"
                            ? "La Raspberry controla este actuador con los umbrales definidos."
                            : "El usuario controla directamente el encendido y apagado."}
                    </p>
                </div>

                <div className={`relative h-20 w-20 rounded-3xl ${softBg} p-3`}>
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-contain p-3"
                    />
                </div>
            </div>

            <div className="mt-6 rounded-3xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">Estado solicitado</p>

                <p
                    className={`mt-1 text-xl font-semibold ${manualState ? "text-emerald-600" : "text-gray-500"
                        }`}
                >
                    {mode === "auto"
                        ? "Control automatico activo"
                        : manualState
                            ? "Encendido"
                            : "Apagado"}
                </p>
            </div>

            <div className="mt-6">
                <p className="mb-3 text-sm font-medium text-gray-700">
                    Selecciona el modo de control
                </p>

                <div className="grid grid-cols-2 gap-3 rounded-3xl bg-gray-100 p-2">
                    <button
                        type="button"
                        disabled={saving}
                        onClick={() => onModeChange("auto")}
                        className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${mode === "auto"
                                ? `${accentBg} text-white shadow`
                                : "text-gray-600 hover:bg-white"
                            }`}
                    >
                        Automatico
                    </button>

                    <button
                        type="button"
                        disabled={saving}
                        onClick={() => onModeChange("manual")}
                        className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${mode === "manual"
                                ? `${accentBg} text-white shadow`
                                : "text-gray-600 hover:bg-white"
                            }`}
                    >
                        Manual
                    </button>
                </div>
            </div>

            {mode === "manual" && (
                <div className={`mt-6 rounded-3xl border ${borderColor} ${softBg} p-4`}>
                    <p className="mb-3 text-sm font-medium text-gray-700">
                        Control manual
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            disabled={saving}
                            onClick={() => onManualStateChange(true)}
                            className={`rounded-2xl px-4 py-3 text-sm font-semibold text-white transition ${accentBg} ${accentHover} disabled:opacity-60`}
                        >
                            Encender
                        </button>

                        <button
                            type="button"
                            disabled={saving}
                            onClick={() => onManualStateChange(false)}
                            className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-60"
                        >
                            Apagar
                        </button>
                    </div>
                </div>
            )}

            {saving && (
                <p className="mt-4 text-sm text-gray-400">
                    Enviando comando...
                </p>
            )}
        </article>
    );
}