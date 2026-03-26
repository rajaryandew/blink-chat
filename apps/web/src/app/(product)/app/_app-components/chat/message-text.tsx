import { cn } from "@/lib/utils";
import { Reply } from "lucide-react";
import {motion, MotionValue} from "motion/react"

export function MessageText({text,scale,alignment}:{text:string,scale:MotionValue<number>,alignment:"left" | "right"}){
    return (
        <div className="flex items-center">
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
                    "absolute ",
                )}
                style={{ scale }}
            >
                <Reply />
            </motion.div>
        </div>
    );
}