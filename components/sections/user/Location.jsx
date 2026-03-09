"use client";

import React from "react";
import { useSelector } from "react-redux";

const Location = () => {
  const { location, height, Age, ethnicGroup } = useSelector(
    (state) => state.user.data,
  );

  return (
    <div className="flex w-full flex-row flex-wrap gap-5 rounded-2xl bg-white p-6 shadow-card">
      <div className="flex flex-1 flex-col gap-y-3">
        <p className="text-lg font-semibold text-headingText">Location & Ethnicity</p>

        <div className="flex flex-row items-center gap-2">
          <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
            <p>{location}</p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
            <p>{ethnicGroup}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-y-3">
        <p className="text-lg font-semibold text-headingText">Height & Age</p>

        <div className="flex flex-row items-center gap-2">
          <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
            <p>{height?.ft} ft</p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
            <p>{height?.cm} cm</p>
          </div>
          <div className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
            <p>{Age} year old</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
