import * as z from "zod"

export const chatParticipantSchema = z.object({
    id:z.int(),
    nickname:z.string(),
    chatId:z.uuid(),
    userId:z.uuid()
})
export type ChatParticipant = z.infer<typeof chatParticipantSchema>

export const createChatParticipantSchema = chatParticipantSchema.pick({
    chatId:true,
    profileId:true
})
export type CreateChatParticipantInput = z.infer<typeof createChatParticipantSchema>