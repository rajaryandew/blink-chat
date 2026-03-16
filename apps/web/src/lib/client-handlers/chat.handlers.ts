"use client";
import { CreateChatInput } from "@repo/schema/chat";
import { socket } from "../socket/socket";
import { getProfile } from "@repo/database/profile";

export async function handleCreateChat(input:CreateChatInput){
    console.log("Hello")
    socket.emit("chat:create",input)
}