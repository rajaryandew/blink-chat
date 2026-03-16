import { CreateChatParticipantInput } from "./chat-participant.schema";
import { Chat, CreateChatInput } from "./chat.schema";

export interface ServerToClientEvents{
    "chat:created":(chat:Chat) => void
    "unauthorized": () => void
}

export interface ClientToServerEvents{
    "chat:create": (chatInput:CreateChatInput) => void
}