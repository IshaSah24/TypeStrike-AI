import React from 'react'
import GameLobby from './GameLobby'
import GameNavigation from './GameNavigation'

const CreateJoinRoomPage = () => {
  return (
<div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-950 to-black">
        <GameNavigation/>
        <GameLobby />
    </div>
  )
}

export default CreateJoinRoomPage