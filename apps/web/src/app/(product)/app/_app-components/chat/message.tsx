"use client";

import { cn } from "@/lib/utils";

export default function Message({
    text,
    alignment,
}: {
    text: string;
    alignment: "left" | "right"; // left: Recieved, right: Sent
}) {
    const align = `justify-${alignment === "left" ? "start" : "end"}`;

    return (
        <div className={cn("flex justify-end", align)}>
            <p
                className={cn(
                    "p-3 w-fit max-w-[60vw] wrap-break-word rounded-xl",
                    `${alignment === "left" ? "dark:bg-slate-800 bg-slate-100 rounded-tl-none text-left" : "bg-indigo-500 dark:bg-indigo-900 rounded-tr-none"}`,
                )}
            >
                {text}
            </p>
        </div>
    );
}
