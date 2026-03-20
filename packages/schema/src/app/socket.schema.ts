import { Chat, CreateChatInput } from "./chat.schema";

export type ChatCreatedResponse =
    | {
          success: true;
          data: Chat;
      }
    | { success: false; data: { message: string; cause?: unknown } };

export interface ServerToClientEvents {
    "chat:created": (response: ChatCreatedResponse) => void;
    unauthorized: () => void;
}

export interface ClientToServerEvents {
    "chat:create": (chatInput: CreateChatInput) => void;
}
