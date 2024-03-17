import axios from "axios"

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