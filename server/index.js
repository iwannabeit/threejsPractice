import { Server } from "socket.io"

const io = new Server({
  cors: {
    origin: ["http://localhost:5173","http://192.168.1.243:5173"]
  },
})

io.listen(3001)

io.on("connection", (socket)=>{
  console.log('user connecter!!!!!!!')

  socket.emit("hello")

  socket.on("disconnect", ()=>{
    console.log('user disconnected')
  })
})