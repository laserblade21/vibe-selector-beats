
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ThumbsUp, ThumbsDown, Play, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SongRecommendation } from '@/data/recommendationEngine';
import { Badge } from '@/components/ui/badge';

interface RecommendationItemProps {
  recommendation: SongRecommendation;
  onPlaySong: (songId: string) => void;
  onFeedback: (songId: string, isPositive: boolean) => void;
  getBadgeColor: (type: string) => string;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({
  recommendation,
  onPlaySong,
  onFeedback,
  getBadgeColor,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { song, explanations } = recommendation;

  return (
    <li className="bg-muted/50 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md overflow-hidden bg-secondary flex-shrink-0">
            <img 
              src={`${song.cover}?w=40&h=40&fit=crop&auto=format`} 
              alt={song.title} 
              className="h-full w-full object-cover" 
            />
          </div>
          <div>
            <h4 className="font-medium">{song.title}</h4>
            <p className="text-sm text-muted-foreground">{song.artist}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
              >
                <Info className="h-4 w-4 mr-1" />
                {isExpanded ? (
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
                  {explanations.slice(0, 2).map((exp, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <Badge className={getBadgeColor(exp.type)}>
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
            onClick={() => onPlaySong(song.id)}
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
                  onClick={() => onFeedback(song.id, true)}
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
                  onClick={() => onFeedback(song.id, false)}
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
  );
};

export default RecommendationItem;
