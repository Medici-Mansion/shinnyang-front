"use client";
import GoBack from "@/components/pages/go-back";
import BaseLayout from "@/layout/base-layout";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <BaseLayout className="justify-center">
      <div className="flex flex-1 items-center">
        <Link href="/" className="relative aspect-[640/303] w-full">
          <Image src="/assets/404.png" alt="404" width={640} height={298} />
        </Link>
      </div>
      <GoBack />
    </BaseLayout>
  );
};

export default error;
