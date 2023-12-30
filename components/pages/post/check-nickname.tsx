"use client";
import { useSession } from "@/components/provider/session-provider";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const CheckNickname = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (!session?.user?.nickname && !pathname.includes("nickname")) {
      redirect(`nickname`);
    }
  }, [pathname, session?.user?.nickname]);
  return <></>;
};

export default CheckNickname;
