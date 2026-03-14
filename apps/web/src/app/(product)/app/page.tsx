
import { socket } from "@/lib/socket/socket";
import { ChatTab } from "./_app-components/chat-tab/chat-tab";

export default function AppPage() {

    return (
        <main className="relative h-full overflow-hidden">
            <ChatTab/>    
        </main>
    );
}
