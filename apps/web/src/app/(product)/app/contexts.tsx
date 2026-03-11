"use client";
import { SOCKET_SERVER_URL } from "@/lib/config";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { io, Socket } from "socket.io-client";

// messageTabContext
type MessageTabContextType = {
    isMessageTabOpen: boolean;
    setIsMessageTabOpen: Dispatch<SetStateAction<boolean>>;
};
export const MessageTabContext = createContext<MessageTabContextType | null>(
    null,
);
export function MessageTabProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMessageTabOpen, setIsMessageTabOpen] = useState(true);

    return (
        <MessageTabContext.Provider
            value={{ isMessageTabOpen, setIsMessageTabOpen }}
        >
            {children}
        </MessageTabContext.Provider>
    );
}

// socket
type SocketContextType = Socket | null;
export const SocketContext = createContext<SocketContextType>(null);
export function SocketProvider({ children }: { children: React.ReactNode }) {
    const socket = io(SOCKET_SERVER_URL);
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
