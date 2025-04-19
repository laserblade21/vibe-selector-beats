
import React, { useState, useEffect } from 'react';
import MoodSelector from '@/components/MoodSelector';
import PlaylistView from '@/components/PlaylistView';
import MusicPlayer from '@/components/MusicPlayer';
import RecommendationView from '@/components/RecommendationView';
import { Playlist, Mood, playlists } from '@/data/playlists';
import { useToast } from '@/components/ui/use-toast';
import { Music } from 'lucide-react';
import { useRecommendationEngine } from '@/hooks/useRecommendationEngine';

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [recentlyPlayed, setRecentlyPlayed] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Initialize our recommendation engine
  const { recommendations, weights, provideFeedback, resetWeights } = useRecommendationEngine(
    selectedMood,
    currentSong,
    recentlyPlayed
  );
  
  // Effect for mock progress increase when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 0.5;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);
  
  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setCurrentPlaylist(playlists[mood]);
    toast({
      title: `${mood.charAt(0).toUpperCase() + mood.slice(1)} mood selected!`,
      description: `We've created a ${mood} playlist just for you.`,
    });
  };
  
  const handlePlaySong = (songId: string) => {
    // Add current song to recently played if it exists
    if (currentSong) {
      setRecentlyPlayed(prev => {
        const newRecent = [currentSong, ...prev.slice(0, 4)];
        return [...new Set(newRecent)]; // Remove duplicates
      });
    }
    
    setCurrentSong(songId);
    setIsPlaying(true);
    setProgress(0);
  };
  
  const handleFeedback = (songId: string, isPositive: boolean) => {
    provideFeedback(songId, isPositive);
    
    toast({
      title: isPositive ? "Thanks for your feedback!" : "We'll improve your recommendations",
      description: isPositive 
        ? "We'll recommend more music like this." 
        : "We've adjusted our recommendations based on your feedback.",
    });
  };
  
  const handlePause = () => {
    setIsPlaying(false);
  };
  
  const handlePlay = () => {
    if (!currentSong && currentPlaylist?.songs.length) {
      setCurrentSong(currentPlaylist.songs[0].id);
    }
    setIsPlaying(true);
  };
  
  const handleNext = () => {
    if (!currentPlaylist || !currentSong) return;
    
    // Add current song to recently played
    setRecentlyPlayed(prev => {
      const newRecent = [currentSong, ...prev.slice(0, 4)];
      return [...new Set(newRecent)]; // Remove duplicates
    });
    
    const currentIndex = currentPlaylist.songs.findIndex(song => song.id === currentSong);
    const nextIndex = (currentIndex + 1) % currentPlaylist.songs.length;
    setCurrentSong(currentPlaylist.songs[nextIndex].id);
    setProgress(0);
  };
  
  const handlePrevious = () => {
    if (!currentPlaylist || !currentSong) return;
    
    const currentIndex = currentPlaylist.songs.findIndex(song => song.id === currentSong);
    const prevIndex = (currentIndex - 1 + currentPlaylist.songs.length) % currentPlaylist.songs.length;
    setCurrentSong(currentPlaylist.songs[prevIndex].id);
    setProgress(0);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    setIsMuted(value[0] === 0);
  };
  
  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleProgressChange = (value: number[]) => {
    setProgress(value[0]);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-24">
      <header className="container py-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Music className="h-8 w-8" />
          <h1 className="text-4xl font-bold">Vibe Selector</h1>
        </div>
        <p className="text-muted-foreground">Discover music that matches your mood</p>
      </header>
      
      <main className="container space-y-10 pb-24">
        <MoodSelector onMoodSelect={handleMoodSelect} selectedMood={selectedMood} />
        
        {selectedMood && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentPlaylist && (
              <PlaylistView
                playlist={currentPlaylist}
                mood={selectedMood}
                isPlaying={isPlaying}
                currentSong={currentSong}
                onPlay={handlePlaySong}
                onPause={handlePause}
              />
            )}
            
            <RecommendationView
              recommendations={recommendations}
              weights={weights}
              onPlaySong={handlePlaySong}
              onFeedback={handleFeedback}
              onResetWeights={resetWeights}
            />
          </div>
        )}
      </main>
      
      {currentPlaylist && currentSong && selectedMood && (
        <MusicPlayer
          playlist={currentPlaylist}
          currentSong={currentSong}
          mood={selectedMood}
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onVolumeChange={handleVolumeChange}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          volume={volume}
          progress={progress}
          onProgressChange={handleProgressChange}
        />
      )}
    </div>
  );
};

export default Index;
