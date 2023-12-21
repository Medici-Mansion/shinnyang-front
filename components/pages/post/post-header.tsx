"use client";
import { useSession } from "@/components/provider/session-provider";
import React from "react";

const PostHeader = () => {
  const { data } = useSession();
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-white">
        {data?.user?.nickname}의
        <br />
        신냥이 우체국
        <br />
      </h1>
      <sub className="text-base font-normal leading-6 text-gray-500">
        서랍을 누르면 편지를 확인할 수 있어요!
      </sub>
    </div>
  );
};

export default PostHeader;
