
import React from 'react';
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Song, Playlist, Mood, moodBackgrounds } from "@/data/playlists";

interface MusicPlayerProps {
  playlist: Playlist | null;
  currentSong: string | null;
  mood: Mood | null;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onVolumeChange: (value: number[]) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  volume: number;
  progress: number;
  onProgressChange: (value: number[]) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  playlist,
  currentSong,
  mood,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onVolumeChange,
  isMuted,
  onToggleMute,
  volume,
  progress,
  onProgressChange
}) => {
  if (!playlist || !currentSong || !mood) {
    return null;
  }

  const song = playlist.songs.find(s => s.id === currentSong);
  if (!song) return null;

  return (
    <Card className={`fixed bottom-0 left-0 right-0 z-50 p-2 md:p-4 bg-gradient-to-r ${mood ? moodBackgrounds[mood] : ''} bg-opacity-95`}>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3 mb-2 md:mb-0">
          <div className="h-12 w-12 rounded-md overflow-hidden">
            <img src={`${song.cover}?w=48&h=48&fit=crop&auto=format`} alt={song.title} className="h-full w-full object-cover" />
          </div>
          <div className="text-white">
            <h4 className="font-medium">{song.title}</h4>
            <p className="text-sm opacity-80">{song.artist}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center w-full md:w-1/2 gap-2">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="text-white" onClick={onPrevious}>
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="bg-white bg-opacity-20 text-white hover:bg-white hover:bg-opacity-30 border-0"
              onClick={isPlaying ? onPause : onPlay}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-white" onClick={onNext}>
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-full flex items-center gap-2">
            <span className="text-xs text-white">0:00</span>
            <Slider 
              className="flex-1" 
              defaultValue={[0]} 
              value={[progress]} 
              max={100}
              step={1}
              onValueChange={onProgressChange} 
            />
            <span className="text-xs text-white">{song.duration}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button variant="ghost" size="icon" className="text-white" onClick={onToggleMute}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <Slider 
            className="w-24" 
            defaultValue={[100]} 
            value={[isMuted ? 0 : volume]} 
            max={100} 
            step={1}
            onValueChange={onVolumeChange} 
          />
        </div>
      </div>
    </Card>
  );
};

export default MusicPlayer;
