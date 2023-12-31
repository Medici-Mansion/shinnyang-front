"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { m, LazyMotion, domAnimation } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dayToKorean } from "@/constants";
import CommonQuery from "@/lib/queries/common.query";
import Image from "next/image";
import { cn } from "@/lib/utils";
import APIs from "@/apis";
import LetterWithSheet from "@/components/letter-with-sheet";
import { AlertModal } from "@/components/modals/alert-modal";
import { useSession } from "@/components/provider/session-provider";

export default function LetterPage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const mailId = searchParams.get("mailId");
  const { data: mail } = useQuery({
    queryKey: ["mail", mailId],
    queryFn: (props) => APIs.getMailById(props.queryKey[1]!),
    enabled: !!mailId,
    gcTime: Infinity,
    staleTime: Infinity,
  });
  const { data: cats = [] } = useQuery(CommonQuery.getCat);

  const imageRef = useRef<HTMLImageElement>(null);
  const letterWrapRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const index = searchParams.get("lead");

  const replyURL = useMemo(() => {
    if (mail?.id) {
      const url = `/receiver/${mail.id}`;
      const searchParams = new URLSearchParams();
      searchParams.append("mailId", mail.mailId);
      return `${url}?${searchParams.toString()}`;
    }
    return null;
  }, [mail?.id, mail?.mailId]);

  const lead = useMemo(
    () =>
      index !== null
        ? dayToKorean[(parseInt(index) + 1 + "") as keyof typeof dayToKorean]
        : null,
    [index],
  );

  const selectedCat = useMemo(() => {
    const catCode = searchParams.get("type");
    if (catCode) {
      return cats.find((cat) => cat.code === catCode);
    }
    return null;
  }, [cats, searchParams]);

  const handleImageResize = () => {
    if (letterWrapRef.current && imageRef.current) {
      letterWrapRef.current.style.height = imageRef.current.clientHeight + "px";
    }
  };

  const handleSendLetter = () => {
    if (mail?.senderId) {
      router.push(replyURL || "");
    } else {
      setOpen(true);
    }
  };
  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.addEventListener("resize", handleImageResize);
    }
    handleImageResize();

    return () => {
      imageRef.current?.removeEventListener("resize", handleImageResize);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{
          duration: 0.1,
        }}
        className="theme-responsive fixed top-0 z-10 h-full w-full p-10"
      >
        <m.div
          animate={{ opacity: 0.5 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          onClick={() => router.back()}
          className="fixed left-0 top-0 h-full w-full bg-black"
        />
        <div className="flex flex-1 flex-col">
          <div
            className="absolute left-0 top-0 p-3 text-white"
            onClick={() => router.back()}
          >
            <ArrowLeft href="/" />
          </div>
          <h1 className="mb-4 mt-8 text-center text-title-umu font-semibold text-white">
            {selectedCat?.name}가 보관한
            <br />
            {lead} 편지
            <br />
          </h1>
          <div
            className={cn(
              "flex w-full grow flex-col",
              mail?.catName === "umu"
                ? "text-letter-umu"
                : mail?.catName === "cheezu"
                  ? "text-letter-cheezu"
                  : "text-letter-gookie",
            )}
            style={{ fontFamily: mail?.catName }}
          >
            <LetterWithSheet
              catType={mail?.catName ?? "umu"}
              showStamp={false}
              to={mail?.receiverNickname ?? ""}
              content={mail?.content ?? ""}
              from={mail?.senderNickname ?? ""}
            />
          </div>
        </div>

        <Button onClick={handleSendLetter} variant={"primary"}>
          답장하기
        </Button>
        <AlertModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            if (session?.user?.id) {
              router.push(`/${session?.user?.id}/letter`);
            }
          }}
          loading={false}
          leftBtnTitle="아니오"
          rightBtnTitle="편지쓰기"
          title={"답장을 받을 우체국이 없습니다.\n새로 편지를 보내시겠어요?"}
        />
      </m.section>
    </LazyMotion>
  );
}
