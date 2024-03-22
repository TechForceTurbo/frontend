import { useEffect } from 'react'
import io from 'socket.io-client'

const SocketComponent: React.FC = () => {
  useEffect(() => {
    const socket = io('http://localhost:3000')

    socket.on('connect', () => {
      console.log('Connected to server')
    })

    socket.on('message', (data: any) => {
      console.log('Message received:', data)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return null
}

export default SocketComponent
