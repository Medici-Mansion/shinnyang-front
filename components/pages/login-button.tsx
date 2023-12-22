"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useSession } from "../provider/session-provider";

const LoginButton = () => {
  const { data, signin, status } = useSession();
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
    <div className="mb-8">
      <Link href={user.nickname ? `/${user.id}/post` : `/${user.id}/nickname`}>
        <Button disabled={loading} variant={"primary"}>
          우체국 방문하기
        </Button>
      </Link>
    </div>
  );
};

export default LoginButton;
