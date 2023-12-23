import { create } from "zustand";

export interface LetterInfo {
  catName: string
  receiverNickname: string
  senderNickname: string
  content: string
  letterId?: string;
}

interface UserStore {
  letterInfo: LetterInfo;
  setLetterInfo: (letter: LetterInfo) => void;
  removeLetterInfo: (id: string) => void;
}


export const letterStore = create<UserStore>((set) => ({
  letterInfo: {
    letterId: "",
    catName: "",
    content: "",
    senderNickname: "",
    receiverNickname: ""
  },
  setLetterInfo: (letterInfo: LetterInfo) => {
    set((state) => ({
      letterInfo: { ...letterInfo },
    }));
  },
  removeLetterInfo: () => {
    set({ letterInfo: { catName: "", content: "", senderNickname: "", receiverNickname: "", letterId: "" } });
  },
}));