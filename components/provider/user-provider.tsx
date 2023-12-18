"use client";
import { userStore } from "@/store/user";
import { Token, User } from "@/type";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface UserProviderProps {
  user: User;
  token: Token;
}
const UserProvider = ({ user, token }: UserProviderProps) => {
  const { setUser } = userStore();
  const router = useRouter();
  useEffect(() => {
    setUser({
      isLogin: true,
      ...user,
      ...token,
    });

    router.replace(`/${user.id}/post`);
  }, [router, setUser, token, user]);
  return <></>;
};

export default UserProvider;
