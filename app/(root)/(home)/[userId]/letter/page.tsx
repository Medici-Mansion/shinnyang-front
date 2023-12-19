"use client";
import { HashContext } from "@/hooks/use-hash-router";
import BaseLayout from "@/layout/base-layout";
import { ArrowLeft } from "lucide-react";
import React, { Suspense, useContext } from "react";
import SelectPad from "../../../../../components/pages/letter/select-pad";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { AnimatePresence } from "framer-motion";
import WriteLetter from "@/components/pages/letter/write-letter";
import FinishLetter from "@/components/pages/letter/finish-letter";
import Mailing from "@/components/pages/letter/mailing";
import { useSession } from "@/components/provider/session-provider";
import { LetterFormValues, letterFormState } from "@/form-state";

const LetterPage = () => {
  const { data } = useSession();
  const router = useContext(HashContext);
  const form = useForm<LetterFormValues>({
    resolver: zodResolver(letterFormState),
    defaultValues: {
      catType: "umu",
      letterContent: "",
      to: "",
      // from: data?.user?.nickname,
    },
  });
  const onValid = (values: LetterFormValues) => {
    console.log(values, "<<values");
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
        </Suspense>
      </BaseLayout>
    </Form>
  );
};

export default LetterPage;
