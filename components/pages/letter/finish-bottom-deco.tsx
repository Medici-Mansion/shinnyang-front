"use client";
import CommonQuery from "@/lib/queries/common.query";
import { CompletedLetter } from "@/type";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useMemo } from "react";

interface FinishBottomDecoProps {
  catName: CompletedLetter["catName"];
}

const FinishBottomDeco = ({ catName }: FinishBottomDecoProps) => {
  const { data: cats } = useSuspenseQuery(CommonQuery.getCat);

  const selectedCat = useMemo(
    () => cats.find((cat) => cat.code === catName),
    [catName, cats],
  );
  return (
    <div className="absolute -bottom-[25%] -left-6 h-2/5">
      <div className="relative">
        <Image
          width={750}
          height={506}
          src="/assets/우체국지붕.png"
          alt="지붕"
          style={{ objectFit: "contain" }}
        />
        <div className="absolute left-0 top-0 h-full w-full">
          <div className="relative -top-[17%] left-[22%] z-10 flex w-[40%] items-end">
            <div className="relative">
              {selectedCat?.backImage && (
                <Image
                  src={selectedCat?.backImage}
                  width={192}
                  height={348}
                  alt="year back"
                  className="object-contain"
                />
              )}
            </div>
            <div className="relative h-fit pb-[20%]">
              {selectedCat?.yearImage && (
                <Image
                  src={selectedCat?.yearImage}
                  alt="year back"
                  width={258}
                  height={99}
                  className="bottom-0 object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishBottomDeco;
