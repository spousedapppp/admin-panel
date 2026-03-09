"use client";
import React, { useRef } from "react";
import useRipple from "../hooks/useRipple";

const LargeButtons = (props) => {
  const ref = useRef(null);
  const ripples = useRipple(ref);
  return (
    <button
      ref={ref}
      onClick={props.onClick}
      disabled={props.isDisabled}
      className={` ${props.className} relative overflow-hidden rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-black shadow-soft transition-all duration-200 ease-in-out hover:bg-primaryDark hover:shadow-glow focus:outline-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {ripples}
      {props.text}
    </button>
  );
};

export default LargeButtons;
