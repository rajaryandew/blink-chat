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

export async function deleteMessageRecord(messageId:number){
    try {
        await prisma.message.delete({
            where:{
                id:messageId
            }
        })
    } catch (error) {
        throw mapDatabaseError(error)
    }
}

export async function updateMessageRecord(originalMessage:Message,newText:string){
    try {
        const updatedMessage = await prisma.message.update({
            where:{
                id:originalMessage.id
            },
            data:{
                text:newText
            }
        })
        return updatedMessage
    } catch (error) {
        throw mapDatabaseError(error)
    }
}