import path from "path";
import { findFirstDeviation } from "../src/deviationService";
import { loadGameFromPgn } from "../src/pgnService";
import { Game } from "../src/models";

describe("Game comparison", () => {
  it("should find the first deviation between two games", () => {
    // Load games from PGN files
    const game1 = loadGameFromPgn(
      path.join(__dirname, "pgn", "acc-dragon-test-1.pgn"),
    );
    const game2 = loadGameFromPgn(
      path.join(__dirname, "pgn", "a5-should-be-Re8-jrjrjr4.pgn"),
    );

    // Convert Chess instances to your Game class instances as needed
    // Assuming you have a constructor or method that can take a Chess instance
    const myGame1 = new Game({ chessInstance: game1 });
    const myGame2 = new Game({ chessInstance: game2 });

    // Use the findFirstDeviation function
    const deviation = findFirstDeviation(myGame1, myGame2);

    // Perform your assertions
    expect(deviation).not.toBeNull();
    expect(deviation).toBe("a5");
  });
});
