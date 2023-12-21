"use client";
import { FormField } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CommonQuery from "@/lib/queries/common.query";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const SelectAccessories = () => {
  const [selectedAccessoryCode, setSelectedAccessoryCode] = useState("");
  const form = useForm({
    mode: "onChange",
  });
  const { data: cats } = useSuspenseQuery(CommonQuery.getCat);
  const { data: accessories } = useSuspenseQuery(CommonQuery.getAcc);
  const accMap = useMemo(
    () =>
      accessories.reduce((acc, cur) => {
        return { ...acc, [cur.code]: cur.fullImage };
      }, {}),
    [accessories],
  );
  const selectedCatImage = accMap[selectedAccessoryCode as keyof typeof accMap];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative top-[calc(1.5dvw+1.5dvh)] mx-auto aspect-[375/329] h-1/2">
          <Image
            // blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnt2PQAF5AJMrzp1XwAAAABJRU5ErkJggg=="
            // placeholder="blur"
            src={cats[0].image}
            alt="cat"
            fill
          />
          {selectedCatImage && <Image src={selectedCatImage} alt="acc" fill />}
        </div>
      </PopoverTrigger>

      <FormField
        control={form.control}
        name="accessory"
        render={({ field }) => (
          <PopoverContent
            className="grid w-screen max-w-[calc(var(--max-width)*0.5)] grow grid-cols-3 gap-x-2 bg-gray-300"
            side="top"
          >
            {accessories.map((accType) => (
              <div
                key={accType.id}
                className="mx-auto w-full  text-center text-sm font-normal"
              >
                <input
                  type="radio"
                  id={accType.id}
                  name="accType"
                  value={accType.code}
                  className="hidden"
                  onChange={(event) => {
                    setSelectedAccessoryCode(accType.code);
                  }}
                />

                <label htmlFor={accType.id} className="block h-full w-full ">
                  <div className="relative aspect-square w-full rounded-md bg-gray-200 duration-100 group-checked:bg-gray-600  ">
                    <Image
                      src={accType.iconImage}
                      alt={accType.name}
                      layout="fill"
                      placeholder="blur"
                      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnt2PQAF5AJMrzp1XwAAAABJRU5ErkJggg=="
                    />
                  </div>
                </label>
              </div>
            ))}
          </PopoverContent>
        )}
      />
    </Popover>
  );
};

export default SelectAccessories;
