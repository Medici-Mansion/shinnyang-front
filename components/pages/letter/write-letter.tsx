import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Control } from "react-hook-form";
import { IHashContext } from "@/hooks/use-hash-router";
import Image from "next/image";
import { FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LetterFormValues } from "@/form-state";

interface WriteLetterProps {
  router: Pick<IHashContext, "push" | "back">;
  control: Control<LetterFormValues, any>;
}
const WriteLetter = ({ control, router }: WriteLetterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mt-4 flex grow flex-col space-y-4"
    >
      <div>
        <h1 className="text-title-large tracking-normal">
          편지를 작성해 주세요!
        </h1>
        {/* <sub className="text-sm font-normal">
          신냥이 편지로 2024년 새해인사를 나누세요
        </sub> */}
      </div>
      <FormField
        control={control}
        name="receiverNickname"
        render={({ field }) => (
          <div className="flex flex-col space-y-4">
            <Label className="text-black">받는 사람</Label>
            <Input
              className="rounded-lg border border-red"
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
          <div className="flex grow flex-col space-y-4">
            <Label>편지 내용</Label>
            <div className="flex grow flex-col justify-between rounded-lg border border-red bg-white p-6">
              <textarea
                className={cn(
                  "w-full rounded-none bg-transparent p-0",
                  "z-10 h-full resize-none rounded-md border-none outline-none placeholder:text-muted-foreground",
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
      <Button type="submit" onClick={() => router.push("finish")}>
        작성 완료
      </Button>
    </motion.div>
  );
};

export default WriteLetter;
