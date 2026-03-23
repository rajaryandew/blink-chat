import { CreateMessageInput, Message } from "@repo/schema/message";
import { mapDatabaseError } from "../db-errors.conditionals";
import { prisma } from "../prisma";

export async function createMessageRecord(input: CreateMessageInput) {
    try {
        const message:Message = await prisma.message.create({
            data: {
                ...input,
                timestamp: new Date(),
            },
        });
        return message
    } catch (error) {
        throw mapDatabaseError(error);
    }
}
