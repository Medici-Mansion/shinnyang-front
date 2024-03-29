import { PropsWithChildren } from "react";
import { LETTER_TYPE, LetterFormValues } from "./form-state";

export interface Acc {
  id: string;
  name: string;
  code: string;
  fullImage: string;
  iconImage: string;
}

export interface Cat {
  code: LetterFormValues["catName"];
  id: string;
  image: string;
  name: string;
  faceImage: string;
  backImage: string;
  yearImage: string;
  stampImage: string;
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
  senderId?: string;
  senderNickname?: string;
  receiverNickname: string;
  content: string;
  catName: string;
}

export interface CompletedLetter {
  id: string;
  receiverNickname: string;
  content: string;
  senderId: string;
  senderNickname: string;
  catName: Cat["code"];
  createdAt: string;
  updatedAt: string;
  letterType: LETTER_TYPE;
}

export interface LetterResponse {
  data: CompletedLetter;
  ok: boolean;
}

export interface Mail {
  id: string;
  createdAt: string;
  updatedAt: string;
  senderId: string;
  senderNickname: string;
  receiverNickname: string;
  content: string;
  catName: Cat["code"];
  isRead: boolean;
  isRespond: boolean;
  mailId: string;
}

export interface UserCatResponse {
  catCode: string;
  catId: string;
  catName: string;
  accessoryCode?: string;
  accessoryId?: string;
  accessoryName?: string;
}

export interface PostCatAccessoryDTO {
  catId: string;
  accessoryId?: string;
}

export interface LetterCount {
  letterCount: number;
}
