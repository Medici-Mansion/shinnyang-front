"use client";

import React, { Suspense, useContext, useEffect } from "react";
import { HashContext } from "@/hooks/use-hash-router";
import { AnimatePresence } from "framer-motion";

import BaseLayout from "@/layout/base-layout";
import { LETTER_TYPE, LetterFormValues, letterFormState } from "@/form-state";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSendLetter from "@/hooks/use-send-letter";

import AnswerLetter from "@/components/pages/letter/answer-letter";
import Answer from "@/components/pages/letter/answer";
import { Form } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { useSession } from "@/components/provider/session-provider";
import { useSuspenseQuery } from "@tanstack/react-query";
import LetterQuery from "@/lib/queries/letter.query";
import Loading from "@/components/loading";
import SelectPad from "@/components/pages/letter/select-pad";
import WriteLetter from "@/components/pages/letter/write-letter";
import FinishLetter from "@/components/pages/letter/finish-letter";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ReceiverPage = ({
  params: { letterId },
}: {
  params: { letterId: string };
}) => {
  const { mutate } = useSendLetter();
  const searchParams = useSearchParams();
  const replyMailId = searchParams.get("mailId");
  const router = useContext(HashContext);
  const { data = { user: null, session: null } } = useSession();
  const {
    data: { data: letter },
  } = useSuspenseQuery(LetterQuery.getLetterById(letterId));

  const form = useForm<LetterFormValues>({
    resolver: zodResolver(letterFormState),
    defaultValues: {
      catName: "umu",
      content: "",
      receiverNickname: letter?.senderNickname || "",
      receiverId: letter?.senderId || "",
      senderNickname: data?.user?.nickname || "",
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
    if (data?.user?.nickname) {
      form.setValue("senderNickname", data?.user?.nickname);
    }
  }, [data?.user?.nickname, form]);

  useEffect(() => {
    if (letter?.senderNickname) {
      form.setValue("receiverNickname", letter.senderNickname);
      form.setValue("receiverId", letter.senderId);
    }
  }, [form, letter?.senderId, letter?.senderNickname]);

  const isEditRoute = router.hash === "#cat" || router.hash === "#letter";
  return (
    <Form {...form}>
      <BaseLayout
        as="form"
        onSubmit={form.handleSubmit(onValid)}
        className={cn(
          "flex h-full flex-col overflow-y-hidden duration-100",
          router.hash === "#answerLetter" && "bg-black",
          router.hash === "#finish" && "bg-[#111111]",
          !router.hash && "bg-[#482609]",
          isEditRoute && "bg-point-500",
        )}
      >
        {router.hash !== "#mailing" && (data?.user || router.hash) ? (
          <ArrowLeft
            onClick={() =>
              router.hash
                ? router.back()
                : router.replace(`/${data?.user?.id}/post`, { native: true })
            }
          />
        ) : null}

        <Suspense fallback={<Loading />}>
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
            {router.hash === "#cat" ? (
              <SelectPad router={router} control={form.control} />
            ) : null}
            {router.hash === "#letter" ? (
              <WriteLetter router={router} control={form.control} />
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
