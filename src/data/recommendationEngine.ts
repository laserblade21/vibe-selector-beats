
import { Playlist, Song, Mood } from './playlists';

// Recommendation types
export type RecommendationType = 'collaborative' | 'content' | 'popularity' | 'mood';

// Structure for recommendation weights
export interface RecommendationWeights {
  collaborative: number;
  content: number;
  popularity: number;
  mood: number;
}

// Structure for recommendation explanation
export interface RecommendationExplanation {
  type: RecommendationType;
  reason: string;
  weight: number;
}

// Structure for song recommendation
export interface SongRecommendation {
  song: Song;
  score: number;
  explanations: RecommendationExplanation[];
}

// Default weights for different recommendation types
export const defaultWeights: RecommendationWeights = {
  collaborative: 0.25,
  content: 0.25,
  popularity: 0.25,
  mood: 0.25,
};

// Simulated user preferences (would typically come from a database)
export const userPreferences = {
  favoriteArtists: ['Adele', 'Coldplay', 'Queen', 'Ludovico Einaudi', 'Dua Lipa'],
  favoriteGenres: ['pop', 'rock', 'classical', 'electronic'],
  recentlyPlayed: ['h2', 's1', 'e4', 'c3', 'f2'],
};

// Simulated popularity data (would typically come from analytics)
export const popularityScores: Record<string, number> = {
  'h1': 0.75, 'h2': 0.95, 'h3': 0.85, 'h4': 0.90, 'h5': 0.80,
  's1': 0.92, 's2': 0.85, 's3': 0.70, 's4': 0.82, 's5': 0.78,
  'e1': 0.88, 'e2': 0.75, 'e3': 0.82, 'e4': 0.95, 'e5': 0.79,
  'c1': 0.90, 'c2': 0.87, 'c3': 0.76, 'c4': 0.86, 'c5': 0.78,
  'f1': 0.93, 'f2': 0.89, 'f3': 0.91, 'f4': 0.72, 'f5': 0.81,
  'p1': 0.96, 'p2': 0.94, 'p3': 0.97, 'p4': 0.85, 'p5': 0.93,
};

// Simulated content similarity (would typically come from analysis of audio features)
// This maps songId to a list of similar song IDs with similarity scores
export const contentSimilarity: Record<string, Array<{id: string, score: number}>> = {
  'h1': [{ id: 'h3', score: 0.9 }, { id: 'h5', score: 0.8 }, { id: 'e4', score: 0.7 }],
  'h2': [{ id: 'h5', score: 0.9 }, { id: 'p5', score: 0.85 }, { id: 'p1', score: 0.7 }],
  's1': [{ id: 's2', score: 0.8 }, { id: 's5', score: 0.75 }, { id: 'c5', score: 0.6 }],
  'e4': [{ id: 'e1', score: 0.85 }, { id: 'p3', score: 0.8 }, { id: 'h4', score: 0.75 }],
  // Just a subset shown above, we would have entries for all songs in a real system
};

// Simulated collaborative data (would typically come from user behavior analysis)
// Users who liked X also liked Y
export const collaborativeData: Record<string, Array<{id: string, score: number}>> = {
  'h1': [{ id: 'h4', score: 0.85 }, { id: 'e5', score: 0.8 }, { id: 'p1', score: 0.7 }],
  'h2': [{ id: 'p1', score: 0.9 }, { id: 'p2', score: 0.85 }, { id: 'e3', score: 0.7 }],
  's1': [{ id: 's3', score: 0.8 }, { id: 'c1', score: 0.7 }, { id: 'f5', score: 0.6 }],
  // Just a subset shown above, we would have entries for all songs in a real system
};

// Generate explanations based on recommendation type
export function generateExplanation(song: Song, recType: RecommendationType, score: number): RecommendationExplanation {
  let reason = '';
  
  switch(recType) {
    case 'collaborative':
      reason = `Users who enjoy ${song.title} also liked similar songs`;
      break;
    case 'content':
      reason = `Musical features similar to songs you've enjoyed`;
      break;
    case 'popularity':
      reason = `${song.title} is trending among listeners`;
      break;
    case 'mood':
      reason = `Matches your current ${song.title} mood selection`;
      break;
    default:
      reason = 'Based on your listening preferences';
  }
  
  return {
    type: recType,
    reason,
    weight: score
  };
}
