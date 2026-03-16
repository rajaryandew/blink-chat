import { Server } from "socket.io";
import { PORT } from "../config";
import { verifyUser } from "./lib/auth/verify-user";
import { registerChatHandlers } from "./lib/handlers/chatHandler";
import { ClientToServerEvents, ServerToClientEvents } from "@repo/schema/socket";

const io = new Server<ClientToServerEvents,ServerToClientEvents>(PORT, {
    cors: {
        origin: "*",
    },
});

io.on("connection", async (socket) => {
    const { response } = await verifyUser(socket);
    if (response !== 200) {
        socket.emit("unauthorized");
        console.log("user not authorized")
        socket.disconnect(true);
    }
    
    registerChatHandlers(socket, io);
    console.log(`someone connected with socketId:${socket.id}`);
});
