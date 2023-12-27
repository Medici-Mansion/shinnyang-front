"use client";

import React from "react";
import { motion } from "framer-motion";

import { IHashContext } from "@/hooks/use-hash-router";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CompletedLetter } from "@/type";
import { copyURL } from "@/lib/utils";
import { useSession } from "@/components/provider/session-provider";
interface MailingProps {
  router: Pick<IHashContext, "push" | "back" | "replace">;
  letter?: CompletedLetter;
}

const Mailing = ({ router, letter }: MailingProps) => {
  const { data: user } = useSession();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mt-4 flex grow flex-col"
    >
      <h1 className="mb-4 text-2xl font-semibold">
        {letter?.receiverNickname} 님의
        <br />
        우체국에 편지를 보냈어요!
      </h1>

      <div className="relative flex grow items-center justify-center">
        <Image className="" src="/delivery_cat.png" alt="letter" fill />
      </div>

      <Button
        variant="secondary"
        onClick={async (event) => {
          event.preventDefault();
          copyURL(`/receiver/${letter?.id}`);
        }}
      >
        편지 공유하기
      </Button>
      <Button
        className="mt-4"
        onClick={(event) => {
          event.preventDefault();
          router.push(`/${user?.user?.id}/post`, { native: true });
        }}
      >
        내 우체국 가기
      </Button>
    </motion.div>
  );
};

export default Mailing;
