import { useEffect } from "react";
import { MessageCircle } from "lucide-react";

import useConversation from "@/store/use-conversation";
import { useAuthContext } from "@/context/auth-context";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";

interface ChatProps {
  isMobile: boolean;
}

export function Chat({ isMobile }: ChatProps) {
  const { authUser } = useAuthContext();
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, []);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {!selectedConversation ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center sm:text-lg md:text-xl font-semibold flex flex-col items-center gap-5">
            <p className="text-2xl">Welcome 👋 {authUser?.username}</p>
            <MessageCircle className="h-10 w-10" />
          </div>
        </div>
      ) : (
        <>
          <ChatTopbar />
          <ChatList isMobile={isMobile} />
        </>
      )}
    </div>
  );
}
