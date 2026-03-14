"use client";
import { SOCKET_SERVER_URL } from "@/lib/config";
import { createContext, Dispatch, SetStateAction, useMemo, useState } from "react";
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
