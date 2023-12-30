"use client";
import { ImageWithBlur } from "@/actions/blur-image-.action";
import Loading from "@/components/loading";
import { BROWSER } from "@/constants";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

const Background = ({ post }: { post: ImageWithBlur }) => {
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
    }
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  }, [handleResize]);
  return (
    <>
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
      {loading && (
        <div className="fixed left-0 top-0 z-[9999] mx-auto h-full w-full">
          <div className="theme-responsive p-0">
            <Loading />
          </div>
        </div>
      )}
    </>
  );
};

export default Background;
