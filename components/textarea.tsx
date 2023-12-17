"use client";
import React, { HTMLAttributes } from "react";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

type TextAreaProps = HTMLAttributes<HTMLTextAreaElement> &
  TextareaAutosizeProps;

const TextArea = (props: TextAreaProps) => {
  return (
    <TextareaAutosize
      className="z-10 border-none outline-none"
      {...props}
    ></TextareaAutosize>
  );
};

export default TextArea;
