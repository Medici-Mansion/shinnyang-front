"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NicknamePage = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");

  return (
    <div className="max-w-sm h-full flex flex-col py-4 sm:py-0 mx-auto w-full px-4 bg-[#F6F6F6]">
      <div className="flex-1">
        <div className="flex flex-col gap-6">
          <ArrowLeft onClick={() => router.back()} />
          <div className="text-2xl text-black justify-start">
            편지를 보낼 때<br />
            표시할 닉네임을 알려주세요.
          </div>
        </div>
        <div className="flex flex-col mt-10">
          <div className="">닉네임</div>
          <Input className="mt-2 py-7 rounded-md"></Input>
        </div>
      </div>
      <Link
        className="items-end"
        href={nickname ? "/userId/post" : "/userId/nickname"}
      >
        <Button
          className="w-full h-[56px] bg-[#5F5F5F] text-white"
          onClick={() => setNickname("닉네임")}
        >
          확인
        </Button>
      </Link>
    </div>
  );
};

export default NicknamePage;
