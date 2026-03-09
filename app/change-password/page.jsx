import ChangePassForm from "@/components/forms/ChangePassForm";
import React from "react";

const page = () => {
    
  return (
    <div className="flex w-full flex-col items-center animate-fade-in">
      <h1 className="self-start text-2xl font-semibold text-headingText tracking-tight mb-6">
        Change Password
      </h1>

     <ChangePassForm />
    </div>
  );
};

export default page;
