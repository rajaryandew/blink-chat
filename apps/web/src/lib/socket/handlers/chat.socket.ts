"use client"
import { CreateChatInput } from "@repo/schema/chat";
import { socket } from "../socket";
import { handleChatCreated } from "@/lib/client-handlers/chat.handlers";

export function createChat(chatInput:CreateChatInput){
    socket.emit("chat:create",chatInput)    
}