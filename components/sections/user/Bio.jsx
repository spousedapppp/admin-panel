"use client";
import React from "react";
import { useSelector } from "react-redux";

const Bio = () => {
  const { biography } = useSelector((state) => state.user.data);
  return (
    <div className="flex flex-col gap-y-3 rounded-2xl bg-white p-6 shadow-card">
      <p className="text-lg font-semibold text-headingText">Biography</p>
      <p className="text-sm leading-relaxed text-gray-500">{biography}</p>
    </div>
  );
};

export default Bio;
