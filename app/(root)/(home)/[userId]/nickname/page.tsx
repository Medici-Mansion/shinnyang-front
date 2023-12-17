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
    router.push("/userId/post");
  };

  const isNicknameEntered = !!form.getValues("nickname");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="theme-responsive"
      >
        <div>
          <ArrowLeft onClick={() => router.back()} />
          <div className="justify-start py-5 text-2xl text-black">
            편지를 보낼 때<br />
            표시할 닉네임을 알려주세요.
          </div>
        </div>
        <div className="mt-2 flex h-full flex-col justify-between">
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="닉네임을 작성해주세요." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isNicknameEntered ? (
            <Button variant={"primary"} type="submit">
              확인
            </Button>
          ) : (
            <Button variant={"disable"}>닉네임을 설정해주세요.</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default NicknamePage;
