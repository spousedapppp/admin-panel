"use client";
import useRipple from "@/components/hooks/useRipple";
import { fetchData } from "@/redux/slices/loggedInUser";
import { logout } from "@/redux/slices/userSlice";
import { changePassSvg, settingsIconSvg, logoutIconSvg } from "@/svgs";
import toast from "react-hot-toast";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

const Account = () => {
  const ref = useRef(null);
  const ripples = useRipple(ref);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await dispatch(fetchData()).unwrap();
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, [dispatch]);

  const user = useSelector((state) => state.loggedInUser.data);

  const userName = useMemo(() => {
    if (user?.fullName) {
      const [firstName, lastName] = user.fullName.split(" ");
      return `${firstName?.charAt(0).toUpperCase() + firstName?.slice(1)} ${lastName?.charAt(0).toUpperCase() + lastName?.slice(1)}`;
    }
    return "User";
  }, [user?.fullName]);

  const userImage = useMemo(() => {
    return user?.photos?.[0] || "/profile.png";
  }, [user?.photos]);

  const handleLogout = async () => {
    toast.success("Logged out successfully");
    setTimeout(() => dispatch(logout()), 500);
  };

  return (
    <div className="bg-transparent">
      <div className="max-w-sm px-4">
        <Popover className="relative">
          {({ open }) => (
            <>
              <div className="overflow-hidden">
                <Popover.Button
                  ref={ref}
                  className={`relative flex h-[40px] w-[40px] cursor-pointer items-center justify-center overflow-hidden rounded-full transition-all duration-300 ease-in-out focus-visible:outline-none`}
                >
                  {ripples}
                  <Image
                    src={userImage}
                    alt="User Profile"
                    className=""
                    width={40}
                    height={40}
                    priority
                  />
                </Popover.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -right-[125px] z-10 mt-3 w-[260px] -translate-x-1/2 transform lg:max-w-3xl">
                  <div className="overflow-hidden rounded-2xl border border-white border-opacity-[0.08] glass-dark text-white shadow-2xl">
                    <div className="relative flex flex-col gap-y-1 py-3">
                      {/* account */}
                      <div className="flex w-full flex-row items-center gap-x-3 px-4 py-2.5 mb-1">
                        <div className="flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full ring-2 ring-primary ring-opacity-30">
                          <Image
                            src={userImage}
                            alt="User Profile"
                            className="object-cover"
                            width={36}
                            height={36}
                            priority
                          />
                        </div>
                        <div>
                          <h3 className="text-sm font-medium">{userName}</h3>
                          <p className="text-xs text-gray-400">Admin</p>
                        </div>
                      </div>

                      <div className="mx-3 border-t border-white border-opacity-[0.06]"></div>

                      {/* options */}
                      <div className="flex flex-col gap-y-0.5 py-1.5 px-1.5">
                        <Link
                          href={`/settings`}
                          className="flex w-full cursor-pointer flex-row items-center rounded-lg px-3 py-2.5 transition-all duration-200 ease-in-out hover:text-primary hover:bg-white hover:bg-opacity-[0.05]"
                        >
                          <div className={`flex flex-row items-center gap-3`}>
                            <div className="flex h-[18px] w-[18px] items-center justify-center">
                              {settingsIconSvg}
                            </div>
                            <p className="text-sm">Settings</p>
                          </div>
                        </Link>
                        <Link
                          href={`/change-password`}
                          className="flex w-full cursor-pointer flex-row items-center rounded-lg px-3 py-2.5 transition-all duration-200 ease-in-out hover:text-primary hover:bg-white hover:bg-opacity-[0.05]"
                        >
                          <div className={`flex flex-row items-center gap-3`}>
                            <div className="flex h-[18px] w-[18px] items-center justify-center">
                              {changePassSvg}
                            </div>
                            <p className="text-sm">Change Password</p>
                          </div>
                        </Link>
                      </div>

                      <div className="mx-3 border-t border-white border-opacity-[0.06]"></div>

                      <div className="flex flex-col py-1.5 px-1.5">
                        <div
                          className="w-full cursor-pointer rounded-lg px-3 py-2.5 transition-all duration-200 ease-in-out hover:text-red-400 hover:bg-red-500 hover:bg-opacity-[0.08]"
                          onClick={handleLogout}
                        >
                          <div className={`flex flex-row items-center gap-3`}>
                            <div className="flex h-[18px] w-[18px] items-center justify-center">
                              {logoutIconSvg}
                            </div>
                            <p className="text-sm">Logout</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  );
};

export default Account;
