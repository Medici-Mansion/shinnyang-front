"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

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
    <div
      className="max-w-sm h-full py-4 sm:py-0 flex flex-col sm:justify-center mx-auto w-full px-4 bg-red-100"
      style={backgroundStyle}
    >
      <Button
        className={
          (cn(`text-white p-1 rounded-md w-20 text-center`),
          !login ? "bg-red-400" : "bg-blue-400")
        }
        onClick={() => setLogin(!login)}
      >
        {login ? "회원" : "비회원"}
      </Button>
      <div className="w-full h-full flex flex-col">
        <div className="mt-12 flex-1 flex flex-col justify-start text-white text-center">
          <div className="text-2xl font-medium">
            새해를 알리는
            <br />
            2024 신냥이 우체국
          </div>
          <span className="mt-2 text-md">신년카드 대신 전달해드립니다.</span>
        </div>
        <div className="items-end">
          {!login ? (
            <Button
              className="w-full h-[56px] bg-[#FFCD29] text-black"
              onClick={() => setLogin(true)}
            >
              카카오 로그인
            </Button>
          ) : (
            <div>
              <Button
                className="w-full h-[56px] bg-[#5F5F5F] text-white"
                onClick={nicknameCheckHandler}
              >
                우체국 방문하기
              </Button>
              <Button
                className="w-full mt-2 h-[56px] bg-[#BCBCBC] text-black"
                onClick={nicknameCheckHandler}
              >
                편지 쓰기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBoardingPage;
