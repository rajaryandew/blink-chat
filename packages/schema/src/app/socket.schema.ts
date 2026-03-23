import { Chat, CreateChatInput } from "./chat.schema";
import { CreateMessageInput, Message } from "./message.schema";

export type ChatCreatedResponse =
    | {
          success: true;
          data: Chat;
      }
    | { success: false; data: { message: string; cause?: unknown } };

export type MessageCreatedResponse =
    | {
          success: true;
          data: Message;
      }
    | {
          success: false;
          data: { message: string; cause?: unknown };
      };
export interface ServerToClientEvents {
    "chat:created": (response: ChatCreatedResponse) => void;
    "message:created": (response: MessageCreatedResponse) => void;
    unauthorized: () => void;
}

export interface ClientToServerEvents {
    "chat:create": (chatInput: CreateChatInput) => void;
    "message:create": (messageInput: CreateMessageInput) => void;
    "chat:connect": (chatList: Chat[]) => void;
}
