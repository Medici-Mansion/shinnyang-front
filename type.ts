import { PropsWithChildren } from "react";

export interface WithParam<T extends string> extends PropsWithChildren {
  params: {
    [key in T]: string;
  };
}

export interface Session {
  token: Partial<Token> | null;
  user: Partial<User> | null;
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

export interface SessionController {
  session: Session | null;
  _getSession: () => void | Promise<Session | void>;
  lastSync: number;
}
