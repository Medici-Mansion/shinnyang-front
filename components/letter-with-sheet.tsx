"use client";
import CommonQuery from "@/lib/queries/common.query";
import { cn } from "@/lib/utils";
import { Cat } from "@/type";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, {
  HTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

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

  const currentCat = useMemo(
    () => data.find((cat) => cat.code === catType),
    [catType, data],
  );
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
        <div className="relative">
          {from} 씀
          {currentCat?.stampImage ? (
            <Image
              className="absolute -right-[40%] -top-full h-fit rotate-12 opacity-15"
              src={currentCat?.stampImage}
              alt="postal_stamp"
              width={48}
              height={48}
              style={{ objectFit: "contain" }}
            />
          ) : null}
        </div>
      </h1>
      {preview ? (
        <Image
          ref={imageRef}
          className="absolute bottom-0 left-0 right-0 top-0 -z-[1]"
          src="/assets/편지지_preview.png"
          alt="편지지"
          width={654}
          height={500}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <Image
          ref={imageRef}
          className="absolute bottom-0 left-0 right-0 top-0 -z-[1]"
          src="/assets/편지지.png"
          alt="편지지"
          width={750}
          height={790}
          style={{ objectFit: "cover" }}
        />
      )}

      {showStamp ? (
        <Image
          className="absolute right-0 top-0 -z-[1] h-fit w-[35%]"
          src="/postal_stamp.png"
          alt="postal_stamp"
          width={200}
          height={100}
          style={{ objectFit: "contain" }}
        />
      ) : null}
    </div>
  );
};

export default LetterWithSheet;
