import { Game } from "../src/models";

describe("Game class", () => {
  it("should correctly generate PGN for a complete game", () => {
    const game = new Game({
      id: "game123",
      rated: true,
      variant: "standard",
      speed: "blitz",
      perf: "blitz",
      createdAt: new Date("2022-01-01").getTime(),
      lastMoveAt: new Date("2022-01-01").getTime(),
      status: "win", // Assuming this means White won
      players: {
        white: {
          user: { name: "Alice", id: "alice123" },
          rating: 2100,
          ratingDiff: 10,
        },
        black: {
          user: { name: "Bob", id: "bob456" },
          rating: 2050,
          ratingDiff: -10,
        },
      },
      moves: "e4 e5 Nf3 Nc6 Bb5 a6",
    });

    const expectedPgn = [
      '[Event "standard"]',
      '[Site "https://lichess.org/game123"]',
      '[Date "2022-01-01"]',
      '[White "Alice"]',
      '[Black "Bob"]',
      '[Result "1-0"]',
      "",
      "e4 e5 Nf3 Nc6 Bb5 a6 1-0",
    ].join("\n");

    expect(game.generatePgn()).toBe(expectedPgn);
  });

  // Add more tests here for different scenarios, such as draws, unfinished games, etc.
});

describe("Game class with Chess integration", () => {
  it("should correctly generate a Chess instance from game data", () => {
    const game = new Game({
      id: "game123",
      rated: true,
      variant: "standard",
      speed: "blitz",
      perf: "blitz",
      createdAt: new Date("2022-01-01").getTime(),
      lastMoveAt: new Date("2022-01-01").getTime(),
      status: "win", // Assuming this means White won
      players: {
        white: {
          user: { name: "Alice", id: "alice123" },
          rating: 2100,
          ratingDiff: 10,
        },
        black: {
          user: { name: "Bob", id: "bob456" },
          rating: 2050,
          ratingDiff: -10,
        },
      },
      moves: "e4 e5 Nf3 Nc6 Bb5 a6",
    });

    const chessInstance = game.chessInstance;

    // Example assertions:
    // Check if the game is over
    expect(chessInstance.isGameOver()).toBe(false);

    // Check the current position or move validity
    // This assumes you have a specific PGN and know the expected outcomes
    const expectedFen =
      "r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4";
    expect(chessInstance.fen()).toBe(expectedFen);

    // You can also check specific functionalities like move generation
    const moves = chessInstance.moves();
    expect(moves).toContain("Ba4"); // Example: Expecting "Ba4" to be a valid move
  });

  // Add more tests as needed
});

describe("Game class", () => {
  test("loadFromPgn successfully loads a valid PGN", () => {
    const validPgn =
      '[Event "Casual Game"]\n' +
      '[Site "https://lichess.org"]\n' +
      '[Date "2021.01.01"]\n' +
      '[White "Alice"]\n' +
      '[Black "Bob"]\n' +
      '[Result "1-0"]\n\n' +
      "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 O-O 9. h3 *";
    const game = new Game();
    expect(() => game.loadFromPgn(validPgn)).not.toThrow();

    // Optionally, verify some properties to ensure they are correctly set
    expect(game.moves).not.toBe("");
  });
});
