"use client";
import { getNewUsers } from "@/api/api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import Skeleton from "../users/Skeleton";

const UsersTable = () => {
  const [newUsers, setNewUsers] = useState([]);
  const status = useSelector((state) => state.card.status);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getNewUsers();
      setNewUsers(res.data);
    };

    fetchUsers();
  }, []);

  return status === "loading" ? (
    <Skeleton />
  ) : (
    <div className="flex w-full flex-col">
      <p className="text-lg font-semibold text-headingText tracking-tight mb-4">New Users</p>
      <div className="w-full overflow-x-auto rounded-2xl bg-white shadow-card border border-gray-100">
        <table className="w-full table-auto text-sm">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="py-3 pl-5 pr-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th className="hidden md:table-cell py-3 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="hidden md:table-cell py-3 px-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="py-3 px-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {newUsers.map((user, index) => (
              <tr key={index} className="transition-all duration-200 hover:bg-primary/[0.08] group">
                <td className="pl-5 pr-3 py-3">
                  <div className="flex items-center gap-x-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full ring-2 ring-gray-100 group-hover:ring-primary/30 transition-all duration-200">
                      <Image
                        src={user.photos[0] || "/profile.png"}
                        alt="User Profile"
                        className="w-full h-full object-cover"
                        width={40}
                        height={40}
                        priority
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-headingText truncate">{user.fullName}</p>
                      <p className="text-xs text-gray-400 md:hidden truncate">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-3 py-3">
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </td>
                <td className="hidden md:table-cell px-3 py-3">
                  <p className="text-xs text-gray-400">
                    {moment(user.createdAt).fromNow()}
                  </p>
                </td>
                <td className="px-4 py-3 text-center">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
