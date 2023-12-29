"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { m, LazyMotion, domAnimation } from "framer-motion";
import React, { useEffect, useMemo, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { dayToKorean } from "@/constants";
import CommonQuery from "@/lib/queries/common.query";
import Image from "next/image";
import { cn } from "@/lib/utils";
import APIs from "@/apis";

export default function LetterPage({
  params: { userId },
}: {
  params: { userId: string };
}) {
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
            <div
              ref={letterWrapRef}
              className="relative mt-8  w-full px-[2rem] py-[2rem] pr-[2.2rem]"
            >
              <Image
                ref={imageRef}
                className="absolute bottom-0 left-0 right-0 top-0 -z-[1]"
                src="/assets/편지지.png"
                alt="편지지"
                width={750}
                height={790}
                style={{ objectFit: "cover" }}
              />
              <h1>{mail?.receiverNickname}에게</h1>
              <p>{mail?.content}</p>
              <h1 className="absolute bottom-[2rem] right-[2.2rem]">
                {mail?.senderNickname}씀
              </h1>
            </div>
          </div>
        </div>

        <Link href={replyURL || ""}>
          <Button variant={"primary"}>답장하기</Button>
        </Link>
      </m.section>
    </LazyMotion>
  );
}
