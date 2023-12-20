"use client";
import CommonQuery from "@/lib/queries/common.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import CatButtons from "@/components/pages/post/cat-buttons";
import PostBox from "@/components/pages/post/post-box";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { Suspense } from "react";
import { useSession } from "@/components/provider/session-provider";
import SelectAccessories from "@/components/pages/post/select-accessories";

const PostPage = () => {
  const router = useRouter();
  const { data } = useSession();
  const { data: cats } = useSuspenseQuery(CommonQuery.getCat);
  return (
    <section
      className="theme-responsive p-0"
      style={{
        backgroundImage: "url('/assets/post_bg.png')",
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-4 pt-4">
        <ArrowLeft className="text-white" onClick={() => router.back()} />
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-white">
            {data?.user?.nickname}의
            <br />
            신냥이 우체국
            <br />
          </h1>
          <sub className="text-base font-normal leading-6 text-gray-500">
            서랍을 누르면 편지를 확인할 수 있어요!
          </sub>
        </div>
        <div className="mt-6 flex w-full flex-col space-y-6">
          <div className="grid w-full grid-cols-3 justify-items-center gap-2">
            <Suspense fallback={<div>냥이들 불러오는중..</div>}>
              <CatButtons />
            </Suspense>
          </div>
          <div className="grid w-full grid-cols-3 justify-items-center gap-2">
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <PostBox key={index} className="px-8 py-2">
                  <div className="bg-wood-deep h-full w-full">
                    <motion.div
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
                    </motion.div>
                  </div>
                </PostBox>
              ))}
          </div>
        </div>
      </div>
      <div className="flex w-full grow items-end">
        <div className="relative flex h-full w-full grow flex-col items-end justify-end">
          <SelectAccessories>
            {(acc) => {
              return (
                <motion.div className="relative top-[calc(1.5dvw+1.5dvh)] mx-auto aspect-[375/329] h-[40%]">
                  <Image src={cats[0].image} alt="cat" fill />
                  {acc && <Image src={acc} alt="acc" fill />}
                </motion.div>
              );
            }}
          </SelectAccessories>
          <div
            className="z-[1] h-[50%] w-full bg-transparent"
            style={{
              backgroundImage: 'url("/assets/post_bottom.png")',
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
        <div className="absolute bottom-12 z-[2] w-full px-4">
          <Link href="letter">
            <Button className="w-full py-6">편지쓰기</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PostPage;
