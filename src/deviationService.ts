import { Game } from "./models";

/**
 * Compares two games and finds the first deviation in moves.
 * @param game1 The first game to compare.
 * @param game2 The second game to compare.
 * @returns The first move where the games deviate, or null if no deviation is found.
 */
export function findFirstDeviation(game1: Game, game2: Game): string | null {
  // Assuming Game class has a method to get the chess.js instance
  const chess1 = game1.chessInstance;
  const chess2 = game2.chessInstance;

  // Get the history of moves for each game
  const history1 = chess1.history();
  const history2 = chess2.history();

  // Find the minimum length to avoid index out of bounds
  const minLength = Math.min(history1.length, history2.length);

  // Iterate through both histories to find the first deviation
  for (let i = 0; i < minLength; i++) {
    if (history1[i] !== history2[i]) {
      // Deviation found, return the deviating move from game2
      return history2[i];
    }
  }

  // No deviation found, or one game is a subset of the other
  return null;
}
