"use client";

import React from "react";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  nickname: z.string().min(1, {
    message: "닉네임을 지정해주세요!",
  }),
});

const NicknamePage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    router.push(`/${'userId'}/post`)
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-sm flex flex-col justify-between py-4 sm:py-0 mx-auto w-full px-4 h-[100dvh] bg-[#F6F6F6]"
      >
        <div>
          <ArrowLeft onClick={() => router.back()} />
          <div className="text-2xl text-black justify-start py-5">
            편지를 보낼 때<br />
            표시할 닉네임을 알려주세요.
          </div>
        </div>
        <div className="flex flex-col mt-2 justify-between h-full">
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="h-[56px] bg-[#5F5F5F] text-white" type="submit">
            확인
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NicknamePage;
