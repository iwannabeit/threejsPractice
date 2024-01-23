import { Server } from "socket.io"

const io = new Server({
  cors: {
    origin: ["http://localhost:5173","http://192.168.1.243:5173"]
  },
})

io.listen(3001)

const Players = []

io.on("connection", (socket)=>{
  console.log('user connecter!!!!!!!')

  Players.push({
    id: socket.id,
    position: {x: Math.random()*200 - 100, y: 1, z:Math.random()*200 - 100}
  })

  socket.emit("hello")

  io.emit("Players", Players)

  socket.on("disconnect", ()=>{
    console.log('user disconnected')

    //연결 끊으면(페이지 나가면) 삭제해버림
    Players.splice(
      Players.findIndex((player)=> player.id === socket.id),
      1
    )
    //그리고 다시 업데이트해줌
    io.emit("Players", Players)
    
  })
})