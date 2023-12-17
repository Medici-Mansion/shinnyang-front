"use client";
import { cn } from "@/lib/utils";
import React, { HTMLAttributes, forwardRef } from "react";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

type TextAreaProps = HTMLAttributes<HTMLTextAreaElement> &
  TextareaAutosizeProps;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    return (
      <TextareaAutosize
        {...props}
        className={cn(
          "z-10 p-3 px-5 placeholder:text-muted-foreground rounded-md border-none outline-none",
          props.className
        )}
        ref={ref}
      ></TextareaAutosize>
    );
  }
);
TextArea.displayName = "TextArea";
export default TextArea;
