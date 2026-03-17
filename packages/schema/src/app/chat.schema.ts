import * as z from "zod"

export const chatSchema = z.object({
    id: z.uuid(),
    chatName:z.string().max(50).nullish(),
    isGroup:z.boolean(),
})
export type Chat = z.infer<typeof chatSchema>;

export const createChatSchema = z.object({
    isGroup: z.boolean(),
    username: z.string().trim().nonempty("Please enter the username!"),
    self_userId:z.string().nonempty("Try logging in again")
})

export type CreateChatInput = z.infer<typeof createChatSchema>