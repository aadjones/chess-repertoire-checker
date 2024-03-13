import axios from 'axios';

/**
 * Fetches the recent games of a specified Lichess user.
 * @param username - The Lichess username to fetch games for.
 * @returns A promise that resolves with an array of game objects.
 * @throws {Error} Throws an error if the request to the Lichess API fails.
 */
export const fetchGames = async (username: string): Promise<any[]> => {
    try {
        const response = await axios.get(`https://lichess.org/api/games/user/${username}`, {
            params: { max: 10 }, // Adjust based on how many games you want
            headers: { 'Accept': 'application/x-ndjson' }
        });
        return response.data.split('\n').filter(Boolean).map(JSON.parse);
    } catch (error) {
        console.error("Error fetching games from Lichess:", error);
        throw error;
    }
};
