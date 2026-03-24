"use client";
import { io, Socket } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../config";
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "@repo/schema/socket";
import { registerAuthEvents } from "./handlers/auth.socket";
import { Chat } from "@repo/schema/chat";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    SOCKET_SERVER_URL,
    { autoConnect: false },
);

socket.on("connect", () => {
    console.log("connected");
});

socket.on("disconnect", () => {
    console.log("disconnected");
});

export function socketConnect(userId: string) {
    socket.auth = { userId };
    socket.connect();

    registerAuthEvents();
}

export function connectToRooms(chatList: Chat[] | null) {
    if(!chatList) return
    socket.emit("chat:connect", chatList);
}
