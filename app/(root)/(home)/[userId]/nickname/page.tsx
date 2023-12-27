"use client";

import React from "react";
import dynamic from "next/dynamic";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import useSetNickName from "@/hooks/use-set-nickname";

const Button = dynamic(() =>
  import("@/components/ui/button").then((ui) => ui.Button),
);
const Input = dynamic(() =>
  import("@/components/ui/input").then((ui) => ui.Input),
);

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { useSession } from "@/components/provider/session-provider";

const formSchema = z.object({
  nickname: z
    .string()
    .min(1, {
      message: "닉네임을 지정해주세요!",
    })
    .max(6, {
      message: "닉네임은 6글자를 넘을 수 없어요.",
    }),
});

const NicknamePage = () => {
  const { data: userData } = useSession();
  const router = useRouter();

  const { mutate } = useSetNickName({
    onSuccess(data, variables) {
      if (data) {
        router.replace(`/${userData?.user?.id}/post`);
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="theme-responsive w-full bg-background"
      >
        <div>
          <ArrowLeft onClick={() => router.back()} />
          <div className="text-title-large justify-start py-5 text-black">
            편지를 보낼 때<br />
            표시할 닉네임을 알려주세요.
          </div>
        </div>
        <div className="mt-2 flex h-full flex-col justify-between">
          <FormField
            control={form.control}
            name="nickname"
            rules={{
              maxLength: {
                value: 6,
                message: "닉네임은 6글자를 넘을 수 없어요.",
              },
            }}
            render={({ field }) => {
              const isNicknameEntered = !!field.value;
              return (
                <>
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input
                        maxLength={6}
                        {...field}
                        placeholder="닉네임을 작성해주세요."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>

                  <Button
                    variant={isNicknameEntered ? "primary" : "disable"}
                    disabled={!isNicknameEntered}
                    type="submit"
                  >
                    {isNicknameEntered ? "확인" : "닉네임을 설정해주세요."}
                  </Button>
                </>
              );
            }}
          />
        </div>
      </form>
    </Form>
  );
};

export default NicknamePage;
