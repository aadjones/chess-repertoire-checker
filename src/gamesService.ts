import axios from "axios";
import { Game } from './models'
import { Chess } from 'chess.js'

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
