import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import PrefetchQuery from "@/hydrate/prefetch-query";
import CommonQuery from "@/lib/queries/common.query";
import dynamic from "next/dynamic";

const Button = dynamic(() =>
  import("@/components/ui/button").then((ui) => ui.Button),
);

const CatButtons = dynamic(() => import("@/components/pages/post/cat-buttons"));
const BackButton = dynamic(() => import("@/components/back-button"));
const PostHeader = dynamic(() => import("@/components/pages/post/post-header"));
const PostMails = dynamic(() => import("@/components/pages/post/post-mails"));
const SelectAccessories = dynamic(
  () => import("@/components/pages/post/select-accessories"),
);


const PostPage = () => {
  return (
    <section className="theme-responsive p-0">
      <div className="px-4 pt-4">
        <BackButton href="/" />
        <PostHeader />
        <div className="mt-6 flex w-full flex-col space-y-4">
          <div className="grid w-full grid-cols-3 justify-items-center gap-2 gap-x-4">
            <Suspense fallback={<div>냥이들 불러오는중..</div>}>
              <CatButtons />
            </Suspense>
          </div>
          <div className="grid w-full grid-cols-3 justify-items-center gap-2 gap-x-4">
            <PostMails />
          </div>
        </div>
      </div>
      <div className="flex w-full grow items-end">
        <div className="relative flex h-full w-full grow flex-col items-end justify-end">
          <Suspense
            fallback={<div className="mx-auto">냥이들 불러오는중..</div>}
          >
            <PrefetchQuery queries={[CommonQuery.getCat, CommonQuery.getAcc]}>
              <SelectAccessories />
            </PrefetchQuery>
          </Suspense>
          <div className="relative z-[1] h-[50%] w-full bg-transparent">
            <Image
              src="/assets/post_bottom.png"
              alt="button"
              fill
              style={{
                objectFit: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
        <div className="absolute bottom-8 z-[2] w-full px-4">
          <Link href="letter">
            <Button className="w-full py-6">편지쓰기</Button>
          </Link>
        </div>
      </div>
      <Image
        src="/assets/post_bg.png"
        alt="post_background"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "top",
        }}
      />
    </section>
  );
};

export default PostPage;
