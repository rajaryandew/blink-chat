import {
    createMessageRecord,
    deleteMessageRecord,
    updateMessageRecord,
} from "@repo/database/message";
import { ServerType, SocketType } from "../..";
import { AppError } from "@repo/error";
import { isChatParticipantAuthorized } from "../utils";

export async function registerMessageHandlers(
    socket: SocketType,
    io: ServerType,
) {
    socket.on("message:create", async (input) => {
        try {
            await isChatParticipantAuthorized(socket,input.chatParticipantId)

            const message = await createMessageRecord(input);
            io.to(message.chatId).emit("message:created", {
                success: true,
                data: message,
            });
        } catch (error) {
            const e = new AppError("UNKNOWN_ERROR", { cause: error });
            socket.emit("message:created", {
                success: false,
                error: { message: e.message, cause: e.cause },
            });
        }
    });

    socket.on("message:delete", async (message) => {
        try {
            await isChatParticipantAuthorized(socket,message.chatParticipantId)

            await deleteMessageRecord(message.id);
            io.to(message.chatId).emit("message:deleted", {
                success: true,
                data: message,
            });
        } catch (error) {
            const e = new AppError("ERROR", { cause: error });
            socket.emit("message:deleted", {
                success: false,
                error: { message: e.message, cause: e.cause },
            });
        }
    });

    socket.on("message:edit", async (originalMessage, newText) => {
        try {
            await isChatParticipantAuthorized(socket,originalMessage.chatParticipantId)

            const updatedMessage = await updateMessageRecord(
                originalMessage,
                newText,
            );
            io.to(originalMessage.chatId).emit("message:edited", {
                success: true,
                data: updatedMessage,
            });
        } catch (error) {
            const e = new AppError("ERROR", { cause: error });
            socket.emit("message:edited", {
                success: false,
                error: { message: e.message, cause: e.cause },
            });
        }
    });
}
