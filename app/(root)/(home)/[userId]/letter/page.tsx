"use client";

import React, { Suspense, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

import { LetterFormValues, letterFormState } from "@/form-state";
import { zodResolver } from "@hookform/resolvers/zod";
import { HashContext } from "@/hooks/use-hash-router";
import { letterStore } from "@/store/user";
import { ArrowLeft } from "lucide-react";
import BaseLayout from "@/layout/base-layout";
import { Form } from "@/components/ui/form";
import { useSession } from "@/components/provider/session-provider";
import { Letters } from "@/type";
import dynamic from "next/dynamic";
import { AlertModal } from "@/components/modals/alert-modal";

const WriteLetter = dynamic(
  () => import("@/components/pages/letter/write-letter"),
);
const FinishLetter = dynamic(
  () => import("@/components/pages/letter/finish-letter"),
);
const Mailing = dynamic(() => import("@/components/pages/letter/mailing"));
const SelectPad = dynamic(() => import("@/components/pages/letter/select-pad"));

const LetterPage = () => {
  const { setLetterInfo } = letterStore();
  const { data } = useSession();
  const { user } = data || {};
  const router = useContext(HashContext);
  const form = useForm<LetterFormValues>({
    resolver: zodResolver(letterFormState),
    defaultValues: {
      catName: "umu",
      content: "",
      receiverNickname: "",
    },
  });

  const onValid = (values: LetterFormValues) => {
    const param: Letters = { ...values, senderNickname: user?.nickname };
    const { catName, content, receiverNickname, senderNickname } = param || {};
    setLetterInfo({
      catName,
      content,
      receiverNickname,
      senderNickname: senderNickname ? senderNickname : "",
    });
    router.push("finish");
  };

  return (
    <Form {...form}>
      <BaseLayout
        as="form"
        onSubmit={form.handleSubmit(onValid)}
        className='"flex p-6" h-full flex-col'
      >
        <ArrowLeft
          onClick={() =>
            router.hash
              ? router.back()
              : router.replace(`/${data?.user?.id}/post`, { native: true })
          }
        />
        <Suspense fallback={<>Loading....</>}>
          <AnimatePresence mode="wait">
            {!router.hash ? (
              <SelectPad router={router} control={form.control} />
            ) : null}
            {router.hash === "#letter" ? (
              <WriteLetter router={router} control={form.control} />
            ) : null}
            {router.hash === "#finish" ? (
              <FinishLetter router={router} control={form.control} />
            ) : null}
            {router.hash === "#mailing" ? <Mailing router={router} /> : null}
          </AnimatePresence>
          <AlertModal
            leftBtnTitle="아니오"
            rightBtnTitle="내 우체국 만들기"
            isOpen={true}
            loading={false}
            onClose={() => {}}
            onConfirm={() => {}}
            title={`내 우체국을 만들면\n받은 편지를 보관하고\n답장 할 수 있어요!`}
          />
        </Suspense>
      </BaseLayout>
    </Form>
  );
};

export default LetterPage;
