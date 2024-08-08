import { create } from "zustand";

interface Conversation {
  _id: string;
  name: string;
  username: string;
  profilePic: string;
  gender: string;
}

interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface ConversationState {
  selectedConversation: Conversation | undefined;
  messages: Message[];
  // messages: any;
  setSelectedConversation: (selectedConversation: Conversation) => void;
  setMessages: (messages: any) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: {
    _id: "",
    name: "",
    username: "",
    profilePic: "",
    gender: "",
  },
  setSelectedConversation: (selectedConversation: any) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages: any) => set({ messages }),
}));

export default useConversation;
