import useConversation from "@/store/use-conversation";

const useSendMessage = () => {
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message: string) => {
    console.log(message);

    try {
      const res = await fetch(
        `/api/messages/send/${selectedConversation?._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      console.log(data);
      setMessages([...messages, data]);
    } catch (error: any) {
      console.log(error);
    }
  };

  return { sendMessage };
};

export default useSendMessage;
