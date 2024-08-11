import { useEffect, useState } from "react";

import useConversation from "@/store/use-conversation";
import { toast } from "sonner";

const GetMessages = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/messages/${selectedConversation?._id}`);

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        console.log(data);
        setMessages(data);
      } catch (error: any) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default GetMessages;
