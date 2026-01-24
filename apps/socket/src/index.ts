import { Server } from "socket.io";

const io = new Server({
    cors:{
        origin:"*"
    }
})

io.on('connection',(socket) => {
    console.log("user connected")
    socket.on("message:send",text => {
        console.log(text)
        socket.emit("thanks")
    })
})

io.listen(3001)
