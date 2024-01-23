import { useEffect } from "react"
import {io} from "socket.io-client"

export const socket = io("http://localhost:3001")

export const SocketManager = ()=>{
  useEffect(()=>{
    function onConnect(){
      console.log("Connected")
    }
    function onDisconnect(){
      console.log("")
    }

    function onHello(){
      console.log("hello")
    }
 
    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("hello", onHello)

    return ()=>{
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("hello", onHello)
    }
  })
  
}