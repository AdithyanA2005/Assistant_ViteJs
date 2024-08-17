import { create } from "zustand";
import { IChat, IChatStatus } from "@/lib/types.ts";

interface ChatStore {
  chats: IChat[];
  addUserChat: (chat: string, status?: IChatStatus) => void;
  addBotChat: (chat: string, status?: IChatStatus) => void;
  isThinking: boolean;
  setIsThinking: (isThinking: boolean) => void;
}

export const useChat = create<ChatStore>((set) => ({
  chats: [],
  isThinking: false,
  setIsThinking: (isThinking) => set({ isThinking }),
  addUserChat: (chat, status = "success") => {
    const newChat: IChat = { text: chat, owner: "user", status };
    set((state) => ({ chats: [...state.chats, newChat] }));
  },
  addBotChat: (chat, status = "success") => {
    const newChat: IChat = { text: chat, owner: "bot", status };
    set((state) => ({ chats: [...state.chats, newChat] }));
  },
}));
