import React from "react";
import { MessageCircle } from "lucide-react";

import { Message, UserData } from "@/config/data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? []
  );

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {messagesState.length < 1 ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-5">
            <p className="text-2xl">Welcome 👋 User</p>
            <MessageCircle className="h-10 w-10" />
          </div>
        </div>
      ) : (
        <>
          <ChatTopbar selectedUser={selectedUser} />

          <ChatList
            messages={messagesState}
            selectedUser={selectedUser}
            sendMessage={sendMessage}
            isMobile={isMobile}
          />
        </>
      )}
    </div>
  );
}
