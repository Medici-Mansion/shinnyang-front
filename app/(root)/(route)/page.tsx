"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import APIs from "@/apis";

const OnBoardingPage = () => {
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [nickname, setNickname] = useState("");

  const backgroundStyle = {
    backgroundImage: `url('/bg-shinnyang.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const nicknameCheckHandler = () => {
    nickname ? router.push("/userId/post") : router.push("userId/nickname");
  };

  return (
    <div className="theme-responsive" style={backgroundStyle}>
      <div className="flex h-full w-full flex-col">
        <div className="mt-[4dvh] flex flex-1 flex-col justify-start text-center text-white">
          <div className="text-2xl font-medium">
            새해를 알리는
            <br />
            2024 신냥이 우체국
          </div>
          <span className="text-md mt-2">신년카드 대신 전달해드립니다.</span>
        </div>
        <div className="items-end">
          {!login ? (
            <Button variant="kakao" onClick={() => APIs.getGoogleCode()}>
              구글 로그인
            </Button>
          ) : (
            <div className="mb-8">
              <Link href={nickname ? "/userId/post" : "/userId/nickname"}>
                <Button variant={"primary"}>우체국 방문하기</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBoardingPage;
