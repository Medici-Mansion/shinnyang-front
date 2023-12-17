"use client";

import Reply from "@/components/reply";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";

const LetterPage = () => {
  const router = useRouter();
  return (
    <section className="theme-responsive bg-gray-500">
      <div className="flex-1">
        <ArrowLeft onClick={() => router.back()} />
        <h1 className="mb-4 mt-8 text-center text-2xl font-semibold text-white">
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
      </div>
      <div className="mb-8 items-end">
        <Link href="/letter">
          <Button variant={"primary"}>답장하기</Button>
        </Link>
      </div>
    </section>
  );
};

export default LetterPage;
