import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";

export default function MessagesArea({
    messages,
}: {
    messages: React.ReactNode;
}) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "instant" });
    }, [messages]);

    return (
        <ScrollArea className="mt-3 mx-2 flex-1 overflow-y-scroll ">
            <div className="flex gap-1 flex-col">
                {messages}
                <div ref={scrollRef}></div>
            </div>
        </ScrollArea>
    );
}
