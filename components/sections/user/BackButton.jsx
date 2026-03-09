"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { backSvg } from "@/svgs";

const BackButton = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="flex w-fit cursor-pointer flex-row items-center gap-x-2 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-gray-100"
    >
      <div className="flex h-5 w-5 items-center justify-center text-gray-500">
        {backSvg}
      </div>
      <p className="text-sm font-medium text-gray-600">Back to Users</p>
    </div>
  );
};

export default BackButton;
