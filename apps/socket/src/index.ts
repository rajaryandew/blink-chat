import { Server, Socket } from "socket.io";
import { PORT } from "../config";
import { verifyUser } from "./lib/auth/verify-user";
import { registerChatHandlers } from "./lib/handlers/chatHandler";
import {
    ClientToServerEvents,
    ServerToClientEvents,
} from "@repo/schema/socket";
import { registerMessageHandlers } from "./lib/handlers/messageHandler";

export type SocketType = Socket<ClientToServerEvents, ServerToClientEvents>;
export type ServerType = Server<ClientToServerEvents, ServerToClientEvents>;

const io = new Server<ClientToServerEvents, ServerToClientEvents>(PORT, {
    cors: {
        origin: "*",
    },
});

io.on("connection", async (socket) => {
    
    const { response } = await verifyUser(socket);
    if (response !== 200) {
        socket.emit("unauthorized");
        console.log("user not authorized");
        socket.disconnect(true);
    }

    let count = 0;

    setInterval(() => {
        count = 0;
    }, 1000);

    socket.onAny((event) => {
        if(count >= 100){
            socket.emit("rate:limited")
        }
        if (event === "chat:typing") return;
        count++;
    });

    socket.join(socket.handshake.auth.userId);
    registerChatHandlers(socket, io);
    registerMessageHandlers(socket, io);
    console.log(`someone connected with socketId:${socket.id}`);
});
