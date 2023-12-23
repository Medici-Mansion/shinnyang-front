"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { AnchorHTMLAttributes } from "react";

interface BackButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const BackButton = ({ href, ...rest }: BackButtonProps) => {
  const router = useRouter();
  return href ? (
    <Link href={href} {...rest}>
      <ArrowLeft className="text-white" />
    </Link>
  ) : (
    <ArrowLeft className="text-white" onClick={() => router.back()} />
  );
};

export default BackButton;
