import { PropsWithChildren } from "react";

export interface WithParam<T extends string> extends PropsWithChildren {
  params: {
    [key in T]: string;
  };
}

export interface GetUserResponse {
  token: Token;
  user: User;
}

export interface Token {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
}

export interface Me {
  id: string
  email: string
  nickname: string
}
