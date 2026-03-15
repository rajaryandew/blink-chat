"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogContent,
    DialogTrigger,
    DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { handleCreateChat } from "@/lib/client-handlers/chat.handlers";
import { socket } from "@/lib/socket/socket";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateChatInput, createChatSchema } from "@repo/schema/chat";
import { MessageSquarePlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function ChatCreate() {
    const {
        register,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<CreateChatInput>({
        resolver: zodResolver(createChatSchema),
        defaultValues:{
            isGroup: false
        }
    });

    const [checked,changeChecked] = useState(false)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <MessageSquarePlus />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Chat</DialogTitle>
                </DialogHeader>
                <form
                    className="flex flex-col gap-2"
                    onSubmit={handleSubmit(handleCreateChat)}
                >
                    <FieldGroup>
                        <Field>
                            <FieldLabel
                                className="opacity-75"
                                htmlFor="chatName"
                            >
                                Chat Name
                            </FieldLabel>
                            <Input
                                className="border-0"
                                aria-invalid={errors.chatName ? true : false}
                                {...register("chatName")}
                                placeholder="crofty"
                            />
                            <FieldError>{errors.chatName?.message}</FieldError>
                        </Field>
                        <Field className="" orientation="horizontal">
                            <Switch
                                {...register("isGroup")}
                            />
                            <FieldLabel
                                className="opacity-75"
                                htmlFor="isGroup"
                            >
                                Group Chat??
                            </FieldLabel>
                            <FieldError>{errors.isGroup?.message}</FieldError>
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
