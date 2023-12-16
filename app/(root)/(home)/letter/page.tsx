import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const LetterPage = () => {
  return (
    <section className="flex flex-col space-y-4 h-full p-6">
      <h1 className="mt-[7dvh] font-semibold text-2xl mb-4">
        편지를 배달할 냥이를
        <br />
        선택해주세요!
        <br />
        <sub className="text-sm font-normal">
          냥이마다 편지 디자인이 달라요.
        </sub>
      </h1>
      <div className="grid grid-cols-3 gap-x-2">
        <div className="w-full text-sm font-normal mx-auto text-center">
          <div className="relative mb-2 aspect-square bg-gray-200 rounded-md">
            <Image src="/cat_1.png" alt="cat1" fill />
          </div>
          <span className="mt-2 text-base">냥이 1</span>
        </div>
        <div className="w-full text-sm font-normal mx-auto text-center">
          <div className="relative mb-2 aspect-square bg-gray-200 rounded-md">
            <Image src="/cat_2.png" alt="cat1" fill />
          </div>
          <span className="mt-2 text-base">냥이 2</span>
        </div>
        <div className="w-full text-sm font-normal mx-auto text-center">
          <div className="relative mb-2 aspect-square bg-gray-200 rounded-md">
            <Image src="/cat_3.png" alt="cat1" fill />
          </div>
          <span className="mt-2 text-base">냥이 3</span>
        </div>
      </div>
      <div className="grow relative overflow-hidden rounded-2xl py-4 pl-8">
        <Image className="-z-10" src="/letter_sheet.png" alt="letter" fill />
        <h1 className="text-2xl">수해니 에게</h1>
        <textarea className="z-10" rows={13}></textarea>
      </div>
      <Button className="w-full py-6">선택 완료</Button>
    </section>
  );
};

export default LetterPage;
