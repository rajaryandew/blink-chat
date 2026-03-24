import * as z from "zod"

export const messageSchema = z.object({
    id:z.int(),
    text:z.string().max(300).nonempty(),
    timestamp:z.date(),
    chatId:z.uuid(),
    chatParticipantId:z.int()
})

export type Message = z.infer<typeof messageSchema>

export const createMessageSchema = messageSchema.pick({
    text:true,
    chatId:true,
    chatParticipantId:true
})
export type CreateMessageInput = z.infer<typeof createMessageSchema>