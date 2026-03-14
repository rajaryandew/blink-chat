import { io, Socket } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../config";

export const socket: Socket = io(SOCKET_SERVER_URL, { autoConnect: false });

socket.on("connect", () => {
    console.log("connected");
    console.log(socket.id);
});

export function socketConnect(){
    socket.connect()
}