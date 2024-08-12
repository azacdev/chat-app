import { useEffect } from "react";

import { useSocketContext } from "@/context/socket-context";
import useConversation from "@/store/use-conversation";

const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, messages]);
};

export default useListenMessage;
