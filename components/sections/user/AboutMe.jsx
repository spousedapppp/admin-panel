"use client";
import React from "react";
import { useSelector } from "react-redux";

const AboutMe = () => {
  const { education, starSign, maritalStatus, children } = useSelector(
    (state) => state.user.data,
  );

  const childrenTag =
    children === "Yes"
      ? "Want Children"
      : children === "No"
        ? "No Children"
        : children === "Maybe"
          ? "Maybe Want Children"
          : null;

  const tags = [education, starSign, maritalStatus, childrenTag].filter(
    Boolean,
  ); // This filters out any null or undefined values

  return (
    <div className="flex flex-col gap-y-4 rounded-2xl bg-white p-6 shadow-card">
      <p className="text-lg font-semibold text-headingText">About me</p>

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

export default AboutMe;
