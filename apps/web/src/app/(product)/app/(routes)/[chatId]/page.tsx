"use client";
import { useParams } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import {
    ChatListContext,
    MessageEditProvider,
    MessageTabContext,
} from "../../contexts";
import { authClient } from "@/lib/auth/auth-client";
import Message from "../../_app-components/chat/message";
import ChatHeader from "../../_app-components/chat/chat-header";
import SendMessageForm from "../../_app-components/chat/send-message";
import { getPersonName } from "@/lib/utils";
import MessagesArea from "../../_app-components/chat/messages-area";
import { useIsMobile } from "@/hooks/use-mobile";
import ChatLoading from "../../_app-components/chat/loading/chat-loading";
import { useForm } from "react-hook-form";
import { CreateMessageInput, createMessageSchema } from "@repo/schema/message";
import { zodResolver } from "@hookform/resolvers/zod";
import { socket } from "@/lib/socket/socket";
import { getUserAvatar } from "@/lib/server-actions/user.actions";

export default function ChatPage() {
    const { chatId } = useParams();

    const { chatList, isLoading } = useContext(ChatListContext)!;
    const { setIsMessageTabOpen } = useContext(MessageTabContext)!;
    const [isSomeoneTyping, setIsSomeoneTyping] = useState(false);
    const [avatar, setAvatar] = useState<string | undefined>()
    const chat = chatList?.find((c) => c.id === chatId);
    const isMobile = useIsMobile();
    const { data: session } = authClient.useSession();

    const form = useForm<CreateMessageInput>({
        resolver: zodResolver(createMessageSchema),
    });

    const selfParticipantId = form.watch("chatParticipantId");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    if (isSomeoneTyping) {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        timeoutRef.current = setTimeout(() => setIsSomeoneTyping(false), 2000);
    }

    useEffect(() => {

        (async () => {
            const personUserId = chat?.chatParticipants.find(p => p.userId !== session?.user.id)?.userId
            const avatar = await getUserAvatar(personUserId)
            setAvatar(avatar?.image || undefined)
        })()

        setIsMessageTabOpen(false);

        socket.on("message:created", (response) => {
            if (response.success && response.data.chatId === chat?.id) {
                setIsSomeoneTyping(false);
            }
        });

        socket.on("chat:typing", (personTyping) => {
            if (
                !selfParticipantId ||
                selfParticipantId === personTyping.chatParticipantId
            ) {
                return;
            }
            setIsSomeoneTyping(true);
        });

        return () => {
            socket.off("chat:typing");
        };
    }, [isMobile, selfParticipantId]);

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
                setFocusAction={form.setFocus}
                chat={chat}
                metadata={message}
                alignment={alignment}
                key={`${message.chatId}:${message.id}`}
                setReplyAction={form.setValue}
            />
        );
    });

    return (
        <main className="w-full h-dvh flex flex-col">
            <ChatHeader
                avatar={avatar}
                action={() => {
                    socket.emit("chat:delete", chat.id);
                }}
                name={name}
            />
            <MessageEditProvider>
                <MessagesArea
                    isSomeoneTyping={isSomeoneTyping}
                    messages={messages}
                />
                <SendMessageForm chat={chat} sendMessageForm={form} />
            </MessageEditProvider>
        </main>
    );
}
