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
};

export default function ThingSpeakChart({
    title,
    field,
    unit = "",
}: ThingSpeakChartProps) {
    const [data, setData] = useState<ChartPoint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch(
                    `/api/thingspeak?field=${field}&results=60`
                );

                const json = await response.json();

                const points = json.feeds
                    .map((feed: Feed) => {
                        const rawValue = feed[`field${field}`];

                        return {
                            time: new Date(feed.created_at).toLocaleTimeString(),
                            value: Number(rawValue),
                        };
                    })
                    .filter((point: ChartPoint) => !Number.isNaN(point.value));

                setData(points);
            } catch (error) {
                console.error("Error leyendo ThingSpeak:", error);
            } finally {
                setLoading(false);
            }
        };

        void loadData();
    }, [field]);

    return (
        <div className="h-[300px] w-full rounded-3xl border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-gray-700">{title}</h3>

            {loading ? (
                <div className="flex h-[220px] items-center justify-center text-sm text-gray-500">
                    Cargando datos...
                </div>
            ) : data.length === 0 ? (
                <div className="flex h-[220px] items-center justify-center text-sm text-gray-500">
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