"use client";
import React, { useEffect, useState } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import loadingImages from "@/app/assets/우무로딩";

interface LoadingProps {
  className?: string;
}
const Loading = ({ className }: LoadingProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timeoutId = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timeoutId);
      setTime(0);
    };
  }, []);
  return (
    <LazyMotion features={domAnimation}>
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
          "screen-height flex items-center justify-center  px-8",
          className,
        )}
      >
        <div className="relative h-full w-1/2">
          {}
          <Image
            src={loadingImages[time % loadingImages.length].src}
            alt="loading"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default Loading;
