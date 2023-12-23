"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
type ButtonProps = HTMLAttributes<HTMLElement> & HTMLMotionProps<"button">;
interface PostBoxProps extends ButtonProps {
  font?: string;
}

const Btn = motion(Button);
function PostBox({ font, className, onClick, ...props }: PostBoxProps) {
  return (
    <Btn
      variant="link"
      size="sm"
      onClick={onClick}
      className={cn(
        "aspect-[2/5] h-8  rounded-sm border-4 border-black bg-wood",
        font && font,
        className,
      )}
      {...props}
    >
      {props.children}
    </Btn>
  );
}

export default PostBox;
