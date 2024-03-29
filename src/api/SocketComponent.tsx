import io, { Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'ws://91.210.170.43/ws/chat/';

export async function connectToSocket(): Promise<Socket> {
  try {
    const socket: Socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      path: '/ws/chat/',
      reconnection: false,
      query: {},
    });

    socket.on('error', (error: Error) => {
      console.error('WebSocket error:', error);
      throw error;
    });

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('message', (data: any) => {
      console.log('Received message from server:', data);

      // if (data.session_id) {
      //   const session_id: string = data.session_id
      //   document.cookie = `session_id=${session_id}; path=/`
      //   console.log('Session ID has been saved in cookie:', session_id)
      // }
    });

    return socket;
  } catch (error) {
    console.error('Failed to connect to WebSocket server:', error);
    throw error;
  }
}

export default connectToSocket;

// import io from 'socket.io-client'

// const SOCKET_SERVER_URL = 'ws://91.210.170.43/ws/chat/'

// export function connectToSocket () {
//   const socket = io(SOCKET_SERVER_URL, {
//     transports: ['websocket'],
//     path: '/ws/chat/',
//     reconnection: false,
//   })

//   socket.on('error', error => {
//     console.error('WebSocket error:', error)
//   })

//   socket.on('connect', () => {
//     console.log(socket.connected)
//   })

//   socket.on('message', data => {
//     console.log('Received message from server:', data)
//   })

//   return socket
// }

// export default connectToSocket
