"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LargeButtons from "../buttons/LargeButtons";
import PasswordFields from "../fields/PasswordFields";
import { changePassword } from "@/redux/slices/updateAdminSlice";
import { loadingSvg } from "@/svgs";
import toast from "react-hot-toast";

const ChangePassForm = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.adminProfile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [initialNewPassword, setInitialNewPassword] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    setIsChanged(newPassword !== initialNewPassword);
  }, [newPassword, initialNewPassword]);

  const handleDiscard = () => {
    setNewPassword("");
    setConfirmPassword("");
    setValidationError("");
    setInitialNewPassword("");
  };

  const handleUpdate = async () => {
    if (newPassword !== confirmPassword) {
      setValidationError("New Password and Confirm Password do not match");
      toast.error("Passwords do not match");
      return;
    }
    try {
      await dispatch(changePassword({ oldPassword, newPassword })).unwrap();
      setInitialNewPassword("");
      setValidationError("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed successfully");
    } catch (error) {
      toast.error(error?.error || "Failed to change password");
    }
  };

  return (
    <div className="flex w-full flex-col items-center rounded-2xl bg-white shadow-card border border-gray-100 py-10 md:w-[65%]">
      <div className="flex w-full flex-col gap-y-5 px-4 sm:w-[85%] lg:w-[60%]">
        {validationError && (
          <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3">
            <p className="text-sm text-red-600">{validationError}</p>
          </div>
        )}
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3">
            <p className="text-sm text-red-600">Unable to change password</p>
          </div>
        )}

        <div className="flex flex-col gap-y-1.5">
          <p className="text-sm font-medium text-gray-500">Current Password</p>
          <PasswordFields
            id="Old password"
            isLogin={false}
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            placeHolder="Enter current password"
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <p className="text-sm font-medium text-gray-500">New Password</p>
          <PasswordFields
            id="New password"
            isLogin={false}
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            placeHolder="Enter new password"
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <p className="text-sm font-medium text-gray-500">Confirm Password</p>
          <PasswordFields
            id="Confirm password"
            isLogin={false}
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeHolder="Confirm new password"
          />
        </div>

        <div className="flex flex-col gap-y-3 mt-2">
          {isChanged && (
            <button
              onClick={handleDiscard}
              className="w-full rounded-xl border border-gray-200 py-3 font-medium text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 focus:outline-none"
            >
              Discard
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
                "Update Password"
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePassForm;
