import { cn } from "@/lib/utils";
import React, { HTMLAttributes, forwardRef, useEffect, useRef } from "react";

interface DisableEnterTextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  onChangeValue?: (value: string) => void;
}

const DisableEnterTextArea = forwardRef<
  HTMLTextAreaElement,
  DisableEnterTextAreaProps
>(({ onChangeValue, ...props }, ref) => {
  const lastEdit = useRef("");

  const handleEnterKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("keypress", handleEnterKeyPress);

    return () => {
      window.removeEventListener("keypress", handleEnterKeyPress);
    };
  }, []);
  return (
    <textarea
      ref={ref}
      {...props}
      className={cn(
        "w-full rounded-none bg-transparent p-0",
        "z-10 h-full resize-none rounded-md border-none outline-none placeholder:text-muted-foreground",
        props.className,
      )}
      onChange={(event) => {
        const lineHeight = parseInt(
          window.getComputedStyle(event.target).lineHeight.replace("px", "") ??
            24,
        );
        const lineLength = event.target.value.match(/\n/g)?.length || 0;

        if (
          lastEdit.current.length > event.target.value.length ||
          (event.target.clientHeight === event.target.scrollHeight &&
            event.target.clientHeight > (lineLength + 1) * lineHeight)
        ) {
          props.onChange?.(event);
          onChangeValue?.(event.target.value);
        }
      }}
      placeholder="내용을 적어주세요!"
    />
  );
});

DisableEnterTextArea.displayName = "DisableEnterTextArea";
export default DisableEnterTextArea;
