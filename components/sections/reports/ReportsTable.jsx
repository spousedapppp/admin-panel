"use client";
import React, { useEffect } from "react";
import { Pagination } from "../users/Pagination";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReports,
  setReportFilter,
  removeBlock,
} from "@/redux/slices/reportsSlice";
import toast from "react-hot-toast";

const ReportsSkeleton = () => (
  <div className="mt-4 w-full">
    <div className="w-full rounded-2xl bg-white shadow-card border border-gray-100 overflow-hidden">
      <div className="bg-gray-50/80 border-b border-gray-100 py-3.5 px-5">
        <div className="flex gap-x-16">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-3 w-24 rounded bg-gray-200 animate-pulse" />
          ))}
        </div>
      </div>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-x-6 px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-x-3 flex-1">
            <div className="h-10 w-10 rounded-full bg-gray-100 animate-pulse" />
            <div className="flex flex-col gap-y-1.5">
              <div className="h-3.5 w-28 rounded bg-gray-100 animate-pulse" />
              <div className="h-2.5 w-36 rounded bg-gray-50 animate-pulse" />
            </div>
          </div>
          <div className="flex items-center gap-x-3 flex-1">
            <div className="h-10 w-10 rounded-full bg-gray-100 animate-pulse" />
            <div className="flex flex-col gap-y-1.5">
              <div className="h-3.5 w-28 rounded bg-gray-100 animate-pulse" />
              <div className="h-2.5 w-36 rounded bg-gray-50 animate-pulse" />
            </div>
          </div>
          <div className="h-3 w-24 rounded bg-gray-100 animate-pulse" />
          <div className="h-8 w-20 rounded-lg bg-gray-100 animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

const ReportsTable = () => {
  const dispatch = useDispatch();
  const { reports, totalReports } = useSelector((state) => state.reports.data);
  const filters = useSelector((state) => state.reports.filters);
  const status = useSelector((state) => state.reports.status);
  const { page, limit } = filters;

  useEffect(() => {
    dispatch(fetchReports(filters));
  }, [dispatch, filters]);

  const paginate = (pageNumber) => {
    dispatch(setReportFilter({ page: pageNumber }));
  };

  const handleUnblock = async (e, blockId) => {
    e.stopPropagation();
    try {
      await dispatch(removeBlock(blockId)).unwrap();
      toast.success("User unblocked successfully");
    } catch {
      toast.error("Failed to unblock user");
    }
  };

  const getFormattedDate = (dateString) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const date = new Date(dateString);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  if (status === "loading") return <ReportsSkeleton />;

  return (
    <div className="mt-4 w-full">
      <div className="no-scrollbar w-full overflow-y-hidden overflow-x-scroll">
        <table className="w-full table-auto rounded-2xl bg-white shadow-card border border-gray-100 overflow-hidden">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="py-3.5 pl-5 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Blocked By</th>
              <th className="py-3.5 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Blocked User</th>
              <th className="py-3.5 px-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="py-3.5 px-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {reports.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-sm text-gray-400">
                  No blocked users found
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report._id}
                  className="transition-all duration-200 hover:bg-primary/[0.08] group"
                >
                  <td className="pl-5 pr-3 py-3.5">
                    <div className="flex items-center gap-x-3">
                      {report.blocker?.photos?.[0] ? (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-gray-100 group-hover:ring-primary/30 transition-all duration-200">
                          <Image
                            src={report.blocker.photos[0]}
                            alt="Blocker"
                            className="h-full w-full object-cover"
                            width={40}
                            height={40}
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-gray-100 bg-gray-100 text-gray-500 text-sm font-bold">
                          {report.blocker?.fullName?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-headingText truncate">
                          {report.blocker?.fullName || "Deleted User"}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {report.blocker?.email || `ID: ${report.userId?.toString().slice(-8) || "-"}`}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-x-3">
                      {report.blocked?.photos?.[0] ? (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-red-100 transition-all duration-200">
                          <Image
                            src={report.blocked.photos[0]}
                            alt="Blocked"
                            className="h-full w-full object-cover"
                            width={40}
                            height={40}
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-red-100 bg-red-50 text-red-400 text-sm font-bold">
                          {report.blocked?.fullName?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-headingText truncate">
                          {report.blocked?.fullName || "Deleted User"}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {report.blocked?.email || `ID: ${report.blockedUserId?.toString().slice(-8) || "-"}`}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <p className="text-sm text-gray-500">
                      {getFormattedDate(report.createdAt)}
                    </p>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={(e) => handleUnblock(e, report._id)}
                        className="flex items-center gap-x-1.5 rounded-lg bg-red-50 border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 transition-all duration-200 hover:bg-red-100 hover:text-red-600"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        </svg>
                        Unblock
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        perPage={limit}
        totalData={totalReports}
        paginate={paginate}
        currentPage={page}
      />
    </div>
  );
};

export default ReportsTable;
