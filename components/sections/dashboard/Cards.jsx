import React from "react";

const Cards = (props) => {
  return (
    <div className={`flex ${props.slider ? "" : "w-[31%]"} flex-col gap-y-4 rounded-2xl px-7 py-7 transition-all duration-300 ease-in-out cursor-default group hover:-translate-y-1 ${props.gradient || "bg-white border border-gray-100 shadow-card hover:shadow-card-hover"}`}>
      <div className="flex flex-row items-center justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${props.iconBg || "bg-primary bg-opacity-10"}`}>
          {props.icon}
        </div>
      </div>
      <div className="flex flex-col gap-y-0.5">
        <p className={`text-xs font-medium uppercase tracking-widest ${props.labelColor || "text-gray-400"}`}>
          {props.title}
        </p>
        <p className={`text-[32px] font-bold leading-tight ${props.color}`}>{props.subtitle}</p>
      </div>
    </div>
  );
};

export default Cards;
