"use client";
import CommonQuery from "@/lib/queries/common.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { IHashContext } from "@/hooks/use-hash-router";
import Image, { StaticImageData } from "next/image";
import { Control } from "react-hook-form";
import { motion } from "framer-motion";
import { LetterFormValues } from "@/form-state";

import cheezu from "@/app/assets/체즈";
import umu from "@/app/assets/우무";
import gookie from "@/app/assets/구키";

import { cn } from "@/lib/utils";
import { memo } from "react";

import 말풍선 from "@/app/assets/speech_bubble.png";

interface SelectPadProps {
  router: Pick<IHashContext, "push" | "back">;
  control: Control<LetterFormValues, any>;
  catType: "cheezu" | "gookie" | "umu";
}

const SelectPad = ({ router, control, catType }: SelectPadProps) => {
  const { data: cats } = useSuspenseQuery(CommonQuery.getCat);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="z-[1] flex h-full flex-col text-main"
    >
      <div
        className={cn(
          "font-umu text-[26px] leading-[46px]",
          catType === "cheezu" && "invert",
        )}
      >
        마음에 드는 설냥이를
        <br />
        선택해주라냥 =^･ω･^=
      </div>
      <FormField
        name="catName"
        control={control}
        render={({ field }) => (
          <>
            <div className="grid flex-[0_0_25%] grid-cols-3 items-center gap-x-2">
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
                    className="relative mb-2 flex aspect-square items-center justify-center rounded-xl bg-white opacity-50 duration-100 peer-checked:border-2 peer-checked:border-main peer-checked:opacity-100"
                  >
                    <div className="relative aspect-square w-4/5">
                      <Image src={catType.faceImage} alt={catType.name} fill />
                    </div>
                  </label>
                  <span className="mt-2 rounded-full px-4 py-1 text-title-medium peer-checked:bg-main peer-checked:text-black">
                    {catType.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="grow">
              {field.value === "umu" ? (
                <div className="absolute -bottom-[7%] left-0">
                  <Image
                    src={umu.bg.src}
                    width={umu.bg.width}
                    height={umu.bg.height}
                    alt="담요"
                  />
                  <CatImage catType={field.value} />

                  {umu.floating.map((item, index) => (
                    <AnimateArticle key={item.name} item={item} />
                  ))}
                </div>
              ) : field.value === "cheezu" ? (
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
                    alt={catType}
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
                    alt={catType}
                    width={gookie.main.width}
                    height={gookie.main.height}
                  />
                  <Image
                    className="absolute -top-[12%] left-[11%] z-[2] w-[18%]"
                    src={gookie.kettle.src}
                    alt={catType}
                    width={cheezu.main.width}
                    height={cheezu.main.height}
                  />
                  <Image
                    className="absolute -top-[-5%] left-[24%] z-[2] w-[25%]"
                    src={gookie.songpyeon.src}
                    alt={catType}
                    width={cheezu.main.width}
                    height={cheezu.main.height}
                  />
                  <Image
                    className="absolute -top-[-13%] left-[50%] z-[2] w-[10%]"
                    src={gookie.mug.src}
                    alt={catType}
                    width={cheezu.main.width}
                    height={cheezu.main.height}
                  />

                  {gookie.floating.map((item, index) => (
                    <AnimateArticle key={item.name} item={item} />
                  ))}
                </div>
              )}
              <div className="absolute left-[7%] z-[2] -mt-[5%] flex w-[80%] scale-75 items-center justify-center">
                <Image
                  src={말풍선.src}
                  width={말풍선.width}
                  height={말풍선.height}
                  alt="말풍선"
                />
                <p
                  className={cn(
                    "absolute text-black",
                    field.value === "umu"
                      ? "umu"
                      : field.value === "cheezu"
                        ? "cheezu"
                        : "gookie",
                  )}
                >
                  나의 귀여운 글씨체와 함께
                  <br />
                  편지를 써보는 건 어떠냥!
                </p>
              </div>
            </div>
          </>
        )}
      />

      <Button
        onClick={() => router.push("letter")}
        variant="primary"
        className="z-[1] mt-6"
      >
        선택 완료
      </Button>
    </motion.div>
  );
};

export default SelectPad;

export const AnimateArticle = memo(
  ({
    item,
  }: {
    item: {
      name: string;
      image: StaticImageData;
      width: number;
      left: number;
      top: number;
      z?: number;
    };
  }) => {
    const image = item.image;
    return (
      <Image
        className={cn("absolute animate-bounce")}
        style={{
          width: `${item.width}%`,
          top: `${item.top}%`,
          left: `${item.left}%`,
          animationDuration: `${Math.random() * 3000 + 1500}ms`,
          zIndex: item.z ? item.z : 0,
        }}
        key={item.name}
        src={image.src}
        alt={item.name}
        width={image.width}
        height={image.height}
      />
    );
  },
);
AnimateArticle.displayName = "AnimateArticle";

export function CatImage({
  catType,
}: {
  catType: LetterFormValues["catName"];
}) {
  const cat = require(`@/app/assets/${catType}.png`).default;
  return (
    <Image
      className="absolute -top-[28%] left-[32%] z-[2] w-[43%]"
      style={{ transform: "rotateY(180deg)" }}
      src={cat.src}
      alt={catType}
      width={cat.width}
      height={cat.height}
    />
  );
}
