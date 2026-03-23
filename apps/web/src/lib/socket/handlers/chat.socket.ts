"use client"
import { CreateChatInput } from "@repo/schema/chat";
import { socket } from "../socket";
import { CreateMessageInput } from "@repo/schema/message";

export function createChat(chatInput:CreateChatInput){
    socket.emit("chat:create",chatInput)
}

export function createMessage(input:CreateMessageInput){
    socket.emit("message:create",input)
}