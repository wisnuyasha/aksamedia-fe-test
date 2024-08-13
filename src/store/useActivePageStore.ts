import { create } from "zustand";

interface activePageState {
  activePage: string;
  handleActivePage: (page: string) => void;
}

export const useActivePageStore = create<activePageState>()((set) => ({
  activePage: "todos",
  handleActivePage: (page) => {
    set({ activePage: page });
  },
}));
