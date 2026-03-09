import React from "react";

const Loading = () => {
  return (
    <div className="flex w-full flex-col animate-pulse">
      {/* back button */}
      <div className="h-10 w-32 bg-gray-200 rounded"></div>

      {/* Top Area */}
      <div className="h-40 w-full bg-gray-200 mt-4 rounded-md"></div>

      <div className="mt-5 flex w-full flex-row flex-wrap justify-between gap-y-10">
        <div className="flex w-full flex-col gap-y-10 md:w-[59%]">
          <div className="h-24 w-full bg-gray-200 rounded-md"></div>
          <div className="h-24 w-full bg-gray-200 rounded-md"></div>
          <div className="h-24 w-full bg-gray-200 rounded-md"></div>
          <div className="h-24 w-full bg-gray-200 rounded-md"></div>
          <div className="h-24 w-full bg-gray-200 rounded-md"></div>
          <div className="h-24 w-full bg-gray-200 rounded-md"></div>
        </div>
        <div className="flex w-full md:w-[40%]">
          <div className="h-80 w-full bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
