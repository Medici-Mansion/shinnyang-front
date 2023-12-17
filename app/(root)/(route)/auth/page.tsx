"use client";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import axios from "axios";
const Page = () => {
  const searchParam = useSearchParams();

  const getUser = useCallback(async () => {
    const user = await axios.get("http://localhost:4000/oauth/google/user", {
      params: {
        code: searchParam.get("code"),
      },
    });
    console.log(user, "<<");
  }, [searchParam]);

  useEffect(() => {
    getUser();
  }, [getUser]);
  return <div></div>;
};

export default Page;
