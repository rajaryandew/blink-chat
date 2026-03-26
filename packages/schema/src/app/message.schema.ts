import * as z from "zod";

export const messageSchema = z.object({
    id: z.int(),
    text: z.string().max(300).nonempty(),
    timestamp: z.date(),
    chatId: z.uuid(),
    chatParticipantId: z.int(),
    replyTo: z.int().nullish(),
});

export type Message = z.infer<typeof messageSchema>;

export const createMessageSchema = messageSchema.pick({
    text: true,
    chatId: true,
    chatParticipantId: true,
    replyTo: true,
});
export type CreateMessageInput = z.infer<typeof createMessageSchema>;
export type MessageCreatedResponse =
    | {
          success: true;
          data: Message;
      }
    | {
          success: false;
          data: { message: string; cause?: unknown };
      };

export type MessageDeletedResponse =
    | {
          success: true;
          message: Message;
      }
    | {
          success: false;
          error: { message: string; cause?: unknown };
      };
