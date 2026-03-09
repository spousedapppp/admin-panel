"use client";
import React from "react";
import { useSelector } from "react-redux";

const Personality = () => {
  const { personalityTraits } = useSelector((state) => state.user.data);

  return (
    <div className="flex flex-col gap-y-4 rounded-2xl bg-white p-6 shadow-card">
      <p className="text-lg font-semibold text-headingText">Personality Traits</p>

      <div className="flex flex-row flex-wrap items-center gap-2">
        {personalityTraits?.map((tag, index) => {
          return (
            <div
              key={index}
              className="rounded-xl bg-violet-50 border border-violet-100 px-4 py-2 text-sm font-medium text-violet-600"
            >
              <p>{tag}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Personality;
