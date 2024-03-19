import axios from "axios";
import { fetchPgnData, splitPgnDataIntoGames } from "../src/pgnService";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Suppress console output during tests
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("fetchPgnData", () => {
  it("fetches and returns PGN data for a given study ID", async () => {
    const fakeStudyId = "someStudyId";
    const fakePgnData = "1.e4 e5 2.Nf3 Nc6";
    mockedAxios.get.mockResolvedValue({ data: fakePgnData });

    const result = await fetchPgnData(fakeStudyId);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://lichess.org/study/${fakeStudyId}.pgn`,
      expect.any(Object),
    );
    expect(result).toBe(fakePgnData);
  });

  it("returns null if the API request fails", async () => {
    const fakeStudyId = "someStudyId";
    mockedAxios.get.mockRejectedValue(new Error("API request failed"));

    const result = await fetchPgnData(fakeStudyId);

    expect(mockedAxios.get).toHaveBeenCalledWith(
      `https://lichess.org/study/${fakeStudyId}.pgn`,
      expect.any(Object),
    );
    expect(result).toBeNull();
  });
});

describe("splitPgnDataIntoGames", () => {
  it("should correctly split a PGN string containing multiple games into individual games", () => {
    const multiGamePgn = `[Event "Game 1"]\n[Site "Lichess.org"]\n[Result "1-0"]\n\n1. e4 e5 1-0\n\n\n[Event "Game 2"]\n[Site "Lichess.org"]\n[Result "0-1"]\n\n1. d4 d5 0-1\n\n\n[Event "Game 3"]\n[Site "Lichess.org"]\n[Result "1/2-1/2"]\n\n1. c4 c5 1/2-1/2`;

    const expectedGames = [
      `[Event "Game 1"]\n[Site "Lichess.org"]\n[Result "1-0"]\n\n1. e4 e5 1-0`,
      `[Event "Game 2"]\n[Site "Lichess.org"]\n[Result "0-1"]\n\n1. d4 d5 0-1`,
      `[Event "Game 3"]\n[Site "Lichess.org"]\n[Result "1/2-1/2"]\n\n1. c4 c5 1/2-1/2`,
    ];

    const actualGames = splitPgnDataIntoGames(multiGamePgn);

    // Assert the number of games split matches expected
    expect(actualGames.length).toBe(expectedGames.length);

    // Optionally, iterate over each game to assert content matches
    actualGames.forEach((game, index) => {
      expect(game).toBe(expectedGames[index]);
    });
  });
});
