import { Chat, CreateChatInput } from "@repo/schema/chat";
import { createChatRecord, deleteChatRecord, fetchChatParticipantsByChatId, fetchChatRecords } from "@repo/database/chat";

import { ServerType, SocketType } from "../..";
import { AppError, DatabaseError } from "@repo/error";
import { DatabaseErrorCode } from "@repo/error/types";

export async function registerChatHandlers(socket: SocketType, io: ServerType) {
    socket.on("chat:connect", (chatList) => {
        chatList.forEach((chat) => {
            socket.join(chat.id);
        });
    });

    socket.on("chat:create", async (chatInput: CreateChatInput) => {
        try {
            const chat: Chat = await createChatRecord(chatInput);
            io.to(chat.chatParticipants.map((v) => v.userId)).emit(
                "chat:created",
                { success: true, data: chat },
            );
        } catch (error) {
            const e = error as DatabaseError;
            let mainError = new AppError("UNKNOWN_ERROR", { cause: error });
            switch (e.code) {
                case DatabaseErrorCode.UNIQUE_CONSTRAINT:
                    mainError = new AppError("CHAT_ALREADY_EXISTS");
                    break;
                case DatabaseErrorCode.CONSTRAINT_VIOLATION:
                    mainError = new AppError("MISSING_FIELDS");
                    break;
                case DatabaseErrorCode.FOREIGN_KEY_VIOLATION:
                    mainError = new AppError("USERNAME_INCORRECT");
                    break;
                case DatabaseErrorCode.RECORD_NOT_FOUND:
                    mainError = new AppError("PERSON_NOT_FOUND");
                    break;
                case DatabaseErrorCode.DB_CONNECTION_ERROR:
                    mainError = new AppError("CONNECTION_FAILED");
                    break;
                default:
                    mainError = new AppError("UNKNOWN_ERROR");
                    break;
            }
            socket.emit("chat:created", {
                success: false,
                error: { message: mainError.message },
            });
        }
    });

    socket.on("chat:typing", (personTyping) => {
        io.to(`${personTyping.chatId}`).emit("chat:typing", personTyping);
    });

    socket.on("chat:delete", async (chatId) => {
        try {
            const chatParticipants = await fetchChatParticipantsByChatId(chatId)
            if(!(chatParticipants.find(p => p.userId === socket.handshake.auth.userId))) throw new Error("UNAUTHORIZED")

            await deleteChatRecord(chatId);
            io.to(chatId).emit("chat:deleted", {
                success: true,
                data: { chatId },
            });
        } catch (error) {
            socket.emit("chat:deleted", {
                success: false,
                error: { message: "ERROR" },
            });
        }
    });
}
