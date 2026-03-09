"use client";
import { addUserSvg } from "@/svgs";
import React, { useRef } from "react";
import useRipple from "../hooks/useRipple";
import { useDispatch } from "react-redux";
import { setNewUserOption } from "@/redux/slices/newUserSlice";

const AddUserButton = (props) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const ripples = useRipple(ref);
  return (
    <div
      ref={ref}
      onClick={() => dispatch(setNewUserOption(true))}
      className={`hover:bg-primary-dark relative flex h-[33px] w-[33px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary text-[18px] text-black transition-all duration-200 ease-in-out hover:shadow-lg focus:outline-none`}
      style={{ filter: "drop-shadow(0px 4px 12px rgba(255, 204, 33, 0.50))" }}
    >
      {ripples}
      {addUserSvg}
    </div>
  );
};

export default AddUserButton;
