import React, { useState, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { videoService } from '../../../services/videoService';
import { VideoCallParticipant } from '../../../types/video';
import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  ScreenShare,
  CallEnd
} from '@mui/icons-material';

interface VideoChatProps {
  roomId: string;
  onEndCall?: () => void;
}

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

const VideoChat: React.FC<VideoChatProps> = ({ roomId, onEndCall }) => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');

  useEffect(() => {
    const initializeCall = async () => {
      try {
        const { localStream } = await videoService.initializeCall(roomId);
        setLocalStream(localStream || null);

        videoService.onRemoteStreamUpdate = (stream) => {
          setRemoteStream(stream);
        };

        videoService.onParticipantStatusChange = (_, status) => {
          setConnectionStatus(status);
        };

        await videoService.joinRoom(roomId);
      } catch (error) {
        console.error('Failed to initialize video call:', error);
      }
    };

    initializeCall();

    return () => {
      videoService.cleanup();
    };
  }, [roomId]);

  const handleToggleAudio = async () => {
    try {
      const isEnabled = await videoService.toggleAudio();
      setAudioEnabled(isEnabled);
    } catch (error) {
      console.error('Failed to toggle audio:', error);
    }
  };

  const handleToggleVideo = async () => {
    try {
      const isEnabled = await videoService.toggleVideo();
      setVideoEnabled(isEnabled);
    } catch (error) {
      console.error('Failed to toggle video:', error);
    }
  };

  const handleEndCall = () => {
    videoService.cleanup();
    onEndCall?.();
  };

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Video Streams */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        {/* Local Video */}
        <Box sx={{ width: '30%', aspectRatio: '16/9', bgcolor: 'black' }}>
          {localStream && (
            <video
              autoPlay
              muted
              playsInline
              ref={(video) => {
                if (video && localStream) video.srcObject = localStream;
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </Box>

        {/* Remote Video */}
        <Box sx={{ width: '70%', aspectRatio: '16/9', bgcolor: 'black' }}>
          {remoteStream && (
            <video
              autoPlay
              playsInline
              ref={(video) => {
                if (video && remoteStream) video.srcObject = remoteStream;
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </Box>
      </Box>

      {/* Controls */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 2,
          bgcolor: 'rgba(0,0,0,0.5)',
          padding: 2,
          borderRadius: 2
        }}
      >
        <IconButton onClick={handleToggleAudio} color="primary">
          {audioEnabled ? <Mic /> : <MicOff />}
        </IconButton>
        <IconButton onClick={handleToggleVideo} color="primary">
          {videoEnabled ? <Videocam /> : <VideocamOff />}
        </IconButton>
        <IconButton onClick={handleEndCall} color="error">
          <CallEnd />
        </IconButton>
      </Box>

      {/* Status */}
      {connectionStatus !== 'connected' && (
        <Typography
          variant="subtitle1"
          sx={{
            position: 'absolute',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.5)',
            padding: 1,
            borderRadius: 1
          }}
        >
          {connectionStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
        </Typography>
      )}
    </Box>
  );
};

export default VideoChat; 