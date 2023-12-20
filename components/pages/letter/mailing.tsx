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
      className="relative flex grow flex-col space-y-4 pt-2"
    >
      <h1 className="mb-4 text-2xl font-semibold">
        닉네임 님의
        <br />
        우체국에 답장을 보냈어요!
      </h1>

      <div className="relative grow">
        <div className="aspect-square rounded-full bg-gray-300" />
      </div>

      <Button
        variant="secondary"
        onClick={() => router.replace("/letter")}
        className="w-full py-6"
      >
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
