"use client";

import { cn } from "@/lib/utils";
import { Copy, Pencil, Reply, Trash } from "lucide-react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { UseFormSetValue } from "react-hook-form";
import {
    CreateMessageInput,
    Message as MessageType,
} from "@repo/schema/message";
import { Chat } from "@repo/schema/chat";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuGroup,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { MessageReplied } from "./message-replied";
import { MessageText } from "./message-text";
import { useContext, useState } from "react";
import { deleteMessage } from "@/lib/socket/handlers/chat.socket";
import { authClient } from "@/lib/auth/auth-client";
import { MessageEditContext } from "../../contexts";

const { data: session } = await authClient.getSession();
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
    const {
        messageAction,
        setMessageAction,
        messageEditing,
        setMessageEditing,
    } = useContext(MessageEditContext)!;
    const x = useMotionValue(0);
    const [messageSize, setMessageSize] = useState(1);
    const scale = useTransform(x, [-100, 0, 100], [2.5, 0, -2.5]);

    return (
        <div className={cn("flex flex-col", align)}>
            <ContextMenu
                onOpenChange={(open) => {
                    if (open) {
                        return setMessageSize(0.95);
                    }
                    setMessageSize(1);
                }}
            >
                <ContextMenuTrigger>
                    <motion.div
                        className={cn(
                            "flex flex-col justify-center w-fit gap-1",
                            align,
                        )}
                        drag="x"
                        dragConstraints={{
                            left: 0,
                            right: 0,
                        }}
                        onDragEnd={() => setReplyAction("replyTo", metadata.id)}
                        dragElastic={0.03}
                        dragDirectionLock
                        style={{ x }}
                        animate={{ scale: messageSize }}
                    >
                        <p className="dark:text-slate-400 mt-1" hidden={metadata.isEdited === false}>Edited</p>
                        <MessageReplied
                            alignment={alignment}
                            chat={chat}
                            metadata={metadata}
                        />

                        <MessageText
                            alignment={alignment}
                            scale={scale}
                            text={metadata.text}
                        />
                    </motion.div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem
                        onClick={async () => {
                            await navigator.clipboard.writeText(metadata.text);
                        }}
                    >
                        <Copy />
                        Copy
                    </ContextMenuItem>

                    <ContextMenuGroup
                        hidden={
                            metadata.chatParticipantId ===
                            chat.chatParticipants.find(
                                (v) => v.userId === session?.user.id!,
                            )?.id
                                ? false
                                : true
                        }
                    >
                        <ContextMenuSeparator />

                        <ContextMenuItem
                            onClick={() => {
                                setMessageAction("edit");
                                setMessageEditing(metadata);
                            }}
                        >
                            <Pencil />
                            Edit
                        </ContextMenuItem>
                        <ContextMenuItem
                            onClick={() => deleteMessage(metadata)}
                            variant="destructive"
                        >
                            <Trash />
                            Delete
                        </ContextMenuItem>
                    </ContextMenuGroup>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    );
}
