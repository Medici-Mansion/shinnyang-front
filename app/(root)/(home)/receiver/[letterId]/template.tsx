import DefaultLayout from "@/components/layout";
import HashContextProvider from "@/hooks/use-hash-router";
import React, { PropsWithChildren } from "react";

const LetterTemplate = ({ children }: PropsWithChildren) => {
  return (
    <HashContextProvider>
      <DefaultLayout className="bg-background">{children}</DefaultLayout>
    </HashContextProvider>
  );
};

export default LetterTemplate;
