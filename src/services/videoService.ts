import { VideoCallParticipant, VideoCallState } from '../types/video';

class VideoService {
  private peerConnection?: RTCPeerConnection;
  private localStream?: MediaStream;
  public onRemoteStreamUpdate?: (stream: MediaStream) => void;
  public onParticipantStatusChange?: (participantId: string, status: 'connecting' | 'connected' | 'disconnected') => void;

  async initializeCall(roomId: string): Promise<VideoCallState> {
    try {
      this.localStream = await this.startLocalStream();

      return {
        roomId,
        participants: [],
        localStream: this.localStream,
        isConnected: false
      };
    } catch (error) {
      console.error('Failed to initialize call:', error);
      throw error;
    }
  }

  async startLocalStream(): Promise<MediaStream> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      return stream;
    } catch (error) {
      console.error('Failed to get local stream:', error);
      throw error;
    }
  }

  async joinRoom(roomId: string): Promise<void> {
    // Implementation for joining a room
  }

  async leaveRoom(roomId: string): Promise<void> {
    if (this.peerConnection) {
      this.peerConnection.close();
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
  }

  async toggleAudio(): Promise<boolean> {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        return audioTrack.enabled;
      }
    }
    return false;
  }

  async toggleVideo(): Promise<boolean> {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        return videoTrack.enabled;
      }
    }
    return false;
  }

  async shareScreen(): Promise<MediaStream | null> {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      return screenStream;
    } catch (error) {
      console.error('Failed to share screen:', error);
      return null;
    }
  }

  cleanup(): void {
    if (this.peerConnection) {
      this.peerConnection.close();
    }
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
    this.onRemoteStreamUpdate = undefined;
    this.onParticipantStatusChange = undefined;
  }
}

export const videoService = new VideoService(); 