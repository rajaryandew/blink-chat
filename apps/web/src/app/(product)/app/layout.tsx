import { AppSidebar } from "./_app-components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MessageTabProvider, SocketProvider } from "./contexts";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SocketProvider>
            <SidebarProvider defaultOpen={false}>
                <MessageTabProvider>
                    <AppSidebar />
                    <SidebarInset>{children}</SidebarInset>
                </MessageTabProvider>
            </SidebarProvider>
        </SocketProvider>
    );
}
