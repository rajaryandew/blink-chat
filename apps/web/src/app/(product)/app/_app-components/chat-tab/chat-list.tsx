"use client"
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatItem } from "./chat-item";
import { ChatListContext } from "../../contexts";
import { useContext, useEffect, useEffectEvent } from "react";
import { authClient } from "@/lib/auth/auth-client";


export function ChatList() {

    const {data:session,isPending} = authClient.useSession()

    const {chatList,setChatList} = useContext(ChatListContext)!

    if(isPending){
        return <div>...loading</div>
    }

    const list = chatList.map(chat => <ChatItem metadata={chat} userId={session!.user.id} key={chat.id}/>)

    return (
        <ScrollArea>
            <main className="flex flex-col gap-3">{list}</main>
        </ScrollArea>
    );
}
