"use client";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "@/redux/slices/analyticsSlice";
import Image from "next/image";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const StatCard = ({ title, value, subtitle, icon, color }) => (
  <div className="flex items-center gap-x-4 rounded-2xl bg-white p-5 shadow-card border border-gray-100 transition-all duration-200 hover:shadow-card-hover">
    <div
      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${color}`}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-2xl font-bold text-headingText">{value?.toLocaleString() || 0}</p>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
    </div>
  </div>
);

const AnalyticsSkeleton = () => (
  <div className="flex w-full flex-col gap-6 animate-fade-in">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-2xl bg-white p-5 shadow-card border border-gray-100 animate-pulse">
          <div className="flex items-center gap-x-4">
            <div className="h-12 w-12 rounded-xl bg-gray-100" />
            <div>
              <div className="h-6 w-16 rounded bg-gray-100 mb-2" />
              <div className="h-3.5 w-24 rounded bg-gray-50" />
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {[1, 2].map((i) => (
        <div key={i} className="rounded-2xl bg-white p-5 shadow-card border border-gray-100 animate-pulse h-80" />
      ))}
    </div>
  </div>
);

const AnalyticsPage = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  // Format "2025-W44" to "W44"
  const formatWeek = (yw) => {
    const parts = yw.split("-");
    return parts[1]; // "W44"
  };

  const swipesChartData = useMemo(() => {
    if (!data?.charts?.swipesPerWeek) return { categories: [], likes: [], dislikes: [] };

    const weekMap = {};
    data.charts.swipesPerWeek.forEach((item) => {
      const week = item._id.week;
      if (!weekMap[week]) weekMap[week] = { likes: 0, dislikes: 0 };
      if (item._id.action === "like") weekMap[week].likes = item.count;
      else weekMap[week].dislikes = item.count;
    });

    const sortedWeeks = Object.keys(weekMap).sort();
    return {
      categories: sortedWeeks.map(formatWeek),
      likes: sortedWeeks.map((w) => weekMap[w].likes),
      dislikes: sortedWeeks.map((w) => weekMap[w].dislikes),
    };
  }, [data?.charts?.swipesPerWeek]);

  const activityChartData = useMemo(() => {
    if (!data?.charts) return { categories: [], matches: [], messages: [] };

    const allWeeks = new Set();
    data.charts.matchesPerWeek?.forEach((i) => allWeeks.add(i._id));
    data.charts.messagesPerWeek?.forEach((i) => allWeeks.add(i._id));

    const sortedWeeks = [...allWeeks].sort();
    const matchMap = {};
    const msgMap = {};
    data.charts.matchesPerWeek?.forEach((i) => (matchMap[i._id] = i.count));
    data.charts.messagesPerWeek?.forEach((i) => (msgMap[i._id] = i.count));

    return {
      categories: sortedWeeks.map(formatWeek),
      matches: sortedWeeks.map((w) => matchMap[w] || 0),
      messages: sortedWeeks.map((w) => msgMap[w] || 0),
    };
  }, [data?.charts]);

  const swipeChartOptions = {
    chart: { type: "area", toolbar: { show: false }, zoom: { enabled: false } },
    colors: ["#FFCC21", "#EF4444"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.05, stops: [0, 90, 100] },
    },
    grid: { borderColor: "#919EAB33", strokeDashArray: 3 },
    xaxis: {
      categories: swipesChartData.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "11px", colors: "#919EAB" }, rotate: -45 },
    },
    yaxis: { labels: { style: { fontSize: "11px", colors: "#919EAB" } } },
    tooltip: { theme: "light" },
    legend: { position: "top", horizontalAlign: "right" },
  };

  const activityChartOptions = {
    chart: { type: "bar", toolbar: { show: false }, zoom: { enabled: false } },
    colors: ["#10B981", "#6366F1"],
    plotOptions: {
      bar: { borderRadius: 6, columnWidth: "50%", borderRadiusApplication: "end" },
    },
    dataLabels: { enabled: false },
    grid: { borderColor: "#919EAB33", strokeDashArray: 3 },
    xaxis: {
      categories: activityChartData.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "11px", colors: "#919EAB" }, rotate: -45 },
    },
    yaxis: { labels: { style: { fontSize: "11px", colors: "#919EAB" } } },
    tooltip: { theme: "light" },
    legend: { position: "top", horizontalAlign: "right" },
  };

  if (status === "loading" || !data) return <AnalyticsSkeleton />;

  const { totals, thisWeek, lastWeek, topLikedUsers } = data;

  const getGrowth = (current, previous) => {
    if (!previous) return current > 0 ? "+100%" : "0%";
    const pct = ((current - previous) / previous * 100).toFixed(0);
    return pct >= 0 ? `+${pct}%` : `${pct}%`;
  };

  return (
    <div className="flex w-full flex-col gap-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-headingText tracking-tight">Analytics</h1>
        <p className="text-sm text-gray-400 mt-1">Swipes, matches, chats & engagement</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Swipes"
          value={totals.swipes}
          subtitle={`${getGrowth(thisWeek.swipes, lastWeek.swipes)} this week`}
          color="bg-primary/10"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFCC21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          }
        />
        <StatCard
          title="Total Likes"
          value={totals.likes}
          subtitle={`${getGrowth(thisWeek.likes, lastWeek.likes)} this week`}
          color="bg-emerald-50"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
          }
        />
        <StatCard
          title="Total Matches"
          value={totals.matches}
          subtitle={`${getGrowth(thisWeek.matches, lastWeek.matches)} this week`}
          color="bg-blue-50"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
        <StatCard
          title="Messages"
          value={totals.messages}
          subtitle={`${thisWeek.messages.toLocaleString()} this week`}
          color="bg-purple-50"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          }
        />
      </div>

      {/* Second row stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Dislikes"
          value={totals.dislikes}
          subtitle={`${getGrowth(thisWeek.dislikes, lastWeek.dislikes)} this week`}
          color="bg-red-50"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 15V19a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
            </svg>
          }
        />
        <StatCard
          title="Active Chats"
          value={totals.chats}
          subtitle={`${thisWeek.chats} new this week`}
          color="bg-amber-50"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          }
        />
        <StatCard
          title="Total Blocks"
          value={totals.blocks}
          color="bg-gray-100"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
            </svg>
          }
        />
        <StatCard
          title="Like Rate"
          value={totals.swipes > 0 ? `${((totals.likes / totals.swipes) * 100).toFixed(1)}%` : "0%"}
          subtitle="Likes / Total Swipes"
          color="bg-pink-50"
          icon={
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          }
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Swipes Chart */}
        <div className="rounded-2xl bg-white p-5 shadow-card border border-gray-100">
          <h2 className="text-lg font-semibold text-headingText mb-2">Swipes (Weekly)</h2>
          {swipesChartData.categories.length > 0 ? (
            <ReactApexChart
              options={swipeChartOptions}
              series={[
                { name: "Likes", data: swipesChartData.likes },
                { name: "Dislikes", data: swipesChartData.dislikes },
              ]}
              type="area"
              height={300}
            />
          ) : (
            <div className="flex items-center justify-center h-[300px] text-sm text-gray-400">
              No swipe data available
            </div>
          )}
        </div>

        {/* Matches & Messages Chart */}
        <div className="rounded-2xl bg-white p-5 shadow-card border border-gray-100">
          <h2 className="text-lg font-semibold text-headingText mb-2">Matches & Messages (Weekly)</h2>
          {activityChartData.categories.length > 0 ? (
            <ReactApexChart
              options={activityChartOptions}
              series={[
                { name: "Matches", data: activityChartData.matches },
                { name: "Messages", data: activityChartData.messages },
              ]}
              type="bar"
              height={300}
            />
          ) : (
            <div className="flex items-center justify-center h-[300px] text-sm text-gray-400">
              No activity data available
            </div>
          )}
        </div>
      </div>

      {/* Top Liked Users */}
      <div className="rounded-2xl bg-white p-5 shadow-card border border-gray-100">
        <h2 className="text-lg font-semibold text-headingText mb-4">Most Liked Users</h2>
        {topLikedUsers?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-3 pl-3 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="py-3 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="py-3 px-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Likes Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {topLikedUsers.map((item, index) => (
                  <tr key={item._id} className="transition-all duration-200 hover:bg-primary/[0.06]">
                    <td className="py-3 pl-3 pr-3">
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                        index === 0
                          ? "bg-primary/20 text-primaryDark"
                          : index === 1
                          ? "bg-gray-200 text-gray-600"
                          : index === 2
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-50 text-gray-500"
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-x-3">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-gray-100">
                          <Image
                            src={item.user?.photos?.[0] || "/profile.png"}
                            alt="User"
                            className="h-full w-full object-cover"
                            width={36}
                            height={36}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-headingText truncate">
                            {item.user?.fullName || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {item.user?.email || "-"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className="inline-flex items-center gap-x-1 text-sm font-semibold text-primaryDark">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFCC21" stroke="#FFCC21" strokeWidth="1">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                        {item.likes.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8 text-sm text-gray-400">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;
