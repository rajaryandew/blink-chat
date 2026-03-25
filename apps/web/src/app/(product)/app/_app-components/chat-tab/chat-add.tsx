"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { authClient } from "@/lib/auth/auth-client";
import { handleCreateChat } from "@/lib/client-handlers/chat.handlers";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateChatInput, createChatSchema } from "@repo/schema/chat";
import { MessageSquarePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function ChatCreate() {
    const {data:session} = authClient.useSession()
    
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
        setValue,
    } = useForm<CreateChatInput>({
        resolver: zodResolver(createChatSchema),
        defaultValues: {
            isGroup: false,
        },
    });

    useEffect(() => {
        if (!session?.user.id) return;
        setValue("self_userId", session.user.id);
    }, [session?.user.id]);

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <MessageSquarePlus />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Chat</DialogTitle>
                </DialogHeader>
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSubmit((input) => {
                        handleCreateChat(input)
                        setOpen(false)
                    })}
                >
                    <FieldGroup>
                        <Field>
                            <FieldLabel
                                className="opacity-75"
                                htmlFor="username"
                            >
                                Username(should be correct*)
                            </FieldLabel>
                            <Input
                                className="border-0"
                                {...register("username")}
                            />
                            <FieldError>{errors.username?.message}</FieldError>
                        </Field>
                        <Field className="" orientation="horizontal">
                            <Switch {...register("isGroup")} disabled={true} />
                            <FieldLabel
                                className="opacity-75"
                                htmlFor="isGroup"
                            >
                                Group Chat??
                            </FieldLabel>
                            <FieldError>{errors.isGroup?.message}</FieldError>
                        </Field>
                        <Field>
                            <FieldError>{errors.root?.message}</FieldError>
                        </Field>
                        <Separator />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="reset" variant="destructive">
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button
                                type="submit"
                                variant="secondary"
                                disabled={isSubmitting}
                            >
                                Create
                            </Button>
                        </DialogFooter>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}
