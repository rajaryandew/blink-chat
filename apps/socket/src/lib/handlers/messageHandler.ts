import { createMessageRecord } from "@repo/database/message";
import { ServerType, SocketType } from "../..";
import { AppError, DatabaseError } from "@repo/error";

export async function registerMessageHandlers(
    socket: SocketType,
    io: ServerType,
) {
    socket.on("message:create", async (input) => {
        try {
            const message = await createMessageRecord(input);
            io.to(message.chatId).emit("message:created", { success: true, data: message });
        } catch (error) {
            const e = new AppError("UNKNOWN_ERROR", { cause: error });
            socket.emit("message:created", {
                success: false,
                data: { message: e.message, cause: e.cause },
            });
        }
    });
}
