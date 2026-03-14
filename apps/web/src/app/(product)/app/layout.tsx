"use client"
import { AppSidebar } from "./_app-components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MessageTabProvider } from "./contexts";
import { useEffect } from "react";
import { socketConnect } from "@/lib/socket/socket";

export default function AppLayout({ children }: { children: React.ReactNode }) {

    useEffect(() => socketConnect())

    return (
        <SidebarProvider defaultOpen={false}>
            <MessageTabProvider>
                <AppSidebar />
                <SidebarInset>{children}</SidebarInset>
            </MessageTabProvider>
        </SidebarProvider>
    );
}
