"use client";
import { UserCircle } from "@/components/ui/icons";
import { ArrowLeft, EllipsisVertical, Option, Trash } from "lucide-react";
import Link from "next/link";
import { MessageTabContext } from "../../contexts";
import { useContext } from "react";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function ChatHeader({
    name,
    avatar,
    action,
}: {
    name: string;
    avatar:string | undefined
    action: () => void;
}) {
    const { setIsMessageTabOpen } = useContext(MessageTabContext)!;

    return (
        <div className="p-2 px-6 h-19.75 gap-3 bg-sidebar-accent flex flex-row items-center w-full sm:rounded-t-xl">
            <Link
                href="/app"
                onClick={() => setIsMessageTabOpen(true)}
                className="content-center sm:hidden"
            >
                <ArrowLeft />
            </Link>
            <Avatar className="size-12">
                <AvatarImage src={avatar}/>
                <AvatarFallback>
                    <UserCircle />
                </AvatarFallback>
            </Avatar>
            <h2 className="content-center font-semibold text-xl flex-1">
                {name}
            </h2>

            <Popover>
                <PopoverTrigger>
                    <EllipsisVertical />
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverHeader>
                        <PopoverTitle>Options</PopoverTitle>
                        <PopoverDescription>
                            Options to manage the chat
                        </PopoverDescription>
                    </PopoverHeader>
                    <Button
                        className="mt-4 w-full"
                        variant="destructive"
                        onClick={action}
                    >
                        <Trash />
                        Delete
                    </Button>
                </PopoverContent>
            </Popover>
        </div>
    );
}
