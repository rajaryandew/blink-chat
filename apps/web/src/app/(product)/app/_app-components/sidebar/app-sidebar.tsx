"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    AppIcon,
    MessageIcon,
    ProfileIcon,
    SettingsIcon,
} from "./sidebar-icons";

export function AppSidebar() {
    return (
        <Sidebar className="w-16 h-screen" variant="inset" collapsible="none">
            <SidebarHeader className="mb-2 mt-6 grid place-items-center">
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
