"use client";
import React from "react";
import Link from "next/link";
import APIs from "@/apis";
import { Button } from "@/components/ui/button";
import { useSession } from "@/components/provider/session-provider";

const OnBoardingPage = () => {
  const { data, signin } = useSession();
  const { user } = data || {};

  const backgroundStyle = {
    backgroundImage: `url('/bg-shinnyang.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
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
          {!user ? (
            <Button variant="kakao" onClick={() => signin()}>
              구글 로그인
            </Button>
          ) : (
            <div className="mb-8">
              <Link
                href={
                  user.nickname ? `/${user.id}/post` : `/${user.id}/nickname`
                }
              >
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
