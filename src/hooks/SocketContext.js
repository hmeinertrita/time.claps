import React, { createContext, useState, useContext } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext({})

const SocketProvider = props => {
  const [socket] = useState(io(process.env.REACT_APP_HOST))

  socket.on('_ping_', () => {
    console.log('ping recieved! ponging...')
    socket.emit('_pong_')
  })

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  )
}

const useSocket = () => {
  return useContext(SocketContext)
}

const useId = () => {
  return useContext(SocketContext).id
}

export { SocketProvider, SocketContext, useSocket, useId }
