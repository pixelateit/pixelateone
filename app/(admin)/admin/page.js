// app/(admin)/admin/page.js
"use client";
import AdminQuotesTable from "@/components/AdminQuotesTable";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const [data, setData] = useState({ pageViews: [], clicks: [] });
  const [totalPageViews, setTotalPageViews] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const res = await fetch("/api/analytics");
      const result = await res.json();

      // Sort both arrays by date (ascending)
      const sortedPageViews = [...result.pageViews].sort(
        (a, b) => Number(a.date) - Number(b.date)
      );

      const sortedClicks = [...result.clicks].sort(
        (a, b) => Number(a.date) - Number(b.date)
      );

      setData({
        pageViews: sortedPageViews,
        clicks: sortedClicks,
      });
    };

    fetchAnalytics();
  }, []);

  useEffect(() => {
    setTotalClicks(
      data.clicks.reduce((acc, curr) => acc + Number(curr.value), 0)
    );
    setTotalPageViews(
      data.pageViews.reduce((acc, curr) => acc + Number(curr.value), 0)
    );
  }, [data]);

  function formatDate(dateString) {
    if (!dateString) return "";

    // If date is in "YYYYMMDD" format, convert it to "YYYY-MM-DD"
    const formatted =
      dateString.length === 8
        ? `${dateString.slice(0, 4)}-${dateString.slice(
            4,
            6
          )}-${dateString.slice(6, 8)}`
        : dateString;

    return new Date(formatted).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  const CustomTooltip = ({ active, payload, label, chartType }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const labelText = chartType === "views" ? "Views" : "Clicks";
      return (
        <div className="bg-white font-archivo p-2 rounded shadow text-sm font-medium text-gray-800">
          {`${formatDate(label)} — ${value} ${labelText}`}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-[1080px] py-12">
        <h1
          className="font-archivo font-semibold text-2xl text-[#242222] w-full"
          style={{ letterSpacing: "-0.02em" }}
        >
          Dashboard
        </h1>
        {data?.pageViews.length < 1 && data?.clicks.length < 1 ? (
          <div className="w-full flex flex-row gap-4 mt-6 flex-wrap md:flex-nowrap">
            <div className="w-full min-w-[320px] h-[190px] bg-[#E5E5E5] border border-[#ddd] rounded-lg animate-pulse" />
            <div className="w-full min-w-[320px] h-[190px] bg-[#E5E5E5] border border-[#ddd] rounded-lg animate-pulse" />
          </div>
        ) : (
          <div className="w-full flex flex-row gap-4 mt-6 flex-wrap md:flex-nowrap">
            {/* Chart 1: User Activity Over Time */}
            <div className="w-full overflow-hidden bg-white min-w-[320px] border border-[#ddd] rounded-lg shadow-sm">
              <div className="w-full p-4 flex flex-row justify-between items-start">
                <h2 className="font-archivo text-[#242222] text-lg font-semibold">
                  Total Page Views
                </h2>
                <span className="w-fit font-archivo-narrow text-[#242222] text-2xl font-semibold">
                  {totalPageViews}
                </span>
              </div>
              <ResponsiveContainer
                className="outline-none"
                width="100%"
                height={124}
              >
                <AreaChart
                  data={data.pageViews}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9AD5FF" stopOpacity={1} />
                      <stop offset="100%" stopColor="#9AD5FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis hide dataKey="date" />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip chartType="views" />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#4CB4FF"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Chart 2: Active Users by Country */}
            <div className="w-full overflow-hidden bg-white min-w-[320px] border border-[#ddd] rounded-lg shadow-sm">
              <div className="w-full p-4 flex flex-row justify-between items-start">
                <h2 className="font-archivo text-[#242222] text-lg font-semibold">
                  Total Clicks
                </h2>
                <span className="w-fit font-archivo-narrow text-[#242222] text-2xl font-semibold">
                  {totalClicks}
                </span>
              </div>

              <ResponsiveContainer width="100%" height={124}>
                <AreaChart
                  data={data.clicks}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9EFFBB" stopOpacity={1} />
                      <stop offset="100%" stopColor="#9EFFBB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Tooltip content={<CustomTooltip chartType="clicks" />} />
                  <XAxis hide dataKey="date" />
                  <YAxis hide />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#82E39F"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorGreen)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <AdminQuotesTable />
      </div>
    </section>
  );
}
