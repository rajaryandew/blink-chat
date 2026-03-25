"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatItem } from "./chat-item";
import { ChatListContext, ChatSearchContext } from "../../contexts";
import { useContext, useEffect } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { handleChatCreated } from "@/lib/client-handlers/chat.handlers";
import { socket } from "@/lib/socket/socket";
import { ChatItemLoading } from "./chat-list-loading";
import { getPersonName } from "@/lib/utils";

export function ChatList() {
    const { data: session, isPending } = authClient.useSession();

    const { chatList, setChatList } = useContext(ChatListContext)!;
    const {searchValue} = useContext(ChatSearchContext)!

    useEffect(() => {
        handleChatCreated(setChatList,chatList);

        return () => {
            socket.off("chat:created");
        };
    });

    if (chatList === null || isPending ) {
        return (
            <main>
                <ChatItemLoading />
                <ChatItemLoading />
                <ChatItemLoading />
                <ChatItemLoading />
            </main>
        );
    }

    const list = chatList.map((chat) => {
        const name = getPersonName(chat,session?.user.id!)
        if(name?.toLowerCase().includes(searchValue.toLowerCase()) || searchValue.trim() === ""){
            return (
                <ChatItem
                    metadata={chat}
                    name={name}
                    key={chat.id}
                />
            );
        }
        return null
});

    return (
        <ScrollArea>
            <main className="flex flex-col gap-3">{list}</main>
        </ScrollArea>
    );
}
