import { Game } from "./models";
import { fetchPgnData, splitPgnDataIntoGames } from "./pgnService";

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

/**
 * Fetches all the games (chapters) from a Lichess study given its URL.
 *
 * This function extracts the study ID from the provided URL, fetches the PGN data
 * for the study using the Lichess API, splits the PGN data into individual games,
 * and then loads each game into a new Game instance using the Game class's loadFromPgn method.
 *
 * @param {string} studyUrl - The full URL to the Lichess study.
 * @returns {Promise<Game[]>} A promise that resolves to an array of Game instances,
 *                            each representing a chapter from the study. If the study
 *                            URL is invalid, the PGN data can't be fetched, or there's
 *                            an error in processing the PGN data, the promise resolves
 *                            to an empty array.
 *
 * @throws {Error} Throws an error if fetching the PGN data for the study fails.
 */
export async function fetchStudyGames(studyUrl: string): Promise<Game[]> {
  const studyId = extractStudyId(studyUrl);
  if (!studyId) {
    console.error("Invalid study URL");
    return [];
  }

  try {
    const pgnData = await fetchPgnData(studyId);
    if (!pgnData) {
      throw new Error("Failed to fetch PGN data for the study.");
    }

    const chapterPgns = splitPgnDataIntoGames(pgnData);
    const games = chapterPgns.map((pgn) => new Game().loadFromPgn(pgn)); // Assuming Game class has a method to load from PGN
    return games;
  } catch (error) {
    console.error("Error fetching or processing the study:", error);
    return [];
  }
}
