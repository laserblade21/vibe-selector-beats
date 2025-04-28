
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { RecommendationWeights } from '@/data/recommendationEngine';

interface RecommendationWeightsDisplayProps {
  weights: RecommendationWeights;
}

const RecommendationWeightsDisplay: React.FC<RecommendationWeightsDisplayProps> = ({ weights }) => {
  const getWeightPercentage = (weight: number) => {
    return `${Math.round(weight * 100)}%`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 bg-muted p-3 rounded-md">
      <div className="flex flex-col items-center">
        <Badge className="bg-blue-500 mb-1">Collaborative</Badge>
        <span className="text-sm font-medium">
          {getWeightPercentage(weights.collaborative)}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <Badge className="bg-green-500 mb-1">Content</Badge>
        <span className="text-sm font-medium">
          {getWeightPercentage(weights.content)}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <Badge className="bg-purple-500 mb-1">Popularity</Badge>
        <span className="text-sm font-medium">
          {getWeightPercentage(weights.popularity)}
        </span>
      </div>
      <div className="flex flex-col items-center">
        <Badge className="bg-amber-500 mb-1">Mood</Badge>
        <span className="text-sm font-medium">
          {getWeightPercentage(weights.mood)}
        </span>
      </div>
    </div>
  );
};

export default RecommendationWeightsDisplay;
