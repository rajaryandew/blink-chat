"use client";

import { toast } from "sonner";
import { getChats } from "../server-actions/chat.actions";

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
