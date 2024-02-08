"use client";

import React, { useMemo, useState } from "react";

import { Control, useFormContext } from "react-hook-form";
import { LetterFormValues, letterFormState } from "@/form-state";
import { IHashContext } from "@/hooks/use-hash-router";
import { Button } from "@/components/ui/button";
import { useSession } from "@/components/provider/session-provider";
import LetterWithSheet from "@/components/letter-with-sheet";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Snow from "../snow";
import { cn } from "@/lib/utils";
import Image from "next/image";

import 담요 from "@/app/assets/carpet.png";
import 식빵 from "@/app/assets/bread.png";
import { AnimateArticle, CatImage } from "./select-pad";

import 윷 from "@/app/assets/윷";
import Link from "next/link";

interface FinishLetterProps {
  router: Pick<IHashContext, "push" | "back" | "replace" | "state">;
  control: Control<LetterFormValues, any>;
  onSendLetter: (letterFormValue: LetterFormValues) => void | Promise<void>;
}
const FinishLetter = ({ onSendLetter, router }: FinishLetterProps) => {
  const { getValues } = useFormContext<LetterFormValues>();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const writtenLetter = useMemo(() => getValues(), [getValues]);

  const handleSendLetter = async () => {
    const formState = letterFormState.safeParse(getValues());
    if (!formState.success) {
      return router.replace("letter");
    }

    onSendLetter(formState.data);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="z-[2] flex grow flex-col"
      >
        <div className="relative z-0 flex grow flex-col space-y-4">
          <h1 className="font-umu text-[26px] leading-[46px] text-main">
            {session?.user?.nickname ?? getValues().senderNickname}에게 보낼
            편지가
            <br />
            완성되었다냥! ฅ^•ﻌ•^ฅ
          </h1>
          <div>
            <LetterWithSheet
              className={cn(
                "text-black",
                writtenLetter?.catName === "umu"
                  ? "umu"
                  : writtenLetter?.catName === "cheezu"
                    ? "cheezu"
                    : "gookie",
              )}
              catType={writtenLetter.catName}
              to={writtenLetter.receiverNickname}
              content={writtenLetter.content}
              from={writtenLetter.senderNickname ?? ""}
            />
          </div>
        </div>
        <div className="grow">
          <div className="absolute -bottom-[7%] left-0">
            <Image
              src={담요.src}
              placeholder="blur"
              width={담요.width}
              height={담요.height}
              blurDataURL={담요.blurDataURL}
              alt="담요"
            />
            {writtenLetter?.catName && (
              <CatImage catType={writtenLetter.catName} />
            )}
            <Image
              className="absolute -top-[28%] left-[32%] z-[2] w-[43%]"
              style={{ transform: "rotateY(180deg)" }}
              src={식빵.src}
              width={식빵.width}
              height={식빵.height}
              alt="식빵"
              placeholder="blur"
              blurDataURL={식빵.blurDataURL}
            />
            {윷.map((item) => (
              <AnimateArticle key={item.name} item={item} />
            ))}
          </div>
        </div>
        <div className="z-[1] flex gap-x-2">
          <Link href="/" className="rounded-md bg-[#00223E] px-5 py-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.5045 4.47239C12.2184 4.21233 11.7816 4.21233 11.4955 4.47239L4.5 10.8319V19.5002H9V15.3752C9 14.7538 9.50368 14.2502 10.125 14.2502H13.875C14.4963 14.2502 15 14.7538 15 15.3752V19.5002H19.5V10.8319L12.5045 4.47239ZM10.4865 3.36248C11.3447 2.5823 12.6553 2.5823 13.5135 3.36248L20.6318 9.83361C20.8663 10.0468 21 10.3491 21 10.666V19.8752C21 20.4965 20.4963 21.0002 19.875 21.0002H14.625C14.0037 21.0002 13.5 20.4965 13.5 19.8752V15.7502H10.5V19.8752C10.5 20.4965 9.99632 21.0002 9.375 21.0002H4.125C3.50368 21.0002 3 20.4965 3 19.8752V10.666C3 10.3491 3.13371 10.0468 3.36824 9.83361L10.4865 3.36248Z"
                fill="#FFF1CB"
              />
            </svg>
          </Link>
          <Button onClick={handleSendLetter} disabled={isLoading}>
            편지 링크 받기
          </Button>
        </div>
      </m.div>
      <Snow />
    </LazyMotion>
  );
};

export default FinishLetter;
