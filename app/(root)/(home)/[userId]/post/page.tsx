import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostPage = () => {
  return (
    <section className="flex flex-col space-y-4 h-full items-center">
      <h1 className="text-center mt-[7dvh] font-semibold text-2xl mb-4">
        닉네임의
        <br />
        신냥이 우체국
        <br />
        <sub className="text-sm font-normal">
          서랍을 누르면 편지를 확인할 수 있어요!
        </sub>
      </h1>
      <div className="w-full flex flex-col space-y-6 px-4">
        <div className="grid grid-cols-3 gap-2 w-full justify-items-center">
          <PostBox text="냥이 1" />
          <PostBox text="냥이 2" />
          <PostBox text="냥이 3" />
        </div>
        <div className="grid grid-cols-3 gap-2 gap-y-4 w-full justify-items-center">
          <PostBox text="#1" />
          <PostBox text="#2" />
          <PostBox text="#3" />
          <PostBox text="#4" />
          <PostBox text="#5" />
          <PostBox text="#6" />
        </div>
      </div>
      <div className="relative w-full grow flex items-end flex-col">
        <div className="relative grow mx-auto top-[20%] h-[65%] -z-10 aspect-[31/32]">
          <Image src="/cat.png" alt="cat" fill />
        </div>
        <div className="relative bg-foreground h-[60%] w-full bottom-0"></div>
      </div>
      <div className="absolute bottom-10 w-full px-4">
        <Button className="w-full py-6">편지쓰기</Button>
      </div>
    </section>
  );
};

export default PostPage;

function PostBox({ text }: { text: string }) {
  return (
    <Link
      href={"post/" + text.replace("#", "")}
      className="w-full text-center bg-primary rounded-sm py-2 font-bold text-black"
    >
      {text}
    </Link>
  );
}
