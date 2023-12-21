import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Control } from "react-hook-form";
import { IHashContext } from "@/hooks/use-hash-router";

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
      className="relative flex grow flex-col space-y-4 pt-2"
    >
      <h1 className="mb-4 text-2xl font-semibold">편지를 작성해주세요!</h1>

      <FormField
        control={control}
        name="receiverNickname"
        render={({ field }) => (
          <div className="flex flex-col space-y-4">
            <Label>받는 사람</Label>
            <Input {...field} placeholder="받는 사람" />
          </div>
        )}
      />
      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <div className="flex grow flex-col space-y-4">
            <Label>편지 내용</Label>
            <div className="flex grow flex-col justify-between rounded-md bg-white p-3 px-7">
              <textarea
                className={cn(
                  "w-full rounded-none bg-transparent p-0",
                  "z-10 h-full rounded-md border-none p-3 px-5 outline-none placeholder:text-muted-foreground",
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
      <Button type="submit" className="w-full py-6">
        편지보내기
      </Button>
    </motion.div>
  );
};

export default WriteLetter;
