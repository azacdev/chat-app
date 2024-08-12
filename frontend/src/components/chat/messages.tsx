import { motion } from "framer-motion";
import { format } from "date-fns";

import { cn, formatDate } from "@/lib/utils";
import useConversation from "@/store/use-conversation";
import { useAuthContext } from "@/context/auth-context";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useListenMessage from "@/hooks/get-listen-message";

interface MessagesProp {
  message: any;
  duration: number;
}

const Messages = ({ message, duration }: MessagesProp) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  useListenMessage();

  const currentUser = authUser?._id === message.senderId;
  const profilePic = currentUser
    ? authUser?.profilePic
    : selectedConversation?.profilePic;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
      transition={{
        opacity: { duration: 0.1 },
        layout: {
          type: "spring",
          bounce: 0.3,
          duration: duration,
        },
      }}
      style={{
        originX: 0.5,
        originY: 0.5,
      }}
      className={cn(
        "flex flex-col gap-2 p-4 whitespace-pre-wrap",
        currentUser ? "items-end" : "items-start"
      )}
    >
      <div className="flex gap-3 items-center">
        {message.senderId !== authUser?._id && (
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={profilePic}
              alt={message.name}
              width={6}
              height={6}
            />
          </Avatar>
        )}
        <p className="flex flex-col bg-accent p-3 rounded-md max-w-xs">
          {message.message}
          <span className="text-xs">{formatDate(message.createdAt)}</span>
        </p>
        {message.senderId === authUser?._id && (
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={profilePic}
              alt={message.name}
              width={6}
              height={6}
            />
          </Avatar>
        )}
      </div>
    </motion.div>
  );
};

export default Messages;
