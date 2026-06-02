"use client";

import { useEffect, useState } from "react";

type Feed = {
    created_at: string;
    field1?: string | null;
    field2?: string | null;
    field3?: string | null;
    field4?: string | null;
    field5?: string | null;
    field6?: string | null;
    field7?: string | null;
    field8?: string | null;
};

type FieldConfig = {
    key: keyof Feed;
    label: string;
    unit?: string;
};

type ThingSpeakLatestTableProps = {
    fields: FieldConfig[];
    refreshMs?: number;
};

export default function ThingSpeakLatestTable({
    fields,
    refreshMs = 15000,
}: ThingSpeakLatestTableProps) {
    const [feeds, setFeeds] = useState<Feed[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(
                    `/api/thingspeak?field=all&results=10&t=${Date.now()}`,
                    {
                        cache: "no-store",
                    }
                );

                const json = await response.json();

                setFeeds((json.feeds ?? []).slice().reverse());
                setLastUpdate(new Date().toLocaleTimeString());
            } catch (error) {
                console.error("Error leyendo tabla general:", error);
            } finally {
                setLoading(false);
            }
        };

        void loadData();

        const intervalId = window.setInterval(() => {
            void loadData();
        }, refreshMs);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [refreshMs]);

    return (
        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                        Lecturas recientes
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-gray-900">
                        Ultimos 10 datos registrados
                    </h2>
                </div>

                {lastUpdate && (
                    <p className="text-sm text-gray-400">
                        Actualizado: {lastUpdate}
                    </p>
                )}
            </div>

            {loading ? (
                <div className="flex h-32 items-center justify-center text-sm text-gray-500">
                    Cargando datos...
                </div>
            ) : feeds.length === 0 ? (
                <div className="flex h-32 items-center justify-center text-sm text-gray-500">
                    No hay datos disponibles.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="rounded-l-2xl px-4 py-3">Hora</th>

                                {fields.map((field) => (
                                    <th key={field.key} className="px-4 py-3">
                                        {field.label}
                                    </th>
                                ))}

                                <th className="rounded-r-2xl px-4 py-3">Fecha</th>
                            </tr>
                        </thead>

                        <tbody>
                            {feeds.map((feed, index) => {
                                const date = new Date(feed.created_at);

                                return (
                                    <tr
                                        key={`${feed.created_at}-${index}`}
                                        className="border-b border-gray-100 last:border-0"
                                    >
                                        <td className="px-4 py-3 font-medium text-gray-700">
                                            {date.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                second: "2-digit",
                                            })}
                                        </td>

                                        {fields.map((field) => {
                                            const rawValue = feed[field.key];
                                            const value = Number(rawValue);

                                            return (
                                                <td
                                                    key={field.key}
                                                    className="px-4 py-3 text-gray-700"
                                                >
                                                    {rawValue === null ||
                                                        rawValue === undefined ||
                                                        Number.isNaN(value)
                                                        ? "--"
                                                        : `${value.toFixed(2)} ${field.unit ?? ""
                                                        }`}
                                                </td>
                                            );
                                        })}

                                        <td className="px-4 py-3 text-gray-500">
                                            {date.toLocaleDateString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}