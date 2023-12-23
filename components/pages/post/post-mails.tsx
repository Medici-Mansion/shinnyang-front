"use client";
import React from "react";
import PostBox from "./post-box";
import { LazyMotion, m } from "framer-motion";
import Image from "next/image";

const PostMails = () => {
  const loadDomFeature = () =>
    import("@/animation/motion-features").then((res) => res.default);
  return Array(9)
    .fill(0)
    .map((_, index) => (
      <PostBox key={index} className="px-2 py-2">
        <div className="h-full w-full bg-wood-deep">
          <LazyMotion features={loadDomFeature}>
            <m.div
              initial={{
                rotateX: 50,
                rotateY: 0,
                rotateZ: 180,
                translateX: -20,
                translateY: -20,
                scale: 2,
                opacity: 0,
              }}
              animate={{
                translateX: 0,
                translateY: 0,
                scale: 0.9,
                opacity: 1,
              }}
              transition={{
                type: "tween",
              }}
              className="scale-70 relative aspect-[2/1] w-full"
              style={{
                transform: "rotate3d(1, 0, 0, 135deg) scale(0.9)",
                transformStyle: "preserve-3d",
              }}
            >
              <Image src="/assets/envelope.png" fill alt="envelope" />
            </m.div>
          </LazyMotion>
        </div>
      </PostBox>
    ));
};

export default PostMails;
