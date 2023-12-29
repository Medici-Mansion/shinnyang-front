"use client";
import React from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface LoadingProps {
  className?: string;
}
const Loading = ({ className }: LoadingProps) => {
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
          "flex h-full items-center justify-center bg-background px-8",
          className,
        )}
      >
        <div className="relative h-full w-full">
          <Image
            src="/assets/loading.gif"
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
