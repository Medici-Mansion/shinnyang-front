"use client";

import React, { Suspense, useContext, useEffect } from "react";
import { HashContext } from "@/hooks/use-hash-router";
import { AnimatePresence } from "framer-motion";

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
import { useSession } from "@/components/provider/session-provider";

const ReceiverPage = ({
  params: { letterId },
}: {
  params: { letterId: string };
}) => {
  const { mutate, data: letterComplate, isPending } = useSendLetter();
  const router = useContext(HashContext);
  const { data = { user: null, session: null } } = useSession();
  const { data: { data: letter } = {} } = useGetLetter(letterId);

  const form = useForm<LetterFormValues>({
    resolver: zodResolver(letterFormState),
    defaultValues: {
      catName: "umu",
      content: "",
      receiverNickname: letter?.senderNickname || "",
      receiverId: letter?.senderId || "",
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
    if (letter?.senderNickname) {
      form.setValue("receiverNickname", letter.senderNickname);
      form.setValue("receiverId", letter.senderId);
    }
  }, [form, letter?.senderId, letter?.senderNickname]);

  return (
    <Form {...form}>
      <BaseLayout
        as="form"
        onSubmit={form.handleSubmit(onValid)}
        className='"flex p-6" h-full flex-col'
      >
        {data?.user || router.hash ? (
          <ArrowLeft
            onClick={() =>
              router.hash
                ? router.back()
                : router.replace(`/${data?.user?.id}/post`, { native: true })
            }
          />
        ) : null}
        <Suspense fallback={<>Loading....</>}>
          <AnimatePresence mode="wait">
            {!router.hash ? (
              <Answer router={router} control={form.control} letter={letter} />
            ) : null}
            {router.hash === "#answerLetter" ? (
              <AnswerLetter
                router={router}
                control={form.control}
                letter={letter}
              />
            ) : null}
            {router.hash === "#answerWrite" ? (
              <AnswerWrite
                router={router}
                control={form.control}
                letter={letter}
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
