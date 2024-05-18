import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8000';

interface SocketContextProps {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextProps>({ socket: null });

export const useSocket = () => {
  return useContext(SocketContext);
};

 export const SocketProvider = ({ children}:{children: React.ReactNode}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL);
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log(`Socket connected: ${socketInstance.connected}`);
    });
    socketInstance.on('disconnect', () => {
      console.log(`Socket disconnected : ${socketInstance.connected}`);
    });
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
