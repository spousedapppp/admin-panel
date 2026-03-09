"use client";
import React from "react";
import { useSelector } from "react-redux";

const Religiosity = () => {
  const { religion, smoking, drink } = useSelector((state) => state.user.data);

  const tags = [
    religion,
    smoking === "No" ? "Non Smoker" : "Smoker",
    drink === "No" ? "Doesn’t Drink" : "Drink",
  ];

  return (
    <div className="flex flex-col gap-y-4 rounded-2xl bg-white p-6 shadow-card">
      <p className="text-lg font-semibold text-headingText">Religiosity</p>

      <div className="flex flex-row flex-wrap items-center gap-2">
        {tags.map((tag, index) => {
          return (
            <div
              key={index}
              className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-2 text-sm font-medium text-gray-600"
            >
              <p>{tag}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Religiosity;
