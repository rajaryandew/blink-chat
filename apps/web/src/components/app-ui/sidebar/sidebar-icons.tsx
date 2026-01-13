"use client";

import {
    CircleUser,
    GalleryVerticalEnd,
    MessageSquare,
    Settings,
} from "lucide-react";
import Link from "next/link";

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
    return <MessageSquare {...iconProps} size={"30"} />;
}
