import create from 'zustand';

interface UserState {
  userName: string | undefined;
  setUserName: (userName: string) => void;
  removeUserName: () => void;
}

export const userStore = create<UserState>((set) => ({
  userName: undefined,
  setUserName: (userName: string) => set(() => ({ userName })),
  removeUserName: () => set({ userName: undefined }),
}));
