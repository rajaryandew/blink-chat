import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function ChatSearch(){
    return (
        <div className="flex items-center">
            <Search className="absolute left-[7%]" strokeWidth="1.25" />
            <Input
                className="pl-[14%] font-medium focus-visible:ring-0 focus-visible:ring-offset-0 rounded-3xl"
                type="text"
                placeholder="Search chats"
            />
        </div>
    );
}