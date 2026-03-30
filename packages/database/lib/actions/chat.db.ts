import { Chat, CreateChatInput } from "@repo/schema/chat";
import { prisma } from "../prisma";
import { mapDatabaseError } from "../db-errors.conditionals";
import { getProfile, getProfileByUsername } from "./profile.db";
import { DatabaseError } from "@repo/error";
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace";

export async function createChatRecord(chatInput: CreateChatInput) {
    try {
        const person = await getProfileByUsername(chatInput.username);
        const self = await getProfile(chatInput.self_userId);
        const isChatAlreadyExists =
            chatInput.isGroup === false
                ? await prisma.chat.findFirst({
                      where: {
                          AND: [
                              {
                                  chatParticipants: {
                                      some: {
                                          userId: self.userId,
                                      },
                                  },
                              },
                              {
                                  chatParticipants: {
                                      some: {
                                          userId: person.userId,
                                      },
                                  },
                              },
                          ],
                      },
                  })
                : null;
        if (isChatAlreadyExists) {
            throw new PrismaClientKnownRequestError("CHAT_ALREADY_EXISTS", {
                code: "P2002",
                clientVersion: "",
            });
        }
        const chat: Chat = await prisma.chat.create({
            data: {
                chatParticipants: {
                    createMany: {
                        data: [
                            {
                                userId: person.userId,
                                nickname: person.displayName || person.username,
                            },
                            {
                                userId: chatInput.self_userId,
                                nickname: self.displayName || self.username,
                            },
                        ],
                    },
                },
            },
            include: {
                chatParticipants: true,
                messages: true,
            },
        });
        return chat;
    } catch (err) {
        if (err instanceof DatabaseError) {
            throw err;
        }

        const mappedError = mapDatabaseError(err);
        throw mappedError;
    }
}

export async function fetchChatRecords(userId: string) {
    try {
        const chats: Chat[] = await prisma.chat.findMany({
            where: {
                chatParticipants: {
                    some: {
                        userId,
                    },
                },
            },

            include: {
                chatParticipants: true,
                messages: true,
            },
        });
        return chats;
    } catch (error) {
        throw mapDatabaseError(error);
    }
}

export async function deleteChatRecord(chatId:string){
    try {
        await prisma.chat.delete({
            where:{
                id:chatId
            }
        })
        return chatId
    } catch (error) {
        throw mapDatabaseError(error)
    }
}