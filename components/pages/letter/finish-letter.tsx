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
      className="relative mt-4 flex grow flex-col"
    >
      <h1 className="text-2xl font-semibold">
        편지가 완성되었어요!
        <br />
        {data?.user?.nickname} 님의 편지를 배달하세요!
      </h1>

      <div
        className="border-red relative mb-12 mt-12 grow overflow-hidden rounded-2xl border py-4 pl-8 pr-4"
        style={{ fontFamily: control._formValues.catType }}
      >
        <Image className="" src="/letter_sheet.png" alt="letter" fill />
        <h1 className="absolute text-2xl">{control._formValues.to} 에게</h1>
        <textarea
          value={control._formValues.letterContent}
          disabled
          className={cn(
            "w-full rounded-none bg-transparent p-0",
            "z-10 h-full rounded-md border-none p-3 px-5 text-sm outline-none placeholder:text-muted-foreground",
          )}
          maxLength={100}
        />
        <h1 className="absolute bottom-5 right-[10%] text-2xl">
          {data?.user?.nickname} 씀
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
        className="mt-4"
        type="submit"
        onClick={() => router.push("mailing")}
      >
        답장 보내기
      </Button>
    </motion.div>
  );
};

export default FinishLetter;
