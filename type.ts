import { PropsWithChildren } from "react";
// import { LetterFormValues } from "./app/(root)/(home)/[userId]/letter/page";
import { LetterFormValues } from "./form-state";

export interface Cat {
  code: LetterFormValues["catName"];
  id: string;
  image: string;
  name: string;
}

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
  id: string;
  email: string;
  nickname: string;
}

export interface SessionController {
  session: Session | null;
  _getSession: () => void | Promise<Session | void>;
  lastSync: number;
}

export interface Letters {
  senderNickname?: string
  receiverNickname: string
  content: string
  catName: string
}