"use client";
import { hamburgerIcon } from "@/svgs";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setSidebarOption } from "@/redux/slices/sidebarSlice";
import { setNotificationOption } from "@/redux/slices/notificationSlice";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="bg-sidebarBackground flex-shrink-0 z-[30000] flex h-[56px] w-full border-b border-white border-opacity-[0.06] lg:hidden">
      <div className="flex flex-grow items-center justify-between px-4">
        <div className="flex flex-row items-center gap-x-3">
          <div
            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center transition-all duration-150 ease-linear hover:opacity-50"
            onClick={() => dispatch(setSidebarOption(true))}
          >
            {hamburgerIcon}
          </div>
          <Image
            src="/logo_white.svg"
            alt="Logo"
            width={36}
            height={36}
            priority
          />
          <span className="text-sm font-bold text-white">Admin</span>
        </div>
        <button
          onClick={() => dispatch(setNotificationOption(true))}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary transition-all duration-200 hover:bg-primary/25"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
