import { CreateChatParticipantInput } from "@repo/schema/chat-participant";
import { mapDatabaseError } from "../db-errors.conditionals";
import { prisma } from "../prisma";

// export async function createChatParticipantRecord(
//     participantInput: CreateChatParticipantInput,
// ) {
//     try {
//         const chatParticipant = await prisma.chatParticipant.create({
//             data: { ...participantInput, nickname: "" },
//         });
//     } catch (error) {
//         const mappedError = mapDatabaseError(error);
//         throw mappedError;
//     }
// }
