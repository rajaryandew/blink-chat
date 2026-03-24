"use client";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { ChatListProvider, MessageTabContext } from "../../contexts";
import { ChatSearch } from "./chat-search";
import { ChatList } from "./chat-list";
import { Separator } from "@/components/ui/separator";
import { ChatCreate } from "./chat-add";
import { useIsMobile } from "@/hooks/use-mobile";

export function ChatTab() {
    const { isMessageTabOpen: isOpen, setIsMessageTabOpen: setIsOpen } =
        useContext(MessageTabContext)!;

    const isMobile = useIsMobile();

    return (
        <Sheet
            open={isOpen}
            onOpenChange={setIsOpen}
            modal={false}
        >
            <SheetContent
                className="absolute inset-0 w-screen sm:w-[400px]"
                side="left"
            >
                <SheetHeader className="flex flex-row items-center justify-between">
                    <SheetTitle className="text-xl font-bold">
                        BlinkChat
                    </SheetTitle>
                    <SheetClose className="hidden" />
                    <ChatCreate />
                </SheetHeader>
                <main className="px-4 py-3 grid gap-5">
                    <ChatSearch />
                    <Separator />
                    <ChatList />
                </main>
            </SheetContent>
        </Sheet>
    );
}
