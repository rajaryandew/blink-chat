"use client";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { ChatListContext, MessageTabContext } from "../../contexts";
import ChatHeader from "../../_app-components/chat/chat-header";
import { getPersonName } from "@/lib/utils";
import  Message  from "../../_app-components/chat/message";
import  SendMessageForm  from "../../_app-components/chat/send-message";
import { authClient } from "@/lib/auth/auth-client";

export default function Chat() {
    const { chatId } = useParams();

    const { chatList, isLoading} = useContext(ChatListContext)!;
    const { setIsMessageTabOpen,isMessageTabOpen } = useContext(MessageTabContext)!;
    const chat = chatList?.find((c) => c.id === chatId);

    const {data:session} = authClient.useSession()

    useEffect(() => {
        setIsMessageTabOpen(false);
    }, []);

    if (isLoading) {
        return <div>loading....</div>;
    }

    if (!chat) {
        return <div>Chat doesnt exists!</div>;
    }
    const name = getPersonName(chat!,session?.user.id!) || "";

    const messages = chat.messages.map((message) => <Message text={message.text} key={`${message.chatId}:${message.id}`}/>)

    return (
        <main className="w-full h-full grid grid-rows-[auto_1fr_auto]">
            <ChatHeader name={name} />
            <div className="">{messages}</div>
            <SendMessageForm chat={chat} />
        </main>
    );
}
