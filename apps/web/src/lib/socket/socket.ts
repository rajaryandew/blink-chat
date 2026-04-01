"use client";
import { io, Socket } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../config";
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "@repo/schema/socket";
import { registerAuthEvents } from "./handlers/auth.socket";
import { Chat } from "@repo/schema/chat";
import { toast } from "sonner";

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

socket.on("connect_error",() => {
    toast.error("Failed connecting to the server!!! Trying again!")
    setTimeout(() => {
        socket.connect()
    },4000)
})

export function socketConnect(userId: string) {
    socket.auth = { userId };
    socket.connect();

    registerAuthEvents();
}

export function connectToRooms(chatList: Chat[] | null) {
    if(!chatList) return
    socket.emit("chat:connect", chatList);
}
