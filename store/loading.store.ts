import { create } from "zustand";
interface LoadingState {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
}
export const loadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setIsLoading: async (state) => {
    if (!state) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      });
    }
    return set({ isLoading: state });
  },
}));
