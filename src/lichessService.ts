import axios from 'axios';

interface Player {
  user: {
    id: string;
    name: string;
  };
  rating: number;
  // Add more player-specific fields here
}

interface Game {
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

  interface StudyChapter {
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
  
  interface Study {
    id: string;
    chapters: StudyChapter[];
  }
  
/**
 * Fetches the recent games of a specified Lichess user.
 * @param username - The Lichess username to fetch games for.
 * @returns A promise that resolves with an array of game objects.
 * @throws {Error} Throws an error if the request to the Lichess API fails.
 */
export const fetchGames = async (username: string, max: number = 10): Promise<Game[]> => {
    try {
        const response = await axios.get<string>(`https://lichess.org/api/games/user/${username}`, {
            params: { max }, // Use the function's max parameter
            headers: { 'Accept': 'application/x-ndjson' }
        });
        const games: Game[] = response.data.split('\n').filter(Boolean).map(line => JSON.parse(line));
        return games;
    } catch (error) {
        console.error("Error fetching games from Lichess:", error);
        throw error;
    }
};

/**
 * Fetches full pgn data from a given Lichess study ID.
 * 
 * @param studyID - The ID of the Lichess study (not the URL!)
 * @returns A promise that resolves with a string of raw pgn data for the entire study
 * @throws {Error} Throws an error if the request to the Lichess API fails.
 */
export async function fetchPgnData(studyId: string): Promise<string | null> {
  try {
      const response = await axios.get(`https://lichess.org/study/${studyId}.pgn`, {
          params: {
              clocks: true,
              comments: true,
              variations: true,
              source: true,
              orientation: true,
          },
      });
      return response.data;
  } catch (error) {
      console.error("Failed to fetch PGN data:", error);
      return null;
  }
}

/**
 * Extracts the study ID from a given Lichess study URL.
 * 
 * @param studyUrl - The URL of the Lichess study from which to extract the study ID.
 * @returns The extracted study ID as a string if the URL is valid and contains an ID; otherwise, undefined.
 */
export function extractStudyId(studyUrl: string): string | undefined {
  const match = studyUrl.match(/lichess\.org\/study\/([a-zA-Z0-9]{8})/);
  return match ? match[1] : undefined;
}



