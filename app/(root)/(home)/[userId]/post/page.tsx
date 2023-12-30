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
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="14"
                      cy="14.4375"
                      r="13.3"
                      stroke="white"
                      strokeWidth="1.4"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.6004 9.22278C12.6004 8.66743 13.0889 7.84677 14.0746 7.84677C14.4745 7.84677 14.7494 8.02974 14.9382 8.29292C15.137 8.56989 15.2328 8.93062 15.2328 9.22278C15.2328 9.736 14.9387 10.0477 14.3562 10.466C13.5353 11.0554 13.4831 12.0096 13.5337 12.6818C13.3353 12.7246 13.1417 12.7964 12.9593 12.8974L6.50245 16.4721C5.89704 16.8042 5.41778 17.3401 5.28573 17.9732C5.14643 18.6411 5.41394 19.3119 6.09671 19.8178C6.41619 20.0545 6.79497 20.125 7.12527 20.125H20.9187C21.7615 20.125 22.4626 19.5003 22.679 18.7474C22.7903 18.3602 22.7783 17.9274 22.5895 17.5151C22.401 17.1036 22.0511 16.7436 21.5389 16.4706L21.5369 16.4696L14.9799 12.8913C14.7889 12.7871 14.5859 12.7146 14.3782 12.6739C14.3242 12.0452 14.392 11.4808 14.8458 11.155C15.4426 10.7265 16.0751 10.1914 16.0751 9.22278C16.0751 8.77402 15.9353 8.23505 15.6214 7.79755C15.2976 7.34627 14.7827 7 14.0746 7C12.5332 7 11.7581 8.29628 11.7581 9.22278C11.7581 9.45661 11.9467 9.64617 12.1793 9.64617C12.4119 9.64617 12.6004 9.45661 12.6004 9.22278ZM13.3656 13.6391C13.7427 13.4304 14.1996 13.429 14.578 13.6355L21.1409 17.2169L21.1428 17.2179C21.5246 17.4211 21.7267 17.6562 21.8243 17.8692C21.9218 18.0821 21.9295 18.3043 21.8697 18.5124C21.7439 18.9503 21.3394 19.2782 20.9187 19.2782H7.12527C6.90254 19.2782 6.72216 19.2293 6.59646 19.1361C6.13351 18.7932 6.04943 18.4381 6.11015 18.147C6.17807 17.8214 6.45085 17.4649 6.90578 17.2154L13.3656 13.6391Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="0.8"
                      strokeLinecap="round"
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
