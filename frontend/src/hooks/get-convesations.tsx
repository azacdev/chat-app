import { useEffect, useState } from "react";

import { toast } from "sonner";

const GetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        setConversations(data);
      } catch (error: any) {
        toast.error(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    console.log(conversations);

    getConversations();
  }, []);

  return { loading, conversations };
};

export default GetConversations;
