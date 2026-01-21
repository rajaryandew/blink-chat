import * as z from "zod"

export const chatParticipantSchema = z.object({
    id:z.int(),
    nickname:z.string(),
    chatId:z.uuid(),
    profileId:z.uuid()
})

export type ChatParticipant = z.infer<typeof chatParticipantSchema>