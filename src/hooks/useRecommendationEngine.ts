
import { useState, useEffect } from 'react';
import { Song, Mood, Playlist, playlists } from '@/data/playlists';
import { 
  RecommendationWeights, 
  SongRecommendation, 
  userPreferences, 
  popularityScores, 
  contentSimilarity, 
  collaborativeData,
  generateExplanation,
  defaultWeights,
} from '@/data/recommendationEngine';

export function useRecommendationEngine(
  currentMood: Mood | null, 
  currentSong: string | null,
  recentlyPlayedSongs: string[] = []
) {
  const [weights, setWeights] = useState<RecommendationWeights>(defaultWeights);
  const [recommendations, setRecommendations] = useState<SongRecommendation[]>([]);

  // Generate recommendations whenever inputs change
  useEffect(() => {
    if (currentMood) {
      const newRecommendations = generateRecommendations(
        currentMood, 
        currentSong, 
        recentlyPlayedSongs, 
        weights
      );
      setRecommendations(newRecommendations);
    }
  }, [currentMood, currentSong, recentlyPlayedSongs, weights]);

  // Process user feedback (thumbs up/down)
  const provideFeedback = (songId: string, isPositive: boolean) => {
    let newWeights = { ...weights };
    
    // Find which recommendation type had the highest weight for this song
    const recommendation = recommendations.find(rec => rec.song.id === songId);
    
    if (recommendation) {
      // Find the explanation with the highest weight
      const topExplanation = recommendation.explanations.reduce(
        (prev, current) => current.weight > prev.weight ? current : prev, 
        recommendation.explanations[0]
      );
      
      // Adjust the weight of that recommendation type
      const adjustmentFactor = isPositive ? 0.05 : -0.05;
      const typeKey = topExplanation.type as keyof RecommendationWeights;
      
      newWeights[typeKey] = Math.max(0.1, Math.min(0.6, newWeights[typeKey] + adjustmentFactor));
      
      // Normalize weights to sum to 1
      const sum = Object.values(newWeights).reduce((a, b) => a + b, 0);
      Object.keys(newWeights).forEach(key => {
        newWeights[key as keyof RecommendationWeights] /= sum;
      });
      
      setWeights(newWeights);
      
      // Re-generate recommendations with new weights
      const updatedRecommendations = generateRecommendations(
        currentMood, 
        currentSong, 
        recentlyPlayedSongs, 
        newWeights
      );
      setRecommendations(updatedRecommendations);
    }
  };

  // Reset weights to default
  const resetWeights = () => {
    setWeights(defaultWeights);
  };

  return { recommendations, weights, provideFeedback, resetWeights };
}

// Helper function to generate recommendations
function generateRecommendations(
  currentMood: Mood, 
  currentSong: string | null,
  recentlyPlayedSongs: string[],
  weights: RecommendationWeights
): SongRecommendation[] {
  const allSongs: Song[] = Object.values(playlists).flatMap(playlist => playlist.songs);
  const currentMoodSongs = playlists[currentMood].songs;
  
  // Already played songs (avoid recommending these again)
  const excludeSongIds = new Set([...recentlyPlayedSongs, currentSong]);
  
  // Calculate scores for all songs
  const scoredSongs = allSongs
    .filter(song => !excludeSongIds.has(song.id))
    .map(song => {
      // Collaborative filtering score
      let collaborativeScore = 0;
      if (currentSong && collaborativeData[currentSong]) {
        const collaborativeMatch = collaborativeData[currentSong].find(s => s.id === song.id);
        if (collaborativeMatch) {
          collaborativeScore = collaborativeMatch.score;
        }
      }
      
      // Content-based score
      let contentScore = 0;
      if (currentSong && contentSimilarity[currentSong]) {
        const contentMatch = contentSimilarity[currentSong].find(s => s.id === song.id);
        if (contentMatch) {
          contentScore = contentMatch.score;
        }
      }
      
      // Popularity score
      const popularityScore = popularityScores[song.id] || 0.5;
      
      // Mood-based score
      const moodScore = currentMoodSongs.includes(song) ? 1.0 : 0.2;
      
      // Weighted average score
      const score = (
        (weights.collaborative * collaborativeScore) +
        (weights.content * contentScore) +
        (weights.popularity * popularityScore) +
        (weights.mood * moodScore)
      );
      
      // Generate explanations
      const explanations = [
        generateExplanation(song, 'collaborative', collaborativeScore * weights.collaborative),
        generateExplanation(song, 'content', contentScore * weights.content),
        generateExplanation(song, 'popularity', popularityScore * weights.popularity),
        generateExplanation(song, 'mood', moodScore * weights.mood)
      ].sort((a, b) => b.weight - a.weight);
      
      return {
        song,
        score,
        explanations
      };
    });
  
  // Sort by score and return top 5
  return scoredSongs
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
