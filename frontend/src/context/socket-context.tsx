import { useState, createContext, useEffect } from "react";
import io, { Socket } from "socket.io-client";

import { useAuthContext } from "./auth-context";

interface SocketContextProps {
  socket: Socket | null;
  onlineUsers: string[];
}

export const SocketContext = createContext<SocketContextProps | undefined>(
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
      const socketInstance = io("http://localhost:5000");

      setSocket(socketInstance);

      return () => {
        socketInstance.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, []);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
