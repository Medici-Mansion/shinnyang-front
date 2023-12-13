
"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Link from "next/link";
const OnBoardingPage = () => {
  const [login, setLogin] = useState(false);
  const [nickname, setNickname] = useState("");
  const backgroundStyle = {
    backgroundImage: `url('/bg-shinnyang.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div
      className="max-w-sm h-full py-4 sm:py-0 flex flex-col sm:justify-center mx-auto w-full px-4 bg-red-100"
      style={backgroundStyle}
    >
      {!login ? (
        <Button
          className="text-white bg-red-400 p-1 rounded-md w-20 text-center"
          onClick={() => setLogin(true)}
        >
          비회원
        </Button>
      ) : (
        <Button
          className="text-white bg-blue-400 p-1 rounded-md w-20 text-center"
          onClick={() => setLogin(false)}
        >
          회원
        </Button>
      )}
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
            <Link href="/">
              <Button
                className="w-full h-[56px] bg-[#FFCD29] text-black"
                onClick={() => setLogin(true)}
              >
                카카오 로그인
              </Button>
            </Link>
          ) : (
            <div className="">
              <Link href={nickname ? "/userId/post" : "/userId/nickname"}>
                <Button
                  className="w-full h-[56px] bg-[#5F5F5F] text-white"
                  onClick={() => setLogin(false)}
                >
                  우체국 방문하기
                </Button>
              </Link>
              <Link href={`/${"userId"}/post/${"letterId"}`}>
                <Button className="w-full mt-2 h-[56px] bg-[#BCBCBC] text-black">
                  편지 쓰기
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBoardingPage;
