import { Chat, CreateChatInput } from "@repo/schema/chat";
import { prisma } from "../prisma";
import { mapDatabaseError } from "../db-errors.conditionals";
import { getProfile, getProfileByUsername } from "./profile.db";
import { DatabaseError } from "@repo/error";

export async function createChatRecord(
    chatInput: CreateChatInput,
) {
    try {
        const person = await getProfileByUsername(chatInput.username);
        const chat: Chat = await prisma.chat.create({
            data: {
                chatParticipants: {
                    createMany: {
                        data: [
                            { userId: person.userId },
                            { userId: chatInput.self_userId},
                        ],
                    },
                },
            },
        });
        return chat;
    } catch (err) {

        if(err instanceof DatabaseError){
            throw err
        }

        const mappedError = mapDatabaseError(err);
        throw mappedError;
    }
}

export async function fetchChatRecords(userId:string) {
    try {
        const chats:Chat[] = await prisma.chat.findMany({
            where:{
               chatParticipants:{
                some:{
                    userId
                }
               } 
            }
        })
        return chats  
    } catch (error) {
        throw mapDatabaseError(error)
    }
}
