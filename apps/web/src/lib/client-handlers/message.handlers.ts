"use client";
import { CreateMessageInput } from "@repo/schema/message";
import { createMessage } from "../socket/handlers/chat.socket";
import { socket } from "../socket/socket";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { Chat } from "@repo/schema/chat";

export function handleCreateMessage(input: CreateMessageInput) {
    createMessage(input);
}

export function handleMessageEvents(
    setChatList: Dispatch<SetStateAction<Chat[] | null>>,
) {
    socket.on("message:created", (response) => {
        if (response.success === false) {
            toast.error("SOMETHING WENT WRONG!!!!!");
            return;
        }

        return setChatList((v) => {
            if (!v) return v;
            const chats = v.map((chat) => {
                if (chat.id === response.data.chatId) {
                    chat.messages.push(response.data);
                }
                return chat;
            });
            return chats;
        });
    });

    socket.on("message:deleted", (response) => {
        if (response.success === false) {
            toast.error("Can't unsend message!");
            return;
        }

        setChatList((v) => {
            if (!v) return v;
            const chats = v.map((c) => {
                if (c.id === response.message.chatId) {
                    const isReplyTo = c.messages.find(
                        (v) => v.replyTo === response.message.id,
                    );
                    isReplyTo && (isReplyTo.replyTo = null);

                    const filteredMessages = c.messages.filter(
                        (v) => v.id !== response.message.id,
                    );
                    c.messages = filteredMessages;
                }
                return c;
            });
            return chats;
        });
    });
}
