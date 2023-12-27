"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import { LetterFormValues } from "@/form-state";
import { IHashContext } from "@/hooks/use-hash-router";
import { Control } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { LetterResponse } from "@/type";
import { AlertModal } from "@/components/modals/alert-modal";

interface SelectPadProps {
  router: Pick<IHashContext, "push" | "back">;
  control: Control<LetterFormValues, any>;
  letter: LetterResponse | undefined;
}

const Answer = ({ router, letter }: SelectPadProps) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mt-4 flex grow flex-col"
    >
      <h1 className="my-6 text-2xl font-semibold">
        {letter?.data.senderNickname}가 {letter?.data.receiverNickname} 님의
        <br />
        우체국에 편지를 보냈어요!
      </h1>

      <div className="relative flex grow items-center justify-center">
        <Image className="" src="/receiver.png" alt="letter" fill />
      </div>

      <Button variant="secondary" onClick={() => router.push(`answerLetter`)}>
        편지 보러가기
      </Button>
      <Button className="mt-4" onClick={() => setOpen(true)}>
        내 우체국 만들기
      </Button>
      <AlertModal
        leftBtnTitle="아니오"
        rightBtnTitle="내 우체국 만들기"
        isOpen={open}
        loading={false}
        onClose={() => setOpen(false)}
        onConfirm={() => router.push("/", { native: true })}
        title={`내 우체국을 만들면\n받은 편지를 보관하고\n답장 할 수 있어요!`}
      />
    </motion.div>
  );
};

export default Answer;
