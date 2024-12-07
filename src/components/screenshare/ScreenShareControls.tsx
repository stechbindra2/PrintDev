import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, MessageSquare } from 'lucide-react';
import { useSocket } from '../../hooks/useSocket';

interface ScreenShareControlsProps {
  isSharing: boolean;
  onStopSharing: () => void;
  roomId: string;
}

export function ScreenShareControls({
  isSharing,
  onStopSharing,
  roomId
}: ScreenShareControlsProps) {
  const socket = useSocket();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [message, setMessage] = useState('');

  const toggleAudio = () => {
    setIsMuted(!isMuted);
    socket?.emit('toggle-audio', { roomId, isMuted: !isMuted });
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    socket?.emit('toggle-video', { roomId, isVideoOff: !isVideoOff });
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      socket?.emit('send-message', { roomId, message });
      setMessage('');
    }
  };

  return (
    <div className="p-4 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleAudio}
            className={`p-3 rounded-full ${
              isMuted ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'
            } hover:bg-gray-200 transition-colors`}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full ${
              isVideoOff ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-700'
            } hover:bg-gray-200 transition-colors`}
          >
            {isVideoOff ? (
              <VideoOff className="h-5 w-5" />
            ) : (
              <Video className="h-5 w-5" />
            )}
          </button>

          {isSharing && (
            <button
              onClick={onStopSharing}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Stop Sharing
            </button>
          )}
        </div>

        <form onSubmit={sendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <button
            type="submit"
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <MessageSquare className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}