"use server";

import { headers } from "next/headers";
import { auth } from "../auth/auth";
import { Chat } from "@repo/schema/chat";
import { fetchChatRecords } from "@repo/database/chat";
import { AppError } from "@repo/error";
import { ChatParticipant } from "@repo/schema/chat-participant";
import { Message } from "@repo/schema/message";

type GetChatsResponse =
    | {
          ok: true;
          chats: (Chat & { chatParticipants: ChatParticipant[],messages:Message[] })[];
      }
    | {
          ok: false;
          error: AppError;
      };

export async function getChats(): Promise<GetChatsResponse> {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session?.user.id) {
            return {
                ok: false,
                error: new AppError("SESSION_INVALID"),
            };
        }

        const chats = await fetchChatRecords(session?.user.id);

        return {
            ok: true,
            chats,
        };
    } catch (error) {
        return {
            ok: false,
            error: new AppError("UNEXPECTED_ERROR"),
        };
    }
}
