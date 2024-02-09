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
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.1429 8.8073C11.1429 8.46728 11.4419 7.96484 12.0454 7.96484C12.2902 7.96484 12.4585 8.07686 12.5741 8.238C12.6958 8.40757 12.7545 8.62842 12.7545 8.8073C12.7545 9.12151 12.5745 9.31235 12.2178 9.56843C11.7152 9.92932 11.6833 10.5135 11.7142 10.9251C11.5928 10.9512 11.4742 10.9952 11.3625 11.0571L7.40938 13.2456C7.03873 13.449 6.7453 13.7771 6.66445 14.1647C6.57917 14.5736 6.74295 14.9843 7.16097 15.294C7.35657 15.4389 7.58848 15.4821 7.7907 15.4821H16.2357C16.7516 15.4821 17.1809 15.0996 17.3134 14.6387C17.3815 14.4016 17.3742 14.1367 17.2586 13.8843C17.1432 13.6323 16.9289 13.4119 16.6154 13.2448L16.6142 13.2441L12.5996 11.0533C12.4827 10.9895 12.3584 10.9452 12.2313 10.9202C12.1982 10.5353 12.2397 10.1898 12.5176 9.99029C12.8829 9.72794 13.2702 9.40034 13.2702 8.8073C13.2702 8.53254 13.1846 8.20256 12.9924 7.93471C12.7941 7.65841 12.479 7.44641 12.0454 7.44641C11.1017 7.44641 10.6271 8.24005 10.6271 8.8073C10.6271 8.95046 10.7426 9.06651 10.885 9.06651C11.0274 9.06651 11.1429 8.95046 11.1429 8.8073ZM11.6113 11.5112C11.8422 11.3834 12.1219 11.3825 12.3536 11.5089L16.3717 13.7017L16.3729 13.7023C16.6066 13.8267 16.7304 13.9706 16.7901 14.101C16.8498 14.2314 16.8545 14.3674 16.8179 14.4948C16.7409 14.7629 16.4932 14.9637 16.2357 14.9637H7.7907C7.65433 14.9637 7.5439 14.9337 7.46694 14.8767C7.1835 14.6667 7.13203 14.4493 7.1692 14.2711C7.21078 14.0718 7.37779 13.8535 7.65632 13.7008L11.6113 11.5112Z"
                      fill="white"
                      stroke="white"
                      strokeWidth="0.8"
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* <svg
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
                  </svg> */}
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
