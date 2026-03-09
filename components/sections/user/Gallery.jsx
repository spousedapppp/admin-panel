"use client";

import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const Gallery = () => {
  const { photos } = useSelector((state) => state.user.data);

  return (
    <div className="flex w-full flex-col gap-y-4 md:w-[39%]">
      <div className="rounded-2xl bg-white p-6 shadow-card">
        <p className="mb-4 text-lg font-semibold text-headingText">Photo Gallery</p>

        <div className="flex w-full flex-row flex-wrap gap-3">
          {photos?.map(
            (photo) =>
              photo && (
                <div
                  className="group relative h-[200px] w-[160px] overflow-hidden rounded-2xl"
                  key={photo}
                >
                  <Image
                    src={photo}
                    alt="profile picture"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
