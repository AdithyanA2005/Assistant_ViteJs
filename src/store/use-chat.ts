import { create } from "zustand";
import { ChatStatus } from "@/lib/enums.ts";
import { IChat } from "@/lib/types.ts";

interface ChatStore {
  chats: IChat[];
  addChat: (chat: IChat) => void;
  status: ChatStatus;
  setStatus: (status: ChatStatus) => void;
}

export const useChat = create<ChatStore>((set) => ({
  chats: [],
  addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),
  status: ChatStatus.Idle,
}));
