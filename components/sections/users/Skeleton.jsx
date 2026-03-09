import React from "react";

const Skeleton = () => {
  return (
    <div className="mt-4 w-full">
      <div className="no-scrollbar w-full overflow-y-hidden overflow-x-scroll">
        <table className="w-full table-auto overflow-hidden truncate rounded-2xl bg-white shadow-card border border-gray-100">
          <thead>
            <tr className="border-b-[1px] border-[#000000] border-opacity-20 text-base font-medium text-headingText">
              <th className="pb-[8px] pl-4 pt-[18px] text-left">
                <div className="h-4 w-24 rounded-lg animate-shimmer"></div>
              </th>
              <th className="pb-[8px] pt-[18px] text-center">
                <div className="mx-auto h-4 w-24 rounded-lg animate-shimmer"></div>
              </th>
              <th className="pb-[8px] pt-[18px] text-center">
                <div className="mx-auto h-4 w-24 rounded-lg animate-shimmer"></div>
              </th>
              <th className="pb-[8px] pt-[18px] text-center">
                <div className="mx-auto h-4 w-24 rounded-lg animate-shimmer"></div>
              </th>
              <th className="pb-[8px] pt-[18px] text-left">
                <div className="h-4 w-24 rounded-lg animate-shimmer"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(5)
              .fill("")
              .map((_, index) => (
                <tr key={index} className="border-b-[1px] border-[#E4E4E4]">
                  <td className="py-2 pl-3">
                    <div className="flex flex-row items-center gap-x-2">
                      <div className="flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full bg-gray-300"></div>
                      <div className="flex flex-col gap-y-1">
                        <div className="h-4 w-32 rounded-lg animate-shimmer"></div>
                        <div className="h-3 w-24 rounded-lg animate-shimmer"></div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className="mx-auto h-4 w-20 rounded-lg animate-shimmer"></div>
                  </td>
                  <td className="text-center">
                    <div className="mx-auto h-4 w-24 rounded-lg animate-shimmer"></div>
                  </td>
                  <td className="text-center">
                    <div className="mx-auto h-4 w-24 rounded-lg animate-shimmer"></div>
                  </td>
                  <td className="flex flex-row justify-center gap-x-4 py-2">
                    <div className="h-8 w-8 rounded-lg animate-shimmer"></div>
                    <div className="h-8 w-8 rounded-lg animate-shimmer"></div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Skeleton;
