import { create } from 'zustand';
import type { UserEntry } from '../data/users';

export type Screen = 'MAIN_MENU' | 'PROJECT_LIST' | 'CONTACTS' | 'ABOUT_ME';

interface UIStore {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  reduceMotion: boolean;
  setReduceMotion: (v: boolean) => void;
  largeFont: boolean;
  setLargeFont: (v: boolean) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  projectResetKey: number;
  triggerProjectReset: () => void;
  loggedInUser: UserEntry | null;
  setLoggedInUser: (user: UserEntry | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  screen: 'MAIN_MENU',
  setScreen: (screen) => set({ screen }),
  reduceMotion: false,
  setReduceMotion: (reduceMotion) => set({ reduceMotion }),
  largeFont: false,
  setLargeFont: (largeFont) => set({ largeFont }),
  highContrast: false,
  setHighContrast: (highContrast) => set({ highContrast }),
  projectResetKey: 0,
  triggerProjectReset: () => set((s) => ({ projectResetKey: s.projectResetKey + 1 })),
  loggedInUser: null,
  setLoggedInUser: (loggedInUser) => set({ loggedInUser }),
}));
