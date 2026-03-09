"use client";
import Filters from "@/components/sections/users/Filters";
import Table from "@/components/sections/transactions/Table";
import { useDispatch } from "react-redux";
import { setTransactionFilter } from "@/redux/slices/transactionsSlice";
import { useState, useEffect } from "react";
import { searchSvg } from "@/svgs";

const typeOptions = [
  { value: "show-all", label: "All Types" },
  { value: "Subscription", label: "Subscription" },
  { value: "Boost", label: "Boost" },
];

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setTransactionFilter({ search, page: 1 }));
    }, 300);
    return () => clearTimeout(handler);
  }, [search, dispatch]);

  const handleTypeChange = (value) => {
    dispatch(setTransactionFilter({ type: value === "show-all" ? "" : value, page: 1 }));
  };

  return (
    <div className="flex w-full flex-col animate-fade-in">
      <div className="flex w-full flex-row flex-wrap justify-between gap-y-5 mb-2">
        <h1 className="text-2xl font-semibold text-headingText tracking-tight">
          Transactions
        </h1>
        <div className="flex flex-row flex-wrap items-center gap-5">
          <div className="flex flex-row items-center gap-x-3">
            <p className="text-[13px] font-semibold text-filterHeading">Type</p>
            <Filters options={typeOptions} onChange={handleTypeChange} />
          </div>

          <div className="flex w-[300px] items-center gap-x-2.5 rounded-xl bg-white border border-gray-100 shadow-soft px-4 py-2.5 transition-all duration-200 focus-within:border-primary focus-within:shadow-input-focus">
            {searchSvg}
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-headingText placeholder:text-gray-400 placeholder:text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      <Table />
    </div>
  );
};

export default TransactionsPage;
