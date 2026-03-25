import { formatDistance } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle } from "@/components/ui/icons";
import { Chat } from "@repo/schema/chat";
import Link from "next/link";
import { getPersonName } from "@/lib/utils";

export function ChatItem({
    metadata,
    name,
}: {
    metadata: Chat;
    name: string | undefined;
}) {

    const lastMessage =
        metadata.messages.length >= 1
            ? metadata.messages.reduce((previousLast, message) => {
                  return previousLast.timestamp < message.timestamp
                      ? message
                      : previousLast;
              })
            : null;
    const formattedDate = lastMessage
        ? formatDistance(Date.now(), lastMessage.timestamp)
        : null;

    return (
        <Link prefetch href={`/app/${metadata.id}`} >
            <div className="h-18 flex items-center gap-2">
                <Avatar className="size-12 grid place-items-center ">
                    <AvatarImage src={undefined} />
                    <AvatarFallback asChild>
                        <UserCircle />
                    </AvatarFallback>
                </Avatar>
                <div className="w-full gap-1 flex flex-col justify-center">
                    <div className="flex items-center justify-between">
                        <h3
                            className="text-sm font-bold"
                            suppressHydrationWarning
                        >
                            {name}
                        </h3>
                        <p
                            className="text-xs text-gray-100/70"
                            suppressHydrationWarning
                        >
                            {formattedDate
                                ? `${formattedDate} ago`
                                : "No messages yet..."}
                        </p>
                    </div>
                    <p className="font-medium text-gray-300/50 text-xs">
                        {lastMessage?.text.slice(0, 20)}...
                    </p>
                </div>
            </div>
        </Link>
    );
}
