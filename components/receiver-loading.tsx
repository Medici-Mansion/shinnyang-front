"use client";
import React, { useLayoutEffect, useState } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import loadingImages from "@/app/assets/배달로딩";
import Snow from "./pages/snow";
import { LetterFormValues } from "@/form-state";

interface LoadingProps {
  className?: string;
  catType: LetterFormValues["catName"];
  onFinish: () => void;
}
const ReceiverLoading = ({ className, onFinish, catType }: LoadingProps) => {
  const [time, setTime] = useState(0);

  useLayoutEffect(() => {
    const timeoutId = setInterval(() => {
      setTime((prev) => {
        if (prev === loadingImages.length - 1) {
          clearInterval(timeoutId);
          setTimeout(() => {
            onFinish();
          }, 2000);
        }

        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(timeoutId);
      setTime(0);
    };
  }, [onFinish]);

  const image =
    time >= loadingImages.length
      ? loadingImages[loadingImages.length - 1]
      : loadingImages[time % loadingImages.length];

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={cn(
          "flex  h-full  flex-col overflow-y-hidden overflow-x-clip p-6 text-main duration-100",
          catType === "umu"
            ? "bg-background"
            : catType === "cheezu"
              ? "bg-[#E8E2D6]"
              : catType === "gookie"
                ? "bg-[#92AFC7]"
                : "bg-background",
        )}
      >
        <div className="mt-6 font-umu text-[26px] leading-[46px]">
          설냥이가 안전하게
          <br />
          편지 배달왔다냥 ค^•ﻌ•^ค
        </div>
        <m.div
          variants={{
            initial: {
              opacity: 1,
            },
            animate: {
              opacity: 1,
            },
            exit: {
              opacity: 0,
            },
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          className={cn(
            "flex h-[100dvh] items-center justify-center px-8",
            className,
          )}
        >
          <div className="relative -top-12 w-1/2">
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt="loading"
              style={{ objectFit: "contain" }}
            />
          </div>
        </m.div>
      </div>
      <Snow style={{ backgroundColor: "transparent", zIndex: 2 }} />
    </LazyMotion>
  );
};

export default ReceiverLoading;
