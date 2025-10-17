import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { eventName, eventData, pixelId } = body;
    const actionSource = "WEBSITE"; // atau "APP" sesuai kebutuhan

    const res = await fetch(
      `https://ads-api.reddit.com/api/v3/pixels/${pixelId}/conversion_events`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_REDDIT_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            events: [
              {
                event_at: Date.now(),            // atau body.timestamp
                action_source: actionSource,
                type: {
                  tracking_type: "CUSTOM",
                  custom_event_name: eventName,
                },
                user: eventData,       // objek metadata
              },
            ],
          },
        }),
      }
    );

    const json = await res.json();
    return NextResponse.json(json, { status: res.status });
  } catch (err: any) {
    console.error("Reddit API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
