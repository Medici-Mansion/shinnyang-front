import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import PrefetchQuery from "@/hydrate/prefetch-query";
import CommonQuery from "@/lib/queries/common.query";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const Button = dynamic(() =>
  import("@/components/ui/button").then((ui) => ui.Button),
);

const BackButton = dynamic(() => import("@/components/back-button"));
const Background = dynamic(() => import("@/components/pages/post/background"));
const MailBox = dynamic(() => import("@/components/svgs/mail-box"));

const SelectAccessories = dynamic(
  () => import("@/components/pages/post/select-accessories"),
);

const PostPage = async () => {
  return (
    <>
      <div className="px-4 pt-4">
        <BackButton href="/" />
      </div>
      <MailBox />
      <div className="flex w-full grow items-end">
        <div className="relative  flex h-full w-full grow flex-col justify-end">
          <Suspense
            fallback={<div className="mx-auto">냥이들 불러오는중..</div>}
          >
            <PrefetchQuery queries={[CommonQuery.getCat, CommonQuery.getAcc]}>
              <SelectAccessories />
            </PrefetchQuery>
          </Suspense>
          <div
            className="relative z-[1] flex h-full w-full flex-col justify-between bg-transparent pb-5 pt-12"
            style={{
              backgroundImage: "url('/assets/테이블.png')",
              objectFit: "cover",
              objectPosition: "top",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex w-full justify-center">
              <div className="flex flex-1 justify-center">
                <button className="flex aspect-square h-8 w-fit items-center justify-center rounded-md border-4 border-[#DDA973] bg-[#ECD2B9] ring-4 ring-[#28100B]">
                  <svg
                    width="33"
                    height="30"
                    viewBox="0 0 33 30"
                    fill=""
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.2266 8.96094H18.9395L19.3008 10.7578V11.1094C16.4362 13.7721 15.0039 15.2044 15.0039 15.4062C18.4089 16.5977 20.3197 17.4342 20.7363 17.916V18.9902C20.7363 19.4655 20.4954 19.7031 20.0137 19.7031H18.5879C13.5749 18.2122 11.0684 17.138 11.0684 16.4805C11.0684 15.0938 13.0964 13.0658 17.1523 10.3965C17.2695 9.43945 17.6276 8.96094 18.2266 8.96094Z"
                      fill="#39221B"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 justify-center">
                <div className="flex flex-1 justify-center">
                  <button
                    className={cn(
                      "flex aspect-square h-8 w-full items-center justify-center rounded-md border-4 border-[#BA7032] bg-[#ECD2B9] font-umu font-bold ring-4 ring-[#28100B]",
                    )}
                  >
                    담당자 우무
                  </button>
                </div>
              </div>
              <div className="flex flex-1 justify-center">
                <button className="flex aspect-square h-8 w-fit items-center justify-center rounded-md border-4 border-[#DDA973] bg-[#ECD2B9] ring-4 ring-[#28100B]">
                  <svg
                    width="33"
                    height="30"
                    viewBox="0 0 33 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.1426 8.39648H13.5039C18.4648 10.1934 21.209 11.3848 21.7363 11.9707C21.7363 13.9043 19.7083 16.6484 15.6523 20.2031C15.6523 20.6849 15.0534 20.9258 13.8555 20.9258L13.5039 20.2031C13.5039 18.9466 15.4115 16.681 19.2266 13.4062L12.0684 10.8965V9.4707C12.0684 9.12565 12.4264 8.76758 13.1426 8.39648Z"
                      fill="#39221B"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <Link href="letter" className="px-4">
              <Button className="w-full py-6">편지쓰기</Button>
            </Link>
          </div>
        </div>
      </div>
      <Background />
    </>
  );
};

export default PostPage;
