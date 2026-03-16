import { CreateChatParticipantInput } from "@repo/schema/chat-participant";
import { mapDatabaseError } from "../db-errors.conditionals";
import { prisma } from "../prisma";

export async function createChatParticipantRecord(
    particpantInput: CreateChatParticipantInput,
) {
    try {
        const chatParticipant = await prisma.chatParticiapant.create({
            data: { ...particpantInput, nickname: "" },
        });
    } catch (error) {
        const mappedError = mapDatabaseError(error);
        throw mappedError;
    }
}
