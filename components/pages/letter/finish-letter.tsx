import React from "react";
import { motion } from "framer-motion";
import { IHashContext } from "@/hooks/use-hash-router";
import { LetterFormValues } from "@/app/(root)/(home)/letter/page";
import { Control } from "react-hook-form";
import TextArea from "@/components/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FinishLetterProps {
  router: Pick<IHashContext, "push" | "back" | "replace">;
  control: Control<LetterFormValues, any>;
}
const FinishLetter = ({ control, router }: FinishLetterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex flex-col grow space-y-4 pt-2"
    >
      <h1 className="font-semibold text-2xl mb-4">
        편지가 완성되었어요!
        <br />
        닉네임 님의
        <br />
        우체국에 편지가 배달됩니다.
      </h1>

      <div className="grow relative overflow-hidden rounded-2xl py-4 pl-8 pr-4">
        <Image className="-z-10" src="/letter_sheet.png" alt="letter" fill />
        <h1 className="text-2xl">수해니 에게</h1>
        <TextArea
          value="냥이 1은 귀여운 글씨체와
          편지 디자인 설명?"
          disabled
          className="bg-transparent w-2/3 px-0 border-none outline-none"
          maxLength={100}
          maxRows={6}
        />
        <h1 className="absolute text-2xl bottom-4 right-[15%]">닉네임 씀</h1>
      </div>

      <Button onClick={() => router.replace("/letter")} className="w-full py-6">
        다시 쓰기
      </Button>
      <Button onClick={() => router.push("mailing")} className="w-full py-6">
        답장 보내기
      </Button>
    </motion.div>
  );
};

export default FinishLetter;
