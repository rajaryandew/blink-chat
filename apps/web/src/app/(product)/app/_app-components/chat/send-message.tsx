"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
import { handleCreateMessage } from "@/lib/client-handlers/message.handlers";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chat } from "@repo/schema/chat";
import { CreateMessageInput, createMessageSchema } from "@repo/schema/message";
import { Cross, Send, X } from "lucide-react";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

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
        formState: { isSubmitting },
    } = sendMessageForm;

    useEffect(() => {
        if (!session?.user.id) return;
        const id = chat.chatParticipants.find(
            (c) => c.userId === session.user.id,
        )?.id!;
        setValue("chatParticipantId", id);
        setValue("chatId", chat.id);
    }, [session?.user.id]);

    const replyTo = watch("replyTo");

    return (
        <form
            className=" flex flex-col bg-[#111214] px-3"
            onSubmit={handleSubmit((input) => {
                handleCreateMessage(input);
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
                    className="rounded-xl mt-1"
                    onClick={() => setValue("replyTo", null)}
                    variant="ghost"
                >
                    <X className="m-0"/>
                </Button>
            </div>
            <div className={cn("flex mb-3",!replyTo ? "mt-3" : "mt-2")}>
                <Input
                    className="rounded-4xl"
                    maxLength={500}
                    {...register("text")}
                />
                <Button type="submit" disabled={isSubmitting} variant="ghost">
                    <Send className="size-6" />
                </Button>
            </div>
        </form>
    );
}
