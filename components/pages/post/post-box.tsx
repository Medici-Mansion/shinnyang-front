"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
type ButtonProps = HTMLAttributes<HTMLElement> & HTMLMotionProps<"button">;
interface PostBoxProps extends ButtonProps {
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
      {...props}
    >
      {text}
    </Btn>
  );
}

export default PostBox;
