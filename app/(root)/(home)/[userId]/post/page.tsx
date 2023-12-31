"use client";
import Link from "next/link";
import React, { Suspense, useState } from "react";
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
  const [selectAccModalOpen, setSelectAccModalOpen] = useState(false);
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
              <div className="absolute right-0 p-3">
                <button onClick={() => setSelectAccModalOpen(true)}>
                  <svg
                    width="18"
                    height="14"
                    viewBox="0 0 18 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.75 1C0.75 0.585786 1.08579 0.25 1.5 0.25H16.5C16.9142 0.25 17.25 0.585786 17.25 1C17.25 1.41421 16.9142 1.75 16.5 1.75H1.5C1.08579 1.75 0.75 1.41421 0.75 1Z"
                      fill="white"
                    />
                    <path
                      d="M0.75 13C0.75 12.5858 1.08579 12.25 1.5 12.25H16.5C16.9142 12.25 17.25 12.5858 17.25 13C17.25 13.4142 16.9142 13.75 16.5 13.75H1.5C1.08579 13.75 0.75 13.4142 0.75 13Z"
                      fill="white"
                    />
                    <path
                      d="M1.5 6.25C1.08579 6.25 0.75 6.58579 0.75 7C0.75 7.41421 1.08579 7.75 1.5 7.75H16.5C16.9142 7.75 17.25 7.41421 17.25 7C17.25 6.58579 16.9142 6.25 16.5 6.25H1.5Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
              <MailBox />
            </div>
            <div className="relative  flex h-1/2 w-full grow flex-col justify-end">
              <Suspense
                fallback={<div className="mx-auto">냥이들 불러오는중..</div>}
              >
                <SelectAccessories
                  open={selectAccModalOpen}
                  setOpen={(state) => setSelectAccModalOpen(state)}
                />
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
