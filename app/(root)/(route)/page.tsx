import React from "react";
import lazy from "next/dynamic";
import Image from "next/image";
import { generateBlurImageByImageList } from "@/actions/blur-image-.action";

// export const dynamic = "force-static";
const LoginButton = lazy(() => import("@/components/pages/login-button"));
const Layout = lazy(() => import("@/components/layout"));
const Particles = lazy(() => import("@/components/pages/particles"));
const Snow = lazy(() => import("@/components/pages/snow"));

const getOnBoardImages = async () => {
  const imageList = [
    {
      path: "/assets/home.png",
      name: "home" as const,
    },
    {
      path: "/assets/ct.png",
      name: "ct" as const,
    },
    {
      path: "https://res.cloudinary.com/dzfrlb2nb/image/upload/f_auto,q_auto/rholcy2vj2hyrgg2eg5k",
      name: "cat" as const,
    },
    {
      path: "https://res.cloudinary.com/dzfrlb2nb/image/upload/v1703088832/vssqszbwfxtjbzuolltr.png",
      name: "accessory" as const,
    },
  ];

  return await generateBlurImageByImageList(imageList);
};

const OnBoardingPage = async () => {
  const { accessory, cat, ct, home } = await getOnBoardImages();

  return (
    <Layout>
      <div className="theme-responsive relative">
        <div className="flex h-full w-full flex-col">
          <div className="mt-[4dvh] flex flex-1 flex-col justify-start text-center text-white">
            <div className="font-cheezu text-3xl font-medium leading-[50px]">
              새해를 알리는
              <br />
              2024 신냥이 우체국
            </div>
            <span className="title-regular mt-2">
              신년편지 냥이가 대신 전달해드립니다
            </span>
          </div>
          <div className="items-end">
            <LoginButton />
          </div>
        </div>
      </div>
      <div className="fixed left-1/2 top-1/2 h-[1080px] w-[575px] -translate-x-1/2 -translate-y-1/2 bg-black">
        <div className="relative -left-4">
          <Image
            src={home.src}
            alt="main_background"
            className="z-[1]"
            width={575}
            height={1080}
            placeholder="blur"
            blurDataURL={home.placeholder.base64}
          />
          <div className="absolute top-1 z-[1]">
            <Image
              src={ct.src}
              blurDataURL={ct.placeholder.base64}
              placeholder="blur"
              alt="main_background"
              className="z-[1]"
              width={575}
              height={1080}
            />
          </div>
          <div className="absolute left-1/2 top-[54%] z-0 aspect-[375/329] h-[15%] -translate-x-1/2">
            <Image
              src={cat.src}
              placeholder="blur"
              blurDataURL={cat.placeholder.base64}
              alt="cat"
              fill
            />
            <Image
              src={accessory.src}
              placeholder="blur"
              blurDataURL={accessory.placeholder.base64}
              alt="acc"
              fill
            />
          </div>
        </div>
        <Particles className="absolute left-0 top-0 z-[2] h-full w-full" />
        <Snow />
      </div>
    </Layout>
  );
};

export default OnBoardingPage;
