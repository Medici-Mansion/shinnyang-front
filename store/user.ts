import { create } from 'zustand'

export interface UserInfo {
  isLogin: boolean;
  access: string
  refresh: string
  id: number;
  email: string;
  nickname: string | null;
}

interface UserStore {
  userInfo: UserInfo;
  setUser: (user: UserInfo) => void;
  removeUser: (id: number) => void;
}

export const userStore = create<UserStore>((set) => ({
  userInfo: {
    isLogin: false,
    email: '',
    nickname: null,
    id: 0,
    access: '',
    refresh: ''
  },
  setUser: (userInfo: UserInfo) => {
    set((state) => ({
      userInfo: { ...state.userInfo, ...userInfo }
    }));
  },
  removeUser: () => {
    set({ userInfo: { isLogin: false, email: '', nickname: null, id: 0, access: '', refresh: '' } });
  },
}));

