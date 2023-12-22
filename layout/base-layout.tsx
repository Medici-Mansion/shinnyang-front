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
    <Tag
      {...rest}
      className={cn(
        "flex h-full flex-col p-6",
        rest.className?.replaceAll('"', ""),
      )}
    >
      {children}
    </Tag>
  );
};

export default BaseLayout;
