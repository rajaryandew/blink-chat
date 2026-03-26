import { cn } from "@/lib/utils";
import { Chat } from "@repo/schema/chat";
import { Message } from "@repo/schema/message";

export function MessageReplied({
    metadata,
    chat,
    alignment
}: {
    metadata: Message;
    chat: Chat;
    alignment:"left" | "right"
}) {
    return (
        <div
            className={cn(
                " bg-slate-800/20 mt-2 w-fit p-3 rounded-3xl flex flex-col",
                alignment === "left" ? "rounded-bl-none" : "rounded-br-none",
            )}
            hidden={!metadata.replyTo}
        >
            <p className="text-xs font-medium opacity-20">Reply to</p>
            <p className="opacity-80 px-1">
                {chat.messages.find((m) => m.id === metadata.replyTo)?.text}
            </p>
        </div>
    );
}
