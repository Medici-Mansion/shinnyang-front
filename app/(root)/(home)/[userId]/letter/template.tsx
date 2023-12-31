import DefaultLayout from "@/components/layout";
import Background from "@/components/pages/post/background";
import HashContextProvider from "@/hooks/use-hash-router";
import React, { PropsWithChildren } from "react";

const LetterTemplate = ({ children }: PropsWithChildren) => {
  return (
    <HashContextProvider>
      <DefaultLayout>{children}</DefaultLayout>
      <Background />
    </HashContextProvider>
  );
};

export default LetterTemplate;
