import AboutMe from "@/components/sections/user/AboutMe";
import BackButton from "@/components/sections/user/BackButton";
import Bio from "@/components/sections/user/Bio";
import Gallery from "@/components/sections/user/Gallery";
import Interest from "@/components/sections/user/Interest";
import Location from "@/components/sections/user/Location";
import Personality from "@/components/sections/user/Personality";
import Religiosity from "@/components/sections/user/Religiosity";
import TopSection from "@/components/sections/user/TopSection";
import React from "react";

const page = () => {
  return (
    <div className="flex w-full flex-col">
      {/* back button */}
      <BackButton />

      {/* Top Area */}
      <TopSection />

      <div className="mt-6 flex w-full flex-row flex-wrap justify-between gap-y-5">
        <div className="flex w-full flex-col gap-y-5 md:w-[59%]">
          <AboutMe />
          <Bio />
          <Interest />
          <Location />
          <Religiosity />
          <Personality/>
        </div>
        <Gallery />
      </div>
    </div>
  );
};

export default page;
