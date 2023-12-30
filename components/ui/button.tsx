import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // 231230 RAYMOND: 모바일 hover이펙트가 무작위로 활성화 되는 이슈로 인해 호버를 제거한 스타일 적용
        primary: "bg-red text-white font-bold text-md",
        secondary: "bg-sub text-red font-bold text-md",
        disable: "bg-gray-300 text-gray-500 font-bold text-md",
        kakao: "bg-kakao text-black font-bold text-md",
        link: "bg-gray-400 text-black font-bold",
        // 원본스타일
        // primary: "bg-red text-white font-bold hover:bg-primary/90 text-md",
        // secondary: "bg-sub text-red font-bold hover:bg-secondary/80 text-md",
        // disable: "bg-gray-300 text-gray-500 font-bold text-md",
        // kakao: "bg-kakao text-black font-bold hover:bg-primary/90 text-md",
        // link: "bg-gray-400 text-black font-bold hover:bg-primary/90",
      },
      size: {
        default: "w-full h-11 max-h-[54px] rounded-md",
        sm: "w-full h-11 max-h-[54px] rounded-md px-3",
        lg: "w-full h-11 max-h-[54px] rounded-md px-8",
        icon: "w-full h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
