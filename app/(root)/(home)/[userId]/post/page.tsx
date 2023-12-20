'use client';
import CommonQuery from '@/lib/queries/common.query';
import { useSuspenseQuery } from '@tanstack/react-query';
import CatButtons from '@/components/pages/post/cat-buttons';
import PostBox from '@/components/pages/post/post-box';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Acc } from '@/type';

import React, { Suspense, useState, useMemo } from 'react';

const PostPage = () => {
    const router = useRouter();
    const { data: accessories } = useSuspenseQuery(CommonQuery.getAcc);
    const [isAccSelectBox, setAccSelectBox] = useState(false);
    const accNameObj = useMemo(() => {
        const nameOfCodes: { [key in Acc['code']]?: string } = {};
        accessories.forEach((acc) => {
            nameOfCodes[acc.code] = acc.name;
        });
        return nameOfCodes;
    }, [accessories]);
    return (
        <section className="theme-responsive p-0">
            <div className="px-4 pt-4">
                <ArrowLeft onClick={() => router.back()} />
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-black">
                        {'신냥이'}
                        <br />
                        신냥이 우체국
                        <br />
                    </h1>
                    <sub className="text-lg font-normal text-gray-500">
                        서랍을 누르면 편지를 확인할 수 있어요!
                    </sub>
                </div>
                <div className="mt-6 flex w-full flex-col space-y-6">
                    <div className="grid w-full grid-cols-3 justify-items-center gap-2">
                        <Suspense fallback={<div>냥이들 불러오는중..</div>}>
                            <CatButtons />
                        </Suspense>
                    </div>
                    <div className="grid w-full grid-cols-3 justify-items-center gap-2">
                        <PostBox text="#1" />
                        <PostBox text="#2" />
                        <PostBox text="#3" />
                        <PostBox text="#4" />
                        <PostBox text="#5" />
                        <PostBox text="#6" />
                        <PostBox text="#7" />
                        <PostBox text="#8" />
                        <PostBox text="#9" />
                    </div>
                </div>
            </div>
            {isAccSelectBox && (
                <div className="absolute top-[25%] grid grid-cols-3 gap-x-2 w-full bg-gray-300 ">
                    {accessories?.map((accType: Acc) => (
                        <div
                            key={accType.id}
                            className="p-3 mx-auto w-full text-center text-sm font-normal"
                        >
                            <input
                                type="radio"
                                id={accType.code}
                                name="accType"
                                value={accType.code}
                                className="peer hidden"
                            />

                            <label
                                htmlFor={accType.code}
                                className="relative mb-2 block aspect-square rounded-md bg-gray-200 duration-100 peer-checked:bg-gray-600"
                            >
                                <Image src={accType.iconImage} alt={accType.name} fill />
                            </label>
                            <span className="mt-2 text-base">{accType.name}</span>
                        </div>
                    ))}
                </div>
            )}

            <div className="flex w-full grow items-end">
                <div className="relative flex h-full w-full grow flex-col items-end">
                    <div
                        className="relative z-10 mx-auto aspect-[31/32] h-[60%]"
                        onClick={() => setAccSelectBox(!isAccSelectBox)}
                    >
                        <Image src="/cat.png" alt="cat" fill />
                    </div>
                    <div className="absolute bottom-0 h-[63%] w-full bg-foreground"></div>
                </div>
                <div className="absolute bottom-12 w-full px-4">
                    <Link href="/letter">
                        <Button className="w-full py-6">편지쓰기</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PostPage;
