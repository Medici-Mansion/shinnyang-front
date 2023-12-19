"use client";
import CommonQuery from "@/lib/queries/common.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import TextArea from "@/components/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { IHashContext } from "@/hooks/use-hash-router";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import { motion } from "framer-motion";
import { LetterFormValues } from "@/app/(root)/(home)/letter/page";
import { Cat } from "@/type";
interface SelectPadProps {
  router: Pick<IHashContext, "push" | "back">;
  control: Control<LetterFormValues, any>;
}

const SelectPad = ({ router, control }: SelectPadProps) => {
  const { data: cats } = useSuspenseQuery(CommonQuery.getCat);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  useEffect(() => {
    if (Array.isArray(cats) && cats.length > 0) {
      setSelectedCat(cats[0]);
    }
  }, [cats]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex grow flex-col space-y-4 pt-2"
    >
      <h1 className="mb-4 text-2xl font-semibold">
        편지를 배달할 냥이를
        <br />
        선택해주세요!
        <br />
        <sub className="text-sm font-normal">
          냥이마다 편지 디자인이 달라요.
        </sub>
      </h1>
      <FormField
        name="catType"
        control={control}
        render={({ field }) => (
          <div className="grid grid-cols-3 gap-x-2">
            {Array.isArray(cats) &&
              cats.map((catType: Cat) => (
                <div
                  key={catType.id}
                  className="mx-auto w-full text-center text-sm font-normal"
                >
                  <input
                    type="radio"
                    defaultChecked={field.value === catType.code}
                    onChange={() => {
                      field.onChange(catType.name);
                      setSelectedCat(catType);
                    }}
                    id={catType.code}
                    name="catType"
                    value={catType.code}
                    className="peer hidden"
                  />

                  <label
                    htmlFor={catType.code}
                    className="relative mb-2 block aspect-square rounded-md bg-gray-200 duration-100 peer-checked:bg-gray-600"
                  >
                    <Image src={catType.image} alt={catType.name} fill />
                  </label>
                  <span className="mt-2 text-base">{catType.name}</span>
                </div>
              ))}
          </div>
        )}
      ></FormField>

      {selectedCat && (
        <div className="relative grow overflow-hidden rounded-2xl py-4 pl-8 pr-4">
          <Image className="-z-10" src="/letter_sheet.png" alt="letter" fill />
          <h1 className="text-2xl">{`${selectedCat.name} 에게`}</h1>
          <TextArea
            value={`냥이 ${selectedCat.name} 귀여운 글씨체와 편지 디자인 설명?`}
            disabled
            className="w-2/3 border-none bg-transparent px-0 outline-none"
            maxLength={100}
            maxRows={6}
          />
          <h1 className="absolute bottom-4 right-[15%] text-2xl">닉네임 씀</h1>
        </div>
      )}
      <Button onClick={() => router.push("letter")} className="w-full py-6">
        선택 완료
      </Button>
    </motion.div>
  );
};

export default SelectPad;
