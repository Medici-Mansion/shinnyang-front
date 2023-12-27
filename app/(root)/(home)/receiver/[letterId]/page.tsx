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

import AnswerLetter from "@/components/pages/letter/answer-letter";
import AnswerWrite from "@/components/pages/letter/answer-write";
import Answer from "@/components/pages/letter/answer";
import { Form } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import AnswerFinish from "@/components/pages/letter/answer-finish";
import Answermailing from "@/components/pages/letter/answer-mailing";

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
      senderNickname: "",
    },
  });

  const onValid = (values: LetterFormValues) => {
    const param = { ...values, receiverId: data?.data.id };
    router.push("answerFinish", {
      state: param,
      native: false,
    });
  };

  useEffect(() => {
    if (data && data?.data.senderNickname) {
      form.setValue("receiverNickname", data.data.senderNickname);
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
              />
            ) : null}
            {router.hash === "#answerFinish" ? (
              <AnswerFinish router={router} control={form.control} />
            ) : null}
            {router.hash === "#answerMailing" ? (
              <Answermailing router={router} />
            ) : null}
          </AnimatePresence>
        </Suspense>
      </BaseLayout>
    </Form>
  );
};

export default ReceiverPage;
