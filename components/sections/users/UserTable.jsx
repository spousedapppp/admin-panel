"use client";
import React, { useEffect } from "react";
import { Pagination } from "./Pagination";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteUserData,
  setDeleteUserOption,
} from "@/redux/slices/deleteUserSlice";
import {
  setEditUserData,
  setEditUserOption,
} from "@/redux/slices/editUserSlice";
import {
  setViewUserData,
  setViewUserOption,
} from "@/redux/slices/viewUserSlice";
import { useRouter } from "next/navigation";
import { fetchData, setFilter } from "@/redux/slices/allUsersSlice";
import Skeleton from "./Skeleton";

const UserTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { users, totalUsers } = useSelector((state) => state.users.data);
  const filters = useSelector((state) => state.users.filters);
  const status = useSelector((state) => state.users.status);
  const { page, limit } = filters;

  const deleteUser = (e, user) => {
    e.stopPropagation();
    dispatch(setDeleteUserOption(true));
    dispatch(setDeleteUserData(user));
  };

  const editUser = (e, user) => {
    e.stopPropagation();
    dispatch(setEditUserOption(true));
    dispatch(setEditUserData(user));
  };

  const statusStyle = (accountStatus) => {
    switch (accountStatus) {
      case "active":
        return "bg-emerald-50 text-emerald-600 border border-emerald-200";
      case "suspended":
        return "bg-red-50 text-red-500 border border-red-200";
      case "unverified":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      default:
        return "bg-gray-50 text-gray-500 border border-gray-200";
    }
  };

  useEffect(() => {
    dispatch(fetchData(filters));
  }, [dispatch, filters]);

  const paginate = (pageNumber) => {
    dispatch(setFilter({ page: pageNumber }));
  };

  const getFormatedDate = (dateString) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}, ${year}`;
  };

  return status === "loading" ? (
    <Skeleton />
  ) : (
    <div className="mt-4 w-full">
      <div className="no-scrollbar w-full overflow-y-hidden overflow-x-scroll">
        <table className="w-full table-auto rounded-2xl bg-white shadow-card border border-gray-100 overflow-hidden">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="py-3.5 pl-5 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="py-3.5 px-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
              <th className="py-3.5 px-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3.5 px-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="py-3.5 px-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user, index) => (
              <tr
                key={user._id}
                onClick={() =>
                  router.push(`/user/${user._id}`, { scroll: false })
                }
                className="cursor-pointer transition-all duration-200 hover:bg-primary/[0.08] group"
              >
                <td className="pl-5 pr-3 py-3.5">
                  <div className="flex items-center gap-x-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-gray-100 group-hover:ring-primary/30 transition-all duration-200">
                      <Image
                        src={user.photos[0] || "/profile.png"}
                        alt="User Profile"
                        className="h-full w-full object-cover"
                        width={40}
                        height={40}
                        priority
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-headingText truncate">{user.fullName}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3.5 text-center">
                  <span
                    className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium ${
                      user.proAccount
                        ? "bg-primary/10 text-primaryDark border border-primary/20"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}
                  >
                    {user.proAccount ? "Upgraded" : "Free"}
                  </span>
                </td>
                <td className="px-3 py-3.5 text-center">
                  <span
                    className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-medium capitalize ${statusStyle(
                      user.accountStatus.toLowerCase(),
                    )}`}
                  >
                    {user.accountStatus}
                  </span>
                </td>
                <td className="px-3 py-3.5 text-center">
                  <p className="text-sm text-gray-500">{getFormatedDate(user.createdAt)}</p>
                </td>
                <td className="px-3 py-3.5">
                  <div className="flex items-center justify-center gap-x-2.5">
                    {/* View */}
                    <button
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 transition-all duration-200 hover:bg-emerald-100 hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(setViewUserOption(true));
                        dispatch(setViewUserData(user));
                      }}
                      title="View user"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3C4.364 3 1.258 5.28 0 8.5c1.258 3.22 4.364 5.5 8 5.5s6.742-2.28 8-5.5C14.742 5.28 11.636 3 8 3z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="8" cy="8.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
                      </svg>
                    </button>
                    {/* Edit */}
                    <button
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-500 transition-all duration-200 hover:bg-blue-100 hover:scale-110"
                      onClick={(e) => editUser(e, user)}
                      title="Edit user"
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M2 13h11M2 13V10l7-7 2.625 2.625L4.625 13H2zM9 3l2.625 2.625" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    {/* Delete */}
                    <button
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-400 transition-all duration-200 hover:bg-red-100 hover:text-red-500 hover:scale-110"
                      onClick={(e) => deleteUser(e, user)}
                      title="Delete user"
                    >
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M2 4h11M5.5 4V2.75a1 1 0 011-1h2a1 1 0 011 1V4M6 6.75v3.5M9 6.75v3.5M3 4l.75 8a1.25 1.25 0 001.25 1.25h5A1.25 1.25 0 0011.25 12L12 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        perPage={limit}
        totalData={totalUsers}
        paginate={paginate}
        currentPage={page}
      />
    </div>
  );
};

export default UserTable;
