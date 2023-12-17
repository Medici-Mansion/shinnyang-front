"use client";
import { HashContext } from "@/hooks/use-hash-router";
import BaseLayout from "@/layout/base-layout";
import { ArrowLeft } from "lucide-react";
import React, { useContext } from "react";
import SelectPad from "../../../../components/pages/letter/select-pad";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import WriteLetter from "@/components/pages/letter/write-letter";
import FinishLetter from "@/components/pages/letter/finish-letter";
import Mailing from "@/components/pages/letter/mailing";
const formState = z.object({
  catType: z.enum(["cat1", "cat2", "cat3"]),
  letterContent: z.string().min(1).max(100),
  to: z.string().min(1),
  from: z.string().min(1),
});

export type LetterFormValues = z.infer<typeof formState>;

const LetterPage = () => {
  const router = useContext(HashContext);
  const form = useForm<LetterFormValues>({
    resolver: zodResolver(formState),
    defaultValues: {
      catType: "cat1",
      letterContent: "",
      to: "",
      from: "",
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
        className='"flex flex-col h-full p-6"'
      >
        {router.hash ? (
          <ArrowLeft onClick={() => router.back()} />
        ) : (
          <Link href="/userId/post">
            <ArrowLeft />
          </Link>
        )}
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
      </BaseLayout>
    </Form>
  );
};

export default LetterPage;
