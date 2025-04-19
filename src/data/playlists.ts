
export interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  cover: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  songs: Song[];
}

export type Mood = 'happy' | 'sad' | 'energetic' | 'chill' | 'focus' | 'party';

export const moodDescriptions: Record<Mood, string> = {
  happy: "Uplifting tunes to brighten your day",
  sad: "Melancholic melodies for your emotional moments",
  energetic: "High-energy tracks to get you moving",
  chill: "Relaxing beats to help you unwind",
  focus: "Concentration-enhancing music for deep work",
  party: "Dance hits to get the party started"
};

export const moodBackgrounds: Record<Mood, string> = {
  happy: "from-yellow-400 to-amber-500",
  sad: "from-blue-400 to-indigo-600",
  energetic: "from-red-500 to-orange-500",
  chill: "from-purple-400 to-indigo-400",
  focus: "from-green-500 to-emerald-600",
  party: "from-pink-500 to-purple-600"
};

export const moodIcons: Record<Mood, string> = {
  happy: "sun",
  sad: "cloud-rain",
  energetic: "zap",
  chill: "moon",
  focus: "target",
  party: "music"
};

// Mock playlists data
export const playlists: Record<Mood, Playlist> = {
  happy: {
    id: "happy-vibes",
    name: "Happy Vibes",
    description: "Uplifting tunes to brighten your day",
    cover: "https://images.unsplash.com/photo-1541689221361-ad95003448dc",
    songs: [
      {
        id: "h1",
        title: "Walking on Sunshine",
        artist: "Katrina & The Waves",
        duration: "3:54",
        cover: "https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f"
      },
      {
        id: "h2",
        title: "Happy",
        artist: "Pharrell Williams",
        duration: "3:53",
        cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b"
      },
      {
        id: "h3",
        title: "Good as Hell",
        artist: "Lizzo",
        duration: "2:39",
        cover: "https://images.unsplash.com/photo-1576525865260-9f0e7cfb02b3"
      },
      {
        id: "h4",
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        duration: "4:30",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
      },
      {
        id: "h5",
        title: "Can't Stop the Feeling",
        artist: "Justin Timberlake",
        duration: "3:56",
        cover: "https://images.unsplash.com/photo-1496380158053-0a95dd93fb2f"
      }
    ]
  },
  sad: {
    id: "melancholy-moods",
    name: "Melancholy Moods",
    description: "Melancholic melodies for your emotional moments",
    cover: "https://images.unsplash.com/photo-1527435228420-a528c3acf203",
    songs: [
      {
        id: "s1",
        title: "Someone Like You",
        artist: "Adele",
        duration: "4:45",
        cover: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa"
      },
      {
        id: "s2",
        title: "Fix You",
        artist: "Coldplay",
        duration: "4:55",
        cover: "https://images.unsplash.com/photo-1488190200125-e9c03b78af17"
      },
      {
        id: "s3",
        title: "All I Want",
        artist: "Kodaline",
        duration: "5:05",
        cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7"
      },
      {
        id: "s4",
        title: "Skinny Love",
        artist: "Bon Iver",
        duration: "3:58",
        cover: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8"
      },
      {
        id: "s5",
        title: "Say Something",
        artist: "A Great Big World & Christina Aguilera",
        duration: "3:49",
        cover: "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60"
      }
    ]
  },
  energetic: {
    id: "power-boost",
    name: "Power Boost",
    description: "High-energy tracks to get you moving",
    cover: "https://images.unsplash.com/photo-1470219556762-1771e7f9427d",
    songs: [
      {
        id: "e1",
        title: "Eye of the Tiger",
        artist: "Survivor",
        duration: "4:05",
        cover: "https://images.unsplash.com/photo-1517898717281-8e4385a41802"
      },
      {
        id: "e2",
        title: "Stronger",
        artist: "Kanye West",
        duration: "5:12",
        cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
      },
      {
        id: "e3",
        title: "Can't Hold Us",
        artist: "Macklemore & Ryan Lewis",
        duration: "4:18",
        cover: "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159"
      },
      {
        id: "e4",
        title: "Don't Stop Me Now",
        artist: "Queen",
        duration: "3:29",
        cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
      },
      {
        id: "e5",
        title: "Raise Your Glass",
        artist: "P!nk",
        duration: "3:23",
        cover: "https://images.unsplash.com/photo-1481851464899-9bba827c1fe5"
      }
    ]
  },
  chill: {
    id: "relaxation-station",
    name: "Relaxation Station",
    description: "Relaxing beats to help you unwind",
    cover: "https://images.unsplash.com/photo-1518609571773-39b7d303a87b",
    songs: [
      {
        id: "c1",
        title: "Dreams",
        artist: "Fleetwood Mac",
        duration: "4:14",
        cover: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86"
      },
      {
        id: "c2",
        title: "Breathe",
        artist: "Pink Floyd",
        duration: "2:43",
        cover: "https://images.unsplash.com/photo-1504898770365-14faca6a7320"
      },
      {
        id: "c3",
        title: "Scar Tissue",
        artist: "Red Hot Chili Peppers",
        duration: "3:37",
        cover: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea"
      },
      {
        id: "c4",
        title: "Midnight City",
        artist: "M83",
        duration: "4:03",
        cover: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14"
      },
      {
        id: "c5",
        title: "Sunday Morning",
        artist: "Maroon 5",
        duration: "4:02",
        cover: "https://images.unsplash.com/photo-1506459225024-1428097a7e18"
      }
    ]
  },
  focus: {
    id: "deep-concentration",
    name: "Deep Concentration",
    description: "Concentration-enhancing music for deep work",
    cover: "https://images.unsplash.com/photo-1512076249812-fd58fb2c8748",
    songs: [
      {
        id: "f1",
        title: "Time",
        artist: "Hans Zimmer",
        duration: "4:35",
        cover: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d"
      },
      {
        id: "f2",
        title: "Experience",
        artist: "Ludovico Einaudi",
        duration: "5:15",
        cover: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e"
      },
      {
        id: "f3",
        title: "Divenire",
        artist: "Ludovico Einaudi",
        duration: "6:42",
        cover: "https://images.unsplash.com/photo-1503751071777-d2918b21bbd9"
      },
      {
        id: "f4",
        title: "Clocks",
        artist: "Vitamin String Quartet",
        duration: "4:18",
        cover: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33"
      },
      {
        id: "f5",
        title: "Intro",
        artist: "The xx",
        duration: "2:07",
        cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76"
      }
    ]
  },
  party: {
    id: "party-starters",
    name: "Party Starters",
    description: "Dance hits to get the party started",
    cover: "https://images.unsplash.com/photo-1574393806809-25b8ad587894",
    songs: [
      {
        id: "p1",
        title: "Don't Start Now",
        artist: "Dua Lipa",
        duration: "3:03",
        cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
      },
      {
        id: "p2",
        title: "Dynamite",
        artist: "BTS",
        duration: "3:19",
        cover: "https://images.unsplash.com/photo-1505236858219-8359eb29e329"
      },
      {
        id: "p3",
        title: "Blinding Lights",
        artist: "The Weeknd",
        duration: "3:20",
        cover: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf"
      },
      {
        id: "p4",
        title: "Savage Love",
        artist: "Jason Derulo",
        duration: "2:51",
        cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
      },
      {
        id: "p5",
        title: "Levitating",
        artist: "Dua Lipa ft. DaBaby",
        duration: "3:23",
        cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
      }
    ]
  }
};
