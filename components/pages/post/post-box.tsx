"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";
import { motion } from "framer-motion";
interface PostBoxProps extends HTMLAttributes<HTMLButtonElement> {
  text: string;
  font?: string;
}

const Btn = motion(Button);

function PostBox({ text, font, className, onClick, ...props }: PostBoxProps) {
  return (
    <Btn
      variant="link"
      size="sm"
      onClick={onClick}
      className={cn(font && font, className)}
    >
      {text}
    </Btn>
  );
}

export default PostBox;
