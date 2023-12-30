"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "../provider/session-provider";

const LoginButton = () => {
  const { data, signin, signout, status } = useSession();
  const { user } = data || {};
  const [loading, setLoading] = useState(false);
  return !user ? (
    <Button
      disabled={loading}
      variant="kakao"
      onClick={() => {
        setLoading(true);
        signin();
      }}
    >
      구글 로그인
    </Button>
  ) : (
    <div className="z-[100] grid grid-cols-[1fr_0.4fr] gap-x-2">
      <Link
        href={user.nickname ? `/${user.id}/post` : `/${user.id}/nickname`}
        scroll={false}
      >
        <Button disabled={loading} variant={"primary"}>
          우체국 방문하기
        </Button>
      </Link>
      <Button onClick={signout} disabled={loading} variant={"secondary"}>
        로그아웃
      </Button>
    </div>
  );
};

export default LoginButton;
