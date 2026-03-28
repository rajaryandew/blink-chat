"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
import { handleCreateMessage } from "@/lib/client-handlers/message.handlers";
import { socket } from "@/lib/socket/socket";
import { cn } from "@/lib/utils";
import { Chat } from "@repo/schema/chat";
import { CreateMessageInput } from "@repo/schema/message";
import { Send, X } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

export default function SendMessageForm({
    chat,
    sendMessageForm,
}: {
    chat: Chat;
    sendMessageForm: UseFormReturn<CreateMessageInput>;
}) {
    const { data: session } = authClient.useSession();
    const {
        setValue,
        handleSubmit,
        register,
        watch,
        getValues,
        formState: { isSubmitting },
    } = sendMessageForm;
    const replyTo = watch("replyTo");

    useEffect(() => {
        if (!session?.user.id) return;
        const id = chat.chatParticipants.find(
            (c) => c.userId === session.user.id,
        )?.id!;
        setValue("chatParticipantId", id);
        setValue("chatId", chat.id);
    }, [session?.user.id]);

    return (
        <form
            className=" flex flex-col bg-[#f4f4f5] dark:bg-[#111214] px-3"
            onSubmit={handleSubmit((input) => {
                handleCreateMessage({ ...input, replyTo });
                setValue("text", "");
                setValue("replyTo", null);
            })}
        >
            <div className=" border-b border-b-white/10 flex" hidden={!replyTo}>
                <div className="flex-1">
                    <h4 className="text-gray-400 font-semibold">Reply to</h4>
                    <p className="px-4 opacity-50 font-medium">
                        {chat.messages
                            .find((m) => m.id === replyTo)
                            ?.text?.slice(0, 100)}
                        ...
                    </p>
                </div>
                <Button
                    type="button"
                    className="rounded-xl mt-1"
                    onClick={() => setValue("replyTo", null)}
                    variant="ghost"
                >
                    <X />
                </Button>
            </div>
            <div className={cn("flex mb-3", !replyTo ? "mt-3" : "mt-2")}>
                <Input
                    className="rounded-4xl"
                    maxLength={500}
                    {...register("text", {
                        onChange: async () => {
                            socket.emit("chat:typing", {
                                chatId: getValues("chatId"),
                                chatParticipantId:
                                    getValues("chatParticipantId"),
                            });
                        },
                    })}
                />
                <Button type="submit" disabled={isSubmitting} variant="ghost">
                    <Send className="size-6" />
                </Button>
            </div>
        </form>
    );
}
