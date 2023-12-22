"use client";

import React, { Suspense, useContext } from "react";
import { HashContext } from "@/hooks/use-hash-router";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

import BaseLayout from "@/layout/base-layout";
import { LetterFormValues, letterFormState } from "@/form-state";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useGetLetter from "@/hooks/use-get-letter";

import AnswerLetter from "@/components/pages/letter/answer-letter";
import AnswerWrite from "@/components/pages/letter/answer-write";
import Answer from "@/components/pages/letter/answer";
import { ArrowLeft } from "lucide-react";

const ReceiverPage = () => {
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
    },
  });

  const onValid = (values: LetterFormValues) => {
    console.log(values, "<<<<<<");
  };

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
              />
            ) : null}
          </AnimatePresence>
        </Suspense>
      </BaseLayout>
    </Form>
  );
};

export default ReceiverPage;
