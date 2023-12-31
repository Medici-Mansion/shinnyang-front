import HashContextProvider from "@/hooks/use-hash-router";
import React, { PropsWithChildren } from "react";

const LetterTemplate = ({ children }: PropsWithChildren) => {
  return <HashContextProvider>{children}</HashContextProvider>;
};

export default LetterTemplate;
