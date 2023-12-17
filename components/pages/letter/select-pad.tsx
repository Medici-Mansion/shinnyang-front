import TextArea from "@/components/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { IHashContext } from "@/hooks/use-hash-router";
import Image from "next/image";
import React from "react";
import { UseFormReturn } from "react-hook-form";
interface SelectPadProps {
  router: Pick<IHashContext, "push" | "back">;
  form: UseFormReturn<
    {
      catType: "cat1" | "cat2" | "cat3";
    },
    any,
    undefined
  >;
}

const SelectPad = ({ router, form }: SelectPadProps) => {
  return (
    <>
      <h1 className="mt-[7dvh] font-semibold text-2xl mb-4">
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
        control={form.control}
        render={({ field }) => (
          <div className="grid grid-cols-3 gap-x-2">
            <div className="w-full text-sm font-normal mx-auto text-center">
              <input
                type="radio"
                defaultChecked={field.value === "cat1"}
                onChange={() => {
                  field.onChange("cat1");
                }}
                id="cat1"
                name="catType"
                value="cat1"
                className="peer hidden"
              />

              <label
                htmlFor="cat1"
                className="block relative mb-2 aspect-square bg-gray-200 rounded-md peer-checked:bg-gray-600 duration-100"
              >
                <Image src="/cat_1.png" alt="cat1" fill />
              </label>
              <span className="mt-2 text-base">냥이 1</span>
            </div>
            <div className="w-full text-sm font-normal mx-auto text-center">
              <input
                type="radio"
                defaultChecked={field.value === "cat2"}
                onChange={() => field.onChange("cat2")}
                name="catType"
                id="cat2"
                value="cat2"
                className="peer hidden"
              />

              <label
                htmlFor="cat2"
                className="block relative mb-2 aspect-square bg-gray-200 rounded-md peer-checked:bg-gray-600 duration-100"
              >
                <Image src="/cat_2.png" alt="cat1" fill />
              </label>
              <span className="mt-2 text-base">냥이 2</span>
            </div>
            <div className="w-full text-sm font-normal mx-auto text-center">
              <input
                type="radio"
                defaultChecked={field.value === "cat3"}
                onChange={() => field.onChange("cat3")}
                name="catType"
                id="cat3"
                value="cat3"
                className="peer hidden"
              />

              <label
                htmlFor="cat3"
                className="block relative mb-2 aspect-square bg-gray-200 rounded-md peer-checked:bg-gray-600 duration-100"
              >
                <Image src="/cat_3.png" alt="cat1" fill />
              </label>
              <span className="mt-2 text-base">냥이 3</span>
            </div>
          </div>
        )}
      ></FormField>

      <div className="grow relative overflow-hidden rounded-2xl py-4 pl-8 pr-4">
        <Image className="-z-10" src="/letter_sheet.png" alt="letter" fill />
        <h1 className="text-2xl">수해니 에게</h1>
        <TextArea
          value="냥이 1은 귀여운 글씨체와
          편지 디자인 설명?"
          disabled
          className="bg-transparent w-2/3 border-none outline-none"
          maxLength={100}
          maxRows={6}
        />
        <h1 className="absolute text-2xl bottom-4 right-4">닉네임 씀</h1>
      </div>

      <Button
        type="submit"
        onClick={() => router.push("test")}
        className="w-full py-6"
      >
        선택 완료
      </Button>
    </>
  );
};

export default SelectPad;
