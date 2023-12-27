"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { Control } from "react-hook-form";
import { cn } from "@/lib/utils";
import { LetterFormValues } from "@/form-state";
import { IHashContext } from "@/hooks/use-hash-router";

import { Button } from "@/components/ui/button";
import { useSession } from "@/components/provider/session-provider";
import { letterStore } from "@/store/user";
import useAnswerLetter from "@/hooks/use-answer-letter";

interface FinishLetterProps {
  router: Pick<IHashContext, "push" | "back" | "replace" | "state">;
  control: Control<LetterFormValues, any>;
}
const AnswerFinish = ({ control, router }: FinishLetterProps) => {
  const { mutate, isPending } = useAnswerLetter();
  const { state } = router || {};

  const answerSubmit = () => {
    mutate(state, {
      onSuccess: () => {
        router.push("answerMailing", {
          state,
          native: false,
        });
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mt-4 flex grow flex-col"
    >
      <h1 className="text-2xl font-semibold">
        편지가 완성되었어요!
        <br />
        {state.senderNickname} 님의 편지를 배달하세요!
      </h1>
      <div
        className="relative mb-12 mt-12 grow overflow-hidden rounded-2xl border border-red py-4 pl-8 pr-4"
        style={{ fontFamily: control._formValues.catType }}
      >
        <Image className="-z-10" src="/letter_sheet.png" alt="letter" fill />
        <h1 className="text-2xl">{state.receiverNickname || ""} 에게</h1>
        <textarea
          value={state.content}
          disabled
          className={cn(
            "w-full rounded-none bg-transparent p-0",
            "z-10 h-full rounded-md border-none p-3 px-5 text-sm outline-none placeholder:text-muted-foreground",
          )}
          maxLength={100}
        />
        <h1 className="absolute bottom-4 right-[15%] text-2xl">
          {state.senderNickname} 씀
        </h1>
      </div>
      <Image
        className="absolute bottom-32 right-0"
        src="/postal_stamp.png"
        alt="letter"
        width={200}
        height={100}
      />
      <Button variant="secondary" onClick={() => router.replace("letter")}>
        다시 쓰기
      </Button>
      <Button
        className="w-full py-6"
        disabled={isPending}
        onClick={answerSubmit}
      >
        편지 보내기
      </Button>
    </motion.div>
  );
};

export default AnswerFinish;
