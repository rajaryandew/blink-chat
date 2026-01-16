import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatItem } from "./chat-item";
import { Separator } from "@/components/ui/separator";

export type ChatType = {
    name: string;
    lastMessage: { text: string; timestamp: Date };
    profilePic: string;
};

const chats: ChatType[] = [
    {
        name: "Aryan",
        lastMessage: { text: "yo where you at?", timestamp: new Date() },
        profilePic: "n/a",
    },
    {
        name: "Rohit",
        lastMessage: {
            text: "push the commit already 😭",
            timestamp: new Date(),
        },
        profilePic: "n/a",
    },
    {
        name: "Neha",
        lastMessage: { text: "call me when free", timestamp: new Date() },
        profilePic: "n/a",
    },
    {
        name: "Dev",
        lastMessage: {
            text: "tailwind cooked this UI ngl",
            timestamp: new Date(),
        },
        profilePic: "n/a",
    },
    {
        name: "Kunal",
        lastMessage: { text: "DSA grind when?", timestamp: new Date() },
        profilePic: "n/a",
    },
    {
        name: "Aman",
        lastMessage: {
            text: "bro it works on my machine",
            timestamp: new Date(),
        },
        profilePic: "n/a",
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
