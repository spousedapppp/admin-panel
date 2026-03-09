"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, fetchData } from "@/redux/slices/allUsersSlice";
import Filters from "@/components/sections/users/Filters";
import SearchField from "@/components/fields/SearchField";

const statusSort = [
  { value: "show-all", label: "Show All" },
  { value: "suspended", label: "Suspended" },
  { value: "active", label: "Active" },
  { value: "unverified", label: "Unverified" },
];

const typeSort = [
  { value: "show-all", label: "Show All" },
  { value: "free", label: "Free" },
  { value: "upgraded", label: "Upgraded" },
];

const FiltersContainer = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.users.filters);

  const handleStatusChange = (status) => {
    if (status === "show-all") {
      dispatch(setFilter({ status: "" }));
    } else {
      dispatch(setFilter({ status }));
    }
  };

  const handleTypeChange = (type) => {
    if (type === "show-all") {
      dispatch(setFilter({ type: "" }));
    } else {
      dispatch(setFilter({ type }));
    }
  };

  const handleSearchChange = (search) => {
    dispatch(setFilter({ search }));
  };

  useEffect(() => {
    dispatch(fetchData(filters));
  }, [filters, dispatch]);

  return (
    <>
      <div className="flex flex-row items-center gap-x-3">
        <p className="text-[13px] font-semibold text-filterHeading">Status</p>
        <Filters options={statusSort} onChange={handleStatusChange} />
      </div>

      <div className="flex flex-row items-center gap-x-3">
        <p className="text-[13px] font-semibold text-filterHeading">
          User Type
        </p>
        <Filters options={typeSort} onChange={handleTypeChange} />
      </div>

      <SearchField onChange={handleSearchChange} />
    </>
  );
};

export default FiltersContainer;
