"use client";

import { toast } from "sonner";
import { getChats } from "../server-actions/chat.actions";
import { createChat } from "../socket/handlers/chat.socket";
import { Chat, CreateChatInput } from "@repo/schema/chat";
import { connectToRooms, socket } from "../socket/socket";
import { Dispatch, SetStateAction } from "react";

export async function handleGetChats() {
    const response = await getChats();
    if (response.ok === false) {
        switch (response.error.message) {
            case "SESSION_INVALID":
                toast.error("Session Invalid!! Try signing in again.");
                break;
            case "UNEXPECTED_ERROR":
            default:
                toast.error("Unexpected Error. Try again later!");
                break;
        }
        return [];
    }
    return response.chats;
}

export async function handleCreateChat(chatInput: CreateChatInput) {
    createChat(chatInput);
}

export async function handleChatCreated(
    setChatList: Dispatch<SetStateAction<Chat[] | null>>,
    chatList: Chat[] | null,
) {
    socket.on("chat:created", (response) => {
        if (response.success === false) {
            switch (response.data.message) {
                case "CHAT_ALREADY_EXISTS":
                    toast.warning("Chat with this person exists!");
                    break;
                case "MISSING_FIELDS":
                    toast.error("Try creating the chat once again!!");
                    break;
                case "PERSON_NOT_FOUND":
                case "USERNAME_INCORRECT":
                    toast.error(
                        "oops! Looks like the username is incorrect. Please recheck it",
                    );
                    break;
                case "CONNECTION_FAILED":
                    toast.error(
                        "Server failed to connect! Try again after sometime.",
                    );
                    break;
                case "UNKNOWN_ERROR":
                default:
                    toast.error(
                        "oops! Something went wrong, try again after sometime",
                    );
                    break;
            }
            return;
        }

        return setChatList((v) => {
            const data = [response.data, ...(v ?? [])];

            connectToRooms(data)

            return data
        });
    });
}
