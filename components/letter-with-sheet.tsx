"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { HTMLAttributes, useCallback, useEffect, useRef } from "react";

interface LetterWithSheetProps extends HTMLAttributes<HTMLDivElement> {
  to: string;
  content: string;
  from: string;
  preview?: boolean;
  showStamp?: boolean;
}

const LetterWithSheet = ({
  to,
  content,
  from,
  preview = false,
  showStamp = true,
  ...rest
}: LetterWithSheetProps) => {
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
        "relative z-[1] w-full px-[10%] py-[10%] pr-[10%] font-bold",
        rest.className,
      )}
    >
      <h1>{to} 에게</h1>
      <p className="mt-4">{content}</p>
      <h1 className="absolute bottom-[10%] right-[10%]">{from} 씀</h1>
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
