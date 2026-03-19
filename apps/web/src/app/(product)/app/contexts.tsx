"use client";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from "react";
import { Chat } from "@repo/schema/chat";
import { ChatParticipant } from "@repo/schema/chat-participant";
import { handleGetChats } from "@/lib/client-handlers/chat.handlers";
import {Message} from "@repo/schema/message"

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

// chatListContext
export type ChatType = (Chat & {
    chatParticipants: ChatParticipant[];
    messages: Message[]
});
type ChatListContextType = {
    chatList: ChatType[];
    setChatList: Dispatch<SetStateAction<ChatType[]>>;
};
export const ChatListContext = createContext<ChatListContextType | null>(null);
export function ChatListProvider({ children }: { children: React.ReactNode }) {
    const [chatList, setChatList] = useState<ChatType[]>([]);

    useEffect(() => {
        handleGetChats().then((response) => {
            setChatList(response);
        });
    });

    return (
        <ChatListContext.Provider value={{ chatList, setChatList }}>
            {children}
        </ChatListContext.Provider>
    );
}
