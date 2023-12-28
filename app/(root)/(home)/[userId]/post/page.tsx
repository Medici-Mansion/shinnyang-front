import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import PostTypeSelect from "@/components/pages/post/post-type-select";
import { generateBlurImageByImageList } from "@/actions/blur-image-.action";

const Button = dynamic(() =>
  import("@/components/ui/button").then((ui) => ui.Button),
);

const BackButton = dynamic(() => import("@/components/back-button"));
const Background = dynamic(() => import("@/components/pages/post/background"));
const MailBox = dynamic(() => import("@/components/svgs/mail-box"));

const SelectAccessories = dynamic(
  () => import("@/components/pages/post/select-accessories"),
);

const getBackground = async () => {
  const image = [
    {
      path: "https://res.cloudinary.com/dzfrlb2nb/image/upload/v1703753597/szxnpt36qkq5tvnrt909.png",
      name: "post" as const,
    },
    {
      path: "https://res.cloudinary.com/dzfrlb2nb/image/upload/v1703753597/oeyygajwd4m0z6yyrkwr.png",
      name: "table" as const,
    },
  ];

  return await generateBlurImageByImageList(image);
};

const PostPage = async () => {
  const { post, table } = await getBackground();
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
              src={table.src}
              fill
              priority
              placeholder="blur"
              blurDataURL={table.placeholder.base64}
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
      <Background post={post} />
    </>
  );
};

export default PostPage;
