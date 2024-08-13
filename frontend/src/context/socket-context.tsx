import { useState, createContext, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";

import { useAuthContext } from "./auth-context";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined
);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { authUser } = useAuthContext();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (authUser) {
      const socketInstance = io("http://localhost:5000", {
        query: { userId: authUser._id },
      });

      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socketInstance.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error(
      "useSocketContext must be used within an AuthContextProvider"
    );
  }
  return context;
};
