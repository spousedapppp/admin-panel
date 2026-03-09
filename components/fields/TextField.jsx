import React from "react";

const TextField = (props) => {
  return (
    <input
      onChange={props.onChange}
      type="text"
      name="name"
      id="name"
      placeholder={props.placeholder}
      required
      className={`${
        props.isLogin
          ? "min-w-[430.22px] border-white border-opacity-20 text-placeholder focus:border-white focus:border-opacity-50"
          : "w-full border-black border-opacity-10 text-black placeholder:text-[#BCBEC0] focus:border-black focus:border-opacity-10"
      }  rounded-[6px] border bg-transparent px-[16px] py-4 text-sm transition-colors duration-200 ease-in-out placeholder:text-sm focus:outline-none`}
    />
  );
};

export default TextField;
