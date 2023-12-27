"use client";
import CommonQuery from "@/lib/queries/common.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import TextArea from "@/components/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { IHashContext } from "@/hooks/use-hash-router";
import Image from "next/image";
import React, { useMemo } from "react";
import { Control } from "react-hook-form";
import { motion } from "framer-motion";
import { Cat } from "@/type";
import { cn } from "@/lib/utils";
import { LetterFormValues } from "@/form-state";
import { Suspense } from "react";
interface SelectPadProps {
  router: Pick<IHashContext, "push" | "back">;
  control: Control<LetterFormValues, any>;
}

const SelectPad = ({ router, control }: SelectPadProps) => {
  const { data: cats } = useSuspenseQuery(CommonQuery.getCat);
  const catNameObj = useMemo(() => {
    const nameOfCodes: { [key in Cat["code"]]?: string } = {};
    cats.forEach((cat) => {
      nameOfCodes[cat.code] = cat.name;
    });
    return nameOfCodes;
  }, [cats]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-4 flex h-full flex-col space-y-4"
    >
      <div>
        <h1 className="text-title-large tracking-normal">
          편지를 배달할 냥이를
          <br />
          선택해주세요!
        </h1>
        <sub className="text-sm font-normal">
          냥이마다 편지 디자인이 달라요.
        </sub>
      </div>
      <FormField
        name="catName"
        control={control}
        render={({ field }) => (
          <>
            <div className="grid grid-cols-3 gap-x-2">
              {cats?.map((catType) => (
                <div
                  key={catType.id}
                  className="mx-auto w-full text-center text-sm font-normal"
                >
                  <input
                    type="radio"
                    defaultChecked={field.value === catType.code}
                    onChange={() => {
                      field.onChange(catType.code);
                    }}
                    id={catType.code}
                    name="catType"
                    value={catType.code}
                    className="peer hidden"
                  />

                  <label
                    htmlFor={catType.code}
                    className="relative mb-2 block aspect-square rounded-xl bg-sub opacity-50 duration-100 peer-checked:border-2 peer-checked:border-red peer-checked:opacity-100"
                  >
                    <Image
                      src={catType.faceImage}
                      alt={catType.name}
                      layout="fill"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KG..."
                    />
                  </label>
                  <span className="mt-2 rounded-full px-4 py-1 text-base peer-checked:bg-red peer-checked:text-white">
                    {catType.name}
                  </span>
                </div>
              ))}
            </div>

            <div
              className={cn(
                "relative grow overflow-hidden rounded-2xl border border-red p-6",
              )}
              style={{ fontFamily: field.value }}
              key={field.value}
            >
              <Image
                className=""
                src="/letter_sheet.png"
                alt="letter"
                priority
                fill
              />
              <h1 className="absolute text-2xl">{`${
                catNameObj[field.value]
              } 에게`}</h1>
              <TextArea
                value={`냥이 ${field.value} 귀여운 글씨체야 이글씨 어때 귀엽냥?`}
                disabled
                className="absolute top-14 w-2/3 resize-none bg-transparent px-0"
                maxLength={100}
                maxRows={6}
              />
              <h1 className="absolute bottom-5 right-[10%] text-2xl">
                닉네임 씀
              </h1>
            </div>
          </>
        )}
      />
      <Button
        onClick={() => router.push("letter")}
        variant="primary"
        className="mt-6 bg-red"
      >
        선택 완료
      </Button>
    </motion.div>
  );
};

export default SelectPad;
