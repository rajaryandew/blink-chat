"use client";
import { io, Socket } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../config";
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "@repo/schema/socket";
import { registerAuthEvents } from "./handlers/auth.socket";
import { registerChatEvents } from "./handlers/chat.socket";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    SOCKET_SERVER_URL,
    { autoConnect: false },
);

socket.on("connect", () => {
    console.log("connected");
    console.log(socket.id);
});

socket.on("disconnect", () => {
    console.log("disconneted");
});

export function socketConnect(userId: string) {
    socket.auth = { userId };
    socket.connect();

    registerAuthEvents()
    registerChatEvents()
}
