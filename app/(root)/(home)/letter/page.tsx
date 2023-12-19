"use client";
import { HashContext } from "@/hooks/use-hash-router";
import BaseLayout from "@/layout/base-layout";
import { ArrowLeft } from "lucide-react";
import React, { Suspense, useContext } from "react";
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
  catType: z.enum(["cheezu", "gookie", "umu"]),
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
      catType: "cheezu",
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
        className='"flex p-6" h-full flex-col'
      >
        {router.hash ? (
          <ArrowLeft onClick={() => router.back()} />
        ) : (
          <Link href="/userId/post">
            <ArrowLeft />
          </Link>
        )}
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
