'use client';
import CommonQuery from '@/lib/queries/common.query';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import TextArea from '@/components/textarea';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form';
import { IHashContext } from '@/hooks/use-hash-router';
import Image from 'next/image';
import React, { useMemo } from 'react';
import { Control } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Cat } from '@/type';
import { cn } from '@/lib/utils';
import { LetterFormValues } from '@/form-state';

interface SelectPadProps {
    router: Pick<IHashContext, 'push' | 'back'>;
    control: Control<LetterFormValues, any>;
}

const SelectPad = ({ router, control }: SelectPadProps) => {
    const { data: cats } = useSuspenseQuery(CommonQuery.getCat);
    const catNameObj = useMemo(() => {
        const nameOfCodes: { [key in Cat['code']]?: string } = {};
        cats.forEach((cat) => {
            nameOfCodes[cat.code] = cat.name;
        });
        return nameOfCodes;
    }, [cats]);
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex grow flex-col space-y-4 pt-2"
        >
            <h1 className="mb-4 text-2xl font-semibold">
                편지를 배달할 냥이를
                <br />
                선택해주세요!
                <br />
                <sub className="text-sm font-normal">냥이마다 편지 디자인이 달라요.</sub>
            </h1>
            <FormField
                name="catType"
                control={control}
                render={({ field }) => (
                    <>
                        <div className="grid grid-cols-3 gap-x-2">
                            {cats?.map((catType: Cat) => (
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
                                        className="peer-checked:bg-sub peer-checked:border-red relative mb-2 block aspect-square rounded-md border border-gray-300 duration-100 peer-checked:border-2 "
                                    >
                                        <Image src={catType.image} alt={catType.name} fill />
                                    </label>
                                    <span className="mt-2 text-base">{catType.name}</span>
                                </div>
                            ))}
                        </div>

                        <div
                            className={cn(
                                'border-red relative grow overflow-hidden rounded-2xl border p-6'
                            )}
                            style={{ fontFamily: field.value }}
                        >
                            <Image className="-z-10" src="/letter_sheet.png" alt="letter" fill />
                            <h1 className="text-2xl">{`${catNameObj[field.value]} 에게`}</h1>
                            <TextArea
                                value={`냥이 ${field.value} 귀여운 글씨체와 편지 디자인 설명?`}
                                disabled
                                className="w-2/3 border-none bg-transparent px-0 outline-none"
                                maxLength={100}
                                maxRows={6}
                            />
                            <h1 className="absolute bottom-4 right-[15%] text-2xl">닉네임 씀</h1>
                        </div>
                    </>
                )}
            />

            <Button onClick={() => router.push('letter')}>선택 완료</Button>
        </motion.div>
    );
};

export default SelectPad;
