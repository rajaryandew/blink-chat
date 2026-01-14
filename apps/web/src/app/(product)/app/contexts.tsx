"use client";
import { createContext, Dispatch, SetStateAction, useState } from "react";

type MessageTabContextType = {
    isMessageTabOpen: boolean;
    setIsMessageTabOpen: Dispatch<SetStateAction<boolean>>;
};

export const MessageTabContext = createContext<MessageTabContextType | null>(null);

export default function MessageTabProvider({
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
