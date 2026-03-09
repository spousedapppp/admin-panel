"use client";
import React from "react";
import { useSelector } from "react-redux";

const Interest = () => {
  const { interests = {} } = useSelector((state) => state.user.data);

  const renderInterests = (category, items) => {
    if (items.length === 0) return null;

    return (
      <div key={category} className="mb-4">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
          {category.replace(/([a-z])([A-Z])/g, "$1 $2")}
        </p>
        <div className="flex flex-row flex-wrap items-center gap-2">
          {items.map((interest, index) => (
            <div
              key={index}
              className="rounded-xl bg-primary/15 px-4 py-2 text-sm font-semibold text-amber-700 border border-primary/20"
            >
              <p>{interest}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-y-5 rounded-2xl bg-white p-6 shadow-card">
      <p className="text-lg font-semibold text-headingText">Interests</p>
      {Object.keys(interests).map((category) =>
        renderInterests(category, interests[category]),
      )}
    </div>
  );
};

export default Interest;
