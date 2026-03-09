"use client";
import DeleteButton from "@/components/buttons/DeleteButton";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "@/redux/slices/getUserSlice";
import { useParams } from "next/navigation";
import {
  setDeleteUserOption,
  setDeleteUserData,
} from "@/redux/slices/deleteUserSlice";

const TopSection = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const data = useSelector((state) => state.user.data);

  useEffect(() => {
    dispatch(fetchData(params.slug));
  }, [dispatch, params.slug]);

  const openDeleteModal = () => {
    dispatch(setDeleteUserData(data));
    dispatch(setDeleteUserOption(true));
  };

  return (
    <div className="mt-6 flex w-full flex-row items-center justify-between border-b border-gray-100 pb-5">
      <div className="flex flex-row items-center gap-x-3">
        <p className="text-2xl font-bold text-headingText">
          {data.fullName}
        </p>
        <span className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">{data.profession}</span>
      </div>

      <DeleteButton id={data._id} onClick={openDeleteModal} />
    </div>
  );
};

export default TopSection;
