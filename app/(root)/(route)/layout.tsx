import Layout from "@/components/layout";
import Particles from "@/components/pages/particles";
import Snow from "@/components/pages/snow";
import Image from "next/image";
import React, { PropsWithChildren } from "react";
const OnBoardingLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      {children}
      <div className="fixed left-1/2 top-1/2 h-[1080px] w-[575px] -translate-x-1/2 -translate-y-1/2 bg-black">
        <div className="relative -left-4">
          <Image
            src="/assets/home.png"
            alt="main_background"
            className="z-[1]"
            width={575}
            height={1080}
          />
          <div className="absolute top-1 z-10">
            <Image
              src="/assets/ct.png"
              alt="main_background"
              className="z-[1]"
              width={575}
              height={1080}
            />
          </div>
          <div className="absolute left-1/2 top-[54%] z-0 aspect-[375/329] h-[15%] -translate-x-1/2">
            <Image
              src={
                "https://res.cloudinary.com/dzfrlb2nb/image/upload/f_auto,q_auto/rholcy2vj2hyrgg2eg5k"
              }
              alt="cat"
              fill
            />
            <Image
              src={
                "https://res.cloudinary.com/dzfrlb2nb/image/upload/v1703088832/vssqszbwfxtjbzuolltr.png"
              }
              alt="acc"
              fill
            />
          </div>
        </div>
        <Particles className="absolute top-0 h-full w-full" />
        <Snow />
      </div>
    </Layout>
  );
};

export default OnBoardingLayout;
