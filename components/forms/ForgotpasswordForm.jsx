"use client";
import LargeButtons from "@/components/buttons/LargeButtons";
import EmailField from "@/components/fields/EmailField";
import PasswordFields from "@/components/fields/PasswordFields";
import { backSvg } from "@/svgs";
import Link from "next/link";
import React, { useState } from "react";

const ForgotpasswordForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex flex-col gap-y-5">
      <h1 className="text-[32px] font-medium">Admin Panel</h1>

      <div className="flex flex-col gap-y-3 sm:w-4/5 w-full">
        <h2 className="mt-[6px] text-2xl font-medium">Forget Password</h2>
        <p className="text-greyText text-sm">
          Write email associated with your account. A link will be sent to that
          email.
        </p>
      </div>

      <div className="flex flex-col gap-y-1">
        <p>Email</p>
        <EmailField isLogin={true} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <LargeButtons
        onClick={() => console.log(email)}
        text="Get Link"
        className="mt-1.5"
      />

      <div className="flex justify-center">
        <Link
          className="text-greyText cursor-pointer text-sm flex flex-row items-center gap-x-2"
          href={"/login"}
        >
          {backSvg}
          <p>Back to login</p>
        </Link>
      </div>
    </div>
  );
};

export default ForgotpasswordForm;
