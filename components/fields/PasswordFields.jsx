"use client";
import { passwordHideSvg, passwordShowSvg } from "@/svgs";
import React, { useState } from "react";

const PasswordFields = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="group relative z-0 w-full">
      <input
        onChange={props.onChange}
        type={showPassword ? "text" : "password"}
        name="password"
        id={props.id}
        placeholder={props.placeHolder}
        required
        value={props.value}
        className={`${
          props.isLogin
            ? "w-full border-white border-opacity-10 text-white bg-white bg-opacity-[0.04] focus:border-primary focus:border-opacity-50 focus:shadow-input-focus"
            : "w-full border-gray-200 text-headingText bg-white placeholder:text-[#BCBEC0] focus:border-primary focus:shadow-input-focus"
        } rounded-xl border px-4 py-3.5 text-sm transition-all duration-200 ease-in-out placeholder:text-sm focus:outline-none`}
      />
      <div className="absolute bottom-0 right-0 top-0 flex cursor-pointer items-center justify-center pr-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-transparent transition-all duration-200 ease-in-out hover:bg-white hover:bg-opacity-10"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? passwordShowSvg : passwordHideSvg}
        </div>
      </div>
    </div>
  );
};

export default PasswordFields;
