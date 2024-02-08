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

import 담요 from "@/app/assets/담요.png";
import 식빵 from "@/app/assets/식빵.png";
import 말풍선 from "@/app/assets/말풍선.png";
import 윷 from "@/app/assets/윷";

import { cn } from "@/lib/utils";
import { memo } from "react";

interface SelectPadProps {
  router: Pick<IHashContext, "push" | "back">;
  control: Control<LetterFormValues, any>;
}

const SelectPad = ({ router, control }: SelectPadProps) => {
  const { data: cats } = useSuspenseQuery(CommonQuery.getCat);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="z-[1] flex h-full flex-col text-main"
    >
      <div className="font-umu text-[26px] leading-[46px]">
        마음에 드는 설냥이를
        <br />
        선택해주냥 =^･ω･^=
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
                      <Image
                        src={catType.faceImage}
                        alt={catType.name}
                        fill
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KG..."
                      />
                    </div>
                  </label>
                  <span className="mt-2 rounded-full px-4 py-1 text-title-medium peer-checked:bg-main peer-checked:text-black">
                    {catType.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="grow">
              <div className="absolute -bottom-[7%] left-0">
                <Image
                  src={담요.src}
                  placeholder="blur"
                  width={담요.width}
                  height={담요.height}
                  blurDataURL={담요.blurDataURL}
                  alt="담요"
                />
                <CatImage catType={field.value} />
                <Image
                  className="absolute -top-[28%] left-[32%] z-[2] w-[43%]"
                  style={{ transform: "rotateY(180deg)" }}
                  src={식빵.src}
                  width={식빵.width}
                  height={식빵.height}
                  alt="식빵"
                  placeholder="blur"
                  blurDataURL={식빵.blurDataURL}
                />
                {윷.map((item, index) => (
                  <AnimateArticle key={item.name} item={item} />
                ))}
                <div className="absolute -top-[83%] left-[14%] z-[2] flex w-[67.7%] scale-75 items-center justify-center">
                  <Image
                    src={말풍선.src}
                    width={말풍선.width}
                    height={말풍선.height}
                    alt="말풍선"
                    placeholder="blur"
                    blurDataURL={말풍선.blurDataURL}
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
        }}
        key={item.name}
        src={image.src}
        alt={item.name}
        width={image.width}
        height={image.height}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
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
      placeholder="blur"
      blurDataURL={cat.blurDataURL}
    />
  );
}
