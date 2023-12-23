"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const GoBack = () => {
  const router = useRouter();
  const pop = () => {
    router.back();
  };
  return <Button onClick={pop}>돌아 가기</Button>;
};

export default GoBack;
