"use client";
import Link from "next/link";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import PostTypeSelect from "@/components/pages/post/post-type-select";
import { AnimatePresence, domAnimation } from "framer-motion";
import { usePathname } from "next/navigation";
import { m, LazyMotion } from "framer-motion";
import BackButton from "@/components/back-button";
import MailBox from "@/components/svgs/mail-box";
import SelectAccessories from "@/components/pages/post/select-accessories";
import Image from "next/image";

const Button = dynamic(() =>
  import("@/components/ui/button").then((ui) => ui.Button),
);

const PostPage = () => {
  const pathname = usePathname();
  const isLetterShow = pathname.includes("letter");
  return (
    <AnimatePresence>
      {isLetterShow ? null : (
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full w-full grow flex-col items-end"
          >
            <div className="h-1/2 w-full">
              <div className="absolute p-3">
                <BackButton href="/" />
              </div>
              <MailBox />
            </div>
            <div className="relative  flex h-1/2 w-full grow flex-col justify-end">
              <Suspense
                fallback={<div className="mx-auto">냥이들 불러오는중..</div>}
              >
                <SelectAccessories />
              </Suspense>
              <div className="relative z-[1] flex h-3/5 w-full flex-col justify-between bg-transparent">
                <Image
                  src={
                    "https://res.cloudinary.com/dzfrlb2nb/image/upload/v1703753597/oeyygajwd4m0z6yyrkwr.png"
                  }
                  fill
                  priority
                  //  placeholder="blur"
                  //  blurDataURL={table.placeholder.base64}
                  alt="테이블"
                  className="-z-[1]"
                />
                <div className="h-full px-4">
                  <Suspense
                    fallback={
                      <div className="mx-auto">냥이들 불러오는중..</div>
                    }
                  >
                    <PostTypeSelect />
                  </Suspense>
                  <Link href="letter" className="mt-5 h-1/2">
                    <Button className="w-full">편지쓰기</Button>
                  </Link>
                </div>
              </div>
            </div>
          </m.div>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
};

export default PostPage;
