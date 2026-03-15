import { Chat, CreateChatInput } from "@repo/schema/chat";
import { prisma } from "../prisma";
import { mapDatabaseError } from "../db-errors.conditionals";

export async function CreateChatRecord(chatInput: CreateChatInput) {
    try {
        const chat: Chat = await prisma.chat.create({
            data: chatInput,
        });
        return chat;
    } catch (err) {
        const mappedError = mapDatabaseError(err)
        throw mappedError
    }
}
