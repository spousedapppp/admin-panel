"use client";
import ReportsTable from "@/components/sections/reports/ReportsTable";
import { useDispatch } from "react-redux";
import { setReportFilter } from "@/redux/slices/reportsSlice";
import { useState, useEffect } from "react";
import { searchSvg } from "@/svgs";

const ReportsPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setReportFilter({ search, page: 1 }));
    }, 300);
    return () => clearTimeout(handler);
  }, [search, dispatch]);

  return (
    <div className="flex w-full flex-col animate-fade-in">
      <div className="flex w-full flex-row flex-wrap justify-between gap-y-5 mb-2">
        <div>
          <h1 className="text-2xl font-semibold text-headingText tracking-tight">
            Reports
          </h1>
          <p className="text-sm text-gray-400 mt-1">Blocked users and reports</p>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-5">
          <div className="flex w-[300px] items-center gap-x-2.5 rounded-xl bg-white border border-gray-100 shadow-soft px-4 py-2.5 transition-all duration-200 focus-within:border-primary focus-within:shadow-input-focus">
            {searchSvg}
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-headingText placeholder:text-gray-400 placeholder:text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      <ReportsTable />
    </div>
  );
};

export default ReportsPage;
