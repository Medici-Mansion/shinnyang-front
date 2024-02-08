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
import Image from "next/image";
import cloud2 from "@/app/assets/cloud2.png";

const SelectPad = dynamic(() => import("@/components/pages/letter/select-pad"));
const WriteLetter = dynamic(
  () => import("@/components/pages/letter/write-letter"),
);
const FinishLetter = dynamic(
  () => import("@/components/pages/letter/finish-letter"),
);

const LetterPage = () => {
  const { mutate, data } = useSendLetter();
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
  const catType = form.watch("catName");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValid)}
        className={cn(
          "flex h-full flex-col overflow-y-hidden overflow-x-clip p-6 text-secondary-white duration-100",
          catType === "umu"
            ? "bg-background"
            : catType === "cheezu"
              ? "bg-[#E8E2D6]"
              : "bg-background",
        )}
      >
        {router.hash !== "#mailing" && (
          <ArrowLeft
            className={cn("text-main", catType !== "umu" && "invert")}
            onClick={() => router.back()}
          />
        )}
        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            {!router.hash ? (
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
          <div>
            <svg
              className="moon absolute -right-[80px] -top-[80px]"
              width="220"
              height="220"
              viewBox="0 0 220 220"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_f_1056_16087)">
                <path
                  d="M170 110C170 143.137 143.137 170 110 170C76.8629 170 50 143.137 50 110C50 76.8629 76.8629 50 110 50C143.137 50 170 76.8629 170 110Z"
                  fill="#F0D460"
                />
              </g>
              <g filter="url(#filter1_f_1056_16087)">
                <path
                  d="M170 110C170 143.137 143.137 170 110 170C76.8629 170 50 143.137 50 110C50 76.8629 76.8629 50 110 50C143.137 50 170 76.8629 170 110Z"
                  fill="#FAF5C8"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_1056_16087"
                  x="46"
                  y="46"
                  width="128"
                  height="128"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="2"
                    result="effect1_foregroundBlur_1056_16087"
                  />
                </filter>
                <filter
                  id="filter1_f_1056_16087"
                  x="0"
                  y="0"
                  width="220"
                  height="220"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="25"
                    result="effect1_foregroundBlur_1056_16087"
                  />
                </filter>
              </defs>
            </svg>

            <Image
              className="absolute -right-12 top-8"
              src={cloud2}
              width={cloud2.width}
              height={cloud2.height}
              blurDataURL={cloud2.blurDataURL}
              placeholder="blur"
              alt=""
            />
          </div>
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
