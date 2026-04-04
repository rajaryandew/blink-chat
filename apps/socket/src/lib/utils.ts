import { fetchChatParticipantRecord } from "@repo/database/chat-participant";
import { SocketType } from "..";

export async function isChatParticipantAuthorized(
    socket: SocketType,
    chatParticipantId: number,
) {
    const chatParticipant = await fetchChatParticipantRecord(chatParticipantId);
    if (chatParticipant?.userId !== socket.handshake.auth.userId) {
        new Error("UNAUTHORIZED");
    }
    return;
}
