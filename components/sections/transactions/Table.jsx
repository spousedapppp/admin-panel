"use client";
import React, { useEffect } from "react";
import { Pagination } from "../users/Pagination";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactions,
  setTransactionFilter,
} from "@/redux/slices/transactionsSlice";

const TransactionSkeleton = () => (
  <div className="mt-4 w-full">
    <div className="w-full rounded-2xl bg-white shadow-card border border-gray-100 overflow-hidden">
      <div className="bg-gray-50/80 border-b border-gray-100 py-3.5 px-5">
        <div className="flex gap-x-16">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
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
          <div className="h-3 w-20 rounded bg-gray-100 animate-pulse" />
          <div className="h-3 w-16 rounded bg-gray-100 animate-pulse" />
          <div className="h-6 w-14 rounded-lg bg-gray-100 animate-pulse" />
          <div className="h-3 w-24 rounded bg-gray-100 animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

const Table = () => {
  const dispatch = useDispatch();
  const { transactions, totalTransactions } = useSelector(
    (state) => state.transactions.data,
  );
  const filters = useSelector((state) => state.transactions.filters);
  const status = useSelector((state) => state.transactions.status);
  const { page, limit } = filters;

  useEffect(() => {
    dispatch(fetchTransactions(filters));
  }, [dispatch, filters]);

  const paginate = (pageNumber) => {
    dispatch(setTransactionFilter({ page: pageNumber }));
  };

  const getFormattedDate = (dateString) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const date = new Date(dateString);
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  if (status === "loading") return <TransactionSkeleton />;

  return (
    <div className="mt-4 w-full">
      <div className="no-scrollbar w-full overflow-y-hidden overflow-x-scroll">
        <table className="w-full table-auto rounded-2xl bg-white shadow-card border border-gray-100 overflow-hidden">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="py-3.5 pl-5 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th className="py-3.5 px-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="py-3.5 px-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="py-3.5 px-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3.5 px-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-gray-400">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((txn) => {
                const isActive = txn.endTime ? new Date(txn.endTime) > new Date() : false;
                return (
                  <tr
                    key={txn._id}
                    className="transition-all duration-200 hover:bg-primary/[0.08] group"
                  >
                    <td className="pl-5 pr-3 py-3.5">
                      <div className="flex items-center gap-x-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-gray-100 group-hover:ring-primary/30 transition-all duration-200">
                          <Image
                            src={txn.userData?.photos?.[0] || "/profile.png"}
                            alt="User"
                            className="h-full w-full object-cover"
                            width={40}
                            height={40}
                            priority
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-headingText truncate">
                            {txn.userData?.fullName || "Deleted User"}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {txn.userData?.email || "-"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium ${
                          txn.type === "Subscription"
                            ? "bg-primary/10 text-primaryDark border border-primary/20"
                            : "bg-blue-50 text-blue-600 border border-blue-200"
                        }`}
                      >
                        {txn.type}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-center">
                      <p className="text-sm font-semibold text-headingText">
                        ${txn.amount?.toFixed(2) || "0.00"}
                      </p>
                    </td>
                    <td className="px-3 py-3.5 text-center">
                      <span
                        className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium ${
                          isActive
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-gray-50 text-gray-500 border border-gray-200"
                        }`}
                      >
                        {isActive ? "Active" : "Expired"}
                      </span>
                    </td>
                    <td className="px-3 py-3.5 text-center">
                      <p className="text-sm text-gray-500">
                        {getFormattedDate(txn.createdAt)}
                      </p>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        perPage={limit}
        totalData={totalTransactions}
        paginate={paginate}
        currentPage={page}
      />
    </div>
  );
};

export default Table;
