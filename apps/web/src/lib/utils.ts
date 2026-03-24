
import { Chat } from "@repo/schema/chat";
import { Message } from "@repo/schema/message";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getPersonName(metadata: Chat,userId:string) {
    return metadata.chatParticipants.find((p) => p.userId !== userId)?.nickname;
}
