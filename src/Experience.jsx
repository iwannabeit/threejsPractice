import { OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Lights from './Lights.jsx'
import {Level} from './Level.jsx'
import Player from './Player.jsx'
import useGame from './stores/useGame.jsx'
import { useAtom } from 'jotai'
import { PlayerAtom } from './SocketManager.jsx'

export default function Experience()
{
    const blocksCount = useGame((state)=> {return state.blocksCount})
    const blocksSeed = useGame(state => state.blocksSeed)

    //socket관련
    const [players] = useAtom(PlayerAtom)

    
    return <>
        <color args={ [ '#bdedfc' ] } attach="background" />

        <OrbitControls makeDefault />
        <Physics debug ={false}>{
            players.map((player) => (
                <Player key={player.id} id={player.id} position={player.position}/>
            ))
        }
            <Lights />
            <Level count={blocksCount} seed={blocksSeed}/>
        </Physics>

    </>
}