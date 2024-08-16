import { create } from "zustand";
import { EChatStatus } from "@/lib/enums.ts";
import { IChat } from "@/lib/types.ts";

interface ChatStore {
  chats: IChat[];
  addChat: (chat: IChat) => void;
  status: EChatStatus;
  setStatus: (status: EChatStatus) => void;
}

export const useChat = create<ChatStore>((set) => ({
  chats: [],
  addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),
  setStatus: (status) => set({ status }),
  status: EChatStatus.Idle,
}));
