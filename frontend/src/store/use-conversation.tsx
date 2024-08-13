import { create } from "zustand";

export interface Conversation {
  _id: string;
  name: string;
  username: string;
  profilePic: string;
  gender: string;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface ConversationState {
  selectedConversation: Conversation | null;
  messages: Message[];
  setSelectedConversation: (selectedConversation: Conversation | null) => void;
  setMessages: (messages: any) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: any) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages: any) => set({ messages }),
}));

export default useConversation;
