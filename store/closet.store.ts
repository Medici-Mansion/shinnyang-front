import { create } from "zustand";
interface closetModalStore {
  open: boolean;
  setOpen: (state: boolean) => void;
}

export const closetModalStore = create<closetModalStore>((set) => ({
  open: false,
  setOpen: (state) => set({ open: state }),
}));
