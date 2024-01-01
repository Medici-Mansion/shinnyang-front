"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "../provider/session-provider";

const LoginButton = () => {
  const { data, signin } = useSession();
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
    </div>
  );
};

export default LoginButton;
