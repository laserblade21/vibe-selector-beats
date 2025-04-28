
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gauge } from 'lucide-react';
import { SongRecommendation, RecommendationWeights } from '@/data/recommendationEngine';
import RecommendationItem from './recommendation/RecommendationItem';
import RecommendationWeightsDisplay from './recommendation/RecommendationWeightsDisplay';
import { getBadgeColor } from './recommendation/recommendationUtils';

interface RecommendationViewProps {
  recommendations: SongRecommendation[];
  weights: RecommendationWeights;
  onPlaySong: (songId: string) => void;
  onFeedback: (songId: string, isPositive: boolean) => void;
  onResetWeights: () => void;
}

const RecommendationView: React.FC<RecommendationViewProps> = ({
  recommendations,
  weights,
  onPlaySong,
  onFeedback,
  onResetWeights
}) => {
  const [showWeights, setShowWeights] = useState(false);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">Recommended for You</CardTitle>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowWeights(!showWeights)}
            className="flex items-center gap-1"
          >
            <Gauge className="h-4 w-4" />
            {showWeights ? 'Hide' : 'Show'} Weights
          </Button>
          <Button variant="ghost" size="sm" onClick={onResetWeights}>
            Reset
          </Button>
        </div>
      </CardHeader>

      {showWeights && (
        <CardContent className="pb-0">
          <RecommendationWeightsDisplay weights={weights} />
        </CardContent>
      )}

      <CardContent>
        {recommendations.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Select a mood to get recommendations
          </p>
        ) : (
          <ul className="space-y-3">
            {recommendations.map((rec) => (
              <RecommendationItem
                key={rec.song.id}
                recommendation={rec}
                onPlaySong={onPlaySong}
                onFeedback={onFeedback}
                getBadgeColor={getBadgeColor}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationView;
