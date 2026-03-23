"use client";
import { AppSidebar } from "./_app-components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChatListProvider, MessageTabProvider } from "./contexts";
import { useEffect } from "react";
import { socketConnect } from "@/lib/socket/socket";
import { authClient } from "@/lib/auth/auth-client";
import { ChatTab } from "./_app-components/chat-tab/chat-tab";
import { handleMessgeCreated } from "@/lib/client-handlers/message.handlers";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { data: session } = authClient.useSession();

    useEffect(() => {
        if (!session?.user.id) return;

        socketConnect(session?.user.id!);
    }, [session?.user.id]);

    return (
        <SidebarProvider defaultOpen={false}>
            <MessageTabProvider>
                <AppSidebar />
                <SidebarInset>
                    <main className="relative h-full overflow-hidden flex flex-row">
                        <ChatListProvider>
                            <ChatTab />
                            {children}
                        </ChatListProvider>
                    </main>
                </SidebarInset>
            </MessageTabProvider>
        </SidebarProvider>
    );
}
