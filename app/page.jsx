"use client";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData as fetchChartData } from "@/redux/slices/chartSlice";
import dynamic from "next/dynamic";
import CardsRow from "@/components/sections/dashboard/CardsRow";
import UsersTable from "@/components/sections/dashboard/UsersTable";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Home() {
  const dispatch = useDispatch();
  const chartData = useSelector((state) => state.chart.data);
  const chartStatus = useSelector((state) => state.chart.status);

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  const series = useMemo(() => {
    const dataArray = chartData.map((item) => item.total);
    return [{ name: "Revenue", data: dataArray }];
  }, [chartData]);

  const chartOptions = {
    chart: { type: "bar", toolbar: { show: false }, zoom: { enabled: false } },
    colors: ["#FFCC21"],
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "40%",
        borderRadiusApplication: "end",
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.2,
        gradientToColors: ["#F59E0B"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.85,
        stops: [0, 100],
      },
    },
    grid: { borderColor: "#919EAB33", strokeDashArray: 3 },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "12px", fontWeight: 500, colors: "#919EAB" } },
    },
    yaxis: {
      labels: {
        style: { fontSize: "12px", colors: "#919EAB" },
        formatter: (val) => {
          if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
          return `$${Math.round(val)}`;
        },
      },
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val) => `$${val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      },
    },
    legend: { show: false },
  };

  return (
    <div className="flex w-full flex-col gap-y-8 overflow-hidden animate-fade-in">
      {/* Statistics */}
      <div className="flex w-full flex-col gap-y-5 overflow-hidden">
        <div className="flex flex-col gap-y-1">
          <p className="text-2xl font-semibold text-headingText tracking-tight">Statistics</p>
          <p className="text-sm text-headingText opacity-40">
            Overall Information
          </p>
        </div>

        <CardsRow />
      </div>

      {/* Sales Growth Chart - analytics style UI */}
      <div className="rounded-2xl bg-white p-5 shadow-card border border-gray-100">
        <h2 className="text-lg font-semibold text-headingText mb-2">Sales Growth</h2>
        {chartStatus === "loading" ? (
          <div className="h-[336px] rounded-xl bg-gray-50 animate-pulse" />
        ) : (
          <ReactApexChart
            options={chartOptions}
            series={series}
            type="bar"
            height={336}
            width="100%"
          />
        )}
      </div>

      <UsersTable />
    </div>
  );
}
