import { Socket } from "socket.io";
import { getProfile } from "@repo/database/profile";
import { DatabaseError } from "@repo/error";
import { DatabaseErrorCode } from "@repo/error/types";

export async function verifyUser(
    socket: Socket,
): Promise<{ response: number }> {
    try {
        const userId = socket.handshake.auth.userId! as string;
        const user = await getProfile(userId);
        if (user) {
            return { response: 200 };
        } else throw new Error("UNKNOWN_ERROR");
    } catch (err) {
        if (err instanceof DatabaseError) {
            switch (err.code) {
                case DatabaseErrorCode.RECORD_NOT_FOUND:
                    return { response: 404 };
            }
        }
        return { response: 500 };
    }
}
