import React, { useEffect } from 'react'
import io from 'socket.io-client'

const SocketComponent: React.FC = () => {
  useEffect(() => {
    const socket = io('http://localhost:3000')

    socket.on('connect', () => {
      console.log('Connected to server', socket.id)
    })

    socket.on('message', (data: any) => {
      console.log('Message received:', data)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected')
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return null
}

export default SocketComponent
