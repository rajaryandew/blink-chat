import { Chat, CreateChatInput } from "@repo/schema/chat";
import { prisma } from "../prisma";
import { mapDatabaseError } from "../db-errors.conditionals";
import { getProfile, getProfileByUsername } from "./profile.db";

export async function createChatRecord(
    chatInput: CreateChatInput,
) {
    try {
        const person = await getProfileByUsername(chatInput.username);
        const self = await getProfile(chatInput.self_userId)
        const chat: Chat = await prisma.chat.create({
            data: {
                chatParticipants: {
                    createMany: {
                        data: [
                            { profileId: person.id },
                            { profileId: self.id },
                        ],
                    },
                },
            },
        });
        return chat;
    } catch (err) {
        const mappedError = mapDatabaseError(err);
        throw mappedError;
    }
}
