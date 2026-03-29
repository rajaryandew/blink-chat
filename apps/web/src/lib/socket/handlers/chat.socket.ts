"use client"
import { CreateChatInput } from "@repo/schema/chat";
import { socket } from "../socket";
import { CreateMessageInput, Message } from "@repo/schema/message";

export function createChat(chatInput:CreateChatInput){
    socket.emit("chat:create",chatInput)
}

export function createMessage(input:CreateMessageInput){
    socket.emit("message:create",input)
}

export function updateMessage(message:Message,newText:string){
    socket.emit("message:edit",message,newText)
}

export function deleteMessage(input:Message){
    socket.emit("message:delete",input)
}