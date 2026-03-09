"use client";

import { fetchData } from "@/redux/slices/chartSlice";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const MonthlyChart = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.chart.data);
  const status = useSelector((state) => state.chart.status);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const series = useMemo(() => {
    const dataArray = data.map((item) => item.total);
    return [{ name: "Revenue", data: dataArray }];
  }, [data]);

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#FFCC21"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    grid: {
      borderColor: "#919EAB33",
      strokeDashArray: 3,
    },
    xaxis: {
      categories: [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "11px", colors: "#919EAB" } },
    },
    yaxis: {
      labels: { style: { fontSize: "11px", colors: "#919EAB" } },
    },
    tooltip: { theme: "light" },
    legend: { position: "top", horizontalAlign: "right" },
  };

  return status === "loading" ? (
    <div className="h-80 w-full rounded-2xl animate-shimmer"></div>
  ) : (
    <div className="flex h-full flex-col gap-y-2">
      <h2 className="text-lg font-semibold text-headingText">Sales Growth</h2>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={336}
        width="100%"
      />
    </div>
  );
};

export default MonthlyChart;
