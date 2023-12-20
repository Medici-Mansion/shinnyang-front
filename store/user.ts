import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserInfo {
  isLogin: boolean;
  email: string;
  id: string;
  nickname: string | null;
}

export interface UserToken {
  access: string;
  refresh: string;
}

interface UserStore {
  userInfo: UserInfo;
  setUser: (user: UserInfo) => void;
  removeUser: (id: number) => void;
}

interface TokenStore {
  userToken: UserToken;
  setToken: (user: UserToken) => void;
  removeToken: () => void;
}

export const userStore = create<UserStore>((set) => ({
  userInfo: {
    isLogin: false,
    email: "",
    id: "",
    nickname: "",
  },
  setUser: (userInfo: UserInfo) => {
    set((state) => ({
      userInfo: { ...userInfo },
    }));
  },
  removeUser: () => {
    set({ userInfo: { isLogin: false, email: "", id: "", nickname: "" } });
  },
}));

export const tokenStore = create(
  persist<TokenStore>(
    (set, get) => ({
      userToken: {
        access: "",
        refresh: "",
      },
      setToken: (userToken: UserToken) => {
        set((state) => ({
          userToken: { ...userToken },
        }));
      },
      removeToken: () => {
        set({ userToken: { access: "", refresh: "" } });
      },
    }),
    {
      name: "shinnyang",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
