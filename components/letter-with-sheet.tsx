"use client";
import CommonQuery from "@/lib/queries/common.query";
import { cn } from "@/lib/utils";
import { Cat } from "@/type";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, {
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

import 편지지 from "@/app/assets/letter.png";

interface LetterWithSheetProps extends HTMLAttributes<HTMLDivElement> {
  to: string;
  content: string;
  from: string;
  catType: Cat["code"];
  preview?: boolean;
  showStamp?: boolean;
}

const LetterWithSheet = ({
  to,
  content,
  from,
  catType,
  preview = false,
  showStamp = true,
  ...rest
}: LetterWithSheetProps) => {
  const { data } = useSuspenseQuery(CommonQuery.getCat);
  const imageRef = useRef<HTMLImageElement>(null);
  const letterWrapRef = useRef<HTMLDivElement>(null);
  const handleImageResize = useCallback(() => {
    if (letterWrapRef.current && imageRef.current) {
      letterWrapRef.current.style.height = imageRef.current.clientHeight + "px";
    }
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.addEventListener("resize", handleImageResize);
    }

    handleImageResize();
    return () => {
      imageRef.current?.removeEventListener("resize", handleImageResize);
    };
  }, [handleImageResize]);

  return (
    <div
      ref={letterWrapRef}
      {...rest}
      className={cn(
        "relative z-[1] w-full px-[10%] py-[10%] pr-[10%]",
        rest.className,
      )}
    >
      <h1>{to} 에게</h1>
      <p className="mt-4 break-words">{content}</p>
      <h1 className="absolute bottom-[15%] right-[15%]">
        <div className="relative">{from} 씀</div>
      </h1>

      <Image
        ref={imageRef}
        className="absolute bottom-0 left-0 right-0 top-0 -z-[1]"
        src={편지지.src}
        alt="편지지"
        width={편지지.width}
        height={편지지.height}
        placeholder="blur"
        blurDataURL={편지지.blurDataURL}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default LetterWithSheet;
