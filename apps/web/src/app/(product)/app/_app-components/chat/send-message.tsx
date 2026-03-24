"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth-client";
import { handleCreateMessage } from "@/lib/client-handlers/message.handlers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chat } from "@repo/schema/chat";
import { CreateMessageInput, createMessageSchema } from "@repo/schema/message";
import { Send } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SendMessageForm({ chat }: { chat: Chat }) {
    const { data: session } = authClient.useSession();
    useEffect(() => {
        if (!session?.user.id) return;
        const id = chat.chatParticipants.find(
            (c) => c.userId === session.user.id,
        )?.id!;
        setValue("chatParticipantId", id);
    }, [session?.user.id]);
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        setValue,
        getValues
    } = useForm<CreateMessageInput>({
        resolver: zodResolver(createMessageSchema),
        defaultValues: {
            chatId: chat.id,
        },
    });

    return (
        <form
            className=" flex p-3"
            onSubmit={handleSubmit((input) => {
                handleCreateMessage(input)
                setValue('text',"")
            })}
        >
            <Input className="rounded-4xl" maxLength={500} {...register("text")} />
            <Button aria-disabled type="submit" disabled={isSubmitting} variant="ghost">
                <Send className="size-6" />
            </Button>
        </form>
    );
}
