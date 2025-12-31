// app/api/analytics/route.js
import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.FIREBASE_A_CLIENT_EMAIL,
    private_key: process.env.FIREBASE_A_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
});

export async function GET() {
  try {
    const propertyId = process.env.GA4_A_PROPERTY_ID;

    // --- 1️⃣ Historical Page Views (last 14 days)
    const [pageViewsResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "14daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "screenPageViews" }],
    });

    // --- 2️⃣ Historical Clicks (last 14 days)
    const [clicksResponse] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: "14daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          stringFilter: { value: "click" },
        },
      },
    });

    let pageViews =
      pageViewsResponse.rows?.map((r) => ({
        date: r.dimensionValues[0].value,
        value: Number(r.metricValues[0].value),
      })) || [];

    let clicks =
      clicksResponse.rows?.map((r) => ({
        date: r.dimensionValues[0].value,
        value: Number(r.metricValues[0].value),
      })) || [];

    // --- 3️⃣ Realtime Fallback if no data yet
    if (pageViews.length === 0 || clicks.length === 0) {
      console.log("Falling back to realtime data...");
      const [realtimeResponse] = await analyticsDataClient.runRealtimeReport({
        property: `properties/${propertyId}`,
        metrics: [{ name: "eventCount" }],
        dimensions: [{ name: "eventName" }],
      });

      const realtimeData = realtimeResponse.rows?.map((r) => ({
        name: r.dimensionValues[0].value,
        count: Number(r.metricValues[0].value),
      }));

      const realtimeViews =
        realtimeData?.find((r) => r.name === "page_view")?.count || 0;
      const realtimeClicks =
        realtimeData?.find((r) => r.name === "click")?.count || 0;

      // Populate fallback with today’s date
      const today = new Date().toISOString().slice(0, 10);
      if (pageViews.length === 0)
        pageViews = [{ date: today, value: realtimeViews }];
      if (clicks.length === 0)
        clicks = [{ date: today, value: realtimeClicks }];
    }

    return NextResponse.json({ pageViews, clicks });
  } catch (error) {
    console.error("GA4 API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
