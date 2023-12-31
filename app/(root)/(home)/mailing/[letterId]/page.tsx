"use client";

import React, { MouseEventHandler, useState } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { copyURL } from "@/lib/utils";
import { useSession } from "@/components/provider/session-provider";
import { LETTER_TYPE } from "@/form-state";
import { AlertModal } from "@/components/modals/alert-modal";
import { useRouter } from "next/navigation";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import LetterQuery from "@/lib/queries/letter.query";
import APIs from "@/apis";

const Mailing = ({
  params: { letterId },
}: {
  params: { letterId: string };
}) => {
  const {
    data: { data: letter },
  } = useSuspenseQuery(LetterQuery.getLetterById(letterId));
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: user, signin, status } = useSession();
  const { mutate, isPending } = useMutation({
    mutationFn: (letterId: string) => APIs.updateLetterBySenderId(letterId),
    onSuccess(data, variables, context) {
      router.push(`/${user?.user?.id}/post`);
    },
  });
  const handlePostClick: MouseEventHandler = async (event) => {
    event.preventDefault();
    if (user) {
      if (!letter.senderId) {
        mutate(letter.id);
      } else {
        router.push(`/${user?.user?.id}/post`);
      }
    } else {
      setOpen(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mt-4 flex grow flex-col text-secondary-white"
    >
      <h1 className="mb-4 text-title-large tracking-normal ">
        {letter?.senderNickname}가 {letter?.receiverNickname}님의
        <br />
        우체국에{" "}
        {letter?.letterType === LETTER_TYPE.ANSWER ? "답장을" : "편지를"}{" "}
        보냈어요!
      </h1>

      <div className="flex grow flex-col p-8">
        <div className="relative flex-[0.5]">
          <Image
            className="object-contain"
            src="/assets/답장구름.png"
            alt="letter"
            fill
          />
        </div>
        <div className="relative flex-1">
          <Image
            className="object-contain"
            src="/assets/답장냥이.gif"
            alt="letter"
            fill
          />
        </div>
      </div>
      {letter.letterType === LETTER_TYPE.LETTER ? (
        <Button
          variant="secondary"
          onClick={async (event) => {
            event.preventDefault();
            copyURL(`/receiver/${letter.id}`);
          }}
        >
          편지 공유하기
        </Button>
      ) : null}
      <Button disabled={isPending} className="mt-1" onClick={handlePostClick}>
        {status === "authenticated" ? "내 우체국 가기" : "우체국 만들기"}
      </Button>
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
    </motion.div>
  );
};

export default Mailing;
