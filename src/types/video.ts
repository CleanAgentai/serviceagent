export interface VideoCallParticipant {
  id: string;
  name: string;
  role: 'interviewer' | 'candidate';
  stream?: MediaStream;
  audio: boolean;
  video: boolean;
}

export interface VideoCallState {
  roomId: string;
  participants: VideoCallParticipant[];
  localStream?: MediaStream;
  isConnected: boolean;
  error?: string;
}

export interface VideoCallControls {
  toggleAudio: () => void;
  toggleVideo: () => void;
  shareScreen: () => void;
  endCall: () => void;
} 