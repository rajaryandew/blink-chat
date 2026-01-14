import { AppSidebar } from "./_app-components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import MessageTabProvider from "./contexts";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen={false}>
            <MessageTabProvider>
                <AppSidebar />
                <SidebarInset>{children}</SidebarInset>
            </MessageTabProvider>
        </SidebarProvider>
    );
}
