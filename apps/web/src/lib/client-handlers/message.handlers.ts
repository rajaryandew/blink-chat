import { CreateMessageInput } from "@repo/schema/message";
import { createMessage } from "../socket/handlers/chat.socket";
import { socket } from "../socket/socket";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import { Chat } from "@repo/schema/chat";

export function handleCreateMessage(input: CreateMessageInput) {
    createMessage(input);
}

export function handleMessageCreated(
    setChatList: Dispatch<SetStateAction<Chat[] | null>>,
) {
    socket.on("message:created", (response) => {
        if (response.success === false) {
            toast.error("SOMETHING WENT WRONG!!!!!");
            return;
        }

        return setChatList((v) => {
            if(!v) return v
            const chats = v.map((chat) => {
                if(chat.id === response.data.chatId){
                    chat.messages.push(response.data)
                }
                return chat
            })
            return chats
        });
    });
}
