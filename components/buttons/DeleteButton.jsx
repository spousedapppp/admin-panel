"use client";
import React, { useRef } from "react";
import useRipple from "../hooks/useRipple";
import { redTrashSvg } from "@/svgs";

const DeleteButton = ({ id, onClick }) => {
  const ref = useRef(null);
  const ripples = useRipple(ref);

  return (
    <button
      ref={ref}
      onClick={() => onClick(id)}
      className="relative flex w-[153px] flex-row items-center justify-center gap-x-2 overflow-hidden rounded-[5px] border border-black border-opacity-10 bg-white py-[10px] font-medium text-deletecolor transition-colors duration-200 ease-in-out hover:bg-red-100 hover:bg-opacity-90 focus:outline-none"
    >
      {ripples}
      Delete User
      {redTrashSvg}
    </button>
  );
};

export default DeleteButton;
