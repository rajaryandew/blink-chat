import { Server } from "socket.io";
import { PORT } from "../config";
import { verifyUser } from "./lib/auth/verify-user";

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
    console.log(`someone connected with socketId:${socket.id}`)  
})

io.listen(3001)