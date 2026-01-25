import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatItem } from "./chat-item";

export type ChatType = {
    id: string;
    name: string;
    lastMessage: { text: string; timestamp: Date };
    profilePic: string | null;
};

const chats: ChatType[] = [
    {
        id: "a1f3c9e2",
        name: "Aryan",
        lastMessage: { text: "yo where you at?", timestamp: new Date() },
        profilePic: null,
    },
    {
        id: "b7d82a4f",
        name: "Rohit",
        lastMessage: {
            text: "push the commit already 😭",
            timestamp: new Date(),
        },
        profilePic: null,
    },
    {
        id: "c93e1d6a",
        name: "Neha",
        lastMessage: { text: "call me when free", timestamp: new Date() },
        profilePic: null,
    },
    {
        id: "d4a8f2c1",
        name: "Dev",
        lastMessage: {
            text: "tailwind cooked this UI ngl",
            timestamp: new Date(),
        },
        profilePic: null,
    },
    {
        id: "e61c9b73",
        name: "Kunal",
        lastMessage: { text: "DSA grind when?", timestamp: new Date() },
        profilePic: null,
    },
    {
        id: "f9d2a5e8",
        name: "Aman",
        lastMessage: {
            text: "bro it works on my machine",
            timestamp: new Date(),
        },
        profilePic: null,
    },
];

const chatList = chats.map((msg) => <ChatItem metadata={msg} key={msg.name} />);

export function ChatList() {
    return (
        <ScrollArea>
            <main className="flex flex-col gap-3">{chatList}</main>
        </ScrollArea>
    );
}
