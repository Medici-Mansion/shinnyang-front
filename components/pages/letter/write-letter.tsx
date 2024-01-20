import React from "react";
import { motion } from "framer-motion";
import { Control } from "react-hook-form";
import { IHashContext } from "@/hooks/use-hash-router";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LetterFormValues } from "@/form-state";
import DisableEnterTextArea from "@/components/disable-enter-textarea";

interface WriteLetterProps {
  router: Pick<IHashContext, "push" | "back">;
  control: Control<LetterFormValues, any>;
  isSenderEditable?: boolean;
}
const WriteLetter = ({
  control,
  isSenderEditable = true,
}: WriteLetterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative z-[1] mt-4 flex grow flex-col space-y-4 text-secondary-white"
    >
      <div className="mb-4">
        <h1 className="text-title-large tracking-normal">
          편지를 작성해 주세요!
        </h1>
      </div>
      <FormField
        control={control}
        name="receiverNickname"
        render={({ field }) => (
          <FormItem className="flex flex-col space-y-4">
            <Label className="text-secondary-white">받는 사람</Label>
            <FormControl>
              <Input
                className="rounded-lg text-black"
                {...field}
                placeholder="받는 사람"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="content"
        render={({ field }) => (
          <FormItem className="flex grow flex-col space-y-4">
            <Label className="text-secondary-white">편지 내용</Label>
            <div className="flex flex-1 flex-col justify-between rounded-lg bg-white p-6">
              <FormControl>
                <DisableEnterTextArea
                  className="text-black"
                  {...field}
                  maxLength={100}
                  onChange={field.onChange}
                  placeholder="내용을 적어주세요!"
                />
              </FormControl>
              <span className="block text-right text-black/50 opacity-70">
                {field?.value?.length ?? 0}
                <span className="opacity-20">/100자</span>
              </span>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      {isSenderEditable ? (
        <FormField
          control={control}
          name="senderNickname"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-4">
              <Label className="text-secondary-white">보내는 사람</Label>
              <FormControl>
                <Input
                  className="rounded-lg text-black"
                  {...field}
                  placeholder="보내는 사람"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : null}
      <Button type="submit" className="z-[1]">
        작성 완료
      </Button>
    </motion.div>
  );
};

export default WriteLetter;
