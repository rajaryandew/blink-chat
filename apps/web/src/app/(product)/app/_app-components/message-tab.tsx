"use client";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { MessageTabContext } from "../contexts";

export function MessageTab() {
    const { isMessageTabOpen: isOpen, setIsMessageTabOpen: setIsOpen } =
        useContext(MessageTabContext)!;

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
            <SheetContent className="absolute w-[300px]" side="left">
                <SheetHeader>
                    <SheetTitle>Heloo</SheetTitle>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}
