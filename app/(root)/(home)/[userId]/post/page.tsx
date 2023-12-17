"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React from "react";

const PostPage = () => {
  const router = useRouter();

  return (
    <section className="theme-responsive p-0">
      <div className="px-4 pt-4">
        <ArrowLeft onClick={() => router.back()} />
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-black">
            {"신냥이"}
            <br />
            신냥이 우체국
            <br />
          </h1>
          <sub className="text-lg font-normal text-gray-500">
            서랍을 누르면 편지를 확인할 수 있어요!
          </sub>
        </div>
        <div className="mt-6 flex w-full flex-col space-y-6">
          <div className="grid w-full grid-cols-3 justify-items-center gap-2">
            <PostBox text="우무" font="font-umu" />
            <PostBox text="체즈" font="font-chejeu" />
            <PostBox text="구키" font="font-guki" />
          </div>
          <div className="grid w-full grid-cols-3 justify-items-center gap-2">
            <PostBox text="#1" />
            <PostBox text="#2" />
            <PostBox text="#3" />
            <PostBox text="#4" />
            <PostBox text="#5" />
            <PostBox text="#6" />
            <PostBox text="#7" />
            <PostBox text="#8" />
            <PostBox text="#9" />
          </div>
        </div>
      </div>
      <div className="flex w-full grow items-end">
      <div className="relative w-full grow flex flex-col h-full items-end">
        <div className="relative grow mx-auto top-[20%] h-[65%] -z-10 aspect-[31/32]">
          <Image src="/cat.png" alt="cat" fill />
        </div>
        <div className="relative bg-foreground h-[60%] w-full bottom-0"></div>
        </div>
        <div className="absolute bottom-10 w-full px-4">
        <Link href="/letter">
          <Button className="w-full py-6">편지쓰기</Button>
        </Link>
      </div>
      </div>
    </section>
  );
};

export default PostPage;

function PostBox({ text, font }: { text: string; font?: string }) {
  return (
    <Link href={"post/" + text.replace("#", "")} className="w-full">
      <Button variant="link" size="sm" className={`${font || ""}`}>
        {text}
      </Button>
    </Link>
  );
}
