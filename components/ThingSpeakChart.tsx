"use client";

import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

type Feed = {
    created_at: string;
    [key: string]: string | null;
};

type ChartPoint = {
    time: string;
    value: number;
};

type ThingSpeakChartProps = {
    title: string;
    field: number;
    unit?: string;
    refreshMs?: number;
    onLatestValue?: (value: number | null) => void;
};

export default function ThingSpeakChart({
    title,
    field,
    unit = "",
    refreshMs = 15000,
    onLatestValue,
}: ThingSpeakChartProps) {
    const [data, setData] = useState<ChartPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdate, setLastUpdate] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(
                    `/api/thingspeak?field=${field}&results=60&t=${Date.now()}`,
                    {
                        cache: "no-store",
                    }
                );

                const json = await response.json();

                const points: ChartPoint[] = json.feeds
                    .map((feed: Feed) => {
                        const rawValue = feed[`field${field}`];
                        const date = new Date(feed.created_at);

                        return {
                            time: date.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            }),
                            fullTime: date.toLocaleString(),
                            value: Number(rawValue),
                        };
                    })
                    .filter((point: ChartPoint) => !Number.isNaN(point.value));

                setData(points);
                setLastUpdate(new Date().toLocaleTimeString());

                const latestPoint = points[points.length - 1];
                onLatestValue?.(latestPoint ? latestPoint.value : null);
            } catch (error) {
                console.error("Error leyendo ThingSpeak:", error);
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
    }, [field, refreshMs]);

    return (
        <div className="h-[320px] w-full rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
                {lastUpdate && (
                    <p className="text-xs text-gray-400">
                        Actualizado: {lastUpdate}
                    </p>
                )}
            </div>

            {loading ? (
                <div className="flex h-[230px] items-center justify-center text-sm text-gray-500">
                    Cargando datos...
                </div>
            ) : data.length === 0 ? (
                <div className="flex h-[230px] items-center justify-center text-sm text-gray-500">
                    No hay datos disponibles.
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip
                            formatter={(value) => [`${value} ${unit}`, title]}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}