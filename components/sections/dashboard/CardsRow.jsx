"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/redux/slices/cardsSlice";

const StatCard = ({ title, value, icon, color }) => (
  <div className="flex items-center gap-x-4 rounded-2xl bg-white p-5 shadow-card border border-gray-100 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5">
    <div
      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${color}`}
    >
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-2xl font-bold text-headingText">{value}</p>
      <p className="text-sm font-medium text-gray-500">{title}</p>
    </div>
  </div>
);

const CardsRow = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.card.data);
  const status = useSelector((state) => state.card.status);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (status === "loading") {
    return (
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
    );
  }

  const freeUsers = (data.users || 0) - (data.upgraded || 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Revenue"
        value={`$${data.revenue?.[0]?.total?.toLocaleString() || 0}`}
        color="bg-primary/10"
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFCC21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        }
      />
      <StatCard
        title="Upgraded Users"
        value={data.upgraded?.toLocaleString() || 0}
        color="bg-blue-50"
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        }
      />
      <StatCard
        title="Total Users"
        value={data.users?.toLocaleString() || 0}
        color="bg-emerald-50"
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        }
      />
      <StatCard
        title="Free Users"
        value={freeUsers?.toLocaleString() || 0}
        color="bg-purple-50"
        icon={
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        }
      />
    </div>
  );
};

export default CardsRow;
