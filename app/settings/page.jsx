import SettingsForm from "@/components/forms/SettingsForm";
import React from "react";

const page = () => {
    
  return (
    <div className="flex w-full flex-col items-center animate-fade-in">
      <h1 className="self-start text-2xl font-semibold text-headingText tracking-tight mb-6">
        Settings
      </h1>

     <SettingsForm />
    </div>
  );
};

export default page;
