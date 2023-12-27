"use client";

import React, { Suspense, useContext, useEffect } from "react";
import { HashContext } from "@/hooks/use-hash-router";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import BaseLayout from "@/layout/base-layout";
import { LetterFormValues, letterFormState } from "@/form-state";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetLetter from "@/hooks/use-get-letter";
import useSendLetter from "@/hooks/use-send-letter";

import AnswerLetter from "@/components/pages/letter/answer-letter";
import AnswerWrite from "@/components/pages/letter/answer-write";
import Answer from "@/components/pages/letter/answer";
import { Form } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { Letters } from "@/type";
import Mailing from "@/components/pages/letter/mailing";

const ReceiverPage = () => {
  const { mutate, data: letterComplate, isPending } = useSendLetter();
  const router = useContext(HashContext);
  const pathname = usePathname();
  const letterId = pathname.split("/")[2];
  const { data } = useGetLetter(letterId);

  const form = useForm<LetterFormValues>({
    resolver: zodResolver(letterFormState),
    defaultValues: {
      catName: "umu",
      content: "",
      receiverNickname: data?.data.senderNickname || "",
      receiverId: data?.data.senderId || "",
      senderNickname: "",
    },
  });

  const sendLetter = (letter: Letters) => {
    mutate(letter, {
      async onSuccess(data) {
        if (data && data.ok) {
          router.push(`mailing`);
        }
      },
    });
  };

  const onValid = (values: LetterFormValues) => {
    sendLetter(values);
  };

  useEffect(() => {
    if (data && data?.data.senderNickname) {
      form.setValue("receiverNickname", data?.data.senderNickname);
      form.setValue("receiverId", data?.data.senderId);
    }
  }, [data, form]);

  return (
    <Form {...form}>
      <BaseLayout
        as="form"
        onSubmit={form.handleSubmit(onValid)}
        className='"flex p-6" h-full flex-col'
      >
        <ArrowLeft />
        <Suspense fallback={<>Loading....</>}>
          <AnimatePresence mode="wait">
            {!router.hash ? (
              <Answer router={router} control={form.control} letter={data} />
            ) : null}
            {router.hash === "#answerLetter" ? (
              <AnswerLetter
                router={router}
                control={form.control}
                letter={data}
              />
            ) : null}
            {router.hash === "#answerWrite" ? (
              <AnswerWrite
                router={router}
                control={form.control}
                letter={data}
                isLoading={isPending}
              />
            ) : null}
            {router.hash === "#mailing" ? (
              <Mailing router={router} letter={letterComplate} />
            ) : null}
          </AnimatePresence>
        </Suspense>
      </BaseLayout>
    </Form>
  );
};

export default ReceiverPage;
