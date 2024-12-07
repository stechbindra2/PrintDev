import { Server } from 'socket.io';

export function initializeScreenShare(io) {
  io.on('connection', (socket) => {
    socket.on('join-room', ({ roomId, userId }) => {
      socket.join(roomId);
      socket.to(roomId).emit('user-connected', { userId });
    });

    socket.on('sending-signal', ({ userId, signal, roomId }) => {
      io.to(roomId).emit('receive-signal', { signal, userId });
    });

    socket.on('returning-signal', ({ signal, userId, roomId }) => {
      io.to(roomId).emit('receiving-returned-signal', { signal, userId });
    });

    socket.on('start-sharing', ({ roomId }) => {
      socket.to(roomId).emit('user-started-sharing');
    });

    socket.on('draw', ({ start, end, roomId }) => {
      socket.to(roomId).emit('draw-line', { start, end });
    });

    socket.on('toggle-audio', ({ roomId, isMuted }) => {
      socket.to(roomId).emit('user-toggled-audio', { userId: socket.id, isMuted });
    });

    socket.on('toggle-video', ({ roomId, isVideoOff }) => {
      socket.to(roomId).emit('user-toggled-video', { userId: socket.id, isVideoOff });
    });

    socket.on('send-message', ({ roomId, message }) => {
      io.to(roomId).emit('new-message', {
        userId: socket.id,
        message,
        timestamp: new Date()
      });
    });
  });
}