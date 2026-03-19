"use client";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { messageTabContext } from "../../contexts";
import { ChatSearch } from "./chat-search";
import { ChatList } from "./chat-list";
import { Separator } from "@/components/ui/separator";
import { ChatCreate } from "./chat-add";
import { useIsMobile } from "@/hooks/use-mobile";

export function ChatTab() {
    const { isMessageTabOpen: isOpen, setIsMessageTabOpen: setIsOpen } =
        useContext(messageTabContext)!;

    const isMobile = useIsMobile()

    return (
        <Sheet open={isMobile ? true : isOpen} onOpenChange={setIsOpen} modal={false}>
            <SheetContent className="absolute md:w-[400px] sm:w-screen" side="left">
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
