"use client";
import { CreateChatInput } from "@repo/schema/chat";
import { createChat } from "../socket/handlers/chat.socket";

export function handleCreateChat(input:CreateChatInput){
    try{
        console.log("hello")
        createChat(input)
    }catch(err){
        throw err
    }
}