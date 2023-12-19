"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";

import { userStore } from "@/store/user";
import { tokenStore } from "@/store/user";
import { Token, User } from "@/type";

interface UserProviderProps {
  user: User;
  token: Token;
}
const UserProvider = ({ user, token }: UserProviderProps) => {
  const { setUser } = userStore();
  const { setToken } = tokenStore();
  const { access, refresh } = token || {};
  const { email, nickname, id } = user || {};
  const router = useRouter();
  useEffect(() => {
    setUser({
      isLogin: true,
      email,
      nickname,
      id,
    });
    setToken({
      access,
      refresh,
    });

    if (access && refresh) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }

    router.replace(`/`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, setUser, token, user]);
  return <></>;
};

export default UserProvider;
