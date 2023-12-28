"use client";
import { ImageWithBlur } from "@/actions/blur-image-.action";
import { BROWSER } from "@/constants";
import { loadingStore } from "@/store/loading.store";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Background = ({ post }: { post: ImageWithBlur }) => {
  const { setIsLoading } = loadingStore();
  const backgroundRef = useRef<HTMLDivElement>(null);
  const handleResize = useCallback(() => {
    if (backgroundRef.current) {
      const boxRect = backgroundRef.current?.getBoundingClientRect();
      if (boxRect) {
        const windowWidth = window.innerWidth as number;
        if (windowWidth <= BROWSER.MAX_WIDTH) {
          backgroundRef.current.style.left =
            -((boxRect.width - windowWidth) / 2) + "px";
        } else {
          backgroundRef.current.style.left = "";
        }
        const windowHeight = window.innerHeight;
        if (windowHeight <= BROWSER.MAX_HEIGHT) {
          backgroundRef.current.style.top = (windowHeight - 1080) / 2 + "px";
        } else {
          backgroundRef.current.style.top = "";
        }
        setIsLoading(false);
      }
    }
  }, [setIsLoading]);
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  }, []);
  return (
    <div
      ref={backgroundRef}
      className="fixed top-0 -z-[1] h-full min-h-[1080px] w-[574px]"
    >
      <Image
        src={post.src}
        placeholder="blur"
        width={post.placeholder.metadata.width}
        height={post.placeholder.metadata.height}
        blurDataURL={post.placeholder.base64}
        alt="background"
      />
    </div>
  );
};

export default Background;
