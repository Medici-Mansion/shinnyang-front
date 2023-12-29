"use client";
import React, { useEffect, useState } from "react";
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
    <Link
      href={user.nickname ? `/${user.id}/post` : `/${user.id}/nickname`}
      scroll={false}
    >
      <Button disabled={loading} variant={"primary"} className="bg-red">
        우체국 방문하기
      </Button>
    </Link>
  );
};

export default LoginButton;
