
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mood, moodDescriptions, moodIcons, moodBackgrounds } from "@/data/playlists";
import * as LucideIcons from "lucide-react";

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood: Mood | null;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect, selectedMood }) => {
  const moods: Mood[] = ['happy', 'sad', 'energetic', 'chill', 'focus', 'party'];
  
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">How are you feeling today?</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {moods.map((mood) => {
          const IconComponent = LucideIcons[moodIcons[mood] as keyof typeof LucideIcons] as React.FC<LucideIcons.LucideProps>;
          
          return (
            <Card 
              key={mood}
              className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedMood === mood ? 'ring-2 ring-white ring-opacity-60' : ''
              } bg-gradient-to-br ${moodBackgrounds[mood]}`}
              onClick={() => onMoodSelect(mood)}
            >
              <div className="flex flex-col items-center text-white">
                {IconComponent && <IconComponent className="h-10 w-10 mb-3" />}
                <h3 className="font-bold capitalize mb-2">{mood}</h3>
                <p className="text-xs text-white/80 text-center">{moodDescriptions[mood]}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSelector;
