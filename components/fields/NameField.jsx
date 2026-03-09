import React from "react";

const NameField = (props) => {
  return (
    <input
      onChange={props.onChange}
      type="text"
      name="name"
      id="name"
      placeholder="Enter your name"
      value={props.value}
      className={`${
        props.isLogin
          ? "w-full border-white border-opacity-10 text-white bg-white bg-opacity-[0.04] focus:border-primary focus:border-opacity-50 focus:shadow-input-focus"
          : "w-full border-gray-200 text-headingText bg-white placeholder:text-[#BCBEC0] focus:border-primary focus:shadow-input-focus"
      } rounded-xl border px-4 py-3.5 text-sm transition-all duration-200 ease-in-out placeholder:text-sm focus:outline-none`}
    />
  );
};

export default NameField;
