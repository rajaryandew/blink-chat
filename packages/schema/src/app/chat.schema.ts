import * as z from "zod"

export const chatSchema = z.object({
    id: z.uuid(),
    chatName:z.string().max(50),
    isGroup:z.boolean(),
})
export type Chat = z.infer<typeof chatSchema>;
