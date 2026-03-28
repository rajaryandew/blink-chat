import * as z from "zod";
import { messageSchema } from "./message.schema";
import { chatParticipantSchema } from "./chat-participant.schema";

export const chatSchema = z.object({
    id: z.uuid(),
    chatName: z.string().max(50).nullish(),
    isGroup: z.boolean(),
    messages: messageSchema.array(),
    chatParticipants: chatParticipantSchema.array(),
});
export type Chat = z.infer<typeof chatSchema>;

export const createChatSchema = z.object({
    isGroup: z.boolean(),
    username: z.string().trim().nonempty("Please enter the username!"),
    self_userId: z.string().nonempty("Try logging in again"),
});
export type CreateChatInput = z.infer<typeof createChatSchema>;

export type ChatCreatedResponse =
    | {
          success: true;
          data: Chat;
      }
    | { success: false; data: { message: string; cause?: unknown } };

export type ChatTyping = {
    chatParticipantId:number,
    chatId:string
}