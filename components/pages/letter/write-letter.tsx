import React from "react";
import { motion } from "framer-motion";
import { FormField } from "@/components/ui/form";
import { IHashContext } from "@/hooks/use-hash-router";
import { LetterFormValues } from "@/app/(root)/(home)/letter/page";
import { Control } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TextArea from "@/components/textarea";
import { Button } from "@/components/ui/button";

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
      className="relative flex flex-col grow space-y-4 pt-2"
    >
      <h1 className="font-semibold text-2xl mb-4">편지를 작성해주세요!</h1>

      <FormField
        control={control}
        name="to"
        render={({ field }) => (
          <div className="flex flex-col space-y-4">
            <Label>받는 사람</Label>
            <Input {...field} placeholder="받는 사람" />
          </div>
        )}
      />
      <FormField
        control={control}
        name="letterContent"
        render={({ field }) => (
          <div className="flex flex-col space-y-4 grow">
            <Label>편지 내용</Label>
            <div className="rounded-md p-3 px-7 bg-white grow flex flex-col justify-between">
              <TextArea
                className="bg-transparent rounded-none p-0 w-full"
                minRows={5}
                maxRows={5}
                maxLength={100}
                {...field}
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
        name="from"
        render={({ field }) => (
          <div className="flex flex-col space-y-4">
            <Label>보내는 사람</Label>
            <Input {...field} placeholder="보내는 사람" />
          </div>
        )}
      />
      <Button
        type="submit"
        onClick={() => router.push("finish")}
        className="w-full py-6"
      >
        선택 완료
      </Button>
    </motion.div>
  );
};

export default WriteLetter;
