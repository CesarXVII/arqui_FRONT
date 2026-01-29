import { io } from 'socket.io-client';
import { BASE_URL } from '../utils/constants';

let socket = null;

export function initSocket(namespace = '/editor') {
  if (!socket) {
    socket = io(`${BASE_URL}${namespace}`, {
      transports: ['websocket'],
      reconnection: true,
    });

    socket.on('connect', () => {
      console.log('🟢 Socket conectado:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket desconectado');
    });
  }
  return socket;
}

export function getSocket() {
  if (!socket) {
    return initSocket();
  }
  return socket;
}