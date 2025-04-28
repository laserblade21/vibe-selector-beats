
import { RecommendationType } from '@/data/recommendationEngine';

export const getBadgeColor = (type: RecommendationType): string => {
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
