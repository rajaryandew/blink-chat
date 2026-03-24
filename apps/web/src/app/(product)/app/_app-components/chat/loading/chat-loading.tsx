import { Skeleton } from "@/components/ui/skeleton";
import { ChatLoadingHeader } from "./chat-loading-header";
import { ChatLoadingMessages } from "./chat-loading-messages";
import { Send } from "lucide-react";

export default function ChatLoading(){
    return(
        <div className="w-full h-dvh flex flex-col">
            <ChatLoadingHeader/>
            <ChatLoadingMessages/>
            <div className="flex p-3 gap-1">
                <Skeleton className=" w-full h-10 rounded-full"/>
                <Skeleton className="p-2 rounded-full flex items-center justify-center">
                    <Send/>
                </Skeleton>
            </div>
        </div>
    )
}