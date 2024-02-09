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
import LetterWithSheet from "@/components/letter-with-sheet";
import Snow from "../snow";
import { cn } from "@/lib/utils";
import Image from "next/image";

import cheezu from "@/app/assets/체즈";
import umu from "@/app/assets/우무";
import gookie from "@/app/assets/구키";
import { AnimateArticle, CatImage } from "./select-pad";

interface FinishLetterProps {
  router: Pick<IHashContext, "push" | "back" | "replace">;
  control: Control<LetterFormValues, any>;
  letter: CompletedLetter;
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
      router.push("cat");
    }
  }, [letter?.senderId, router, session?.user]);

  const handleSaveLetter = useCallback(() => {
    if (status === "authenticated") {
      if (session.user) {
        if (letter?.senderId === session.user?.id) {
          router.replace(`/${session.user.id}/post`, { native: true });
        }
      } else {
        if (letter?.id) {
          mutate(letter.id);
        }
      }
    } else {
      setOpen(true);
    }
  }, [letter?.id, letter?.senderId, mutate, router, session?.user, status]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex grow flex-col"
    >
      <div className="relative z-0 flex grow flex-col space-y-4">
        <h1
          className={cn(
            "whitespace-nowrap font-umu text-[26px] leading-[46px] text-main",
            letter.catName === "cheezu" && "invert",
          )}
        >
          도착한 편지다냥 =^･ω･^=
        </h1>
        <div className="mx-auto w-[95%]">
          <LetterWithSheet
            className={cn(
              "text-black",
              letter.catName === "umu"
                ? "umu"
                : letter?.catName === "cheezu"
                  ? "cheezu"
                  : "gookie",
            )}
            catType={letter.catName}
            to={letter.receiverNickname}
            content={letter.content}
            from={letter.senderNickname ?? ""}
          />
        </div>
      </div>
      <div className="grow">
        {letter.catName === "umu" ? (
          <div className="absolute -bottom-[7%] left-0">
            <Image
              src={umu.bg.src}
              width={umu.bg.width}
              height={umu.bg.height}
              alt="담요"
            />
            {letter.catName && <CatImage catType={letter.catName} />}

            {umu.floating.map((item) => (
              <AnimateArticle key={item.name} item={item} />
            ))}
          </div>
        ) : letter.catName === "cheezu" ? (
          <div className="absolute -bottom-[7%] left-0">
            <Image
              src={cheezu.bg.src}
              width={cheezu.bg.width}
              height={cheezu.bg.height}
              alt=""
            />
            <Image
              className="absolute -top-[43%] left-[25%] z-[2] w-[43%]"
              src={cheezu.main.src}
              alt={""}
              width={cheezu.main.width}
              height={cheezu.main.height}
            />

            {cheezu.floating.map((item, index) => (
              <AnimateArticle key={item.name} item={item} />
            ))}
          </div>
        ) : (
          <div className="absolute -bottom-[7%] left-0">
            <Image
              src={gookie.bg.src}
              width={gookie.bg.width}
              height={gookie.bg.height}
              alt=""
            />
            <Image
              className="absolute -top-[35%] left-[53%] z-[2] w-[43%]"
              src={gookie.main.src}
              alt=""
              width={gookie.main.width}
              height={gookie.main.height}
            />
            <Image
              className="absolute -top-[12%] left-[11%] z-[2] w-[18%]"
              src={gookie.kettle.src}
              alt=""
              width={cheezu.main.width}
              height={cheezu.main.height}
            />
            <Image
              className="absolute -top-[-5%] left-[24%] z-[2] w-[25%]"
              src={gookie.songpyeon.src}
              alt=""
              width={cheezu.main.width}
              height={cheezu.main.height}
            />
            <Image
              className="absolute -top-[-13%] left-[50%] z-[2] w-[10%]"
              src={gookie.mug.src}
              alt=""
              width={cheezu.main.width}
              height={cheezu.main.height}
            />

            {gookie.floating.map((item, index) => (
              <AnimateArticle key={item.name} item={item} />
            ))}
          </div>
        )}
      </div>
      <div className="z-[1]">
        <Button onClick={handleWriteReply}>답장하기</Button>
      </div>

      <Snow style={{ backgroundColor: "transparent", zIndex: 0 }} />
    </motion.div>
  );
};

export default AnswerLetter;
