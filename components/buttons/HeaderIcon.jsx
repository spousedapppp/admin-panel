"use client";
import React, { useRef } from "react";
import useRipple from "../hooks/useRipple";

const HeaderIcon = ({ svg, onClick, className }) => {
  const ref = useRef(null);
  const ripples = useRipple(ref);

  return (
    <div
      onClick={onClick}
      className={`relative flex cursor-pointer flex-row items-center overflow-hidden rounded-xl border border-primary border-opacity-30 text-white transition-all duration-200 ease-in-out gap-x-2.5 px-5 py-2.5 hover:bg-primary hover:bg-opacity-[0.08] hover:border-opacity-50`}
      ref={ref}
    >
      {ripples}
      <p className="text-sm font-medium text-primary">Notification</p>
      {svg}
    </div>
  );
};

export default HeaderIcon;
