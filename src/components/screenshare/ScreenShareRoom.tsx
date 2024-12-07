import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import { useSocket } from '../../hooks/useSocket';
import { ScreenShareControls } from './ScreenShareControls';
import { AnnotationCanvas } from './AnnotationCanvas';
import { useAuthContext } from '../../contexts/AuthContext';

interface ScreenShareRoomProps {
  roomId: string;
  onClose: () => void;
}

export function ScreenShareRoom({ roomId, onClose }: ScreenShareRoomProps) {
  const { user } = useAuthContext();
  const socket = useSocket();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [isViewer, setIsViewer] = useState(false);
  const peerRef = useRef<Peer.Instance | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.emit('join-room', { roomId, userId: user?.id });

    socket.on('user-connected', async ({ userId }) => {
      if (isSharing) {
        const peer = createPeer(userId, socket, streamRef.current!);
        peerRef.current = peer;
      }
    });

    socket.on('receive-signal', ({ signal, userId }) => {
      const peer = addPeer(signal, userId, socket);
      peerRef.current = peer;
    });

    socket.on('receiving-returned-signal', ({ signal }) => {
      peerRef.current?.signal(signal);
    });

    return () => {
      socket.off('user-connected');
      socket.off('receive-signal');
      socket.off('receiving-returned-signal');
      stopSharing();
    };
  }, [socket, roomId, user?.id, isSharing]);

  const startSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      
      streamRef.current = stream;
      setStream(stream);
      setIsSharing(true);

      stream.getVideoTracks()[0].onended = () => {
        stopSharing();
      };

      socket?.emit('start-sharing', { roomId });
    } catch (error) {
      console.error('Error starting screen share:', error);
    }
  };

  const stopSharing = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
    setStream(null);
    setIsSharing(false);
    peerRef.current?.destroy();
    peerRef.current = null;
  };

  const createPeer = (userId: string, socket: any, stream: MediaStream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socket.emit('sending-signal', { userId, signal, roomId });
    });

    return peer;
  };

  const addPeer = (incomingSignal: Peer.SignalData, userId: string, socket: any) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
    });

    peer.on('signal', signal => {
      socket.emit('returning-signal', { signal, userId, roomId });
    });

    peer.on('stream', stream => {
      setStream(stream);
      setIsViewer(true);
    });

    peer.signal(incomingSignal);

    return peer;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl mx-4 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Screen Sharing Session</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <div className="relative">
          {stream ? (
            <>
              <video
                ref={video => {
                  if (video) video.srcObject = stream;
                }}
                autoPlay
                className="w-full h-[600px] bg-black"
              />
              <AnnotationCanvas />
            </>
          ) : (
            <div className="w-full h-[600px] bg-gray-100 flex items-center justify-center">
              {!isViewer && (
                <button
                  onClick={startSharing}
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Start Screen Share
                </button>
              )}
              {isViewer && (
                <p className="text-gray-500">Waiting for host to share screen...</p>
              )}
            </div>
          )}
        </div>

        <ScreenShareControls
          isSharing={isSharing}
          onStopSharing={stopSharing}
          roomId={roomId}
        />
      </div>
    </div>
  );
}