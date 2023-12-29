"use client";
import APIs from "@/apis";
import { FormField } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CommonQuery from "@/lib/queries/common.query";
import { Acc, UserCatResponse } from "@/type";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const SelectAccessories = () => {
  const [selectedAccessoryCode, setSelectedAccessoryCode] = useState("");
  const form = useForm({
    mode: "onChange",
  });
  const queryClient = useQueryClient();
  const { data: cats } = useSuspenseQuery(CommonQuery.getCat);
  const { data: accessories } = useSuspenseQuery(CommonQuery.getAcc);
  const { data: userCat } = useQuery(CommonQuery.getUserCat);
  const { mutate } = useMutation({
    mutationKey: ["cats", "accessory"],
    mutationFn: APIs.postCatAccessory,
    onSuccess(data, variables, context) {
      const cachedUserCat = queryClient.getQueryData(
        CommonQuery.getUserCat.queryKey,
      ) as UserCatResponse[];
      cachedUserCat.forEach((userCat) => {
        if (userCat.catId === data.catId) {
          userCat.accessoryCode = data.accessoryCode;
          userCat.accessoryId = data.accessoryId;
          userCat.accessoryName = data.accessoryName;
          userCat.catCode = data.catCode;
          userCat.catId = data.catId;
          userCat.catName = data.catName;
        }
      });
      queryClient.setQueryData(CommonQuery.getUserCat.queryKey, cachedUserCat);
    },
  });

  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const currentCatIndex = useMemo(
    () => cats.findIndex((cat) => cat.code === type),
    [cats, type],
  );
  const accMap: { [key in string]: any } = useMemo(
    () =>
      accessories.reduce((acc, cur) => {
        return { ...acc, [cur.code]: cur.fullImage };
      }, {}),
    [accessories],
  );
  const selectedUserCat = useMemo(() => {
    if (cats[currentCatIndex]) {
      return userCat?.find((uc) => uc.catCode === cats[currentCatIndex].code);
    }
    return null;
  }, [cats, currentCatIndex, userCat]);
  const selectedAcc = useMemo(() => {
    if (selectedUserCat?.accessoryCode) {
      return accMap[selectedUserCat.accessoryCode];
    }
    return null;
  }, [accMap, selectedUserCat?.accessoryCode]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative top-0 mx-auto aspect-[219/156] h-2/5 w-4/5">
          {cats[currentCatIndex]?.image && (
            <Image
              src={cats[currentCatIndex]?.image}
              alt="cat"
              style={{
                objectFit: "contain",
              }}
              fill
            />
          )}
          {selectedAcc && (
            <Image
              src={selectedAcc}
              style={{
                objectFit: "contain",
              }}
              alt="acc"
              fill
            />
          )}
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
                    mutate({
                      accessoryId: accType.id,
                      catId: cats[currentCatIndex].id,
                    });
                    setSelectedAccessoryCode(accType.code);
                  }}
                />

                <label htmlFor={accType.id} className="block h-full w-full ">
                  <div className="relative aspect-square w-full rounded-md bg-gray-200 duration-100 group-checked:bg-gray-600  ">
                    <Image
                      src={accType.iconImage}
                      alt={accType.name}
                      fill
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
