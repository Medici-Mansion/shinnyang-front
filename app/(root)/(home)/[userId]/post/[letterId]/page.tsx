"use client";

import Reply from "@/components/reply";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const LetterPage = () => {
  const router = useRouter();
  return (
    <section className="theme-responsive overflow-hidden bg-gray-500">
      <ArrowLeft onClick={() => router.back()} />
      <h1 className="mb-4 mt-[5dvh] text-center text-2xl font-semibold text-white">
        유무가 보관한
        <br />
        첫번 째 편지
        <br />
      </h1>
      <div className="flex w-full justify-center">
        <div className="flex h-10 w-24 items-center justify-center rounded-sm bg-gray-400 text-center text-black">
          #1
        </div>
      </div>
      <Reply items={["1", "2", "3"]} />
      <div className="mt-20 items-end">
        <Button variant={"primary"}>답장하기</Button>
      </div>
    </section>
  );
};

export default LetterPage;
