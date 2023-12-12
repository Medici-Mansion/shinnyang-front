import { PropsWithChildren } from "react";

export interface WithParam<T extends string> extends PropsWithChildren {
  params: {
    [key in T]: string;
  };
}
