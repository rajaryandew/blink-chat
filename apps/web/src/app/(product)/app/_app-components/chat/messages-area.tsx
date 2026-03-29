import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";

export default function MessagesArea({
    messages,
    isSomeoneTyping
}: {
    messages: React.ReactNode;
    isSomeoneTyping:boolean
}) {
    const scrollRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "instant" });
    }, [messages]);

    return (
        <ScrollArea className="mt-3 mx-2 flex-1 overflow-y-scroll ">
            <div className="flex gap-1 flex-col">
                {messages}

                <motion.div
                    hidden={!isSomeoneTyping}
                    className="w-fit dark:bg-slate-800/10 px-2 py-1 rounded-md"
                >
                    <motion.p className="text-2xl opacity-40">•••</motion.p>
                </motion.div>

                <div ref={scrollRef}></div>
            </div>
        </ScrollArea>
    );
}
