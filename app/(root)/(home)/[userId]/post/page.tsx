import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import PrefetchQuery from "@/hydrate/prefetch-query";
import CommonQuery from "@/lib/queries/common.query";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import PostTypeSelect from "@/components/pages/post/post-type-select";

const Button = dynamic(() =>
  import("@/components/ui/button").then((ui) => ui.Button),
);

const BackButton = dynamic(() => import("@/components/back-button"));
const Background = dynamic(() => import("@/components/pages/post/background"));
const MailBox = dynamic(() => import("@/components/svgs/mail-box"));

const SelectAccessories = dynamic(
  () => import("@/components/pages/post/select-accessories"),
);

const PostPage = () => {
  return (
    <>
      <div className="flex h-full w-full grow flex-col items-end">
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
              src="/assets/테이블.png"
              fill
              priority
              alt="테이블"
              className="-z-[1]"
            />
            <div className="h-full px-4">
              <Suspense
                fallback={<div className="mx-auto">냥이들 불러오는중..</div>}
              >
                <PostTypeSelect />
              </Suspense>
              <Link href="letter" className="mt-5 h-1/2">
                <Button className="w-full">편지쓰기</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Background />
    </>
  );
};

export default PostPage;
