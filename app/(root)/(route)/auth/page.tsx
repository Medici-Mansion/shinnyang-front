"use client";

import React, { useCallback, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import { userStore } from "@/store/user";

const Page = () => {
  const { setUser } = userStore();
  const searchParam = useSearchParams();
  const code = searchParam.get("code");

  const getUser = useCallback(async () => {
    const userData = await axios.get(
      "https://medici-mension.com/oauth/google/user",
      {
        params: {
          code,
        },
      },
    );
    if (userData) {
      const { token, user } = userData.data || {};
      const { access, refresh } = token || {};
      const { email, id, nickname } = user || {};
      setUser({
        isLogin: true,
        access,
        refresh,
        email,
        id,
        nickname,
      });
    }
  }, [code, setUser]);

  if (code) {
    getUser();
  }

  return <div></div>;
};

export default Page;
