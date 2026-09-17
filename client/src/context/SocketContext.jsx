import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [connected, setConnected] = useState(false);

  const socket = useMemo(() => {
    return io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
      autoConnect: false,
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      socket.connect();
    } else {
      socket.disconnect();
    }

    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [isAuthenticated, socket]);

  return (
    <SocketContext.Provider
      value={{ socket, connected }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);