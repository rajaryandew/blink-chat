import { Server, Socket } from "socket.io";
import {Chat, CreateChatInput} from "@repo/schema/chat"
import {createChatRecord} from "@repo/database/chat"

export async function registerChatHandlers(socket:Socket,io:Server){
    socket.on("chat:create", async (chatInput:CreateChatInput) => {
        try {
            const chat:Chat = await createChatRecord(chatInput)
            socket.emit("chat:created",chat)
        } catch (error) {
            throw error
        }
    })
}