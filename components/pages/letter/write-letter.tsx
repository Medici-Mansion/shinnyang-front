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
import { Button } from "@/components/ui/button";
import { LetterFormValues } from "@/form-state";
import DisableEnterTextArea from "@/components/disable-enter-textarea";

import 담요 from "@/app/assets/carpet_2.png";
import Image from "next/image";

interface WriteLetterProps {
  router: Pick<IHashContext, "push" | "back">;
  control: Control<LetterFormValues, any>;
}
const WriteLetter = ({ control }: WriteLetterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="z-[1] flex grow flex-col space-y-4 text-main"
    >
      <div className="mb-4">
        <h1 className="whitespace-nowrap font-umu text-[26px] leading-[46px] text-main [word-spacing:-6px]">
          편지를 작성해주라냥 ₍˄·͈༝·͈˄₎♡
        </h1>
      </div>
      <FormField
        control={control}
        name="receiverNickname"
        render={({ field }) => (
          <FormItem className="flex flex-col space-y-4">
            <Label className="text-main">받는 사람</Label>
            <FormControl>
              <div className="flex h-14 w-full items-center rounded-md bg-white p-3 px-5 text-base outline-none ring-offset-background file:bg-transparent file:text-base file:font-medium  placeholder:text-title-regular placeholder:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50">
                <input
                  maxLength={6}
                  className="grow bg-transparent text-black outline-none"
                  {...field}
                  placeholder="받는 사람"
                />
                <span className="block text-right text-black/50 opacity-70">
                  {field?.value?.length ?? 0}
                  <span className="opacity-20">/6자</span>
                </span>
              </div>
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
            <Label className="text-main">편지 내용</Label>
            <div className="flex flex-1 flex-col justify-between rounded-lg bg-white p-6">
              <FormControl>
                <DisableEnterTextArea
                  className="text-black"
                  {...field}
                  maxLength={80}
                  onChange={field.onChange}
                  placeholder="내용을 적어주세요!"
                />
              </FormControl>
              <span className="block text-right text-black/50 opacity-70">
                {field?.value?.length ?? 0}
                <span className="opacity-20">/80자</span>
              </span>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="senderNickname"
        render={({ field }) => (
          <FormItem className="flex flex-col space-y-4">
            <Label className="text-main">보내는 사람</Label>
            <FormControl>
              <div className="flex h-14 w-full items-center rounded-md bg-white p-3 px-5 text-base outline-none ring-offset-background file:bg-transparent file:text-base file:font-medium  placeholder:text-title-regular placeholder:text-gray-300 disabled:cursor-not-allowed disabled:opacity-50">
                <input
                  maxLength={6}
                  className="grow bg-transparent text-black outline-none"
                  {...field}
                  placeholder="보내는 사람"
                />
                <span className="block text-right text-black/50 opacity-70">
                  {field?.value?.length ?? 0}
                  <span className="opacity-20">/6자</span>
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grow">
        <div className="absolute -bottom-[7%] left-0 -z-[1]">
          <Image
            src={담요.src}
            placeholder="blur"
            width={담요.width}
            height={담요.height}
            blurDataURL={담요.blurDataURL}
            alt="담요"
          />
        </div>
      </div>

      <Button type="submit" className="z-[1]">
        작성 완료
      </Button>
    </motion.div>
  );
};

export default WriteLetter;
