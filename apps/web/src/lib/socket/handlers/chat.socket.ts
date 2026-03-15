import { CreateChatInput } from "@repo/schema/chat";
import { socket } from "../socket";

export async function createChat(chatInput:CreateChatInput){
    socket.emit("chat:create",chatInput)
}