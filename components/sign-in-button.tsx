"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="ml-auto flex gap-4">
        <p className="text-sky-600">{session.user.name}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    );
  }
  return (
    <Button onClick={() => signIn()} variant={"kakao"}>
      Google 로그인
    </Button>
  );
};

export default SignInButton;
