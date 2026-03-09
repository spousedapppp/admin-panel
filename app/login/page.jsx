import { loginLinesSvg} from "@/svgs";
import React from "react";
import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";

const page = () => {

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-login-gradient z-0 text-white">
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary opacity-[0.04] rounded-full blur-[120px] z-10"></div>

      {/* Lines */}
      <div className="absolute bottom-0 right-0 z-10 opacity-30">{loginLinesSvg}</div>

      <div className="flex flex-col items-center gap-y-16 z-20 animate-fade-in">
        <Image
          src="/logo.svg"
          alt="GetSpouse Logo"
          className="drop-shadow-lg"
          width={160}
          height={133}
          priority
        />

        <div className="glass-dark rounded-3xl px-10 py-10 border border-white border-opacity-[0.06] shadow-2xl">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default page;
