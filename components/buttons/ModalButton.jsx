"use client"
import React, { useRef } from "react";
import useRipple from "../hooks/useRipple";

const ModalButton = (props) => {
    const ref = useRef(null);
    const ripples = useRipple(ref);
  return (
    <button
    ref={ref}
    onClick={props.onClick}
    className="overflow-hidden relative w-[48%] rounded-[5px] border border-primary bg-primary py-[9px] font-medium transition-colors duration-200 ease-in-out hover:bg-opacity-90 focus:outline-none">
      {ripples}
      {props.text}
    </button>
  );
};

export default ModalButton;
