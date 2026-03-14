import {formatDistance} from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatType } from "./chat-list";
import { UserCircle } from "@/components/ui/icons";

export function ChatItem({ metadata }: { metadata: ChatType }) {

    const formattedDate = formatDistance(new Date(),metadata.lastMessage.timestamp)

    return (
        <div className="h-18 flex items-center gap-2"> 
            <Avatar className="size-12 grid place-items-center ">
                <AvatarImage src={metadata.profilePic || undefined} />
                <AvatarFallback asChild>
                    <UserCircle />
                </AvatarFallback>
            </Avatar>
            <div className="w-full gap-1 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold">{metadata.name}</h3>
                    <p className="text-xs text-gray-100/70" suppressHydrationWarning>{formattedDate} ago</p>
                </div>
                <p className="font-medium text-gray-300/50 text-xs">
                    {metadata.lastMessage.text.slice(0, 20)}...
                </p>
            </div>
        </div>
    );
}
