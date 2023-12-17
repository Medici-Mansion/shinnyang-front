"use client";
import { HashContext } from "@/hooks/use-hash-router";
import BaseLayout from "@/layout/base-layout";
import { ArrowLeft } from "lucide-react";
import React, { useContext } from "react";
import SelectPad from "../../../../components/pages/letter/select-pad";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";

const formState = z.object({
  catType: z.enum(["cat1", "cat2", "cat3"]),
});

type FormValues = z.infer<typeof formState>;

const LetterPage = () => {
  const router = useContext(HashContext);
  const form = useForm<FormValues>({
    resolver: zodResolver(formState),
    defaultValues: {
      catType: "cat1",
    },
  });
  const onValid = (values: FormValues) => {
    console.log(values, "<<values");
  };
  return (
    <Form {...form}>
      <BaseLayout
        as="form"
        onSubmit={form.handleSubmit(onValid)}
        className='"flex flex-col space-y-4 h-full p-6"'
      >
        <ArrowLeft onClick={() => router.back()} />
        <SelectPad router={router} form={form} />
      </BaseLayout>
    </Form>
  );
};

export default LetterPage;
