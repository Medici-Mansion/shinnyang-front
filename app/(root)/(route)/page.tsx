import React from "react";
import lazy from "next/dynamic";
import Image from "next/image";
import HomeButton from "@/components/home-button";
import cloud1 from "@/app/assets/cloud1.png";
import cloud2 from "@/app/assets/cloud2.png";
import 설냥 from "@/app/assets/cat.png";

export const revalidate = 3600;

const Snow = lazy(() => import("@/components/pages/snow"));

function daysUntilNewYear() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const nextYear =
    today > new Date(`${today.getFullYear()}-02-10`)
      ? currentYear + 1
      : currentYear;
  const newYearDate = new Date(`${nextYear}-02-10`);

  const differenceInTime = newYearDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
}

const OnBoardingPage = async () => {
  return (
    <>
      <div className="theme-responsive relative">
        <div className="flex h-full w-full flex-col">
          <div className="relative z-10 flex flex-1 flex-col justify-start text-center text-main">
            <div className=" mx-auto w-fit font-umu text-4xl font-medium leading-[50px]">
              새해복설냥
            </div>
            <span className="title-regular font-umu leading-10">
              설날 편지 대신 써드린다냥
            </span>
            <p className="mx-auto flex h-12 w-fit items-center rounded-md bg-[rgba(164,214,255,0.5)] px-4 font-umu">
              종료 D-{daysUntilNewYear()}
            </p>
          </div>
          <div className="absolute bottom-[5%] right-0 w-[90%] grow">
            <Image
              className="w-full"
              width={설냥.width}
              height={설냥.height}
              src={설냥.src}
              blurDataURL={설냥.blurDataURL}
              placeholder="blur"
              alt="설냥"
            />
          </div>
          <div className="items-end">
            <HomeButton />
          </div>
        </div>
      </div>
      <div>
        <svg
          className="moon absolute -right-[80px] -top-[80px]"
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_1056_16087)">
            <path
              d="M170 110C170 143.137 143.137 170 110 170C76.8629 170 50 143.137 50 110C50 76.8629 76.8629 50 110 50C143.137 50 170 76.8629 170 110Z"
              fill="#F0D460"
            />
          </g>
          <g filter="url(#filter1_f_1056_16087)">
            <path
              d="M170 110C170 143.137 143.137 170 110 170C76.8629 170 50 143.137 50 110C50 76.8629 76.8629 50 110 50C143.137 50 170 76.8629 170 110Z"
              fill="#FAF5C8"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_1056_16087"
              x="46"
              y="46"
              width="128"
              height="128"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="2"
                result="effect1_foregroundBlur_1056_16087"
              />
            </filter>
            <filter
              id="filter1_f_1056_16087"
              x="0"
              y="0"
              width="220"
              height="220"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="25"
                result="effect1_foregroundBlur_1056_16087"
              />
            </filter>
          </defs>
        </svg>
        <Image
          className="absolute -left-12 top-1/4"
          src={cloud1}
          width={cloud1.width}
          height={cloud1.height}
          blurDataURL={cloud1.blurDataURL}
          placeholder="blur"
          alt=""
        />
        <Image
          className="absolute -right-12 top-8"
          src={cloud2}
          width={cloud2.width}
          height={cloud2.height}
          blurDataURL={cloud2.blurDataURL}
          placeholder="blur"
          alt=""
        />
      </div>

      {/* <Particles className="absolute left-0 top-0 z-[2] h-full w-full" />
       */}
      <Snow style={{ backgroundColor: "transparent", zIndex: 2 }} />
    </>
  );
};

export default OnBoardingPage;
