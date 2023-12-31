"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Control } from "react-hook-form";
import { LetterFormValues } from "@/form-state";
import { IHashContext } from "@/hooks/use-hash-router";
import { Button } from "@/components/ui/button";
import { CompletedLetter } from "@/type";
import { useMutation } from "@tanstack/react-query";
import APIs from "@/apis";
import { useSession } from "@/components/provider/session-provider";
import { AlertModal } from "@/components/modals/alert-modal";
import LetterWithSheet from "@/components/letter-with-sheet";
import FinishBottomDeco from "./finish-bottom-deco";
import Snow from "../snow";

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
      router.replace("cat");
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
      className="flex grow flex-col"
    >
      <div className="relative z-0 mt-4 flex grow flex-col space-y-4">
        <h1 className="text-title-large text-white">
          편지에 답장하고
          <br />
          우체국에 보관해보세요!
        </h1>
        <div className="grow">
          <LetterWithSheet
            catType={letter?.catName ?? "umu"}
            style={{ fontFamily: letter?.catName }}
            to={letter?.receiverNickname ?? ""}
            content={letter?.content ?? ""}
            from={letter?.senderNickname ?? ""}
          />
          {letter?.catName ? (
            <FinishBottomDeco catName={letter.catName} />
          ) : null}
        </div>
      </div>
      <div className="z-[1]">
        <Button variant="secondary" onClick={handleWriteReply}>
          답장하기
        </Button>
        <Button className="mt-1" onClick={handleSaveLetter}>
          편지 보관하기
        </Button>
      </div>

      {/* TODO: 모달 재사용성 고려하여 재구성필요 */}
      <AlertModal
        leftBtnTitle="아니오"
        rightBtnTitle="우체국 만들기"
        isOpen={open}
        loading={false}
        onClose={() => setOpen(false)}
        onConfirm={() =>
          signin({
            callbackUrl: window.location.href,
            provider: "kakao",
          })
        }
        title={`나만의 우체국을 만들면\n받은 편지를 보관하고 답장할 수 있어요!`}
      />
      <AlertModal
        leftBtnTitle="확인했어요"
        isOpen={openRequireLogin}
        loading={false}
        onClose={() => setOpenRequireLogin(false)}
        title={`내가 보낸 편지는 답장할 수 없어요!`}
      />
      <Snow style={{ backgroundColor: "transparent", zIndex: 0 }} />
    </motion.div>
  );
};

export default AnswerLetter;
