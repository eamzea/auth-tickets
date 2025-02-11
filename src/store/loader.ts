import { create } from "zustand";

interface LoaderState {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const store = create<LoaderState>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
}));
