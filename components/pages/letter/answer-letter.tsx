"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Control } from "react-hook-form";
import { cn } from "@/lib/utils";
import { LetterFormValues } from "@/form-state";
import { IHashContext } from "@/hooks/use-hash-router";
import { Button } from "@/components/ui/button";
import { CompletedLetter } from "@/type";
import { useMutation } from "@tanstack/react-query";
import APIs from "@/apis";
import { useSession } from "@/components/provider/session-provider";
import { AlertModal } from "@/components/modals/alert-modal";

interface FinishLetterProps {
  router: Pick<IHashContext, "push" | "back" | "replace">;
  control: Control<LetterFormValues, any>;
  letter?: CompletedLetter;
}

const AnswerLetter = ({ control, router, letter }: FinishLetterProps) => {
  const [open, setOpen] = useState(false);
  const [openRequireLogin, setOpenRequireLogin] = useState(false);
  const { status, data: session, signin } = useSession();
  const { mutate } = useMutation({
    mutationFn: (letterId: string) => APIs.saveMail(letterId),
    onSuccess(data, variables, context) {
      if (session?.user) {
        router.replace(`/${session.user.id}/post`, { native: true });
      }
    },
  });

  const handleWriteReply = useCallback(() => {
    if (session?.user && session?.user.id === letter?.senderId) {
      setOpenRequireLogin(true);
    } else {
      router.replace("#answerWrite");
    }
  }, [letter?.senderId, router, session?.user]);

  const handleSaveLetter = useCallback(() => {
    if (status === "authenticated" && letter?.id) {
      mutate(letter.id);
    } else {
      setOpen(true);
    }
  }, [letter?.id, mutate, status]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mt-4 flex grow flex-col"
    >
      <h1 className="text-title-large tracking-normal">
        편지에 답장하고
        <br />
        우체국에 보관해보세요!
      </h1>
      <div
        className="relative mb-12 mt-12 grow overflow-hidden rounded-2xl border border-red py-4 pl-8 pr-4"
        style={{ fontFamily: control._formValues.catType }}
      >
        <Image className="-z-10" src="/letter_sheet.png" alt="letter" fill />
        <h1 className="text-2xl">{letter?.receiverNickname || ""} 에게</h1>
        <textarea
          value={letter?.content}
          disabled
          className={cn(
            "w-full rounded-none bg-transparent p-0",
            "z-10 h-full rounded-md border-none p-3 px-5 text-sm outline-none placeholder:text-muted-foreground",
          )}
          maxLength={100}
        />
        <h1 className="absolute bottom-4 right-[15%] text-2xl">
          {letter?.senderNickname} 씀
        </h1>
      </div>
      <Image
        className="absolute bottom-32 right-0"
        src="/postal_stamp.png"
        alt="letter"
        width={200}
        height={100}
      />
      <Button variant="secondary" onClick={handleWriteReply}>
        답장하기
      </Button>
      <Button className="mt-4" onClick={handleSaveLetter}>
        편지 보관하기
      </Button>
      {/* TODO: 모달 재사용성 고려하여 재구성필요 */}
      <AlertModal
        leftBtnTitle="아니오"
        rightBtnTitle="우체국 만들기"
        isOpen={open}
        loading={false}
        onClose={() => setOpen(false)}
        onConfirm={() => signin(window.location.href)}
        title={`나만의 우체국을 만들면\n받은 편지를 보관하고 답장할 수 있어요!`}
      />
      <AlertModal
        leftBtnTitle="확인했어요"
        isOpen={openRequireLogin}
        loading={false}
        onClose={() => setOpenRequireLogin(false)}
        title={`내가 보낸 편지는 답장할 수 없어요!`}
      />
    </motion.div>
  );
};

export default AnswerLetter;
