import { create } from "zustand";

interface Conversation {
  _id: string;
  name: string;
  username: string;
  profilePic: string;
  gender: string;
}

interface Message {
  id: string;
}

interface ConversationState {
  selectedConversation: Conversation | undefined;
  messages: Message[];
  setSelectedConversation: (selectedConversation: Conversation) => void;
  setMessages: (messages: Message[]) => void;
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
