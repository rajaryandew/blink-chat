"use client";

import { CircleUser, GalleryVerticalEnd, Settings } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { messageTabContext } from "../../contexts";
import { MessageActive, MessageInactive } from "@/components/ui/icons";

const iconProps = {
    strokeWidth: "1.5",
    size: "35",
};

export function ProfileIcon() {
    return (
        <Link href="/app/profile">
            <CircleUser {...iconProps} />
        </Link>
    );
}

export function SettingsIcon() {
    return (
        <Link href="/app/settings">
            <Settings {...iconProps} />
        </Link>
    );
}

export function AppIcon() {
    return (
        <Link href="/app">
            <GalleryVerticalEnd {...iconProps} size={"30"} />
        </Link>
    );
}

export function MessageIcon() {
    const { isMessageTabOpen: isTabOpen, setIsMessageTabOpen } =
        useContext(messageTabContext)!;

    return (
        <div className="" onClick={() => setIsMessageTabOpen((val) => !val)}>
            {isTabOpen ? <MessageActive /> : <MessageInactive />}
        </div>
    );
}
