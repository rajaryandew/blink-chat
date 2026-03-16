import { CreateChatInput } from "@repo/schema/chat";
import { socket } from "../socket";

export function createChat(chatInput:CreateChatInput){
    socket.emit("chat:create",chatInput)
}

export function registerChatEvents(){
    
}