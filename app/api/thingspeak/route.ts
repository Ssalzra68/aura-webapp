import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const field = searchParams.get("field");
    const results = searchParams.get("results") ?? "60";

    const channelId = process.env.THINGSPEAK_CHANNEL_ID;
    const apiKey = process.env.THINGSPEAK_READ_API_KEY;

    if (!channelId || !apiKey) {
        return NextResponse.json(
            { error: "Faltan variables de entorno de ThingSpeak" },
            { status: 500 }
        );
    }

    const url =
        field && field !== "all"
            ? new URL(`https://api.thingspeak.com/channels/${channelId}/fields/${field}.json`)
            : new URL(`https://api.thingspeak.com/channels/${channelId}/feeds.json`);

    url.searchParams.set("api_key", apiKey);
    url.searchParams.set("results", results);

    const response = await fetch(url.toString(), {
        cache: "no-store",
    });

    if (!response.ok) {
        return NextResponse.json(
            { error: "No se pudo leer ThingSpeak" },
            { status: response.status }
        );
    }

    const data = await response.json();

    return NextResponse.json(data);
}