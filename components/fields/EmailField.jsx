import React from "react";

const EmailField = (props) => {
  return (
    <input
      onChange={props.onChange}
      type="email"
      name="email"
      id="email"
      placeholder="Enter your email address"
      value={props.value}
      required
      readOnly={props.readOnly}
      className={`${
        props.isLogin
          ? "w-full border-white border-opacity-10 text-white bg-white bg-opacity-[0.04] focus:border-primary focus:border-opacity-50 focus:shadow-input-focus"
          : "w-full border-gray-200 text-headingText bg-white placeholder:text-[#BCBEC0] focus:border-primary focus:shadow-input-focus"
      } rounded-xl border px-4 py-3.5 text-sm transition-all duration-200 ease-in-out placeholder:text-sm focus:outline-none ${props.readOnly ? "opacity-60 cursor-not-allowed" : ""}`}
    />
  );
};

export default EmailField;
