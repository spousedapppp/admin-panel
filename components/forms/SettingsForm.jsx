"use client";
import { cameraSvg, loadingSvg } from "@/svgs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NameField from "../fields/NameField";
import EmailField from "../fields/EmailField";
import LargeButtons from "../buttons/LargeButtons";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/redux/slices/loggedInUser";
import { updateAdminProfile } from "@/redux/slices/updateAdminSlice";
import { getToken } from "@/redux/slices/userSlice";
import { HOSTNAME } from "@/config";
import toast from "react-hot-toast";

const SettingsForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedInUser.data);
  const userStatus = useSelector((state) => state.loggedInUser.status);
  const status = useSelector((state) => state.adminProfile.status);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [initialName, setInitialName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [localImage, setLocalImage] = useState(null); // only set when user picks a new file
  const [selectedImage, setSelectedImage] = useState(null);

  // Derive display image: local preview > user photo from API > fallback
  const image = localImage || user?.photos?.[0] || "/profile-1.png";

  // When user data loads, populate the form
  useEffect(() => {
    if (user?.email) {
      setName(user.fullName || "");
      setEmail(user.email || "");
      setInitialName(user.fullName || "");
      setInitialEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    setIsChanged(name !== initialName || email !== initialEmail || selectedImage);
  }, [name, email, initialName, initialEmail, selectedImage]);

  const handleDiscard = () => {
    setName(initialName);
    setSelectedImage(null);
    setLocalImage(null);
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("fullName", name);
      formData.append("email", email);
      if (selectedImage) {
        formData.append("file", selectedImage);
      }
      await dispatch(updateAdminProfile(formData)).unwrap();
      // Re-fetch user data so photos/name/email update everywhere (sidebar, header, etc.)
      await dispatch(fetchData());
      setInitialName(name);
      setInitialEmail(email);
      setSelectedImage(null);
      setLocalImage(null);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setLocalImage(URL.createObjectURL(file));
    }
  };

  if (userStatus !== "succeeded") {
    return (
      <div className="flex w-full flex-col items-center rounded-2xl bg-white shadow-card border border-gray-100 py-10 md:w-[65%] animate-pulse">
        <div className="mb-8 h-[140px] w-[140px] rounded-full bg-gray-200" />
        <div className="flex w-full flex-col gap-y-5 px-4 sm:w-[85%] lg:w-[60%]">
          <div>
            <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
            <div className="h-11 w-full bg-gray-100 rounded-xl" />
          </div>
          <div>
            <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
            <div className="h-11 w-full bg-gray-100 rounded-xl" />
          </div>
          <div className="h-12 w-full bg-gray-100 rounded-xl mt-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center rounded-2xl bg-white shadow-card border border-gray-100 py-10 md:w-[65%]">
      <div className="relative mb-8 h-[140px] w-[140px] cursor-pointer overflow-hidden rounded-full transition-all duration-300 group ring-4 ring-primary ring-opacity-20 hover:ring-opacity-40">
        <label htmlFor="profileImageInput" className="cursor-pointer">
          <Image
            src={image || "/profile-1.png"}
            alt="profile picture"
            className="h-full w-full object-cover"
            width={140}
            height={140}
            priority
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {cameraSvg}
          </div>
        </label>
        <input
          id="profileImageInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex w-full flex-col gap-y-5 px-4 sm:w-[85%] lg:w-[60%]">
        <div className="flex flex-col gap-y-1.5">
          <p className="text-sm font-medium text-gray-500">Full Name</p>
          <NameField
            isLogin={false}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <p className="text-sm font-medium text-gray-500">Email Address</p>
          <EmailField
            isLogin={false}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            readOnly={false}
          />
        </div>

        <div className="flex flex-col gap-y-3 mt-2">
          {isChanged && (
            <button
              onClick={handleDiscard}
              className="w-full rounded-xl border border-gray-200 py-3 font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 focus:outline-none"
            >
              Discard Changes
            </button>
          )}
          <LargeButtons
            onClick={handleUpdate}
            isDisabled={status === "loading"}
            className="w-full"
            text={
              status === "loading" ? (
                <div className="flex items-center justify-center gap-2">
                  {loadingSvg}
                  Updating...
                </div>
              ) : (
                "Save Changes"
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
