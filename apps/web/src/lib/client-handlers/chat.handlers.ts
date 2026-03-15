"use client"
import { CreateChatInput } from "@repo/schema/chat";
import { socket } from "../socket/socket";

export async function handleCreateChat(input:CreateChatInput){
    console.log("Hello")
    console.log(socket.emit("chat:create",input))
}