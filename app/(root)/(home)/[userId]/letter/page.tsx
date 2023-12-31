"use client";

import React, { Suspense, useContext, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { LETTER_TYPE, LetterFormValues, letterFormState } from "@/form-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { HashContext } from "@/hooks/use-hash-router";
import { ArrowLeft } from "lucide-react";
import BaseLayout from "@/layout/base-layout";
import { Form } from "@/components/ui/form";
import { useSession } from "@/components/provider/session-provider";
import dynamic from "next/dynamic";
import Loading from "@/components/loading";
import useSendLetter from "@/hooks/use-send-letter";
import { cn, copyURL } from "@/lib/utils";
import Snow from "@/components/pages/snow";

const SelectPad = dynamic(() => import("@/components/pages/letter/select-pad"));
const WriteLetter = dynamic(
  () => import("@/components/pages/letter/write-letter"),
);
const FinishLetter = dynamic(
  () => import("@/components/pages/letter/finish-letter"),
);

const LetterPage = () => {
  const {
    mutate,
    isPending: isLoading,
    data: completedLeetter,
  } = useSendLetter();
  const { data: session } = useSession();
  const router = useContext(HashContext);
  const form = useForm<LetterFormValues>({
    resolver: zodResolver(letterFormState),
    defaultValues: {
      catName: "umu",
      content: "",
      receiverNickname: "",
      senderNickname: session?.user?.nickname ?? "",
      letterType: LETTER_TYPE.LETTER,
    },
  });

  const onValid = (values: LetterFormValues) => {
    router.push("finish");
  };

  useEffect(() => {
    if (session?.user?.nickname) {
      form.setValue("senderNickname", session?.user?.nickname);
    }
  }, [form, session?.user?.nickname]);

  return (
    <Form {...form}>
      <BaseLayout
        as="form"
        onSubmit={form.handleSubmit(onValid)}
        className={cn(
          'p-6" flex h-full flex-col overflow-y-hidden duration-100',
          router.hash === "#finish" ? "bg-[#111111]" : "",
        )}
      >
        {router.hash !== "#mailing" && (
          <ArrowLeft
            onClick={() =>
              router.hash
                ? router.back()
                : router.replace(`/${session?.user?.id}/post`, { native: true })
            }
          />
        )}
        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            {!router.hash ? (
              <SelectPad router={router} control={form.control} />
            ) : null}
            {router.hash === "#letter" ? (
              <WriteLetter
                isSenderEditable={false}
                router={router}
                control={form.control}
              />
            ) : null}
            {router.hash === "#finish" ? (
              <FinishLetter
                router={router}
                control={form.control}
                onSendLetter={(values) => {
                  mutate(
                    {
                      ...values,
                    },
                    {
                      async onSuccess(data) {
                        copyURL(`/receiver/${data.data.id}`);
                        if (data && data.ok) {
                          router.push(`/mailing/${data.data.id}`, {
                            native: true,
                          });
                        }
                      },
                    },
                  );
                }}
              />
            ) : null}
          </AnimatePresence>
        </Suspense>
      </BaseLayout>
      <Snow />
    </Form>
  );
};

export default LetterPage;
