"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "../provider/session-provider";

import Popup from "../modals/popup";
import { useMutation } from "@tanstack/react-query";
import APIs from "@/apis";

const LoginButton = () => {
  const { data, signin, signout, status } = useSession();
  const { user } = data || {};
  const [loading, setLoading] = useState(false);
  return !user ? (
    <>
      <Button
        disabled={loading}
        variant="kakao"
        onClick={() => {
          setLoading(true);
          signin({
            provider: "kakao",
          });
        }}
      >
        카카오 로그인
      </Button>
    </>
  ) : (
    <div className="flex flex-col">
      <Link
        href={user.nickname ? `/${user.id}/post` : `/${user.id}/nickname`}
        scroll={false}
        className="mb-2"
      >
        <Button disabled={loading} variant={"primary"}>
          우체국 방문하기
        </Button>
      </Link>
      <Popup
        trigger={
          <span className="text-subtitle-notice02 text-white underline underline-offset-4">
            로그아웃
          </span>
        }
        title="로그아웃"
        onConfirm={signout}
        confirm={{
          className: "bg-secondary-black text-white",
          label: "확인",
        }}
        content={
          <h1 className="text-secondary-black my-2 text-center font-bold">
            로그아웃 하시겠어요?
          </h1>
        }
      />
    </div>
  );
};

export default LoginButton;
