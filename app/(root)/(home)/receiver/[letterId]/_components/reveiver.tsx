"use client";

import React, {
  PropsWithChildren,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HashContext } from "@/hooks/use-hash-router";
import { AnimatePresence } from "framer-motion";

import { LETTER_TYPE, LetterFormValues, letterFormState } from "@/form-state";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSendLetter from "@/hooks/use-send-letter";

import AnswerLetter from "@/components/pages/letter/answer-letter";
import { Form } from "@/components/ui/form";
import { ArrowLeft } from "lucide-react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import LetterQuery from "@/lib/queries/letter.query";
import Loading from "@/components/loading";
import SelectPad from "@/components/pages/letter/select-pad";
import WriteLetter from "@/components/pages/letter/write-letter";
import FinishLetter from "@/components/pages/letter/finish-letter";
import { useSearchParams } from "next/navigation";
import { cn, copyURL, isMobile } from "@/lib/utils";
import ReceiverLoading from "@/components/receiver-loading";
import CommonQuery from "@/lib/queries/common.query";
import Image from "next/image";
import cloud2 from "@/app/assets/cloud2.png";

const ReceiverPage = ({
  params: { letterId },
}: {
  params: { letterId: string };
}) => {
  // ReceiverLoading

  const [loading, setLoading] = useState(true);
  const { data: cats } = useQuery(CommonQuery.getCat);
  const { mutate, data } = useSendLetter();
  const searchParams = useSearchParams();
  const replyMailId = searchParams.get("mailId");
  const router = useContext(HashContext);
  const {
    data: { data: letter },
  } = useSuspenseQuery(LetterQuery.getLetterById(letterId));

  const form = useForm<LetterFormValues>({
    resolver: zodResolver(letterFormState),
    defaultValues: {
      catName: "umu",
      content: "",
      receiverNickname: letter?.senderNickname || "",
      ...(letter.senderId ? { receiverId: letter.senderId } : {}),
      senderNickname: letter.receiverNickname || "",
      letterType: LETTER_TYPE.ANSWER,
      ...(replyMailId ? { replyMailId: replyMailId ?? "" } : {}),
    },
  });

  const onValid = (values: LetterFormValues) => {
    mutate(values, {
      async onSuccess(data) {
        router.push("finish");
      },
    });
  };

  useEffect(() => {
    if (replyMailId) {
      setTimeout(() => {
        router.push("cat");
      }, 0);
    }

    if (!window.Kakao?.isInitialized()) {
      window.Kakao?.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }, []);

  useEffect(() => {
    if (letter?.senderNickname) {
      form.setValue("receiverNickname", letter.senderNickname);
    }
    if (letter.senderId) {
      form.setValue("receiverId", letter.senderId);
    }
  }, [form, letter?.senderId, letter?.senderNickname]);

  const catType = form.watch("catName");
  const selectedCat = useMemo(() => {
    return cats?.find((cat) => data?.catName === cat.code);
  }, [cats, data?.catName]);

  return loading ? (
    <ReceiverLoading
      catType={letter.catName}
      onFinish={() => {
        setLoading(false);
      }}
    />
  ) : (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValid)}
        className={cn(
          "flex h-full flex-col overflow-y-hidden overflow-x-clip p-6 text-secondary-white duration-100",
          !router.hash
            ? letter.catName === "umu"
              ? "bg-background"
              : letter.catName === "cheezu"
                ? "bg-[#E8E2D6]"
                : letter.catName === "gookie"
                  ? "bg-[#92AFC7]"
                  : "bg-background"
            : catType === "umu"
              ? "bg-background"
              : catType === "cheezu"
                ? "bg-[#E8E2D6]"
                : catType === "gookie"
                  ? "bg-[#92AFC7]"
                  : "bg-background",
        )}
      >
        {router.hash && (
          <ArrowLeft
            className={cn("text-main", catType === "cheezu" && "invert")}
            onClick={() => router.back()}
          />
        )}

        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            {!router.hash ? (
              <AnswerLetter
                router={router}
                control={form.control}
                letter={letter}
              />
            ) : null}
            {router.hash === "#cat" ? (
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
                      if (isMobile() && selectedCat) {
                        window.Kakao?.Share.sendCustom({
                          templateId: parseInt(
                            process.env.NEXT_PUBLIC_KAKAO_SHARE_TEMPLATE_ID,
                          ),
                          installTalk: true,
                          templateArgs: {
                            LETTER_ID: data.id,
                            CAT_AVATAR: selectedCat.faceImage,
                            CAT_NAME: selectedCat.name,
                            SENDER: data.senderNickname,
                          },
                          serverCallbackArgs: {
                            letterId: data.id,
                            letterType: data.letterType,
                          },
                        });
                      } else {
                        copyURL(`/receiver/${data?.id}`);
                      }
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
              alt=""
            />
          </div>
        </Suspense>
      </form>
    </Form>
  );
};

export default ReceiverPage;

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
