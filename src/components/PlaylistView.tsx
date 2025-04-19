
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Playlist, Mood, moodBackgrounds } from "@/data/playlists";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaylistViewProps {
  playlist: Playlist;
  mood: Mood;
  isPlaying: boolean;
  currentSong: string | null;
  onPlay: (songId: string) => void;
  onPause: () => void;
}

const PlaylistView: React.FC<PlaylistViewProps> = ({ 
  playlist, 
  mood, 
  isPlaying, 
  currentSong, 
  onPlay, 
  onPause 
}) => {
  return (
    <Card className="w-full overflow-hidden">
      <div className={`h-32 bg-gradient-to-r ${moodBackgrounds[mood]} flex items-center justify-center`}>
        <h2 className="text-3xl font-bold text-white">{playlist.name}</h2>
      </div>
      
      <CardHeader>
        <CardTitle>{playlist.name}</CardTitle>
        <CardDescription>{playlist.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-2">
          {playlist.songs.map((song) => (
            <li key={song.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                  <img src={`${song.cover}?w=40&h=40&fit=crop&auto=format`} alt={song.title} className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-medium">{song.title}</h4>
                  <p className="text-sm text-muted-foreground">{song.artist}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{song.duration}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8" 
                  onClick={() => {
                    if (isPlaying && currentSong === song.id) {
                      onPause();
                    } else {
                      onPlay(song.id);
                    }
                  }}
                >
                  {isPlaying && currentSong === song.id ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PlaylistView;
