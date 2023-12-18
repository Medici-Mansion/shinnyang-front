import { PropsWithChildren } from "react";

export interface Cat {
  code: string;
  id: string;
  image: string;
  name: string;
}

export interface WithParam<T extends string> extends PropsWithChildren {
  params: {
    [key in T]: string;
  };
}
