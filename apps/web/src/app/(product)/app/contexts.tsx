"use client";
import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import { Chat } from "@repo/schema/chat";
import { handleGetChats } from "@/lib/client-handlers/chat.handlers";
import { handleMessageEvents } from "@/lib/client-handlers/message.handlers";
import { connectToRooms, socket } from "@/lib/socket/socket";
import { Message } from "@repo/schema/message";

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
type ChatListContextType = {
    chatList: Chat[] | null;
    setChatList: Dispatch<SetStateAction<Chat[] | null>>;
    isLoading: boolean;
};
export const ChatListContext = createContext<ChatListContextType | null>(null);
export function ChatListProvider({ children }: { children: React.ReactNode }) {
    const [chatList, setChatList] = useState<Chat[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (chatList) return;
        handleGetChats()
            .then((response) => {
                setChatList(response);
                connectToRooms(response);
            })
            .finally(() => {
                setIsLoading(false);
            });

        handleMessageEvents(setChatList);

        return () => {
            socket.off("chat:created");
        };
    }, []);

    return (
        <ChatListContext.Provider value={{ chatList, setChatList, isLoading }}>
            {children}
        </ChatListContext.Provider>
    );
}




// Chat Search
type ChatSearchContextType = {
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
};

export const ChatSearchContext = createContext<ChatSearchContextType | null>(
    null,
);
export function ChatSearchProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [searchValue, setSearchValue] = useState("");

    return (
        <ChatSearchContext.Provider value={{ searchValue, setSearchValue }}>
            {children}
        </ChatSearchContext.Provider>
    );
}




// Message edit
type MessageEditContextType = {
    messageAction: "send" | "edit";
    setMessageAction: Dispatch<SetStateAction<"send" | "edit">>;
    messageEditing: Message | null;
    setMessageEditing: Dispatch<SetStateAction<Message | null>>;
};
export const MessageEditContext = createContext<MessageEditContextType | null>(
    null,
);
export function MessageEditProvider({ children }: { children: ReactNode }) {
    const [messageAction, setMessageAction] = useState<"send" | "edit">("send");
    const [messageEditing, setMessageEditing] = useState<Message | null>(null);

    return (
        <MessageEditContext.Provider
            value={{
                messageAction,
                messageEditing,
                setMessageAction,
                setMessageEditing,
            }}
        >
            {children}
        </MessageEditContext.Provider>
    );
}
