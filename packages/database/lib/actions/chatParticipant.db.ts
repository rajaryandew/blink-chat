import { mapDatabaseError } from "../db-errors.conditionals"
import { prisma } from "../prisma"

export async function fetchChatParticipantRecord(chatParticipantId:number){
    try {
        const chatParticipant = await prisma.chatParticipant.findUnique({
            where:{
                id:chatParticipantId
            }
        })
        return chatParticipant
    } catch (error) {
        throw mapDatabaseError(error)
    }
}