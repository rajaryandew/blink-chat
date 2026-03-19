import { formatDistance } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle } from "@/components/ui/icons";
import { ChatType } from "../../contexts";

export function ChatItem({
    metadata,
    userId,
}: {
    metadata: ChatType;
    userId: string;
}) {
    const lastMessage = metadata.messages.length >= 1
        ? metadata.messages.reduce((previousLast, message) => {
              return previousLast.timestamp > message.timestamp
                  ? message
                  : previousLast;
          })
        : null;
    const formattedDate =lastMessage ? formatDistance(new Date(), lastMessage.timestamp) : null;

    return (
        <div className="h-18 flex items-center gap-2">
            <Avatar className="size-12 grid place-items-center ">
                <AvatarImage src={undefined} />
                <AvatarFallback asChild>
                    <UserCircle />
                </AvatarFallback>
            </Avatar>
            <div className="w-full gap-1 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold">
                        {
                            metadata.chatParticipants.find(
                                (p) => p.userId !== userId,
                            )?.nickname
                        }
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
    );
}
