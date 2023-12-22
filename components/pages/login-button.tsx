"use client";
import React from "react";
import { useSession } from "../provider/session-provider";
import { Button } from "../ui/button";
import Link from "next/link";

const LoginButton = () => {
  const { data, signin } = useSession();
  const { user } = data || {};
  return !user ? (
    <Button variant="kakao" onClick={() => signin()}>
      구글 로그인
    </Button>
  ) : (
    <div className="mb-8">
      <Link href={user.nickname ? `/${user.id}/post` : `/${user.id}/nickname`}>
        <Button variant={"primary"}>우체국 방문하기</Button>
      </Link>
    </div>
  );
};

export default LoginButton;
