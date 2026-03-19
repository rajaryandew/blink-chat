"use client";
import { SOCKET_SERVER_URL } from "@/lib/config";
import { createContext, Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatType } from "./_app-components/chat-tab/chat-list";

// messageTabContext
type MessageTabContextType = {
    isMessageTabOpen: boolean;
    setIsMessageTabOpen: Dispatch<SetStateAction<boolean>>;
};
export const messageTabContext = createContext<MessageTabContextType | null>(
    null,
);
export function MessageTabProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMessageTabOpen, setIsMessageTabOpen] = useState(true);

    return (
        <messageTabContext.Provider
            value={{ isMessageTabOpen, setIsMessageTabOpen }}
        >
            {children}
        </messageTabContext.Provider>
    );
}

// chatListContext
export const chatListContext = createContext<ChatType[] | null>(null)
export function ChatListProvider({ children }: { children: React.ReactNode }) {
    
    const [chatList,setChatList] = useState(null)

    useEffect(() => {
        
    })

}