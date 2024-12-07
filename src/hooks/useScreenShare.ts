import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSocket } from './useSocket';

export function useScreenShare() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const socket = useSocket();

  const createRoom = useCallback(() => {
    const newRoomId = uuidv4();
    setRoomId(newRoomId);
    return newRoomId;
  }, []);

  const joinRoom = useCallback((id: string) => {
    setRoomId(id);
  }, []);

  const leaveRoom = useCallback(() => {
    if (roomId && socket) {
      socket.emit('leave-room', { roomId });
      setRoomId(null);
    }
  }, [roomId, socket]);

  return {
    roomId,
    createRoom,
    joinRoom,
    leaveRoom
  };
}