"use client";

import React, { useMemo, useState } from "react";

import { Control, useFormContext } from "react-hook-form";
import { LetterFormValues, letterFormState } from "@/form-state";
import { IHashContext } from "@/hooks/use-hash-router";
import { Button } from "@/components/ui/button";
import { useSession } from "@/components/provider/session-provider";
import LetterWithSheet from "@/components/letter-with-sheet";
import FinishBottomDeco from "./finish-bottom-deco";
import { LazyMotion, domAnimation, m } from "framer-motion";
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
    setIsLoading(true);
    await onSendLetter(formState.data);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex grow flex-col"
      >
        <div className="relative z-0 mt-4 flex grow flex-col space-y-4">
          <h1 className="text-title-large">
            {session?.user?.nickname ?? getValues().senderNickname}님의
            <br />
            편지가 완성되었어요!
          </h1>
          <div className="grow">
            <LetterWithSheet
              style={{ fontFamily: writtenLetter.catName }}
              to={writtenLetter.receiverNickname}
              content={writtenLetter.content}
              from={writtenLetter.senderNickname ?? ""}
            />
            {writtenLetter.catName ? (
              <FinishBottomDeco catName={writtenLetter.catName} />
            ) : null}
          </div>
        </div>
        <div className="z-[1]">
          <Button variant="secondary" onClick={() => router.replace("letter")}>
            다시 쓰기
          </Button>
          <Button
            className="mt-1 w-full"
            onClick={handleSendLetter}
            disabled={isLoading}
          >
            편지 보내기
          </Button>
        </div>
      </m.div>
    </LazyMotion>
  );
};

export default FinishLetter;
