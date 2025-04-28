
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ThumbsUp, ThumbsDown, Play, ChevronDown, ChevronUp, Info, Gauge } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SongRecommendation, RecommendationWeights } from '@/data/recommendationEngine';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

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
  const [expandedSongId, setExpandedSongId] = useState<string | null>(null);
  const [showWeights, setShowWeights] = useState(false);
  
  const toggleExpanded = (songId: string) => {
    setExpandedSongId(expandedSongId === songId ? null : songId);
  };

  const getWeightPercentage = (weight: number) => {
    return `${Math.round(weight * 100)}%`;
  };

  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'collaborative':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'content':
        return 'bg-green-500 hover:bg-green-600';
      case 'popularity':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'mood':
        return 'bg-amber-500 hover:bg-amber-600';
      default:
        return '';
    }
  };

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
              <li key={rec.song.id} className="bg-muted/50 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md overflow-hidden bg-secondary flex-shrink-0">
                      <img 
                        src={`${rec.song.cover}?w=40&h=40&fit=crop&auto=format`} 
                        alt={rec.song.title} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{rec.song.title}</h4>
                      <p className="text-sm text-muted-foreground">{rec.song.artist}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Collapsible open={expandedSongId === rec.song.id}>
                      <CollapsibleTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleExpanded(rec.song.id)}
                        >
                          <Info className="h-4 w-4 mr-1" />
                          {expandedSongId === rec.song.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="px-3 pb-3 pt-0">
                        <div className="bg-background p-3 rounded-md">
                          <h5 className="text-sm font-medium mb-2">Why we recommend this:</h5>
                          <ul className="space-y-2">
                            {rec.explanations.slice(0, 2).map((exp, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <Badge className={`${getBadgeColor(exp.type)}`}>
                                  {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                                </Badge>
                                <span className="text-sm">{exp.reason}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onPlaySong(rec.song.id)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600"
                            onClick={() => onFeedback(rec.song.id, true)}
                          >
                            <ThumbsUp className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>I like this recommendation</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600"
                            onClick={() => onFeedback(rec.song.id, false)}
                          >
                            <ThumbsDown className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>I don't like this recommendation</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationView;
