"use client";
import LargeButtons from "@/components/buttons/LargeButtons";
import EmailField from "@/components/fields/EmailField";
import PasswordFields from "@/components/fields/PasswordFields";
import { login } from "@/redux/slices/userSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    const resultAction = await dispatch(login({ email, password }));

    if (login.fulfilled.match(resultAction)) {
      toast.success("Welcome back!");
      router.push("/");
    } else {
      toast.error(resultAction.payload?.error || "Invalid credentials");
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="flex flex-col gap-y-5 w-[420px]" onKeyDown={handleKeyDown}>
      <div className="flex flex-col gap-y-1 mb-2">
        <h1 className="text-[28px] font-semibold tracking-tight">Welcome Back</h1>
        <p className="text-sm text-greyText">Sign in to your admin account</p>
      </div>

      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-1.5">
          <p className="text-sm font-medium text-gray-300">Email</p>
          <EmailField
            isLogin={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-1.5">
          <p className="text-sm font-medium text-gray-300">Password</p>
          <PasswordFields
            isLogin={true}
            value={password}
            placeHolder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <LargeButtons
        onClick={handleLogin}
        text={loading ? "Signing in..." : "Sign in"}
        isDisabled={loading}
        className="mt-2 w-full"
      />
    </div>
  );
};

export default LoginForm;
