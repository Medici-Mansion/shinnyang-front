import React from "react";
import { motion } from "framer-motion";
import { IHashContext } from "@/hooks/use-hash-router";
import { Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LetterFormValues } from "@/form-state";
import { useSession } from "@/components/provider/session-provider";
import { cn } from "@/lib/utils";

interface FinishLetterProps {
  router: Pick<IHashContext, "push" | "back" | "replace">;
  control: Control<LetterFormValues, any>;
}
const FinishLetter = ({ control, router }: FinishLetterProps) => {
  const { data } = useSession();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex grow flex-col space-y-4 pt-2"
    >
      <h1 className="mb-4 text-2xl font-semibold">
        편지가 완성되었어요!
        <br />
        {data?.user?.nickname} 님의
        <br />
        우체국에 편지가 배달됩니다.
      </h1>

      <div
        className="relative grow overflow-hidden rounded-2xl py-4 pl-8 pr-4"
        style={{ fontFamily: control._formValues.catType }}
      >
        <Image className="-z-10" src="/letter_sheet.png" alt="letter" fill />
        <h1 className="text-2xl">{control._formValues.to} 에게</h1>
        <textarea
          value={control._formValues.letterContent}
          disabled
          className={cn(
            "w-full rounded-none bg-transparent p-0",
            "z-10 h-full rounded-md border-none p-3 px-5 text-sm outline-none placeholder:text-muted-foreground",
          )}
          maxLength={100}
        />
        <h1 className="absolute bottom-4 right-[15%] text-2xl">
          {data?.user?.nickname} 씀
        </h1>
      </div>

      <Button onClick={() => router.replace("letter")} className="w-full py-6">
        다시 쓰기
      </Button>
      <Button type="submit" className="w-full py-6">
        답장 보내기
      </Button>
    </motion.div>
  );
};

export default FinishLetter;
