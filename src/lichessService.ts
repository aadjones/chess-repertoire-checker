import axios from 'axios';

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
