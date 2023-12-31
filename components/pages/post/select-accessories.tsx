"use client";
import APIs from "@/apis";
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form";
import { m, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import CommonQuery from "@/lib/queries/common.query";
import { cn } from "@/lib/utils";
import { Acc, UserCatResponse } from "@/type";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import PostTypeSelect from "./post-type-select";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SelectAccessoriesProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}
const SelectAccessories = ({ open, setOpen }: SelectAccessoriesProps) => {
  const { data: cats } = useSuspenseQuery(CommonQuery.getCat);
  const { data: accessories } = useSuspenseQuery(CommonQuery.getAcc);
  const { data: userCat } = useQuery({
    ...CommonQuery.getUserCat,
  });

  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const currentCat = useMemo(
    () => cats.find((cat) => cat.code === type),
    [cats, type],
  );
  const currentUserCat = useMemo(
    () => userCat?.find((uc) => uc.catId === currentCat?.id),
    [currentCat?.id, userCat],
  );

  const currentAcc = useMemo(
    () => accessories.find((acc) => acc.id === currentUserCat?.accessoryId),
    [accessories, currentUserCat?.accessoryId],
  );

  const [selectedAcc, setSelectedAcc] = useState<Acc | undefined>(currentAcc);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["cats", "accessory"],
    mutationFn: APIs.postCatAccessory,
    onMutate(data) {
      const selectedAcc = accessories.find((userCat) => {
        return userCat.id === data.accessoryId;
      });
      const cachedUserCat = queryClient.getQueryData(
        CommonQuery.getUserCat.queryKey,
      ) as UserCatResponse[];
      if (selectedAcc) {
        cachedUserCat.some((userCat) => {
          if (userCat.catId === data.catId) {
            userCat.accessoryCode = selectedAcc.code;
            userCat.accessoryId = data.accessoryId;
            userCat.accessoryName = selectedAcc.name;
          }
          return userCat.catId === data.catId;
        });
      } else {
        cachedUserCat.some((userCat) => {
          if (userCat.catId === data.catId) {
            userCat.accessoryCode = undefined;
            userCat.accessoryId = undefined;
            userCat.accessoryName = undefined;
          }
          return userCat.catId === data.catId;
        });
      }
      queryClient.setQueryData(CommonQuery.getUserCat.queryKey, cachedUserCat);
    },
  });

  useEffect(() => {
    setSelectedAcc(currentAcc);
  }, [currentAcc, type]);
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) {
          if (currentCat) {
            mutate({
              accessoryId: selectedAcc?.id,
              catId: currentCat.id,
            });
          }
        }
        setOpen(state);
      }}
      modal={false}
    >
      <DialogTrigger
        className={cn(
          "relative top-0 mx-auto aspect-[219/156] h-[30%] w-4/5",
          open && "z-[100]",
        )}
      >
        <div>
          {currentCat?.image && (
            <Image
              src={currentCat.image}
              alt="cat"
              style={{
                objectFit: "contain",
              }}
              fill
            />
          )}
          {selectedAcc && (
            <Image
              src={selectedAcc.fullImage}
              style={{
                objectFit: "contain",
              }}
              alt="acc"
              fill
            />
          )}
        </div>
      </DialogTrigger>
      <AnimatePresence>
        {open && (
          <LazyMotion features={domAnimation}>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed left-0 top-0 z-50 h-full w-full bg-[rgba(0,0,0,0.4)] "
            />
          </LazyMotion>
        )}
      </AnimatePresence>
      <DialogPortal forceMount>
        <DialogContent
          close={<></>}
          className="top-[35%] w-screen max-w-[calc(var(--max-width)*0.5)] grow rounded-xl border-[3px] border-modal-border p-3"
        >
          <DialogTitle className="mx-auto flex flex-col items-center text-title-medium">
            <svg
              width="19"
              height="15"
              viewBox="0 0 19 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-2"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.35045 3.22278C8.35045 2.66743 8.83891 1.84677 9.82455 1.84677C10.2245 1.84677 10.4994 2.02974 10.6882 2.29292C10.887 2.56989 10.9828 2.93062 10.9828 3.22278C10.9828 3.736 10.6887 4.04769 10.1062 4.46596C9.2853 5.05541 9.23311 6.00962 9.2837 6.68181C9.08532 6.72455 8.8917 6.79643 8.70928 6.89742L2.25245 10.4721C1.64704 10.8042 1.16778 11.3401 1.03573 11.9732C0.896433 12.6411 1.16394 13.3119 1.84671 13.8178C2.16619 14.0545 2.54497 14.125 2.87527 14.125H16.6687C17.5115 14.125 18.2126 13.5003 18.429 12.7474C18.5403 12.3602 18.5283 11.9274 18.3395 11.5151C18.151 11.1036 17.8011 10.7436 17.2889 10.4706L17.2869 10.4696L10.7299 6.89127C10.5389 6.78705 10.3359 6.71461 10.1282 6.67392C10.0742 6.04524 10.142 5.48084 10.5958 5.15501C11.1926 4.7265 11.8251 4.19142 11.8251 3.22278C11.8251 2.77402 11.6853 2.23505 11.3714 1.79755C11.0476 1.34627 10.5327 1 9.82455 1C8.28316 1 7.5081 2.29628 7.5081 3.22278C7.5081 3.45661 7.69667 3.64617 7.92927 3.64617C8.16188 3.64617 8.35045 3.45661 8.35045 3.22278ZM9.11563 7.63915C9.49273 7.43038 9.94962 7.42899 10.328 7.63546L16.8909 11.2169L16.8928 11.2179C17.2746 11.4211 17.4767 11.6562 17.5743 11.8692C17.6718 12.0821 17.6795 12.3043 17.6197 12.5124C17.4939 12.9503 17.0894 13.2782 16.6687 13.2782H2.87527C2.65254 13.2782 2.47216 13.2293 2.34646 13.1361C1.88351 12.7932 1.79943 12.4381 1.86015 12.147C1.92807 11.8214 2.20085 11.4649 2.65578 11.2154L9.11563 7.63915Z"
                fill="#DDA973"
                stroke="#DDA973"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>
            {currentCat?.name}의 옷장
          </DialogTitle>

          <div className="flex gap-x-2">
            {accessories.map((accType) => (
              <div
                key={accType.id}
                className="mx-auto w-full  text-center text-sm font-normal"
              >
                <input
                  type="radio"
                  id={accType.id}
                  name="accType"
                  value={accType.id}
                  className="hidden"
                  onClick={() => {
                    if (selectedAcc?.id === accType.id) {
                      setSelectedAcc(undefined);
                    } else {
                      setSelectedAcc(accType);
                    }
                  }}
                />

                <label
                  htmlFor={accType.id}
                  className={cn(
                    "block h-full w-full font-pretendard text-xs leading-7",
                    accType.id !== selectedAcc?.id && "opacity-30 duration-100",
                  )}
                >
                  <div
                    className={cn(
                      "relative aspect-square w-full rounded-xl bg-gray-200 duration-100",
                      accType.id === selectedAcc?.id
                        ? "bg-modal-active-bg outline outline-2 outline-modal-active-border"
                        : "bg-gray-400",
                    )}
                  >
                    <Image
                      src={accType.iconImage}
                      alt={accType.name}
                      fill
                      placeholder="blur"
                      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcOnt2PQAF5AJMrzp1XwAAAABJRU5ErkJggg=="
                    />
                  </div>
                  {accType.name.replace(" 모자", "")}
                </label>
              </div>
            ))}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default SelectAccessories;
