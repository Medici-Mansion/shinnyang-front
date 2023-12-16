"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const NicknamePage = () => {
  const router = useRouter();
  const [nickname, setNickname] = useState("");

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleConfirmClick = () => {
    setNickname(nickname);
  };

  return (
    <div className="theme-responsive">
      <div className="flex-1">
        <div className="flex flex-col gap-6">
          <ArrowLeft onClick={() => router.back()} />
          <div className="justify-start text-2xl text-black">
            편지를 보낼 때<br />
            표시할 닉네임을 알려주세요.
          </div>
        </div>
        <div className="mt-10 flex flex-col">
          <div className="">닉네임</div>
          <Input
            className="mt-2"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={handleNicknameChange}
          ></Input>
        </div>
      </div>
      <Link
        className="items-end"
        href={nickname ? "/userId/post" : "/userId/nickname"}
      >
        {nickname ? (
          <Button variant={"primary"} onClick={handleConfirmClick}>
            확인
          </Button>
        ) : (
          <Button variant={"disable"}>닉네임을 설정해주세요.</Button>
        )}
      </Link>
    </div>
  );
};

export default NicknamePage;
