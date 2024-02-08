"use client";

import React, { Suspense, useContext, useEffect, useState } from "react";
import { HashContext } from "@/hooks/use-hash-router";
import { AnimatePresence } from "framer-motion";

import BaseLayout from "@/layout/base-layout";
import { LETTER_TYPE, LetterFormValues, letterFormState } from "@/form-state";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSendLetter from "@/hooks/use-send-letter";

import AnswerLetter from "@/components/pages/letter/answer-letter";
import { Form } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { useSuspenseQuery } from "@tanstack/react-query";
import LetterQuery from "@/lib/queries/letter.query";
import Loading from "@/components/loading";
import SelectPad from "@/components/pages/letter/select-pad";
import WriteLetter from "@/components/pages/letter/write-letter";
import FinishLetter from "@/components/pages/letter/finish-letter";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ReceiverLoading from "@/components/receiver-loading";
const ReceiverPage = ({
  params: { letterId },
}: {
  params: { letterId: string };
}) => {
  // ReceiverLoading
  const [loading, setLoading] = useState(true);
  const { mutate } = useSendLetter();
  const searchParams = useSearchParams();
  const replyMailId = searchParams.get("mailId");
  const router = useContext(HashContext);
  const {
    data: { data: letter },
  } = useSuspenseQuery(LetterQuery.getLetterById(letterId));

  const form = useForm<LetterFormValues>({
    resolver: zodResolver(letterFormState),
    defaultValues: {
      catName: "umu",
      content: "",
      receiverNickname: letter?.senderNickname || "",
      ...(letter.senderId ? { receiverId: letter.senderId } : {}),
      senderNickname: letter.receiverNickname || "",
      letterType: LETTER_TYPE.ANSWER,
      ...(replyMailId ? { replyMailId: replyMailId ?? "" } : {}),
    },
  });

  const onValid = (values: LetterFormValues) => {
    router.push("finish");
  };

  useEffect(() => {
    if (replyMailId) {
      setTimeout(() => {
        router.push("cat");
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (letter?.senderNickname) {
      form.setValue("receiverNickname", letter.senderNickname);
    }
    if (letter.senderId) {
      form.setValue("receiverId", letter.senderId);
    }
  }, [form, letter?.senderId, letter?.senderNickname]);

  const isEditRoute = router.hash === "#cat" || router.hash === "#letter";

  const catType = form.watch("catName");

  return loading ? (
    <ReceiverLoading
      onFinish={() => {
        setLoading(false);
      }}
    />
  ) : (
    <Form {...form}>
      <BaseLayout
        as="form"
        onSubmit={form.handleSubmit(onValid)}
        className={cn(
          "flex h-full flex-col overflow-y-hidden duration-100",
          router.hash === "#finish" && "bg-[#111111]",
          !router.hash && "bg-black",
          isEditRoute && "bg-point-500",
        )}
      >
        {router.hash && (
          <ArrowLeft className="invert" onClick={() => router.back()} />
        )}

        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            {!router.hash ? (
              <AnswerLetter
                router={router}
                control={form.control}
                letter={letter}
              />
            ) : null}
            {router.hash === "#cat" ? (
              <SelectPad
                catType={catType}
                router={router}
                control={form.control}
              />
            ) : null}
            {router.hash === "#letter" ? (
              <WriteLetter
                catType={catType}
                router={router}
                control={form.control}
              />
            ) : null}
            {router.hash === "#finish" ? (
              <FinishLetter
                router={router}
                control={form.control}
                onSendLetter={(values) => {
                  mutate(values, {
                    async onSuccess(data) {
                      if (data && data.ok) {
                        router.push(`/mailing/${data.data.id}`, {
                          native: true,
                        });
                      }
                    },
                  });
                }}
              />
            ) : null}
          </AnimatePresence>
        </Suspense>
      </BaseLayout>
      {isEditRoute ? (
        <div className="absolute bottom-0">
          <Image
            src={
              "https://res.cloudinary.com/dzfrlb2nb/image/upload/v1703753597/oeyygajwd4m0z6yyrkwr.png"
            }
            width={752}
            height={474}
            priority
            //  placeholder="blur"
            //  blurDataURL={table.placeholder.base64}
            alt="테이블"
          />
        </div>
      ) : null}
    </Form>
  );
};

export default ReceiverPage;
