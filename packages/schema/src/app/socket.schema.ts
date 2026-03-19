import { Chat, CreateChatInput } from "./chat.schema";

export interface ServerToClientEvents {
    "chat:created": (
        response:
            | {
                  success: true;
                  data: Chat;
              }
            | { success: false; data: { message: string; cause?: unknown } },
    ) => void;
    unauthorized: () => void;
}

export interface ClientToServerEvents {
    "chat:create": (chatInput: CreateChatInput) => void;
}
