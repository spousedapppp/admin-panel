"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";


const SidebarOptions = ({
  link,
  link2,
  name,
  sidebarOpen,
  onClick,
  icon,
}) => {
  const pathname = usePathname();

  const isActive = (link === "/" && pathname === "/") ||
    (link !== "/" && pathname.includes(link)) ||
    (link2 && link2 !== "/" && pathname.includes(link2));

  return (
    <li
      onClick={onClick}
      className="relative flex flex-col"
    >
      <Link
        href={link}
        className={`group relative flex w-full items-center truncate rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ease-in-out hover:text-primary hover:bg-primary hover:bg-opacity-[0.08] ${
          isActive
            ? "bg-primary bg-opacity-[0.12] text-primary"
            : "text-sidebarOptionText"
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full"></div>
        )}
        <div className={`flex flex-row items-center gap-3 ${sidebarOpen ? "justify-center w-full" : ""}`}>
          <div className="transition-all duration-150 ease-in-out w-[22px] h-[22px] flex justify-center items-center flex-shrink-0">
            {icon}
          </div>
          {!sidebarOpen && <span className="tracking-wide whitespace-nowrap">{name}</span>}
        </div>
      </Link>
    </li>
  );
};

export default SidebarOptions;
