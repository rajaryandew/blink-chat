import {
    Chat,
    ChatTyping,
    CreateChatInput,
} from "./chat.schema";
import {
    CreateMessageInput,
    Message,
} from "./message.schema";

type SocketResponse<T> =
    | {
          success: true;
          data: T;
      }
    | {
          success: false;
          error: { message: string; cause?: unknown };
      };

export interface ServerToClientEvents {
    "chat:created": (response: SocketResponse<Chat>) => void;
    "message:created": (response: SocketResponse<Message>) => void;
    "message:deleted": (response: SocketResponse<Message>) => void;
    "message:edited":(response:SocketResponse<Message>) => void;
    "chat:typing": (personTyping: ChatTyping) => void;
    unauthorized: () => void;
}

export interface ClientToServerEvents {
    "chat:create": (chatInput: CreateChatInput) => void;
    "message:create": (messageInput: CreateMessageInput) => void;
    "message:delete": (message: Message) => void;
    "message:edit": (orignalMessage: Message, newText: string) => void;
    "chat:connect": (chatList: Chat[]) => void;
    "chat:typing": (personTyping: ChatTyping) => void;
}
