import React, { useRef } from "react";
import { AnimatePresence } from "framer-motion";

import useMessages from "@/hooks/use-messages";
import Messages from "./messages";
import ChatBottombar from "./chat-bottombar";
import MessageSkeleton from "@/components/skeletons/message-skeleton";

interface ChatListProps {
  isMobile: boolean;
}

export function ChatList({ isMobile }: ChatListProps) {
  const { loading, messages } = useMessages();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        {loading && <MessageSkeleton />}
        {!loading && messages.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl font-semibold text-center">
              Send a message to start a conversation
            </p>
          </div>
        )}
        {!loading && messages.length > 0 && (
          <AnimatePresence>
            {messages?.map((message: any, index: number) => (
              <div ref={lastMessageRef} key={index}>
                <Messages
                  message={message}
                  duration={messages.indexOf(message) * 0.05 + 0.2}
                />
              </div>
            ))}
          </AnimatePresence>
        )}
      </div>
      <ChatBottombar isMobile={isMobile} />
    </div>
  );
}
