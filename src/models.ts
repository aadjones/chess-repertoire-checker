import axios from 'axios';

export interface Player {
  user: {
    id: string;
    name: string;
  };
  rating: number;
  // Add more player-specific fields here
}

export interface Game {
    id: string;
    rated: boolean;
    variant: string;
    speed: string;
    perf: string;
    createdAt: number;
    lastMoveAt: number;
    status: string;
    players: {
      white: {
        user: {
          name: string;
          title?: string; // Optional since not all users have a title
          patron?: boolean;
          id: string;
        };
        rating: number;
        ratingDiff: number;
      };
      black: {
        user: {
          name: string;
          id: string;
        };
        rating: number;
        ratingDiff: number;
      };
    };
    opening?: {
      eco: string;
      name: string;
      ply: number;
    };
    moves: string;
    clock?: {
      initial: number;
      increment: number;
      totalTime: number;
    };
  }

  export interface StudyChapter {
    event: string;
    site: string;
    result: string;
    variant: string;
    eco: string;
    opening: string;
    annotator?: string;
    utcDate: string;
    utcTime: string;
    moves: string; // This could be a string of PGN moves or further parsed into more structured data
  }
  
  export interface Study {
    id: string;
    chapters: StudyChapter[];
  }