"use client"
import { AppSidebar } from "./_app-components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MessageTabProvider } from "./contexts";
import { useEffect } from "react";
import { socketConnect } from "@/lib/socket/socket";
import { auth } from "@/lib/auth/auth";
import { authClient } from "@/lib/auth/auth-client";

export default function AppLayout({ children }: { children: React.ReactNode }) {

    const {data:session} = authClient.useSession()

    useEffect(() => socketConnect(session?.user.id!))

    return (
        <SidebarProvider defaultOpen={false}>
            <MessageTabProvider>
                <AppSidebar />
                <SidebarInset>{children}</SidebarInset>
            </MessageTabProvider>
        </SidebarProvider>
    );
}
