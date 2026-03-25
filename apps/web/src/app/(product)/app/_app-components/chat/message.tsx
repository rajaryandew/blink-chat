"use client";

import { cn } from "@/lib/utils";
import { Reply } from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { UseFormSetValue } from "react-hook-form";
import { CreateMessageInput } from "@repo/schema/message";

export default function Message({
    text,
    alignment,
    setReplyAction,
    messageId
}: {
    text: string;
    messageId:number
    alignment: "left" | "right"; // left: Received, right: Sent
    setReplyAction:UseFormSetValue<CreateMessageInput>
}) {
    const align = `justify-${alignment === "left" ? "start" : "end"}`;
    const x = useMotionValue(0);
    const scale = useTransform(x, [-100, 0,100], [2.5, 0,-2.5]);

    return (
        <motion.div
            className={cn("flex items-center gap-1", align)}
            drag="x"
            dragConstraints={{
                left: 0,
                right: 0,
            }}
            onDragEnd={() => setReplyAction("replyTo",messageId)}
            dragElastic={0.03}
            dragDirectionLock
            style={{ x }}
        >
            <p
                className={cn(
                    "p-3 w-fit max-w-[60vw] wrap-break-word rounded-xl order-2",
                    `${alignment === "left" ? "dark:bg-slate-800 bg-slate-100 rounded-tl-none text-left" : "bg-indigo-500 dark:bg-indigo-900 rounded-tr-none"}`,
                )}
            >
                {text}
            </p>
            <motion.div
                className={cn(
                    alignment === "left"
                        ? "order-1 -left-7 -scale-y-100"
                        : "order-3 -right-6",
                    "absolute"
                )}
                style={{ scale, }}
            >
                <Reply />
            </motion.div>
        </motion.div>
    );
}
