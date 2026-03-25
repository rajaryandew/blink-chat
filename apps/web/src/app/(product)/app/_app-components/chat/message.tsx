"use client";

import { cn } from "@/lib/utils";
import { Reply } from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { UseFormSetValue } from "react-hook-form";
import {
    CreateMessageInput,
    Message as MessageType,
} from "@repo/schema/message";
import { Chat } from "@repo/schema/chat";

export default function Message({
    metadata,
    chat,
    alignment,
    setReplyAction,
}: {
    metadata: MessageType;
    chat: Chat;
    alignment: "left" | "right"; // left: Received, right: Sent
    setReplyAction: UseFormSetValue<CreateMessageInput>;
}) {
    const align = `${alignment === "left" ? "items-start" : "items-end"}`;
    const x = useMotionValue(0);
    const scale = useTransform(x, [-100, 0, 100], [2.5, 0, -2.5]);

    return (
        <motion.div
            className={cn("flex flex-col justify-center gap-1", align)}
            drag="x"
            dragConstraints={{
                left: 0,
                right: 0,
            }}
            onDragEnd={() => setReplyAction("replyTo", metadata.id)}
            dragElastic={0.03}
            dragDirectionLock
            style={{ x }}
        >
            <div
                className={cn(" bg-slate-800/20 w-fit p-3 rounded-3xl flex flex-col", alignment === "left" ? "rounded-bl-none" : "rounded-")}
                hidden={!metadata.replyTo}
            >
                <p className="text-xs font-medium opacity-20">Reply to</p>
                <p className="opacity-80 px-1">
                    {chat.messages.find((m) => m.id === metadata.replyTo)?.text}
                </p>
            </div>
            <div className="flex items-center">
                <p
                    className={cn(
                        "p-3 w-fit max-w-[60vw] wrap-break-word rounded-xl order-2",
                        `${alignment === "left" ? "dark:bg-slate-800 bg-slate-100 rounded-tl-none text-left" : "bg-indigo-500 dark:bg-indigo-900 rounded-tr-none"}`,
                    )}
                >
                    {metadata.text}
                </p>
                <motion.div
                    className={cn(
                        alignment === "left"
                            ? "order-1 -left-7 -scale-y-100"
                            : "order-3 -right-6",
                        "absolute ",
                    )}
                    style={{ scale }}
                >
                    <Reply />
                </motion.div>
            </div>
        </motion.div>
    );
}
