import axios from 'axios';
import { fetchGames, extractStudyId, fetchPgnData } from '../src/lichessService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchGames', () => {
  it('should fetch games without error', async () => {
    // Correctly formatted mock data based on your structure
    const mockData = `{"id":"q7ZvsdUF","rated":true,"variant":"standard","speed":"blitz","perf":"blitz","createdAt":1514505150384,"lastMoveAt":1514505592843,"status":"draw","players":{"white":{"user":{"name":"Lance5500","title":"LM","patron":true,"id":"lance5500"},"rating":2389,"ratingDiff":4},"black":{"user":{"name":"TryingHard87","id":"tryinghard87"},"rating":2498,"ratingDiff":-4}},"opening":{"eco":"D31","name":"Semi-Slav Defense: Marshall Gambit","ply":7},"moves":"d4 d5...","clock":{"initial":300,"increment":3,"totalTime":420}}\n`;

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const games = await fetchGames('testuser');

    expect(games).toBeDefined();
    expect(Array.isArray(games)).toBe(true);
    expect(games.length).toBeGreaterThan(0);
    expect(games[0].id).toBe('q7ZvsdUF');
    // Add more assertions here to verify the structure of the returned data
  });
});

describe('extractStudyId', () => {
  it('should extract the study ID from a valid Lichess study URL', () => {
    const validUrl = 'https://lichess.org/study/14RZiFdX';
    const expectedId = '14RZiFdX';
    const studyId = extractStudyId(validUrl);
    expect(studyId).toEqual(expectedId);
  });

  it('should extract the study ID from a valid Lichess study URL that contains chapters', () => {
    const validUrl = 'https://lichess.org/study/14RZiFdX/zmjfXYWX';
    const expectedId = '14RZiFdX';
    const studyId = extractStudyId(validUrl);
    expect(studyId).toEqual(expectedId);
  });

  it('should return undefined for an invalid Lichess study URL', () => {
    const invalidUrl = 'https://lichess.org/other/abcdefgh';
    const studyId = extractStudyId(invalidUrl);
    expect(studyId).toBeUndefined();
  });
});

describe('fetchPgnData', () => {
  it('fetches and returns PGN data for a given study ID', async () => {
    const fakeStudyId = 'someStudyId';
    const fakePgnData = '1.e4 e5 2.Nf3 Nc6';
    mockedAxios.get.mockResolvedValue({ data: fakePgnData });

    const result = await fetchPgnData(fakeStudyId);
    
    expect(mockedAxios.get).toHaveBeenCalledWith(`https://lichess.org/study/${fakeStudyId}.pgn`, expect.any(Object));
    expect(result).toBe(fakePgnData);
  });

  it('returns null if the API request fails', async () => {
    const fakeStudyId = 'someStudyId';
    mockedAxios.get.mockRejectedValue(new Error('API request failed'));
  
    const result = await fetchPgnData(fakeStudyId);
  
    expect(mockedAxios.get).toHaveBeenCalledWith(`https://lichess.org/study/${fakeStudyId}.pgn`, expect.any(Object));
    expect(result).toBeNull();
  });
});

