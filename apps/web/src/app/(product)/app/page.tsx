
import { ChatTab } from "./_app-components/chat-tab/chat-tab";

export default function AppPage() {

    return (
        <main suppressHydrationWarning className="relative h-full overflow-hidden">
            <ChatTab/>    
        </main>
    );
}
