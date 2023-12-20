import React from "react";
import { motion } from "framer-motion";
import { IHashContext } from "@/hooks/use-hash-router";
import { Button } from "@/components/ui/button";
import Image from "next/image";
interface MailingProps {
  router: Pick<IHashContext, "push" | "back" | "replace">;
}
const Mailing = ({ router }: MailingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mt-4 flex grow flex-col"
    >
      <h1 className="border-red border-b-2  border-dashed pb-4 text-2xl font-semibold">
        닉네임 님의
        <br />
        우체국에 답장을 보냈어요!
      </h1>

      <div className="relative flex grow items-center justify-center">
        <Image className="" src="/delivery_cat.png" alt="letter" fill />
      </div>

      <Button variant="secondary" onClick={() => router.replace("/letter")}>
        편지 보관하기
      </Button>
      <Button
        className="mt-4"
        onClick={() => router.push("/userId/post", { native: true })}
      >
        내 우체국 만들기
      </Button>
    </motion.div>
  );
};

export default Mailing;
