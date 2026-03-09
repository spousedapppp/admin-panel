import { loginLinesSvg} from "@/svgs";
import React from "react";
import Image from "next/image";
import ForgotpasswordForm from "@/components/forms/ForgotpasswordForm";

const page = () => {

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-login-gradient z-0 text-white">
      {/* Lines */}
      <div className="absolute bottom-0 right-0 z-10">{loginLinesSvg}</div>

      <div className="flex flex-col items-center gap-y-[103px] z-20 px-4">
        <Image
          src="/logo.svg"
          alt="GetSpouse Logo"
          className=""
          width={173.53}
          height={144}
          priority
        />

        <ForgotpasswordForm />
      </div>
    </div>
  );
};

export default page;
