import { Server } from "socket.io";
import { PORT } from "../config.ts";
import { verifyUser } from "./lib/auth/verify-user.ts";

const io = new Server(PORT,{
    cors:{
        origin:'*'
    }
})

io.on("connection",async (socket) => {
    const {response} = await verifyUser(socket)
    if(response !== 200){
        socket.emit("unauthorized")
        socket.disconnect()
    }    
})

io.listen(3001)