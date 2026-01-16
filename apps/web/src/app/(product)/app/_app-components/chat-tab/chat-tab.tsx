"use client";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { MessageTabContext } from "../../contexts";
import { MessageSquarePlus } from "lucide-react";
import { ChatSearch } from "./chat-search";
import { ChatList } from "./chat-list";
import { Separator } from "@/components/ui/separator";

export function ChatTab() {
    const { isMessageTabOpen: isOpen, setIsMessageTabOpen: setIsOpen } =
        useContext(MessageTabContext)!;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
            <SheetContent className="absolute w-[400px]" side="left">
                <SheetHeader className="flex flex-row items-center justify-between">
                    <SheetTitle className="text-xl font-bold">BlinkChat</SheetTitle>
                    <SheetClose className="hidden" />
                    <MessageSquarePlus />
                </SheetHeader>
                <main className="px-4 py-3 grid gap-5">
                    <ChatSearch/>
                    <Separator/>
                    <ChatList/>
                </main>
            </SheetContent>
        </Sheet>
    );
}
