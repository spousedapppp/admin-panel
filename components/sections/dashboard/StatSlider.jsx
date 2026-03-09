"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from "./Cards";
import { dollarSvg, premiumUsersSvg, totalUserSvg } from "@/svgs";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "@/redux/slices/cardsSlice";

const StatSlider = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.card.data);
  const status = useSelector((state) => state.card.status);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const [current, setCurrent] = useState(0);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
    initialSlide: 0,
    beforeChange: (prev, next) => {
      setCurrent(next);
    },
    responsive: [
      {
        breakpoint: 1281,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 807,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 765,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

    appendDots: (dots) => (
      <div
        style={{
          bottom: "0px",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),

    customPaging: (index) => (
      <div
        className={`h-2 w-2 rounded-full bg-primary ${
          index === current ? "opacity-100" : "opacity-50"
        }`}
      ></div>
    ),
  };

  return status === "loading" ? (
    <div className="block overflow-hidden xl:hidden">
      <div className="flex gap-x-3 overflow-x-auto">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="flex w-64 flex-col gap-y-3 rounded-md bg-gray-100 p-4"
          >
            <div className="h-6 w-24 rounded bg-gray-300"></div>
            <div className="h-8 w-32 rounded bg-gray-300"></div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <Slider {...settings}>
      <div className="px-0 md:px-2">
        <Cards
          slider={true}
          title="Total Revenue"
          subtitle={`$${data.revenue[0]?.total}`}
          color="text-amber-600"
          gradient="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border border-amber-100/60 shadow-card hover:shadow-card-hover"
          iconBg="bg-amber-500 bg-opacity-15"
          labelColor="text-amber-500/70"
          icon={dollarSvg}
        />
      </div>

      <div className="px-0 sm:px-2">
        <Cards
          slider={true}
          title="Upgraded Users"
          subtitle={data.upgraded}
          color="text-blue-700"
          gradient="bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 border border-blue-100/60 shadow-card hover:shadow-card-hover"
          iconBg="bg-blue-500 bg-opacity-15"
          labelColor="text-blue-500/70"
          icon={premiumUsersSvg}
        />
      </div>

      <div className="px-0 md:px-2">
        <Cards
          slider={true}
          title="Total Users"
          subtitle={data.users}
          color="text-emerald-700"
          gradient="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border border-emerald-100/60 shadow-card hover:shadow-card-hover"
          iconBg="bg-emerald-500 bg-opacity-15"
          labelColor="text-emerald-500/70"
          icon={totalUserSvg}
        />
      </div>
    </Slider>
  );
};

export default StatSlider;
