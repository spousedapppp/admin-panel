"use client";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { setSidebarOption } from "@/redux/slices/sidebarSlice";
import { logout } from "@/redux/slices/userSlice";
import { setNotificationOption } from "@/redux/slices/notificationSlice";
import {
  dashboardSvg,
  transactionSvg,
  userSvg,
  settingSvg,
  changePassSvg,
  logoutIconSvg,
  reportsSvg,
  analyticsSvg,
} from "@/svgs";
import SidebarOptions from "../layout/libs/SidebarOptions";

const SidebarModal = () => {
  const dispatch = useDispatch();
  const View = useSelector((state) => state.sidebar.value);
  const user = useSelector((state) => state.loggedInUser.data);
  const userStatus = useSelector((state) => state.loggedInUser.status);

  const userName = useMemo(() => {
    if (user?.fullName) {
      const parts = user.fullName.split(" ");
      return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
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

  const close = () => dispatch(setSidebarOption(false));

  const handleLogout = () => {
    dispatch(logout());
    close();
  };

  return (
    <div>
      <Transition appear show={View} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[40000] overflow-hidden"
          onClose={close}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto overflow-x-hidden">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-x-[-100px]"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 translate-x-[-200px]"
              >
                <Dialog.Panel
                  className={`absolute bottom-0 left-0 top-0 z-[30000] flex h-screen w-[280px] flex-col bg-sidebarBackground text-white transition-all duration-300 ease-in-out md:w-[320px] ${
                    View
                      ? "translate-x-0 opacity-100"
                      : "translate-x-[-400px] opacity-0"
                  }`}
                >
                  <div className="flex flex-col justify-between h-full">
                    {/* Top */}
                    <div>
                      {/* Header */}
                      <div className="flex h-[72px] items-center justify-between px-5 border-b border-white border-opacity-[0.06]">
                        <div className="flex items-center gap-x-3">
                          <Image
                            src="/logo_white.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                            priority
                          />
                          <span className="text-base font-bold text-white tracking-wide">Admin</span>
                        </div>
                        <div
                          className="p-2 cursor-pointer rounded-lg hover:bg-white hover:bg-opacity-[0.06] transition-all duration-200"
                          onClick={close}
                        >
                          {closeIcon}
                        </div>
                      </div>

                      {/* Navigation */}
                      <nav className="px-3 pt-5">
                        <ul className="flex flex-col gap-y-1">
                          <div onClick={close}>
                            <SidebarOptions
                              link="/"
                              name="Dashboard"
                              sidebarOpen={false}
                              icon={dashboardSvg}
                            />
                          </div>
                          <div onClick={close}>
                            <SidebarOptions
                              link="/users"
                              link2="/user"
                              name="Users"
                              sidebarOpen={false}
                              icon={userSvg}
                            />
                          </div>
                          <div onClick={close}>
                            <SidebarOptions
                              link="/transactions"
                              name="Transactions"
                              sidebarOpen={false}
                              icon={transactionSvg}
                            />
                          </div>
                          <div onClick={close}>
                            <SidebarOptions
                              link="/reports"
                              name="Reports"
                              sidebarOpen={false}
                              icon={reportsSvg}
                            />
                          </div>
                          <div onClick={close}>
                            <SidebarOptions
                              link="/analytics"
                              name="Analytics"
                              sidebarOpen={false}
                              icon={analyticsSvg}
                            />
                          </div>
                        </ul>
                      </nav>

                      {/* Send Notification Button */}
                      <div className="px-3 pt-4">
                        <button
                          onClick={() => {
                            dispatch(setNotificationOption(true));
                            close();
                          }}
                          className="flex w-full items-center gap-x-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                          </svg>
                          <span>Send Notification</span>
                        </button>
                      </div>
                    </div>

                    {/* Bottom */}
                    <div className="flex flex-col px-3 pb-4">
                      <ul className="flex flex-col gap-y-1 mb-3">
                        <div onClick={close}>
                          <SidebarOptions
                            link="/settings"
                            name="Settings"
                            sidebarOpen={false}
                            icon={settingSvg}
                          />
                        </div>
                        <div onClick={close}>
                          <SidebarOptions
                            link="/change-password"
                            name="Change Password"
                            sidebarOpen={false}
                            icon={changePassSvg}
                          />
                        </div>
                      </ul>

                      <div className="border-t border-white border-opacity-[0.06] pt-4">
                        {/* User Info */}
                        {userStatus !== "succeeded" ? (
                          <div className="flex items-center gap-x-3 px-3 mb-3 animate-pulse">
                            <div className="h-9 w-9 flex-shrink-0 rounded-full bg-white bg-opacity-10" />
                            <div className="flex-1 overflow-hidden">
                              <div className="h-3.5 w-24 rounded bg-white bg-opacity-10 mb-1.5" />
                              <div className="h-2.5 w-14 rounded bg-white bg-opacity-[0.06]" />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-x-3 px-3 mb-3">
                            {userImage ? (
                              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full">
                                <Image src={userImage} alt="Profile" width={36} height={36} className="h-full w-full object-cover" />
                              </div>
                            ) : (
                              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-sidebarBackground">
                                {userInitial}
                              </div>
                            )}
                            <div className="overflow-hidden">
                              <p className="text-sm font-medium text-white truncate">{userName}</p>
                              <p className="text-xs text-gray-400">{userRole}</p>
                            </div>
                          </div>
                        )}

                        {/* Logout */}
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 bg-red-500 bg-opacity-10 text-red-400 hover:bg-opacity-20"
                        >
                          {logoutIconSvg}
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SidebarModal;

const closeIcon = (
  <svg
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.18489 0.4L5.00089 3.585L1.81489 0.399C1.71962 0.30584 1.59151 0.253926 1.45827 0.254487C1.32503 0.255048 1.19736 0.30804 1.10289 0.402L0.402886 1.103C0.354967 1.14897 0.316765 1.20409 0.290546 1.2651C0.264327 1.3261 0.250625 1.39175 0.250252 1.45815C0.249879 1.52455 0.262843 1.59035 0.288375 1.65165C0.313906 1.71295 0.351486 1.7685 0.398886 1.815L3.58389 4.999L0.399886 8.185C0.306858 8.2804 0.255123 8.40858 0.255872 8.54182C0.256621 8.67506 0.309792 8.80266 0.403886 8.897L1.10389 9.597C1.30989 9.804 1.61989 9.797 1.81589 9.601L5.00189 6.416L8.18589 9.601C8.28128 9.69403 8.40946 9.74576 8.54271 9.74501C8.67595 9.74427 8.80354 9.69109 8.89789 9.597L9.59889 8.897C9.64674 8.85097 9.68486 8.79579 9.711 8.73475C9.73713 8.67371 9.75074 8.60804 9.75102 8.54163C9.7513 8.47523 9.73824 8.40945 9.71263 8.34819C9.68701 8.28693 9.64935 8.23144 9.60189 8.185L6.41589 4.999L9.60189 1.815C9.69505 1.71974 9.74696 1.59163 9.7464 1.45838C9.74584 1.32514 9.69285 1.19748 9.59889 1.103L8.89889 0.403C8.85197 0.354972 8.796 0.316722 8.7342 0.290461C8.67241 0.264199 8.60603 0.250447 8.53889 0.25C8.47307 0.250538 8.40801 0.264065 8.34743 0.289806C8.28685 0.315547 8.23096 0.352994 8.18489 0.4Z"
      fill="white"
    />
  </svg>
);
