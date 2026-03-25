"use client";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { ChatListContext, MessageTabContext } from "../../contexts";
import { authClient } from "@/lib/auth/auth-client";
import Message from "../../_app-components/chat/message";
import ChatHeader from "../../_app-components/chat/chat-header";
import SendMessageForm from "../../_app-components/chat/send-message";
import { getPersonName } from "@/lib/utils";
import MessageArea from "../../_app-components/chat/message-area";
import { useIsMobile } from "@/hooks/use-mobile";
import ChatLoading from "../../_app-components/chat/loading/chat-loading";
import { useForm } from "react-hook-form";
import { CreateMessageInput, createMessageSchema } from "@repo/schema/message";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ChatPage() {
    const { chatId } = useParams();

    const { chatList, isLoading } = useContext(ChatListContext)!;
    const { setIsMessageTabOpen } = useContext(MessageTabContext)!;
    const chat = chatList?.find((c) => c.id === chatId);
    const isMobile = useIsMobile();
    const { data: session } = authClient.useSession();

    const form = useForm<CreateMessageInput>({
        resolver: zodResolver(createMessageSchema),
    });

    useEffect(() => {
        setIsMessageTabOpen(false);
    }, [isMobile]);

    if (isLoading) {
        return <ChatLoading />;
    }

    if (!chat) {
        return <div>Chat doesn&apos;t exists!</div>;
    }
    const name = getPersonName(chat, session?.user.id!) || "";

    const messages = chat.messages.map((message) => {
        const alignment =
            message.chatParticipantId ===
            chat.chatParticipants.find((p) => p.userId === session?.user.id)!.id
                ? "right"
                : "left";
        return (
            <Message
                alignment={alignment}
                text={message.text}
                key={`${message.chatId}:${message.id}`}
                setReplyAction={form.setValue}
                messageId={message.id}
            />
        );
    });

    return (
        <main className="w-full h-dvh flex flex-col">
            <ChatHeader name={name} />
            <MessageArea messages={messages} />
            <SendMessageForm chat={chat} sendMessageForm={form} />
        </main>
    );
}
