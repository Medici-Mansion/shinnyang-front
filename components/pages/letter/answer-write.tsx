"use client";

import { motion } from "framer-motion";
import { Control } from "react-hook-form";
import Image from "next/image";

import { LetterFormValues } from "@/form-state";
import { cn } from "@/lib/utils";
import { IHashContext } from "@/hooks/use-hash-router";

import { FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CompletedLetter } from "@/type";
import { Input } from "@/components/ui/input";

interface AnswerLetterProps {
  router: Pick<IHashContext, "push" | "back" | "replace">;
  control: Control<LetterFormValues, any>;
  letter?: CompletedLetter;
  isLoading: boolean;
}

const AnswerWrite = ({ control, isLoading }: AnswerLetterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mt-4 flex grow flex-col space-y-5"
    >
      <div className="">
        <h1 className="text-2xl font-semibold">편지를 작성해 주세요!</h1>
        <sub className="text-sm font-normal">
          신냥이 편지로 2024년 새해인사를 나누세요
        </sub>
      </div>
      <FormField
        control={control}
        name="receiverNickname"
        render={({ field }) => (
          <div className="flex flex-col space-y-4">
            <Label className="text-black">받는 사람</Label>
            <Input
              className="rounded-lg border border-red bg-background"
              {...field}
              placeholder="받는 사람"
            />
          </div>
        )}
      />

      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <div className="flex grow flex-col space-y-2">
            <Image
              className="absolute bottom-12 right-0"
              src="/postal_stamp.png"
              alt="letter"
              width={200}
              height={100}
            />
            <Label>편지 내용</Label>
            <div className="flex grow flex-col justify-between rounded-lg border border-red p-6">
              <textarea
                className={cn(
                  "w-full rounded-none bg-transparent p-0",
                  "z-10 h-full rounded-md border-none outline-none placeholder:text-muted-foreground",
                )}
                maxLength={100}
                {...field}
                onChange={(event) => {
                  const lineHeight = parseInt(
                    window
                      .getComputedStyle(event.target)
                      .lineHeight.replace("px", "") ?? 24,
                  );
                  const lineLength =
                    event.target.value.match(/\n/g)?.length || 0;

                  if (
                    field.value.length > event.target.value.length ||
                    (event.target.clientHeight === event.target.scrollHeight &&
                      event.target.clientHeight > (lineLength + 1) * lineHeight)
                  ) {
                    field.onChange(event);
                  }
                }}
                placeholder="내용을 적어주세요!"
              />
              <span className="block text-right">
                {field?.value?.length ?? 0}
                <span className="opacity-20">/100자</span>
              </span>
            </div>
          </div>
        )}
      />
      <FormField
        control={control}
        name="senderNickname"
        render={({ field }) => (
          <div className="flex flex-col space-y-4">
            <Label className="text-black">보내는 사람</Label>
            <Input
              className="rounded-lg border border-red bg-background"
              {...field}
              placeholder="보내는 사람"
            />
          </div>
        )}
      />
      <Button type="submit" className="w-full py-6" disabled={isLoading}>
        편지보내기
      </Button>
    </motion.div>
  );
};

export default AnswerWrite;
