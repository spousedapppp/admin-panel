"use client";
import { searchSvg } from "@/svgs";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../../redux/slices/allUsersSlice";

const SearchField = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    dispatch(fetchData({ search: debouncedSearch }));
  }, [debouncedSearch, dispatch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex w-[300px] items-center gap-x-2.5 rounded-xl bg-white border border-gray-100 shadow-soft px-4 py-2.5 transition-all duration-200 focus-within:border-primary focus-within:shadow-input-focus">
      {searchSvg}
      <input
        type="text"
        placeholder="Search any user..."
        value={search}
        onChange={handleSearchChange}
        className="w-full bg-transparent text-sm text-headingText placeholder:text-gray-400 placeholder:text-sm focus:outline-none"
      />
    </div>
  );
};

export default SearchField;
