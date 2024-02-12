import React from "react";
import lazy from "next/dynamic";
import Image from "next/image";
import HomeButton from "@/components/home-button";
import cloud1 from "@/app/assets/cloud1.png";
import cloud2 from "@/app/assets/cloud2.png";
import 설냥 from "@/app/assets/cat.png";
import { getLetterCount } from "@/actions/letter-count";

export const revalidate = 3600;

const Snow = lazy(() => import("@/components/pages/snow"));

const OnBoardingPage = async () => {
  const totalLetterCount = await getLetterCount();

  return (
    <>
      <div className="theme-responsive relative">
        <div className="flex h-full w-full flex-col">
          <div className="relative z-10 mt-10 flex flex-1 flex-col justify-start text-center text-main">
            <div className=" mx-auto w-fit font-umu text-4xl font-medium leading-[58px]">
              새해복설냥
            </div>
            <span className="font-umu text-[22px] leading-[58px]">
              설날 편지 대신 주러간다냥
            </span>
            <div className="mt-2 flex items-center justify-center">
              {totalLetterCount && (
                <span className="rounded-full bg-gradient-to-r from-[#D6FFD6] via-[#FFFFD4] to-[#FFDAFF] px-5 py-2 font-pretendard text-sm font-semibold text-[#002232]">
                  총 {totalLetterCount.letterCount} 개의 편지를 줬다냥!
                </span>
              )}
            </div>
          </div>
          <div className="absolute bottom-[5%] right-0 w-[90%] grow">
            <Image
              className="w-full"
              width={설냥.width}
              height={설냥.height}
              src={설냥.src}
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
          alt=""
        />
        <Image
          className="absolute -right-12 top-8"
          src={cloud2}
          width={cloud2.width}
          height={cloud2.height}
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
