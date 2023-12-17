import React from "react";
import { motion } from "framer-motion";
import { IHashContext } from "@/hooks/use-hash-router";
import { Button } from "@/components/ui/button";

interface MailingProps {
  router: Pick<IHashContext, "push" | "back" | "replace">;
}
const Mailing = ({ router }: MailingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col grow space-y-4 pt-2"
    >
      <h1 className="font-semibold text-2xl mb-4">
        닉네임 님의
        <br />
        우체국에 답장을 보냈어요!
      </h1>

      <div className="grow relative">
        <div className="aspect-square rounded-full bg-gray-300" />
      </div>

      <Button onClick={() => router.replace("/letter")} className="w-full py-6">
        편지 보관하기
      </Button>
      <Button
        onClick={() => router.push("/userId/post", { native: true })}
        className="w-full py-6"
      >
        내 우체국 만들기
      </Button>
    </motion.div>
  );
};

export default Mailing;
