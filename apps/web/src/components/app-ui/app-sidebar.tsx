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
} from "../ui/sidebar";
import { Separator } from "../ui/separator";

export function AppSidebar() {
    const iconProps = {
        strokeWidth: "1.5",
        size: "35",
    };
    return (
        <Sidebar className="py-6" variant="inset" collapsible="icon">
            <SidebarHeader className="mb-2 grid place-items-center">
                <GalleryVerticalEnd {...iconProps} size={"30"} />
            </SidebarHeader>
            <Separator />
            <SidebarContent className="flex flex-col justify-start items-center gap-4 py-4">
                <MessageSquare {...iconProps} size={"30"} />
            </SidebarContent>
            <Separator />
            <SidebarFooter className="grid place-items-center my-6 gap-6">
                <Settings {...iconProps} />
                <CircleUser {...iconProps} />
            </SidebarFooter>
        </Sidebar>
    );
}
