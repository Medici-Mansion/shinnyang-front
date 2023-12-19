import { PropsWithChildren } from "react";
import { LetterFormValues } from "./app/(root)/(home)/letter/page";

export interface Cat {
  code: LetterFormValues["catType"];
  id: string;
  image: string;
  name: string;
}

export interface WithParam<T extends string> extends PropsWithChildren {
  params: {
    [key in T]: string;
  };
}
