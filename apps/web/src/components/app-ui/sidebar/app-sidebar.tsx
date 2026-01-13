"use client";
import {
    CircleUser,
    GalleryVerticalEnd,
    MessageSquare,
    Settings,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "../../ui/sidebar";
import { Separator } from "../../ui/separator";
import { redirect } from "next/navigation";
import {
    AppIcon,
    MessageIcon,
    ProfileIcon,
    SettingsIcon,
} from "./sidebar-icons";

export function AppSidebar() {
    return (
        <Sidebar className="py-6" variant="inset" collapsible="icon">
            <SidebarHeader className="mb-2 grid place-items-center">
                <AppIcon />
            </SidebarHeader>
            <Separator />
            <SidebarContent className="flex flex-col justify-start items-center gap-4 py-4">
                <MessageIcon />
            </SidebarContent>
            <Separator />
            <SidebarFooter className="grid place-items-center my-6 gap-6">
                <SettingsIcon />
                <ProfileIcon />
            </SidebarFooter>
        </Sidebar>
    );
}
