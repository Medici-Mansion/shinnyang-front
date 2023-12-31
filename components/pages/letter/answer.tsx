"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { LetterFormValues } from "@/form-state";
import { IHashContext } from "@/hooks/use-hash-router";
import { Control } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { CompletedLetter } from "@/type";

interface SelectPadProps {
  router: Pick<IHashContext, "push" | "back">;
  control: Control<LetterFormValues, any>;
  letter?: CompletedLetter;
}

const Answer = ({ router, letter }: SelectPadProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-4 flex h-full flex-col space-y-4"
    >
      <h1 className="text-title-large tracking-normal">
        {letter?.senderNickname}님이 {letter?.receiverNickname}님에게
        <br />
        2024년 신년편지를 보냈어요!
      </h1>

      <div className="relative flex grow justify-center">
        <Image
          className="object-contain"
          src="/receiver.png"
          alt="letter"
          fill
        />
      </div>

      <Button variant="secondary" onClick={() => router.push(`answerLetter`)}>
        편지 보러가기
      </Button>
    </motion.div>
  );
};

export default Answer;
