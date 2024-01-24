import { useAtom, atom } from "jotai"
import { useEffect } from "react"
import {io} from "socket.io-client"

export const socket = io("http://localhost:3001")
export const PlayerAtom = atom([])


export const SocketManager = ()=>{
  const [_players, setPlayers] = useAtom(PlayerAtom)

  useEffect(()=>{
    function onConnect(){
      console.log("Connected")
    }

    function onDisconnect(){
      console.log("disconnect")
    }

    function onHello(){
      console.log("hello do you hear me!!!!")
    }

    function onPlayers(value){ 
      setPlayers(value)
    }
 
    socket.on("updatePlayer", ({id, position})=>{
      setPlayers((prevPlayers)=>{
        return prevPlayers.map((player)=>{
          return player.id === id ? {...player, position} : player
        })
      })
    })

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)
    socket.on("hello", onHello)
    socket.on("Players", onPlayers)
    
    return ()=>{
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
      socket.off("hello", onHello)
    }
  })
  
}