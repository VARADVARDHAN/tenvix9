
export interface Photo {
  description: string;
  url: string;
}

export interface Location {
  name: string;
  description: string;
}

export interface Music {
  song: string;
  artist: string;
}

export interface SocialPost {
  platform: string;
  content: string;
}

export interface MemoryData {
  summary: string;
  emotion: string;
  colorTheme: {
    from: string;
    to: string;
  };
  locations: Location[];
  photos: Photo[];
  music: Music[];
  socialPost: SocialPost;
}
