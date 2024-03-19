import axios from "axios";
import { Chess } from "chess.js";
import fs from "fs";
import { Game } from "./models";

/**
 * Reads a PGN file from the specified file path and initializes a Chess instance with its content.
 *
 * @param filePath - The path to the PGN file.
 * @returns A Chess instance initialized with the game data from the PGN file. If the PGN data is invalid
 *          or the file cannot be read, the function will throw an error.
 * @throws {Error} If the file at the specified path cannot be read or if the PGN data is invalid and cannot
 *                 be loaded into the Chess instance.
 */
export function loadGameFromPgn(filePath: string): Chess {
  const pgnContent = fs.readFileSync(filePath, { encoding: "utf-8" });
  const chess = new Chess();
  chess.loadPgn(pgnContent);
  return chess;
}

/**
 * Fetches full pgn data from a given Lichess study ID.
 *
 * @param studyID - The ID of the Lichess study (not the URL!)
 * @returns A promise that resolves with a string of raw pgn data for the entire study
 * @throws {Error} Throws an error if the request to the Lichess API fails.
 */
export async function fetchPgnData(studyId: string): Promise<string | null> {
  try {
    const response = await axios.get(
      `https://lichess.org/study/${studyId}.pgn`,
      {
        params: {
          clocks: true,
          comments: true,
          variations: true,
          source: true,
          orientation: true,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch PGN data:", error);
    return null;
  }
}

/**
 * Splits a pgn string containing multiple games into a list of individual games
 *
 * @param pgnData - The pgn string of multiple games, separated by 3 new lines
 * @returns A list of pgn strings, one string per individual game
 */
export function splitPgnDataIntoGames(pgnData: string): string[] {
  // Implementation depends on how the PGN data separates games.
  // This could be as simple as splitting by blank lines, but might need more sophisticated parsing.
  return pgnData.split("\n\n\n").filter((pgn) => pgn.trim() !== "");
}

/**
 * Splits a pgn string containing multiple games into a list of individual games
 *
 * @param pgnData - The pgn string of multiple games, separated by 3 new lines
 * @returns A list of pgn strings, one string per individual game
 */
function parsePgnToGame(pgn: string): Game {
  // Parse PGN to a Game object.
  // You might adapt your Game class to load from PGN, use a library like chess.js, or implement custom parsing.
  const game = new Game(); // Placeholder for actual parsing logic
  // game.loadFromPgn(pgn); // Example method call if your Game class supports loading from PGN
  return game;
}
