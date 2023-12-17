import { cn } from "@/lib/utils";
import React, { HTMLAttributes, PropsWithChildren } from "react";

interface BaseLayoutProps {
  as: keyof HTMLElementTagNameMap | "section";
}
type P = BaseLayoutProps &
  HTMLAttributes<HTMLElementTagNameMap[BaseLayoutProps["as"]]>;

const BaseLayout = ({ children, as, ...rest }: PropsWithChildren<P>) => {
  const Tag = as ?? "section";
  return (
    <Tag {...rest} className={cn("flex flex-col space-y-4 h-full p-6")}>
      {children}
    </Tag>
  );
};

export default BaseLayout;
