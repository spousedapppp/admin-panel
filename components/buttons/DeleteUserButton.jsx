"use client";
import React, { useRef } from "react";
import useRipple from "../hooks/useRipple";

const DeleteUserButton = (props) => {
  const ref = useRef(null);
  const ripples = useRipple(ref);
  return (
    <button
      ref={ref}
      onClick={props.onClick}
      className="border-deletecolor bg-deletecolor relative w-[80%] overflow-hidden rounded-[5px] border py-[10px] font-medium text-white transition-colors duration-200 ease-in-out hover:bg-opacity-90 focus:outline-none"
    >
      {ripples}
      {props.text}
    </button>
  );
};

export default DeleteUserButton;
