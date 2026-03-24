"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatItem } from "./chat-item";
import { ChatListContext } from "../../contexts";
import { useContext, useEffect, useEffectEvent } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { handleChatCreated } from "@/lib/client-handlers/chat.handlers";
import { socket } from "@/lib/socket/socket";

export function ChatList() {
    const { data: session, isPending } = authClient.useSession();

    const { chatList, setChatList } = useContext(ChatListContext)!;

    useEffect(() => {
        handleChatCreated(setChatList,chatList);

        return () => {
            socket.off("chat:created");
        };
    });

    if (chatList === null) {
        return <div>...loading</div>;
    }

    if (isPending) {
        return <div>...loading</div>;
    }

    const list = chatList.map((chat) => (
        <ChatItem metadata={chat} userId={session!.user.id} key={chat.id} />
    ));

    return (
        <ScrollArea>
            <main className="flex flex-col gap-3">{list}</main>
        </ScrollArea>
    );
}
