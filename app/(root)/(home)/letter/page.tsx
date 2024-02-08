"use client";

import React, { PropsWithChildren, Suspense, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { LETTER_TYPE, LetterFormValues, letterFormState } from "@/form-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { HashContext } from "@/hooks/use-hash-router";
import { ArrowLeft } from "lucide-react";
import { Form } from "@/components/ui/form";
import dynamic from "next/dynamic";
import Loading from "@/components/loading";
import useSendLetter from "@/hooks/use-send-letter";
import { cn, copyURL } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";

const SelectPad = dynamic(() => import("@/components/pages/letter/select-pad"));
const WriteLetter = dynamic(
  () => import("@/components/pages/letter/write-letter"),
);
const FinishLetter = dynamic(
  () => import("@/components/pages/letter/finish-letter"),
);

const LetterPage = () => {
  const { mutate, mutateAsync, data } = useSendLetter();
  const router = useContext(HashContext);
  const form = useForm<LetterFormValues>({
    resolver: zodResolver(letterFormState),
    defaultValues: {
      catName: "umu",
      content: "",
      receiverNickname: "",
      senderNickname: "",
      letterType: LETTER_TYPE.LETTER,
    },
  });

  const onValid = (values: LetterFormValues) => {
    mutate(
      {
        ...values,
      },
      {
        async onSuccess(data) {
          router.push("finish");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValid)}
        className={cn(
          "flex h-full flex-col overflow-y-hidden overflow-x-clip p-6 text-secondary-white duration-100",
        )}
      >
        {router.hash !== "#mailing" && (
          <ArrowLeft
            className="text-main invert-0"
            onClick={() => router.back()}
          />
        )}
        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            {!router.hash ? (
              <SelectPad router={router} control={form.control} />
            ) : null}
            {router.hash === "#letter" ? (
              <WriteLetter router={router} control={form.control} />
            ) : null}
            {router.hash === "#finish" ? (
              <TestQ>
                <FinishLetter
                  router={router}
                  control={form.control}
                  onSendLetter={(values) => {
                    if (data) {
                      copyURL(`/receiver/${data?.id}`);
                    }
                  }}
                />
              </TestQ>
            ) : null}
          </AnimatePresence>
        </Suspense>
      </form>
    </Form>
  );
};

export default LetterPage;

function TestQ({ children }: PropsWithChildren) {
  const {} = useSuspenseQuery({
    queryKey: ["TEST"],
    queryFn: () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 3100);
      }),
    gcTime: 0,
    staleTime: 0,
  });
  return children;
}
