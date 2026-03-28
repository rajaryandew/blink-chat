import { Chat, ChatCreatedResponse, ChatTyping, CreateChatInput } from "./chat.schema";
import { CreateMessageInput, Message, MessageCreatedResponse, MessageDeletedResponse } from "./message.schema";

export interface ServerToClientEvents {
    "chat:created": (response: ChatCreatedResponse) => void;
    "message:created": (response: MessageCreatedResponse) => void;
    "message:deleted":(response:MessageDeletedResponse) => void;
    "chat:typing":(personTyping:ChatTyping) => void;
    unauthorized: () => void;
}

export interface ClientToServerEvents {
    "chat:create": (chatInput: CreateChatInput) => void;
    "message:create": (messageInput: CreateMessageInput) => void;
    "message:delete":(message:Message) => void
    "chat:connect": (chatList: Chat[]) => void;
    "chat:typing":(personTyping:ChatTyping) => void;
}