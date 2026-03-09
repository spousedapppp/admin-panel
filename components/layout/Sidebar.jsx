"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState, useMemo } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { useDispatch, useSelector } from "react-redux";
import SidebarOptions from "./libs/SidebarOptions";
import { logout } from "@/redux/slices/userSlice";
import { setNotificationOption } from "@/redux/slices/notificationSlice";
import toast from "react-hot-toast";
import {
  dashboardSvg,
  settingSvg,
  transactionSvg,
  userSvg,
  changePassSvg,
  logoutIconSvg,
  reportsSvg,
  analyticsSvg,
} from "@/svgs";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const sidebar = useRef(null);
  const dispatch = useDispatch();
  const size = useWindowSize();
  const user = useSelector((state) => state.loggedInUser.data);
  const userStatus = useSelector((state) => state.loggedInUser.status);

  const userName = useMemo(() => {
    if (user?.fullName) {
      const parts = user.fullName.split(" ");
      return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
    }
    if (user?.email) {
      return user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1);
    }
    return "Admin";
  }, [user?.fullName, user?.email]);

  const userRole = useMemo(() => {
    if (user?.role) {
      return user.role.charAt(0).toUpperCase() + user.role.slice(1);
    }
    return "Admin";
  }, [user?.role]);

  const userInitial = useMemo(() => {
    return userName.charAt(0).toUpperCase();
  }, [userName]);

  const userImage = useMemo(() => {
    return user?.photos?.[0] || null;
  }, [user?.photos]);

  const sidebarHandler = () => {
    if (size.width >= 1024) {
      setCollapsed(!collapsed);
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    setTimeout(() => dispatch(logout()), 500);
  };

  return (
    <div className="relative hidden lg:block">
      <aside
        ref={sidebar}
        className={`bg-sidebarBackground z-[10000] h-screen select-none overflow-hidden duration-300 ease-in-out flex flex-col border-r border-white border-opacity-[0.06] ${
          collapsed ? "w-[80px] min-w-[80px]" : "w-[230px] min-w-[230px]"
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          {/* Top: Logo */}
          <div>
            <div className={`flex items-center h-[64px] border-b border-white border-opacity-[0.06] ${collapsed ? "justify-center px-2" : "px-5"}`}>
              {!collapsed ? (
                <div className="flex items-center gap-x-3">
                  <Image
                    src="/logo_white.svg"
                    alt="Logo"
                    width={36}
                    height={36}
                    priority
                  />
                  <span className="text-sm font-bold text-primary tracking-wide">Admin</span>
                </div>
              ) : (
                <Image
                  src="/logo_white.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                  priority
                />
              )}
            </div>

            {/* Navigation */}
            <nav className="px-3 pt-4">
              <ul className="flex flex-col gap-y-0.5">
                <SidebarOptions
                  link="/"
                  name="Dashboard"
                  sidebarOpen={collapsed}
                  icon={dashboardSvg}
                />
                <SidebarOptions
                  link="/users"
                  link2="/user"
                  name="Users"
                  sidebarOpen={collapsed}
                  icon={userSvg}
                />
                <SidebarOptions
                  link="/transactions"
                  name="Transactions"
                  sidebarOpen={collapsed}
                  icon={transactionSvg}
                />
                <SidebarOptions
                  link="/reports"
                  name="Reports"
                  sidebarOpen={collapsed}
                  icon={reportsSvg}
                />
                <SidebarOptions
                  link="/analytics"
                  name="Analytics"
                  sidebarOpen={collapsed}
                  icon={analyticsSvg}
                />
              </ul>
            </nav>

            {/* Send Notification Button */}
            <div className="px-3 pt-4">
              <button
                onClick={() => dispatch(setNotificationOption(true))}
                className={`flex w-full items-center gap-x-3 rounded-xl py-2.5 text-sm font-medium transition-all duration-200 bg-primary/10 text-primary hover:bg-primary/20 ${
                  collapsed ? "justify-center px-2" : "px-4"
                }`}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                {!collapsed && <span>Send Notification</span>}
              </button>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col px-3 pb-4">
            <ul className="flex flex-col gap-y-0.5 mb-3">
              <SidebarOptions
                link="/settings"
                name="Settings"
                sidebarOpen={collapsed}
                icon={settingSvg}
              />
              <SidebarOptions
                link="/change-password"
                name="Change Password"
                sidebarOpen={collapsed}
                icon={changePassSvg}
              />
            </ul>

            <div className="border-t border-white border-opacity-[0.06] pt-3">
              {userStatus !== "succeeded" ? (
                /* Loading skeleton */
                !collapsed ? (
                  <div className="flex items-center gap-x-3 px-3 mb-3 animate-pulse">
                    <div className="h-8 w-8 flex-shrink-0 rounded-full bg-white bg-opacity-10" />
                    <div className="flex-1 overflow-hidden">
                      <div className="h-3.5 w-20 rounded bg-white bg-opacity-10 mb-1.5" />
                      <div className="h-2.5 w-12 rounded bg-white bg-opacity-[0.06]" />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center mb-3 animate-pulse">
                    <div className="h-8 w-8 rounded-full bg-white bg-opacity-10" />
                  </div>
                )
              ) : !collapsed ? (
                <div className="flex items-center gap-x-3 px-3 mb-3">
                  {userImage ? (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
                      <Image src={userImage} alt="Profile" width={32} height={32} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-sidebarBackground">
                      {userInitial}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">{userName}</p>
                    <p className="text-[11px] text-gray-400">{userRole}</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center mb-3">
                  {userImage ? (
                    <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full">
                      <Image src={userImage} alt="Profile" width={32} height={32} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-sidebarBackground">
                      {userInitial}
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleLogout}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium transition-all duration-200 bg-red-500 bg-opacity-10 text-red-400 hover:bg-opacity-20 ${
                  collapsed ? "px-2" : "px-4"
                }`}
              >
                {logoutIconSvg}
                {!collapsed && <span>Logout</span>}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Floating toggle button at sidebar edge */}
      <button
        onClick={sidebarHandler}
        className={`absolute top-[22px] z-[10001] flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sidebarBackground shadow-lg transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl ${
          collapsed ? "left-[66px]" : "left-[216px]"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-300 ${collapsed ? "rotate-0" : "rotate-180"}`}
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default Sidebar;
